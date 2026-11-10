#!/usr/bin/env node
/**
 * 抓 DeepSeek 官方中文定价页和峰谷时钟，生成 data/prices.json。由 .github/workflows/prices.yml 每天跑一次，
 * 价格、时段或节假日变了才改文件。解析方法照 Nwflower/dsh-claude-style 的 scripts/data/fetch-prices.mjs（MIT），
 * 只留人民币表。任何一项解析不出来就报错退出，不写坏文件。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { validatePrices } from '../index.js'

const TARGET = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data', 'prices.json')
const PRICING_URL = 'https://api-docs.deepseek.com/zh-cn/quick_start/pricing/'
// 峰谷时段和中国法定节假日（含次年安排）由这份时钟维护，dsh-claude-style 用的同一个来源
const CLOCK_URL = 'https://offpeakclock.com/pricing.json'
// 渠道里常见的别名，按官方同款计价
const ALIASES = {
  'deepseek-v4-flash': 'deepseek-flash',
  'deepseek-v4-flash-vision-exp': 'deepseek-flash',
  'deepseek-v4.1-flash': 'deepseek-flash',
  'deepseek-chat': 'deepseek-flash',
  'deepseek-reasoner': 'deepseek-flash',
}
const MODEL_ID = /deepseek-[a-z0-9_.-]+/i

async function load(url, accept) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000), headers: { accept, 'user-agent': 'dsh-blockade-skin-alter price snapshot' } })
  if (!res.ok) throw new Error(`${url} 返回 ${res.status}`)
  return res.text()
}

const decode = (t) => t.replace(/&(nbsp|lt|gt|quot|#39|mdash|amp);/g, (_, e) => ({ nbsp: ' ', lt: '<', gt: '>', quot: '"', '#39': "'", mdash: '—', amp: '&' })[e])
const stripTags = (html) => decode(String(html).replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()

function tables(html) {
  return (String(html).match(/<table[\s\S]*?<\/table>/gi) ?? []).map((block) =>
    (block.match(/<tr[\s\S]*?<\/tr>/gi) ?? [])
      .map((tr) => (tr.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/gi) ?? []).map((c) => stripTags(c.replace(/^<t[dh][^>]*>/, '').replace(/<\/t[dh]>$/, ''))))
      .filter((cells) => cells.length))
}

const yuan = (cell) => {
  const m = /([0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?)\s*元/.exec(cell)
  return m ? Number(m[1].replace(/,/g, '')) : null
}

function metricOf(text) {
  if (text.includes('缓存未命中')) return 'cacheMiss'
  if (text.includes('缓存命中')) return 'cacheHit'
  if (text.includes('输出') && (text.includes('百万') || text.toUpperCase().includes('TOKEN'))) return 'output'
  return null
}

const tierOf = (cell) => (cell.trim() === '高峰时段' ? 'peak' : cell.trim() === '空闲时段' ? 'offPeak' : null)

/** 定价页里的价格表 → { 模型 id: { offPeak: {cacheHit, cacheMiss, output}, peak: {...} } } */
export function parsePricingPage(html) {
  const found = {}
  for (const rows of tables(html)) {
    let ids = []
    let metric = null
    for (const row of rows) {
      const first = (row[0] ?? '').trim()
      if (first === '模型') {
        const named = row.slice(1).map((c) => (MODEL_ID.exec(c) ?? [])[0]).filter(Boolean)
        if (named.length) ids = named.map((id) => id.toLowerCase())
        continue
      }
      metric = metricOf(row.join(' ')) ?? metric
      if (!ids.length || !metric) continue
      const at = row.findIndex((c) => tierOf(c) !== null)
      if (at < 0) continue
      const prices = row.slice(at + 1, at + 1 + ids.length).map(yuan)
      if (prices.some((p) => p === null)) continue
      ids.forEach((id, i) => {
        found[id] ??= { offPeak: {}, peak: {} }
        found[id][tierOf(row[at])][metric] = prices[i]
      })
    }
  }
  if (!Object.keys(found).length) throw new Error('定价页里没解析出价格')
  return found
}

/** 峰谷时钟里 DeepSeek 那一项的时段和节假日。 */
export function scheduleFromClock(doc) {
  const s = (doc.profiles ?? []).find((p) => p && p.id === 'deepseek-v4')?.schedule
  if (!s) throw new Error('峰谷时钟里没有 DeepSeek')
  return {
    timeZone: s.timeZone,
    peakDays: [...new Set(s.peakDays ?? [])].sort(),
    peakWindows: (s.peakWindows ?? []).map((w) => ({ start: w.start, end: w.end })),
    holidays: [...new Set((s.publicHolidayDates ?? []).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)))].sort(),
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const models = parsePricingPage(await load(PRICING_URL, 'text/html'))
  const schedule = scheduleFromClock(JSON.parse(await load(CLOCK_URL, 'application/json')))
  const now = new Date()
  const doc = { schemaVersion: 1, updatedAt: now.toISOString().slice(0, 10), source: { pricing: PRICING_URL, clock: CLOCK_URL }, schedule, models, aliases: ALIASES }
  validatePrices(doc) // 不对就抛错，工作流失败，仓库里的旧文件不动

  // 只有时间戳变了不算变化，免得每天一个提交
  const facts = ({ updatedAt, ...rest }) => JSON.stringify(rest)
  if (fs.existsSync(TARGET) && facts(JSON.parse(fs.readFileSync(TARGET, 'utf8'))) === facts(doc)) {
    console.log(`价格没变（${Object.keys(models).length} 个模型）`)
  } else {
    fs.mkdirSync(path.dirname(TARGET), { recursive: true })
    fs.writeFileSync(TARGET, JSON.stringify(doc, null, 2) + '\n', 'utf8')
    console.log(`已写入 data/prices.json：${Object.keys(models).join('、')}，${schedule.holidays.length} 个节假日`)
  }
}
