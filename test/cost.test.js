import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { zstdCompressSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import { accountBalance, apply, balanceReader, currentPrices, isPeakTime, parsePrices, priceUpdater, setPrices, stepCost, validatePrices } from '../index.js';

const bj = (iso) => Date.parse(iso + '+08:00');
const nowTier = () => (isPeakTime(Date.now()) ? 'peak' : 'offPeak');

test('峰谷：工作日 9–12、14–18 是高峰，边界左闭右开；周末、法定节假日全天空闲', () => {
  assert.equal(isPeakTime(bj('2026-11-10T08:59:59')), false); // 周二
  assert.equal(isPeakTime(bj('2026-11-10T09:00:00')), true);
  assert.equal(isPeakTime(bj('2026-11-10T11:59:59')), true);
  assert.equal(isPeakTime(bj('2026-11-10T12:00:00')), false);
  assert.equal(isPeakTime(bj('2026-11-10T14:00:00')), true);
  assert.equal(isPeakTime(bj('2026-11-10T18:00:00')), false);
  assert.equal(isPeakTime(bj('2026-11-14T10:00:00')), false, '周六');
  assert.equal(isPeakTime(bj('2026-10-08T10:00:00')), true, '国庆后第一个工作日');
  assert.equal(isPeakTime(bj('2026-10-07T10:00:00')), false, '国庆假期里的周三');
});

test('金额：缓存命中、未命中、输出分别计价；Pro 按 Pro 价', () => {
  const u = { cacheReadTokens: 1e6, inputTokens: 1e6, outputTokens: 1e6, reasoningTokens: 5e5 };
  assert.equal(stepCost(u, 'deepseek-flash', bj('2026-11-14T10:00:00')), 0.02 + 1 + 4, '空闲价，reasoning 不另算');
  assert.equal(stepCost(u, 'deepseek-flash', bj('2026-11-10T10:00:00')), 0.04 + 2 + 8, '高峰价');
  assert.equal(stepCost(u, 'deepseek-v4-pro', bj('2026-11-14T10:00:00')), 0.15 + 4.5 + 13.5);
  assert.equal(stepCost({}, 'x', 0), 0, '缺字段算 0');
});

/** 假宿主：记下事件处理函数和注册的路由，按需触发。query 是假的 sessionQuery 服务。 */
function host({ reject, home = path.join(tmpdir(), '没有这个目录'), query } = {}) {
  const on = {};
  const routes = {};
  apply({
    on: (name, fn) => { on[name] = fn; },
    inject: (_, fn) => fn({
      webServer: { register: (r) => { routes[r.path] = r; } },
      connection: { requestRejection: reject || (() => undefined) },
      get: (name) => (name === 'sessionQuery' ? query : undefined),
    }),
  }, home, []);
  const route = routes['/blockade-alter/cost.json'];
  // 路由可能要先统计再回答，等它 end
  const call = (r, url) => new Promise((done) => {
    const res = { code: 0 };
    r.handler({ url }, { writeHead: (c) => { res.code = c; }, end: (b) => done({ code: res.code, json: b ? JSON.parse(b) : null }) });
  });
  const get = (sid, extra = '') => call(route, route.path + '?' + (sid ? 'sid=' + encodeURIComponent(sid) : '') + extra);
  const step = (sid, turn, outputTokens, seq) => on['session/event']({ id: sid }, { type: 'assistant/message', seq, data: { turn, usage: { outputTokens }, message: { source: { model: 'deepseek-flash' } } } });
  return { on, get, step, call, routes };
}

test('账本：本轮在换轮时清零，会话一直累计；分身不会被挑成要显示的会话', async () => {
  const h = host();
  assert.deepEqual((await h.get()).json, { ok: true, sid: null }, '还没有用量');

  h.step('main', 1, 1e6, 1);
  h.step('main', 1, 1e6, 2);
  let j = (await h.get()).json;
  assert.equal(j.sid, 'main');
  assert.equal(j.round, j.session);
  assert.ok(j.round > 0);

  h.step('main', 2, 1e6, 3);
  j = (await h.get()).json;
  assert.equal(j.session, j.round * 3, '同价位下三步一样贵');

  h.on['subagent/start']({ id: 'sub-1' });
  h.step('sub-1', 1, 1e6, 1);
  assert.equal((await h.get()).json.sid, 'main', '分身最近有动静也不显示它');

  assert.equal((await h.get('sub-1')).json.sid, 'sub-1', '带了 sid 就给那个会话的，分身也给');
  assert.deepEqual((await h.get('旧 会话')).json, { ok: true, sid: '旧 会话', pricesAt: currentPrices().updatedAt, tier: nowTier(), round: 0, session: 0 }, '没记过账的会话给 0');

  h.on['session/disposed']({ id: 'main' });
  assert.deepEqual((await h.get()).json, { ok: true, sid: null }, '会话关了就不显示');
});

test('接口：宿主拒绝或校验抛异常时都不给数据', async () => {
  const no = host({ reject: () => 401 });
  assert.equal((await no.get()).code, 401);
  assert.equal((await no.call(no.routes['/blockade-alter/prices/refresh'], '/')).code, 401, '刷新价格也过访问校验');
  assert.equal((await no.call(no.routes['/blockade-alter/balance.json'], '/')).code, 401, '余额也过访问校验');
  const h = host({ reject: () => { throw new Error('坏了'); } });
  h.step('main', 1, 1e6, 1);
  const r = await h.get();
  assert.equal(r.code, 403);
  assert.equal(r.json, null);
});

test('统计：按会话记录算（先问 sessionQuery，没有读日志）；实时记过的步不重复算；10 秒没动静重新统计', async () => {
  const home = mkdtempSync(path.join(tmpdir(), '统计 '));
  try {
    const ev = (seq, turn, outputTokens) => ({ type: 'assistant/message', seq, time: bj('2026-11-14T10:00:00'), data: { turn, usage: { outputTokens }, message: { source: { model: 'deepseek-flash' } } } });
    const save = (space, sid, events) => {
      mkdirSync(path.join(home, 'sessions', space, sid), { recursive: true });
      writeFileSync(path.join(home, 'sessions', space, sid, 'session.v4.jsonl.zstd'), zstdCompressSync(events.map((e) => JSON.stringify(e)).join('\n') + '\n{"type":"assistant/mess'));
    };
    // 周六空闲价：每百万输出 4 元
    save('ws-a', 'session-old', [{ type: 'session', id: 'session-old' }, ev(1, 1, 1e6), ev(2, 2, 1e6), ev(3, 2, 1e6)]);
    save('ws-b', 'sub-9', [{ type: 'session', id: 'sub-9', origin: 'subagent' }, ev(1, 1, 1e6)]);

    // sessionQuery 只认识 session-q，别的会话说找不到
    let disposed = 0;
    let qEvents = [ev(1, 1, 1e6)];
    const query = {
      observeSession: async (sid) => {
        if (sid !== 'session-q') throw Object.assign(new Error('nope'), { code: 'SESSION_QUERY_SESSION_NOT_FOUND' });
        return { events: qEvents.slice(), dispose: () => { disposed++; } };
      },
    };
    const h = host({ home, query });
    assert.deepEqual((await h.get('session-old')).json, { ok: true, sid: 'session-old', pricesAt: currentPrices().updatedAt, tier: nowTier(), round: 8, session: 12 }, '宿主查不到就读日志，坏的末行跳过');

    await h.get('sub-9');
    h.step('session-old', 3, 0, 4);
    assert.equal((await h.get()).json.sid, 'session-old', '日志里标了 subagent 的会话不会被挑中');

    assert.equal((await h.get('session-q')).json.session, 4, '从 sessionQuery 拿到的事件');
    assert.equal(disposed, 1, '用完把租约还了');
    // 实时收到 seq 1（已统计过）和 seq 2（新的）
    h.step('session-q', 1, 1e6, 1);
    h.step('session-q', 2, 1e6, 2);
    const live = (await h.get('session-q')).json;
    assert.equal(live.round, live.session - 4, 'seq 1 没有再算一遍，seq 2 算进第 2 轮');

    assert.deepEqual((await h.get('../ws-a/session-old')).json, { ok: true, sid: '../ws-a/session-old', pricesAt: currentPrices().updatedAt, tier: nowTier(), round: 0, session: 0 }, 'sid 带路径不读文件');
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test('统计：新会话第一次问时还没有记录，之后没有实时事件也会重新统计出来', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: bj('2026-11-14T10:00:00') });
  let events = [];
  const h = host({ query: { observeSession: async () => ({ events }) } });
  assert.equal((await h.get('s-new')).json.session, 0, '刚开的会话');
  events = [{ type: 'assistant/message', seq: 1, time: Date.now(), data: { turn: 1, usage: { outputTokens: 1e6 }, message: { source: { model: 'deepseek-flash' } } } }];
  assert.equal((await h.get('s-new')).json.session, 0, '10 秒内用上次的');
  t.mock.timers.tick(10_001);
  assert.equal((await h.get('s-new')).json.session, 4, '过了 10 秒重新统计');
});

test('自定义价目表：按模型覆盖，空格子沿用默认价，不分峰谷；改了价历史也重算', async () => {
  const custom = parsePrices('ark/deepseek-v4.1-flash | 0.1 |  | 3\n坏行没有竖线\n| 1 | 2 | 3\nx | -1 | abc | 2');
  const u = { cacheReadTokens: 1e6, inputTokens: 1e6, outputTokens: 1e6 };
  assert.equal(stepCost(u, 'deepseek-v4.1-flash', bj('2026-11-10T10:00:00'), custom), 0.1 + 2 + 3, '命中、输出用自定义；输入空着，用默认的高峰价');
  assert.equal(stepCost(u, 'DeepSeek-V4.1-Flash', bj('2026-11-14T10:00:00'), custom), 0.1 + 1 + 3, '模型名不分大小写');
  assert.equal(stepCost(u, 'x', bj('2026-11-14T10:00:00'), custom), 0.02 + 1 + 2, '负数、非数字当空着');
  assert.equal(custom.size, 3, '没写模型名的行不算');

  const h = host();
  h.step('main', 1, 1e6, 1);
  const plain = (await h.get('main')).json.session;
  const priced = (await h.get('main', '&prices=' + encodeURIComponent('deepseek-flash | | | 100'))).json.session;
  assert.equal(priced, 100, '同一步换了价目表就按新价算');
  assert.notEqual(plain, priced);
});

test('价格快照：校验挡住坏文件；磁盘缓存比包里新才用；网络取不到就继续用手上的', async () => {
  const shipped = JSON.parse(readFileSync(new URL('../data/prices.json', import.meta.url), 'utf8'));
  assert.doesNotThrow(() => validatePrices(shipped), '包里那份能过校验');
  const bad = (patch) => assert.throws(() => validatePrices({ ...shipped, ...patch }));
  bad({ schemaVersion: 2 });
  bad({ models: {} });
  bad({ models: { x: { offPeak: { cacheHit: 1, cacheMiss: 1, output: 1 }, peak: { cacheHit: 0.5, cacheMiss: 1, output: 1 } } } });
  bad({ schedule: { ...shipped.schedule, peakWindows: [{ start: '9点', end: '12:00' }] } });

  const dir = mkdtempSync(path.join(tmpdir(), '价格 '));
  try {
    const newer = { ...shipped, updatedAt: '2099-01-01', models: { ...shipped.models, 'deepseek-flash': { offPeak: { cacheHit: 0, cacheMiss: 0, output: 100 }, peak: { cacheHit: 0, cacheMiss: 0, output: 100 } } } };
    writeFileSync(path.join(dir, 'p.json'), JSON.stringify({ fetchedAt: Date.now(), document: newer }));
    const refresh = priceUpdater(path.join(dir, 'p.json'), ['http://127.0.0.1:9/没有这个服务']);
    assert.equal(currentPrices().updatedAt, '2099-01-01', '缓存更新，用缓存');
    assert.equal(stepCost({ outputTokens: 1e6 }, 'deepseek-flash', 0), 100);
    assert.equal(await refresh(Date.now() + 2 * 24 * 3600 * 1000), false, '过了一天去取，取不到');
    assert.equal(currentPrices().updatedAt, '2099-01-01', '取不到就继续用手上的');

    // 手动刷新：不到一天也去取，GitHub 原始地址先试
    const asked = [];
    const realFetch = globalThis.fetch;
    globalThis.fetch = async (url) => { asked.push(url); return { ok: true, json: async () => ({ ...newer, updatedAt: '2099-02-02' }) }; };
    try {
      const fresh = priceUpdater(path.join(dir, 'p.json'), ['https://cdn/x', 'https://raw/x']);
      assert.equal(await fresh(), false, '不到一天不取');
      assert.equal(await fresh(Date.now(), true), true);
      assert.deepEqual(asked, ['https://raw/x']);
      assert.equal(currentPrices().updatedAt, '2099-02-02');
    } finally { globalThis.fetch = realFetch; }

    setPrices(shipped);
    writeFileSync(path.join(dir, 'old.json'), JSON.stringify({ fetchedAt: 0, document: { ...shipped, updatedAt: '2000-01-01' } }));
    priceUpdater(path.join(dir, 'old.json'), []);
    assert.equal(currentPrices().updatedAt, shipped.updatedAt, '缓存比包里旧，不用');
  } finally {
    setPrices(shipped);
    rmSync(dir, { recursive: true, force: true });
  }
});

test('余额：取人民币那条，一分钟内用缓存；没密钥、密钥错都说清楚，密钥只放在请求头里', async () => {
  const realFetch = globalThis.fetch;
  const calls = [];
  let status = 200;
  globalThis.fetch = async (url, init) => {
    calls.push(init.headers.authorization);
    return { ok: status === 200, status, json: async () => ({ is_available: true, balance_infos: [
      { currency: 'USD', total_balance: '1.00' },
      { currency: 'CNY', total_balance: '110.50', granted_balance: '10.00', topped_up_balance: '100.50' },
    ] }) };
  };
  try {
    const read = balanceReader(async () => 'sk-test', 'https://x/balance');
    const b = await read(1000);
    assert.deepEqual(b, { ok: true, available: true, source: 'apikey', currency: 'CNY', total: 110.5, granted: 10, toppedUp: 100.5, at: 1000 });
    assert.ok(!JSON.stringify(b).includes('sk-test'), '回给面板的东西里没有密钥');
    await read(30_000);
    assert.equal(calls.length, 1, '一分钟内不重复请求');
    assert.deepEqual(calls, ['Bearer sk-test']);

    assert.deepEqual(await balanceReader(async () => '')(), { ok: false, reason: 'no-key' });
    status = 401;
    assert.deepEqual(await balanceReader(async () => 'sk-bad')(), { ok: false, reason: 'bad-key' });
    status = 500;
    assert.deepEqual(await balanceReader(async () => 'sk-x')(), { ok: false, reason: 'failed' });
  } finally { globalThis.fetch = realFetch; }
});

test('余额：密钥那条不行就用 DSH 登录的账号查；账号钱包按充值、赠送分开加', async () => {
  assert.equal(accountBalance(null), null, '没登录');
  assert.equal(accountBalance({ status: 'pending', value: [] }), null);
  assert.equal(accountBalance({ status: 'ready', value: [], bonusWallets: [] }), null, '没有钱包不是 0 元');
  assert.deepEqual(accountBalance({ status: 'ready', value: [], bonusWallets: [{ currency: 'CNY', balance: '5.5' }] }),
    { ok: true, available: true, source: 'account', currency: 'CNY', total: 5.5, granted: 5.5, toppedUp: 0 }, '只有赠送也算');
  assert.deepEqual(accountBalance({ status: 'ready', value: [{ currency: 'USD', balance: '0' }, { currency: 'CNY', balance: '0.1' }, { currency: 'CNY', balance: '0.2' }], bonusWallets: [{ currency: 'USD', balance: '9' }] }),
    { ok: true, available: true, source: 'account', currency: 'CNY', total: 0.3, granted: 0, toppedUp: 0.3 }, '人民币优先，别的币种不混进来');

  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false, status: 401 });
  try {
    const acc = { ok: true, available: true, source: 'account', currency: 'CNY', total: 1, granted: 0, toppedUp: 1 };
    assert.deepEqual(await balanceReader(async () => '', 'u', async () => acc)(5), { ...acc, at: 5 }, '没密钥走账号');
    assert.deepEqual(await balanceReader(async () => 'sk-bad', 'u', async () => acc)(5), { ...acc, at: 5 }, '密钥无效也走账号');
    assert.deepEqual(await balanceReader(async () => 'sk-bad', 'u', async () => { throw new Error('x'); })(), { ok: false, reason: 'bad-key' }, '两条都不行报密钥的原因');
  } finally { globalThis.fetch = realFetch; }
});
