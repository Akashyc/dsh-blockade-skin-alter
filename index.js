import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

/**
 * 皮肤的宿主半边：按每步的 token 用量算钱，给左栏看板一个只读接口 /blockade-alter/cost.json。
 * 画面全在 client.js。价格和峰谷时段来自 data/prices.json：仓库的工作流每天抓一次官方价，
 * 装好的插件每天从 CDN 取一次最新的（思路同 Nwflower/dsh-claude-style，MIT）。
 */

const METRICS = ['cacheHit', 'cacheMiss', 'output']
const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/

/** 价格快照的校验：形状不对就抛错。工作流写文件前、插件用下载来的文件前都过这一道。 */
export function validatePrices(doc) {
  const fail = (why) => { throw new Error('价格快照不对：' + why) }
  if (!doc || doc.schemaVersion !== 1) fail('schemaVersion')
  const s = doc.schedule || {}
  if (s.timeZone !== 'UTC') fail('峰谷时段要按 UTC 写')
  if (!Array.isArray(s.peakDays) || !s.peakDays.length || s.peakDays.some((d) => !Number.isInteger(d) || d < 0 || d > 6)) fail('peakDays')
  if (!Array.isArray(s.peakWindows) || !s.peakWindows.length || s.peakWindows.some((w) => !HHMM.test(w.start) || !HHMM.test(w.end))) fail('peakWindows')
  if (!Array.isArray(s.holidays) || s.holidays.some((d) => !/^\d{4}-\d{2}-\d{2}$/.test(d))) fail('holidays')
  const ids = Object.keys(doc.models || {})
  if (!ids.length) fail('没有模型')
  for (const id of ids) {
    for (const tier of ['offPeak', 'peak']) {
      for (const k of METRICS) {
        const v = doc.models[id][tier] && doc.models[id][tier][k]
        if (typeof v !== 'number' || !Number.isFinite(v) || v < 0) fail(`${id} ${tier}.${k}`)
      }
    }
    for (const k of METRICS) if (doc.models[id].peak[k] < doc.models[id].offPeak[k]) fail(`${id} 高峰价低于空闲价`)
  }
  return doc
}

const SHIPPED = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data', 'prices.json')
const readJson = (file) => { try { return JSON.parse(fs.readFileSync(file, 'utf8')) } catch { return null } }

// 包里带的那份，由工作流写入，发出去的包里总是有。读不到只会出现在仓库第一次生成快照之前
let prices = (() => { try { return validatePrices(readJson(SHIPPED)) } catch { return null } })()
export const setPrices = (doc) => { prices = validatePrices(doc) }
export const currentPrices = () => prices

// 模型名比对用：小写，去掉「厂商/」前缀
const bare = (model) => {
  const m = String(model || '').trim().toLowerCase()
  return m.slice(m.lastIndexOf('/') + 1)
}

/**
 * 用户在设置里写的价目表：每行「模型 | 缓存命中 | 未命中输入 | 输出」，元 / 百万 token。
 * 空着的格子沿用官方价；自定义的价不分峰谷。和 dsh-claude-style 的自定义计费表同一个思路。
 */
export function parsePrices(text) {
  const rows = new Map()
  const num = (s) => (s !== undefined && s !== '' && Number.isFinite(Number(s)) && Number(s) >= 0 ? Number(s) : null)
  for (const line of String(text || '').split(/\r?\n/)) {
    const [model, ...rates] = line.split('|').map((s) => s.trim())
    if (model) rows.set(bare(model), { cacheHit: num(rates[0]), cacheMiss: num(rates[1]), output: num(rates[2]) })
  }
  return rows
}

/** 一个模型的 { offPeak, peak } 两档价。官方表里没有的按 deepseek-flash 算，再用自定义价目覆盖。 */
export function priceFor(model, custom = new Map()) {
  const id = bare(model)
  const models = prices.models
  const key = models[id] ? id : prices.aliases && models[prices.aliases[id]] ? prices.aliases[id]
    : Object.keys(models).find((k) => id.includes(k)) || 'deepseek-flash'
  const base = models[key] || models[Object.keys(models)[0]]
  const row = custom.get(id)
  if (!row) return base
  const tier = (t) => Object.fromEntries(METRICS.map((k) => [k, row[k] === null ? base[t][k] : row[k]]))
  return { offPeak: tier('offPeak'), peak: tier('peak') }
}

