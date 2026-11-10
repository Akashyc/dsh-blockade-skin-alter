// 把 node_modules 里的 gsap.min.js 嵌进 client.js 的 gsap:start / gsap:end 之间。
// client.js 由宿主当字符串加载，不能 import，也没有静态文件可引，只能内嵌。
// 升级：npm i -D gsap@<版本> && npm run vendor
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const file = root + 'client.js'
const min = fs.readFileSync(root + 'node_modules/gsap/dist/gsap.min.js', 'utf8')
  .replace(/\/\/# sourceMappingURL=.*\s*$/, '').trim()
const src = fs.readFileSync(file, 'utf8')
const eol = src.includes('\r\n') ? '\r\n' : '\n'
const re = /(\/\* gsap:start \*\/)[\s\S]*?([ \t]*\/\* gsap:end \*\/)/
if (!re.test(src)) throw new Error('client.js 里找不到 gsap:start / gsap:end 标记')
// 给它一个局部的 exports，UMD 就走 CommonJS 分支；但 GSAP 核心在浏览器里仍会往 window 上写
// gsap、TweenLite 等全局，加载完按原样还回去，不和宿主或别的插件抢
const block = [
  '    const gsap = (() => {',
  "      const names = ['gsap', 'gsapVersions', 'TweenLite', 'TweenMax', 'TimelineLite', 'TimelineMax'];",
  '      const before = names.map((k) => [k, Object.getOwnPropertyDescriptor(window, k)]);',
  '      const exports = {};',
  '      const module = { exports };',
  min.replace(/\r?\n/g, eol),
  ';',
  '      before.forEach(([k, d]) => { if (d) Object.defineProperty(window, k, d); else delete window[k]; });',
  '      return exports.gsap;',
  '    })();',
].join(eol)
fs.writeFileSync(file, src.replace(re, (_, a, b) => a + eol + block + eol + b))
console.log('gsap vendored:', min.match(/GSAP (\S+)/)[1])