/** ms 是 epoch 毫秒。时段按快照里的 UTC 时间窗，节假日按北京日期。 */
// shortcut: 按现行峰谷规则算，2026-08 峰谷实施前的老会话会算偏
export function isPeakTime(ms) {
  const s = prices.schedule
  const t = new Date(ms)
  if (!s.peakDays.includes(t.getUTCDay())) return false
  if (s.holidays.includes(new Date(ms + 8 * 3600 * 1000).toISOString().slice(0, 10))) return false
  const min = t.getUTCHours() * 60 + t.getUTCMinutes()
  const at = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3))
  return s.peakWindows.some((w) => min >= at(w.start) && min < at(w.end))
}

/** 一步的金额（元）。outputTokens 已经包含 reasoningTokens，不能再加一遍（鲸鱼 issue #89）。 */
export function stepCost(usage, model, ms, custom) {
  const p = priceFor(model, custom)[isPeakTime(ms) ? 'peak' : 'offPeak']
  return (Number(usage.cacheReadTokens) || 0) / 1e6 * p.cacheHit
    + (Number(usage.inputTokens) || 0) / 1e6 * p.cacheMiss
    + (Number(usage.outputTokens) || 0) / 1e6 * p.output
}

// 按 1e-8 元取整再加，免得浮点误差越滚越大
const add = (a, b) => (Math.round(a * 1e8) + Math.round(b * 1e8)) / 1e8

/** 一步只留算钱要的几样。账本存用量不存金额：改了价目表，历史也按新价重算。 */
const stepOf = (d, time, seq) => ({
  turn: Number(d.turn),
  seq: Number(seq),
  model: d.message && d.message.source && d.message.source.model,
  time,
  usage: { cacheReadTokens: d.usage.cacheReadTokens, inputTokens: d.usage.inputTokens, outputTokens: d.usage.outputTokens },
})

/** 一串步的金额：最后一轮的，和全部的。 */
export function totals(steps, custom) {
  let round = 0
  let session = 0
  const last = steps.length ? steps[steps.length - 1].turn : null
  for (const s of steps) {
    const c = stepCost(s.usage, s.model, s.time, custom)
    session = add(session, c)
    if (s.turn === last) round = add(round, c)
  }
  return { round, session }
}

/** 从会话事件取出各步（日志文本或宿主给的事件数组都行）；顺带看它是不是分身。 */
export function historySteps(input) {
  const h = { steps: [], subagent: false }
  const items = Array.isArray(input) ? input : String(input).split('\n')
  for (const raw of items) {
    let x = raw
    if (typeof raw === 'string') try { x = JSON.parse(raw) } catch { continue } // 末尾半行、坏行跳过
    if (x && x.type === 'session') h.subagent = x.origin === 'subagent'
    const d = x && x.data
    if (!x || x.type !== 'assistant/message' || !d || !d.usage || !Number.isFinite(Number(d.turn))) continue
    h.steps.push(stepOf(d, Number(x.time) || 0, x.seq))
  }
  return h
}

/** DSH 把会话存在 <DSH_HOME>/sessions/<工作区>/<会话 id>/session.v4.jsonl.zstd；找不到返回 null。 */
export function readSessionLog(home, sid) {
  if (!/^[\w-]+$/.test(sid)) return null // sid 来自请求，不许带路径
  const root = path.join(home, 'sessions')
  let spaces = []
  try { spaces = fs.readdirSync(root) } catch { return null }
  for (const space of spaces) {
    const file = path.join(root, space, sid, 'session.v4.jsonl.zstd')
    try { return zlib.zstdDecompressSync(fs.readFileSync(file)).toString('utf8') } catch {}
  }
  return null
}

// 每天取一次最新的价格快照：jsDelivr 在国内通常更快，GitHub 原始地址兜底
export const PRICE_URLS = [
  'https://cdn.jsdelivr.net/gh/Akashyc/dsh-blockade-skin-alter@main/data/prices.json',
  'https://raw.githubusercontent.com/Akashyc/dsh-blockade-skin-alter/main/data/prices.json',
]
const DAY_MS = 24 * 3600 * 1000

/**
 * 价格快照的更新：先用磁盘缓存里比包里新的那份，过了一天就去 CDN 取。
 * 取到的过不了校验、或比手上的旧，就不用；网络失败也只是继续用手上的。
 * force：设置里点「刷新」时不管过没过一天都去取，先试 GitHub 原始地址（jsDelivr 的 @main 会缓存半天）。
 * 返回这次有没有取到。
 */
export function priceUpdater(cacheFile, urls = PRICE_URLS) {
  const cached = readJson(cacheFile)
  let fetchedAt = 0
  try {
    if (cached && cached.document && cached.document.updatedAt >= prices.updatedAt) {
      setPrices(cached.document)
      fetchedAt = Number(cached.fetchedAt) || 0
    }
  } catch {} // 缓存坏了就当没有
  let busy = false
  return async (now = Date.now(), force = false) => {
    if (busy || (!force && now - fetchedAt < DAY_MS)) return false
    busy = true
    try {
      for (const url of force ? [...urls].reverse() : urls) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(15_000), headers: { accept: 'application/json' } })
          if (!res.ok) continue
          const doc = validatePrices(await res.json())
          fetchedAt = now
          if (doc.updatedAt >= prices.updatedAt) setPrices(doc)
          fs.mkdirSync(path.dirname(cacheFile), { recursive: true })
          fs.writeFileSync(cacheFile, JSON.stringify({ fetchedAt, document: prices }))
          return true
        } catch {}
      }
      return false
    } finally { busy = false }
  }
}

export const BALANCE_URL = 'https://api.deepseek.com/user/balance'

/**
 * 官方余额：一分钟内重复问给缓存的。返回 { ok, currency, total, granted, toppedUp, at } 或 { ok: false, reason }。
 * getKey 返回 DSH 凭据服务里的 DEEPSEEK_API_KEY（和 MeteorNOX/DeepSeek-Balance-Whale-Widget 同一个取法），密钥不出宿主。
 */
/**
 * DSH 账号服务 getBalance 的结果 → 和 API 余额同一个形状；没登录、没钱包时返回 null。
 * 充值钱包（value）和赠送钱包（bonusWallets）分开加，币种先挑有钱的人民币钱包。照大肥鱼的 fetchAccountBalance。
 */
export function accountBalance(result) {
  if (!result || result.status !== 'ready') return null
  const usable = (list) => (Array.isArray(list) ? list : []).filter((w) => w && Number.isFinite(Number(w.balance)))
  const normal = usable(result.value)
  const bonus = usable(result.bonusWallets)
  const all = normal.concat(bonus)
  if (!all.length) return null
  const cur = (w) => String(w.currency || 'CNY').toUpperCase()
  const rich = all.filter((w) => Number(w.balance) > 0)
  const currency = cur(rich.find((w) => cur(w) === 'CNY') || rich[0] || all.find((w) => cur(w) === 'CNY') || all[0])
  const sum = (list) => Math.round(list.filter((w) => cur(w) === currency).reduce((n, w) => n + Number(w.balance), 0) * 1e6) / 1e6
  const toppedUp = sum(normal)
  const granted = sum(bonus)
  return { ok: true, available: true, source: 'account', currency, total: Math.round((toppedUp + granted) * 1e6) / 1e6, granted, toppedUp }
}

/**
 * 先用 API 密钥查；密钥没有、无效或查不到时，再用 DSH 登录的 DeepSeek 账号查（getAccount 返回 accountBalance 的结果或 null）。
 * 两条都不行就报密钥那条的原因。
 */
export function balanceReader(getKey, url = BALANCE_URL, getAccount = async () => null) {
  let last = null
  let pending = null
  return (now = Date.now()) => {
    if (last && now - last.at < 60_000) return Promise.resolve(last)
    if (pending) return pending
    pending = Promise.resolve(getKey())
      .then((key) => (key ? fetch(url, { signal: AbortSignal.timeout(10_000), headers: { accept: 'application/json', authorization: 'Bearer ' + key } }) : null))
      .then(async (res) => {
        if (!res) return { ok: false, reason: 'no-key' }
        if (res.status === 401) return { ok: false, reason: 'bad-key' }
        if (!res.ok) return { ok: false, reason: 'failed' }
        const j = await res.json()
        const info = (j.balance_infos || []).find((b) => b.currency === 'CNY') || (j.balance_infos || [])[0]
        if (!info) return { ok: false, reason: 'failed' }
        const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : null)
        return { ok: true, available: j.is_available !== false, source: 'apikey', currency: String(info.currency || 'CNY'), total: num(info.total_balance), granted: num(info.granted_balance), toppedUp: num(info.topped_up_balance) }
      })
      .catch(() => ({ ok: false, reason: 'failed' }))
      .then(async (b) => {
        if (b.ok) return (last = { ...b, at: now })
        let acc = null
        try { acc = await Promise.race([getAccount(), new Promise((r) => setTimeout(r, 10_000, null))]) } catch {}
        return acc ? (last = { ...acc, at: now }) : b
      })
      .finally(() => { pending = null })
    return pending
  }
}

export const name = 'blockade-skin-cost'

export function apply(root, home = process.env.DSH_HOME || path.join(os.homedir(), '.dsh'), urls = PRICE_URLS, balanceUrl = BALANCE_URL) {
  // 凭据服务单独接：宿主没有它时花费照常，余额显示「没有密钥」
  let credentials = null
  root.inject(['credentials'], (ctx) => { credentials = ctx.credentials })
  const getKey = async () => {
    if (!credentials) return ''
    for (let attempt = 0; ; attempt++) {
      try {
        const cred = await credentials.resolve('DEEPSEEK_API_KEY')
        return (cred && cred.value) || ''
      } catch {
        if (attempt) return '' // 冷启动时凭据服务可能还没好，隔一下再试一次
        await new Promise((r) => setTimeout(r, 700))
      }
    }
  }
  // DSH 登录的 DeepSeek 账号：可选服务，只能 get 不能写进 inject（老宿主没有它，inject 会一直等）
  let getService = () => null
  const getAccount = async () => {
    let account = null
    try { account = getService('deepseekAccount') } catch {}
    if (!account || typeof account.getBalance !== 'function') return null
    return accountBalance(await account.getBalance({
      version: String(process.env.DSH_CLIENT_VERSION || process.env.DSH_VERSION || '') || 'unknown',
      locale: String(process.env.DSH_LOCALE || '') || 'zh_CN',
      timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60,
    }))
  }
  const balance = balanceReader(getKey, balanceUrl, getAccount)
  // 会话 id -> { folded: 从会话记录统计出的步, foldedAt, live: 统计之后实时收到的步, lastAt }
  const ledger = new Map()
  const subagents = new Set() // 分身的会话 id：只用来在挑「最近的主会话」时排除
  const folding = new Map()   // 正在统计的会话 -> Promise
  const entry = (sid) => {
    let e = ledger.get(sid)
    if (!e) ledger.set(sid, (e = { folded: [], foldedAt: 0, live: [], lastAt: 0 }))
    return e
  }
  const stepsOf = (e) => e.folded.concat(e.live)

  // 价格：启动时看一眼，之后每小时看一眼是不是过了一天
  const refresh = priceUpdater(path.join(home, 'cache', 'dsh-blockade-skin-alter', 'prices.json'), urls)
  refresh()
  const timer = setInterval(refresh, 3600 * 1000)
  if (timer.unref) timer.unref()
  if (root.effect) root.effect(() => () => clearInterval(timer))

  // 会话的全部事件：先问宿主的 sessionQuery（dsh-claude-style 的取法，还没落盘的也有），没有再读日志文件
  const readEvents = async (sid) => {
    let query = null
    try { query = getService('sessionQuery') } catch {}
    try {
      if (query && typeof query.observeSession === 'function') {
        const o = await query.observeSession(sid, { projectionMode: 'none' })
        try { if (o && Array.isArray(o.events)) return o.events } finally {
          try { if (typeof o.dispose === 'function') o.dispose(); else if (o[Symbol.dispose]) o[Symbol.dispose]() } catch {}
        }
      } else if (query && typeof query.readSession === 'function') {
        const snap = await query.readSession(sid)
        if (snap && Array.isArray(snap.events)) return snap.events
      }
    } catch {} // 会话不存在、宿主没这个服务：退回读文件
    return readSessionLog(home, sid)
  }

  // 统计一个会话：照 dsh-claude-style，10 秒内有实时事件或刚统计过就直接用，否则把记录重新过一遍。
  // 实时收到的步只留记录里还没有的（seq 更大的），不会重复算
  const fold = (sid) => {
    const e = entry(sid)
    if (e.foldedAt && Date.now() - Math.max(e.foldedAt, e.lastAt) < 10_000) return Promise.resolve(e)
    if (folding.has(sid)) return folding.get(sid)
    const work = readEvents(sid).then((events) => {
      e.foldedAt = Date.now()
      if (!events) return e
      const h = historySteps(events)
      if (h.subagent) subagents.add(sid)
      const top = h.steps.reduce((m, x) => (Number.isFinite(x.seq) && x.seq > m ? x.seq : m), -Infinity)
      e.folded = h.steps
      e.live = e.live.filter((x) => Number.isFinite(x.seq) && x.seq > top)
      return e
    }, () => { e.foldedAt = Date.now(); return e }).finally(() => folding.delete(sid))
    folding.set(sid, work)
    return work
  }

  root.on('subagent/start', (info) => { if (info && info.id) subagents.add(String(info.id)) })

  root.on('session/event', (session, event) => {
    if (!event || event.type !== 'assistant/message') return
    const d = event.data || {}
    if (!d.usage || typeof d.usage !== 'object' || !Number.isFinite(Number(d.turn))) return
    const sid = String((session && session.id) || 'default')
    const now = Date.now()
    const e = entry(sid)
    const seq = Number(event.seq)
    if (Number.isFinite(seq) && e.folded.some((x) => x.seq === seq)) return // 记录里已经有这一步
    e.live.push(stepOf(d, now, seq))
    e.lastAt = now
  })

  root.on('session/disposed', (session) => {
    const sid = String((session && session.id) || '')
    ledger.delete(sid)
    subagents.delete(sid)
    folding.delete(sid)
  })

  // webServer 在 apply 时还没就绪，要等（鲸鱼的做法）
  root.inject(['webServer', 'connection'], (ctx) => {
    if (typeof ctx.get === 'function') getService = (n) => ctx.get(n)
    // 交给宿主挡伪造 Host / 跨站 / 未认证的请求；宿主没有这个方法或它抛异常时一律拒绝
    const rejected = (req, res) => {
      let code
      try { code = ctx.connection.requestRejection(req) } catch { code = 403 }
      if (!code) return false
      res.writeHead(typeof code === 'number' ? code : 403)
      res.end()
      return true
    }
    const json = (res, body) => {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
      res.end(JSON.stringify(body))
    }

    // 设置里的「刷新官方价」：马上取一次价格快照，回报现在用的是哪天的价
    ctx.webServer.register({
      kind: 'exact',
      path: '/blockade-alter/prices/refresh',
      handler: (req, res) => {
        if (rejected(req, res)) return
        refresh(Date.now(), true).then(
          (fetched) => json(res, { ok: true, fetched, pricesAt: prices.updatedAt }),
          () => json(res, { ok: true, fetched: false, pricesAt: prices.updatedAt }),
        )
      },
    })

    // 官方 API 余额：密钥在宿主这边用，面板只拿到数字
    ctx.webServer.register({
      kind: 'exact',
      path: '/blockade-alter/balance.json',
      handler: (req, res) => {
        if (rejected(req, res)) return
        balance().then((b) => json(res, b))
      },
    })

    ctx.webServer.register({
      kind: 'exact',
      path: '/blockade-alter/cost.json',
      handler: (req, res) => {
        if (rejected(req, res)) return
        const q = new URL(String(req.url || '/'), 'http://x').searchParams
        // 价目表存在面板的本地设置里，每次随请求带过来
        const custom = parsePrices(String(q.get('prices') || '').slice(0, 8000))
        // 面板带上正在看的会话 id；没带时退回最近有动静的主会话
        const asked = q.get('sid')
        // tier：现在是高峰价还是空闲价，面板在「本轮」旁边标一个小字
        const answer = (sid, e) => json(res, { ok: true, sid, pricesAt: prices.updatedAt, tier: isPeakTime(Date.now()) ? 'peak' : 'offPeak', ...totals(stepsOf(e), custom) })
        if (asked) {
          fold(asked).then((e) => answer(asked, e), () => answer(asked, entry(asked)))
          return
        }
        let best = null
        for (const [sid, e] of ledger) if (e.live.length && !subagents.has(sid) && (!best || e.lastAt > best.e.lastAt)) best = { sid, e }
        if (best) answer(best.sid, best.e)
        else json(res, { ok: true, sid: null })
      },
    })
  })
}
