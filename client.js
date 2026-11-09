window.__ModuleLoader__.load({
  id: '@local/dsh-blockade-skin-alter',
  factory(require) {
    const SOURCE = '@local/dsh-blockade-skin-alter';
    // React is provided by the browser module table; without this require the
    // whole module throws during evaluation and nothing (not even the CSS) loads.
    const React = require('react');
    let ReactDOM = null;
    try {
      ReactDOM = require('react-dom');
    } catch (error) {
      ReactDOM = null;
    }

    // ── 主题色 ───────────────────────────────────────────────────────────────
    // 用户只配一个颜色 A，其余由它推算（与灵魂狭间 packages/ui/web/theme/accent.js 同一套规则，
    // 这里是独立主题包，不能 import，只好抄一份）。默认深海蓝，与灵魂狭间统一。
    const DEFAULT_ACCENT = '#4C6AFC';
    const PRESETS = [
      ['深海蓝', '#4C6AFC'],
      ['封锁橙', '#FF7A1A'],
      ['信号青', '#2EC4B6'],
      ['星云紫', '#8B5CF6'],
      ['樱粉', '#F05A8C'],
      ['皇冠金', '#E3B341'],
      ['极光绿', '#3DBA7E'],
    ];
    // 面板底色：宿主 bg-layer-1 叠在桌面上的近似值，对比度对着它算
    const SURFACE = { light: '#F2F3F6', dark: '#1B1C20' };
    const ON_DARK = '#14161A';

    const isHex = (s) => typeof s === 'string' && /^#[0-9a-f]{6}$/i.test(s);
    const hexToRgb = (hex) => {
      const n = parseInt(hex.slice(1), 16);
      return [n >> 16, (n >> 8) & 255, n & 255];
    };
    const rgbToHex = (rgb) => '#' + rgb.map((c) => Math.round(Math.min(255, Math.max(0, c))).toString(16).padStart(2, '0')).join('').toUpperCase();
    const toLin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const toSrgb = (c) => 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
    const luminance = (hex) => {
      const [r, g, b] = hexToRgb(hex).map(toLin);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (a, b) => {
      const x = luminance(a);
      const y = luminance(b);
      return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    function toOklch(hex) {
      const [r, g, b] = hexToRgb(hex).map(toLin);
      const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
      const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
      const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
      const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
      const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
      const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
      return [L, Math.hypot(A, B), Math.atan2(B, A)];
    }
    function oklchToRgb(L, C, H) {
      const A = C * Math.cos(H);
      const B = C * Math.sin(H);
      const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
      const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
      const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
      return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
    }
    // 超出 sRGB 时降彩度，保住色相和明度
    function fromOklch(L, C, H) {
      let c = C;
      for (let i = 0; i < 40; i++, c *= 0.92) {
        const lin = oklchToRgb(L, c, H);
        if (lin.every((v) => v >= -1e-4 && v <= 1 + 1e-4)) return rgbToHex(lin.map((v) => toSrgb(Math.min(1, Math.max(0, v)))));
      }
      return rgbToHex(oklchToRgb(L, 0, H).map((v) => toSrgb(Math.min(1, Math.max(0, v)))));
    }
    // 底色上的主题色文字：保持色相与彩度，调明度到对比度 ≥ 4.5:1
    function accentText(hex, mode) {
      const [L0, C, H] = toOklch(hex);
      const dir = mode === 'dark' ? 1 : -1;
      let L = mode === 'dark' ? Math.max(L0, 0.78) : Math.min(L0, 0.45);
      let out = fromOklch(L, C, H);
      while (contrast(out, SURFACE[mode]) < 4.5 && L > 0 && L < 1) {
        L += dir * 0.01;
        out = fromOklch(L, C, H);
      }
      return out;
    }
    const onAccent = (hex) => (contrast(hex, '#FFFFFF') >= contrast(hex, ON_DARK) ? '#FFFFFF' : ON_DARK);
    // 色盘用的 HSV（h 0–360，s、v 0–1）
    function rgbToHsv([r, g, b]) {
      const max = Math.max(r, g, b);
      const d = max - Math.min(r, g, b);
      const hh = d === 0 ? 0 : max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      return [(hh * 60 + 360) % 360, max ? d / max : 0, max / 255];
    }
    function hsvToRgb([hh, s, v]) {
      const f = (n) => {
        const k = (n + hh / 60) % 6;
        return 255 * v * (1 - s * Math.max(0, Math.min(k, 4 - k, 1)));
      };
      return [f(5), f(3), f(1)];
    }
    const accentOf = (config) => (isHex(config && config.accent) ? config.accent.toUpperCase() : DEFAULT_ACCENT);

    // ── Layer 1: the 14 official alias tokens ────────────────────────────────
    // These are the documented third-party override surface: the theme service
    // folds them over the active light/dark palette, so this layer keeps
    // working through theme switches without any CSS. 品牌色随主题色变，换色时重新覆盖一次。
    const tokens = (accent) => ({
      '--dsw-alias-bg-base': { light: 'rgba(223, 225, 229, 0)', dark: 'rgba(13, 14, 16, 0)' },
      '--dsw-alias-bg-layer-1': { light: 'rgba(255, 255, 255, 0.58)', dark: 'rgba(27, 28, 32, 0.52)' },
      '--dsw-alias-bg-layer-2': { light: 'rgba(242, 243, 246, 0.52)', dark: 'rgba(35, 37, 42, 0.46)' },
      '--dsw-alias-bg-overlay': { light: 'rgba(255, 255, 255, 0.93)', dark: 'rgba(22, 23, 27, 0.90)' },
      '--dsw-alias-border-l1': { light: 'rgba(20, 22, 26, 0.10)', dark: 'rgba(255, 255, 255, 0.07)' },
      '--dsw-alias-border-l2': { light: 'rgba(20, 22, 26, 0.17)', dark: 'rgba(255, 255, 255, 0.13)' },
      '--dsw-alias-brand-primary': { light: accentText(accent, 'light'), dark: accent },
      '--dsw-alias-label-primary': { light: '#14181b', dark: '#f2f4f7' },
      '--dsw-alias-label-secondary': { light: '#565c66', dark: '#b9bfc7' },
      '--dsw-alias-state-error-primary': { light: '#c42a00', dark: '#ff3000' },
      '--dsw-alias-state-success-primary': { light: '#4e7a1e', dark: '#7dbb42' },
      '--dsw-alias-state-warn-primary': { light: '#a4690f', dark: '#e0a23a' },
      '--dsw-alias-state-idle-primary': { light: '#868b94', dark: '#7d838c' },
      '--dsw-specific-sidebar-fill': { light: 'rgba(240, 241, 244, 0.50)', dark: 'rgba(17, 18, 21, 0.45)' },
    });

    /** 把主题色写成 CSS 变量；样式表里所有原来的橙色都引用它们。 */
    function paintAccent(accent) {
      const root = document.documentElement.style;
      root.setProperty('--ba-ac', accent);
      root.setProperty('--ba-ac-tx-dark', accentText(accent, 'dark'));
      root.setProperty('--ba-ac-tx-light', accentText(accent, 'light'));
      root.setProperty('--ba-on-ac', onAccent(accent));
    }

    // ── Layer 2: the rest of the material system ─────────────────────────────
    // Everything below is a real host token (alias / specific / elevation /
    // radius); nothing here targets a hashed component class. The light values
    // live on body, the dark values on body[data-ds-dark-theme], which is the
    // attribute the host itself flips.

    const MATERIAL = `

html:root {
  background: transparent !important;
}

html:root body {
  /* Style guide 7.2 — three text layers:
       1. primary glyphs (label-primary, .88 warm white)
       2. shadow layer (.33 black) sitting just behind, for legibility
       3. ghost layer (.11 white) further back, giving the projected 3D feel
     CSS paints shadows in order, so the black layer is listed first (nearest). */
  text-shadow:
    0 1px 1px rgba(0, 0, 0, 0.10),
    0 2px 2px rgba(0, 0, 0, 0.05);
  --dsw-alias-bg-layer-3: rgba(234, 236, 239, 0.48);
  --dsw-alias-border-l3: rgba(20, 22, 26, 0.24);
  --dsw-alias-border-l4: rgba(20, 22, 26, 0.32);

  --dsw-specific-input-major: rgba(255, 255, 255, 0.62);
  --dsw-specific-bubble: rgba(232, 234, 238, 0.56);
  --dsw-specific-bubble-highlight: color-mix(in srgb, var(--ba-ac) 14%, transparent);
  --dsw-specific-menu: rgba(255, 255, 255, 0.93);
  --dsw-specific-tip: rgba(250, 250, 251, 0.97);
  --dsw-specific-selector: rgba(240, 241, 244, 0.80);
  --dsw-specific-sidebar-nav-item-active: color-mix(in srgb, var(--ba-ac) 12%, transparent);
  --dsw-specific-sidebar-nav-item-active-accent: color-mix(in srgb, var(--ba-ac) 20%, transparent);
  --dsw-specific-sidebar-nav-item-hover: rgba(20, 22, 26, 0.05);

  --dsw-alias-interactive-bg-hover: rgba(20, 22, 26, 0.05);
  --dsw-alias-interactive-bg-active: color-mix(in srgb, var(--ba-ac) 14%, transparent);
  --dsw-alias-button-primary-fill: var(--ba-ac);
  --dsw-alias-button-primary-hover: color-mix(in srgb, var(--ba-ac) 85%, #000);
  --dsw-alias-button-primary-dimmed: color-mix(in srgb, var(--ba-ac) 35%, transparent);
  --dsw-alias-button-info-fill: var(--ba-ac);
  --dsw-alias-button-info-hover: color-mix(in srgb, var(--ba-ac) 85%, #000);
  --dsw-alias-label-deep-diving: var(--ba-ac-tx);
  --dsw-alias-label-deep-diving-shimmer: color-mix(in srgb, var(--ba-ac) 45%, transparent);
  --dsw-alias-link: var(--ba-ac-tx);
  --dsw-alias-state-business-primary: var(--ba-ac);
  --dsw-alias-state-business-tertiary: color-mix(in srgb, var(--ba-ac) 12%, transparent);
  --dsw-alias-interactive-bg-hover-accent: color-mix(in srgb, var(--ba-ac) 10%, transparent);
  --hud-selection: color-mix(in srgb, var(--ba-ac) 12%, transparent);
  --hud-main-panel: rgba(255, 255, 255, 0.45);
  --hud-bracket: rgba(20, 22, 26, 0.22);
  --hud-node: rgba(20, 22, 26, 0.38);
  --hud-scrim: radial-gradient(130% 120% at 50% 0%, rgba(255, 255, 255, 0.06), rgba(226, 229, 234, 0.22));
  --hud-stats-fill: rgba(255, 255, 255, 0.68);
  --dsw-focus-ring-color: var(--dsw-alias-brand-primary);

  --dsw-alias-markdown-code-block: rgba(20, 22, 26, 0.04);
  --dsw-alias-markdown-inline-code: rgba(20, 22, 26, 0.06);
  --dsw-alias-menu-group-header-fill: rgba(255, 255, 255, 0.94);
  --dsw-alias-settings-card-fill: rgba(255, 255, 255, 0.26);
  --dsw-alias-settings-card-stroke: rgba(20, 22, 26, 0.14);
  --dsw-alias-scrollbar-bg-l1: rgba(20, 22, 26, 0.18);
  --dsw-alias-scrollbar-bg-l2: rgba(20, 22, 26, 0.28);
  --dsw-alias-scrollbar-hover-l1: rgba(20, 22, 26, 0.32);
  --dsw-alias-scrollbar-hover-l2: rgba(20, 22, 26, 0.42);
  --dsw-alias-toast-bg: rgba(255, 255, 255, 0.97);
  --dsw-alias-toast-label: #12141a;
  --dsw-alias-tooltip-bg: rgba(24, 26, 30, 0.92);
  --dsw-alias-tooltip-key-bg: rgba(255, 255, 255, 0.14);
  --dsw-alias-turn-trigger-bg: rgba(255, 255, 255, 0.72);
  --dsw-alias-turn-trigger-bg-hover: rgba(255, 255, 255, 0.86);

  --dsw-radius-panel: 4px;
  --dsw-radius-xl: 6px;
  --dsw-radius-lg: 6px;
  --dsw-radius-md: 4px;
  --dsw-radius-sm: 3px;
  --dsw-radius-xs: 2px;

  --dsw-elevation-stroke-color: rgba(20, 22, 26, 0.12);
  --dsw-elevation-stroke: 0 0 0 0.5px var(--dsw-elevation-stroke-color);
  --dsw-elevation-panel: inset 0 1px 0 rgba(255, 255, 255, 0.90), inset 0 -1px 0 rgba(15, 18, 24, 0.06), var(--dsw-elevation-stroke), 3px 5px 10px rgba(15, 18, 24, 0.10), 8px 14px 28px rgba(15, 18, 24, 0.12);
  --dsw-elevation-prominent: inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 rgba(15, 18, 24, 0.08), var(--dsw-elevation-stroke), 4px 8px 16px rgba(15, 18, 24, 0.12), 12px 22px 44px rgba(15, 18, 24, 0.16);
  --dsw-elevation-soft: inset 0 1px 0 rgba(255, 255, 255, 0.88), inset 0 -1px 0 rgba(15, 18, 24, 0.05), var(--dsw-elevation-stroke), 3px 5px 10px rgba(15, 18, 24, 0.09), 7px 12px 26px rgba(15, 18, 24, 0.11);
  --dsw-shadow-lv1: 0 1px 2px rgba(10, 12, 16, 0.08);
  --dsw-shadow-lv2: 0 3px 8px rgba(10, 12, 16, 0.12);
  --dsw-shadow-lv3: 0 8px 20px rgba(10, 12, 16, 0.16);
  --dsw-menu-backdrop-filter: blur(14px) saturate(115%);
}

html:root body[data-ds-dark-theme] {
  text-shadow:
    0 1px 1px rgba(0, 0, 0, 0.33),
    0 3px 2px rgba(255, 255, 255, 0.11);
  --dsw-alias-bg-layer-3: rgba(44, 46, 52, 0.42);
  --dsw-alias-label-tertiary: #7c828b;
  --dsw-alias-border-l3: rgba(255, 255, 255, 0.18);
  --dsw-alias-border-l4: rgba(255, 255, 255, 0.24);

  --dsw-specific-input-major: rgba(31, 33, 38, 0.55);
  --dsw-specific-bubble: rgba(42, 44, 50, 0.50);
  --dsw-specific-bubble-highlight: color-mix(in srgb, var(--ba-ac) 20%, transparent);
  --dsw-specific-menu: rgba(20, 21, 25, 0.90);
  --dsw-specific-tip: rgba(28, 29, 34, 0.95);
  --dsw-specific-selector: rgba(47, 49, 55, 0.78);
  --dsw-specific-sidebar-nav-item-active: color-mix(in srgb, var(--ba-ac) 18%, transparent);
  --dsw-specific-sidebar-nav-item-active-accent: color-mix(in srgb, var(--ba-ac) 26%, transparent);
  --dsw-specific-sidebar-nav-item-hover: rgba(255, 255, 255, 0.06);

  --dsw-alias-interactive-bg-hover: rgba(255, 255, 255, 0.06);
  --dsw-alias-interactive-bg-active: color-mix(in srgb, var(--ba-ac) 18%, transparent);
  --dsw-alias-button-primary-fill: var(--ba-ac);
  --dsw-alias-button-primary-hover: color-mix(in srgb, var(--ba-ac) 85%, #fff);
  --dsw-alias-button-primary-dimmed: color-mix(in srgb, var(--ba-ac) 35%, transparent);
  --dsw-alias-button-info-fill: var(--ba-ac);
  --dsw-alias-button-info-hover: color-mix(in srgb, var(--ba-ac) 85%, #fff);
  --dsw-alias-label-deep-diving: var(--ba-ac-tx);
  --dsw-alias-label-deep-diving-shimmer: color-mix(in srgb, var(--ba-ac) 50%, transparent);
  --dsw-alias-link: var(--ba-ac-tx);
  --dsw-alias-state-business-primary: var(--ba-ac);
  --dsw-alias-state-business-tertiary: color-mix(in srgb, var(--ba-ac) 16%, transparent);
  --dsw-alias-interactive-bg-hover-accent: color-mix(in srgb, var(--ba-ac) 16%, transparent);
  --hud-selection: color-mix(in srgb, var(--ba-ac) 16%, transparent);
  --hud-main-panel: rgba(16, 17, 20, 0.50);
  --hud-bracket: rgba(255, 255, 255, 0.18);
  --hud-node: rgba(255, 255, 255, 0.30);
  --hud-scrim: radial-gradient(130% 120% at 50% 0%, rgba(10, 11, 14, 0.12), rgba(5, 6, 8, 0.34));
  --hud-stats-fill: rgba(16, 17, 20, 0.62);
  --dsw-focus-ring-color: var(--dsw-alias-brand-primary);

  --dsw-alias-markdown-code-block: rgba(0, 0, 0, 0.35);
  --dsw-alias-markdown-inline-code: rgba(255, 255, 255, 0.08);
  --dsw-alias-menu-group-header-fill: rgba(24, 25, 29, 0.92);
  --dsw-alias-settings-card-fill: rgba(31, 33, 38, 0.30);
  --dsw-alias-settings-card-stroke: rgba(255, 255, 255, 0.14);
  --dsw-alias-scrollbar-bg-l1: rgba(255, 255, 255, 0.18);
  --dsw-alias-scrollbar-bg-l2: rgba(255, 255, 255, 0.30);
  --dsw-alias-scrollbar-hover-l1: rgba(255, 255, 255, 0.32);
  --dsw-alias-scrollbar-hover-l2: rgba(255, 255, 255, 0.45);
  --dsw-alias-toast-bg: rgba(24, 25, 29, 0.96);
  --dsw-alias-toast-label: #e9ebef;
  --dsw-alias-tooltip-bg: rgba(38, 40, 46, 0.96);
  --dsw-alias-tooltip-key-bg: rgba(255, 255, 255, 0.12);
  --dsw-alias-turn-trigger-bg: rgba(28, 29, 34, 0.72);
  --dsw-alias-turn-trigger-bg-hover: rgba(34, 36, 41, 0.82);

  --dsw-elevation-stroke-color: rgba(255, 255, 255, 0.10);
  --dsw-elevation-panel: inset 0 1px 0 rgba(255, 255, 255, 0.10), inset 0 -1px 0 rgba(0, 0, 0, 0.55), var(--dsw-elevation-stroke), 3px 6px 12px rgba(0, 0, 0, 0.40), 10px 20px 40px rgba(0, 0, 0, 0.45);
  --dsw-elevation-prominent: inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.60), var(--dsw-elevation-stroke), 4px 9px 18px rgba(0, 0, 0, 0.45), 14px 26px 52px rgba(0, 0, 0, 0.50);
  --dsw-elevation-soft: inset 0 1px 0 rgba(255, 255, 255, 0.09), inset 0 -1px 0 rgba(0, 0, 0, 0.50), var(--dsw-elevation-stroke), 3px 5px 10px rgba(0, 0, 0, 0.36), 8px 16px 34px rgba(0, 0, 0, 0.40);
  --dsw-shadow-lv1: 0 1px 2px rgba(0, 0, 0, 0.35);
  --dsw-shadow-lv2: 0 3px 8px rgba(0, 0, 0, 0.42);
  --dsw-shadow-lv3: 0 8px 20px rgba(0, 0, 0, 0.50);
}

/* ── HUD detailing (P2) ────────────────────────────────────────────────────
   Only the composer card carries corner ticks: it is reached through the
   stable [data-slot] wrapper plus a substring match on the host's card class,
   so a rename simply removes the ticks instead of breaking the panel. Ticks
   stay gray at rest and turn crisis-orange while a turn is running, which is
   the host's own [data-phase=active] state - no simulated status. */
[data-slot="conversation.composer"] [class*="_card"] {
  position: relative;
  transform: perspective(1200px) rotateY(-3.5deg) rotateX(0.8deg);
  transform-origin: 50% 50%;
  /* Frosted plate: light gradient + real backdrop blur, the material the
     reference menus use for their panels. */
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    inset 0 -1px 0 rgba(0, 0, 0, 0.35),
    0 0 0 0.5px rgba(255, 255, 255, 0.12),
    4px 10px 26px rgba(0, 0, 0, 0.40);
}

[data-slot="conversation.composer"] [class*="_card"]::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(var(--dsw-alias-border-l3), var(--dsw-alias-border-l3)) 0 0 / 18px 1px no-repeat,
    linear-gradient(var(--dsw-alias-border-l3), var(--dsw-alias-border-l3)) 0 0 / 1px 18px no-repeat,
    linear-gradient(var(--dsw-alias-border-l3), var(--dsw-alias-border-l3)) 100% 100% / 18px 1px no-repeat,
    linear-gradient(var(--dsw-alias-border-l3), var(--dsw-alias-border-l3)) 100% 100% / 1px 18px no-repeat;
}

[data-phase="active"] [data-slot="conversation.composer"] [class*="_card"]::after,
[data-slot="conversation.composer"] [class*="_card"]:focus-within::after {
  background:
    linear-gradient(var(--dsw-alias-brand-primary), var(--dsw-alias-brand-primary)) 0 0 / 12px 1px no-repeat,
    linear-gradient(var(--dsw-alias-brand-primary), var(--dsw-alias-brand-primary)) 0 0 / 1px 12px no-repeat,
    linear-gradient(var(--dsw-alias-brand-primary), var(--dsw-alias-brand-primary)) 100% 100% / 12px 1px no-repeat,
    linear-gradient(var(--dsw-alias-brand-primary), var(--dsw-alias-brand-primary)) 100% 100% / 1px 12px no-repeat;
}

/* 聚焦时把输入卡的发丝边也点亮，橙只出现在"你正在操作/正在执行"的地方 */
[data-slot="conversation.composer"] [class*="_card"]:focus-within {
  --dsw-elevation-stroke-color: var(--dsw-alias-brand-primary);
}

/* 当前会话行与当前面板项：左侧 2px 橙条，语义属性驱动，不依赖构建类名 */
/* Session rows become solid bars, like the reference's left menu. */
html:root body [role="treeitem"][aria-selected] {
  min-height: 32px;
  margin: 2px 6px;
  padding: 0 10px;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.05);
}

html:root body [role="treeitem"][aria-selected]:hover {
  background: rgba(255, 255, 255, 0.13);
}

/* Selected: only the floating bar marks it — the row itself stays neutral. */
html:root body [role="treeitem"][aria-selected="true"] {
  background: rgba(255, 255, 255, 0.10);
  color: var(--dsw-alias-label-primary);
  box-shadow: none;
}

[aria-current="page"],
[aria-current="true"] {
  /* Selection is marked by the floating bar only; the old left-edge stripe
     duplicated it on these rows. */
  background-color: var(--hud-selection);
  box-shadow: none;
}

/* ── Floating shell: panels detach from the window edge ────────────────────
   The frame is matched through :has() on the shell overlay seat, and the
   columns through the host's own class suffixes. Both degrade to "no float"
   if the structure changes; neither can break the grid itself. */
/* The sidebar resize strip is an 8px transparent hot zone sitting inside the
   seam; removing it keeps the seam clean. Sidebar collapse still works from
   the rail button. */
div:has(> [data-shell-overlay]) > [class*="_handle"] {
  display: none;
}

div:has(> [data-shell-overlay]) {
  /* height:100% + padding needs border-box, otherwise the frame grows past the
     viewport and the bottom inset is clipped away, leaving a top-only seam. */
  box-sizing: border-box;
  /* Sidebar open/close: the frame animates the grid columns, so the easing and
     duration here decide how the left panel moves. */
  /* Shorter than before: a layout-driven animation needs fewer frames to stay
     smooth, and the eye reads 190ms as snappier anyway. */
  transition: grid-template-columns 190ms cubic-bezier(0.3, 0.85, 0.25, 1);
  /* Column gap only: the frame is a two-row grid (main row + shell.bottom
     strip), and a row gap would stack on top of the padding, making the
     bottom seam twice as thick as the top one. */
  column-gap: 8px;
  row-gap: 0;
  padding: 8px;
  background: transparent !important;
}

html:root body [class*="_sidebarCol"] {
  /* Turned inward from its outer edge, mirroring the right dock. */
  transform: perspective(1000px) rotateY(7deg) rotateX(0deg);
  transform-origin: 0% 50%;
  border-right: 0 !important;
  border-radius: 4px;
  background: var(--dsw-specific-sidebar-fill) !important;
  box-shadow: var(--dsw-elevation-panel);
}

/* Right dock mirrors the left one, drawn entirely with paint properties:
   background layers for the corner ticks, plus fill, radius, shadow and tilt.
   No pseudo-elements (the host used one for its slide animation), no width or
   overflow changes (both broke the dock earlier). */
html:root body [class*="_rightbarCol"] {
  border-radius: 4px;
  background-color: var(--dsw-specific-sidebar-fill);
  background-image:
    linear-gradient(var(--hud-bracket), var(--hud-bracket)),
    linear-gradient(var(--hud-bracket), var(--hud-bracket)),
    linear-gradient(var(--hud-bracket), var(--hud-bracket)),
    linear-gradient(var(--hud-bracket), var(--hud-bracket)),
    linear-gradient(var(--hud-bracket), var(--hud-bracket)),
    linear-gradient(var(--hud-bracket), var(--hud-bracket)),
    linear-gradient(var(--hud-bracket), var(--hud-bracket)),
    linear-gradient(var(--hud-bracket), var(--hud-bracket));
  background-size:
    18px 1px, 1px 18px, 18px 1px, 1px 18px,
    18px 1px, 1px 18px, 18px 1px, 1px 18px;
  background-position:
    6px 6px, 6px 6px,
    calc(100% - 6px) 6px, calc(100% - 6px) 6px,
    6px calc(100% - 6px), 6px calc(100% - 6px),
    calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) calc(100% - 6px);
  background-repeat: no-repeat;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 6px 16px rgba(0, 0, 0, 0.32);
  transform: perspective(1000px) rotateY(-7deg);
  transform-origin: 100% 50%;
}

/* Right dock, docked: the light sheet shared with the sidebar.
   Expanded: one dark readable plate. */
html:root body [data-sidebar-right-panel] > div,
html:root body [data-sidebar-right-panel] > div > div {
  background: transparent !important;
  background-image: none !important;
  box-shadow: none !important;
  border: 0 !important;
  border-radius: 0 !important;
}

html:root body[data-hud-dock-expanded] [data-sidebar-right-panel],
html:root body[data-hud-dock-expanded] [class*="_rightbarCol"] {
  background: rgba(15, 16, 19, 0.90) !important;
  background-image: none !important;
  backdrop-filter: blur(8px) saturate(108%);
  -webkit-backdrop-filter: blur(8px) saturate(108%);
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.35) !important;
  border: 0 !important;
  border-radius: 0 !important;
  /* Drop the docked tilt: perspective shrinks the panel and it stops reading
     as a full-bleed surface. */
  transform: none !important;
}

/* The readout cluster belongs to the sidebar column, so it steps aside while
   the dock takes the whole window. */
html:root body[data-hud-dock-expanded] .dsh-hud-stats {
  /* Covered, not faded: the cluster is simply not painted while the dock owns
     the window. */
  visibility: hidden;
  pointer-events: none;
}

/* Model chip: one bar for the whole trigger, never for the inner chips inside
   it. The outer trigger carries aria-expanded, so the bar stays lit while its
   menu is open. */
html:root body [data-slot="conversation.composer"] button[class*="_trigger"][aria-haspopup="menu"] {
  position: relative;
}

html:root body [data-slot="conversation.composer"] button[class*="_trigger"][aria-haspopup="menu"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 120ms ease;
}

html:root body [data-slot="conversation.composer"] button[class*="_trigger"][aria-haspopup="menu"]:hover::after,
html:root body [data-slot="conversation.composer"] button[class*="_trigger"][aria-haspopup="menu"][aria-expanded="true"]::after {
  opacity: 1;
}

/* Tabs: the active underline draws itself from the centre when you switch,
   the way the reference menus move their accent. */
@keyframes hud-tab-underline {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

html:root body [data-slot="conversation.tabs"] [role="tab"],
html:root body [data-slot="conversation.tabs"] button {
  position: relative;
}

html:root body [data-slot="conversation.tabs"] [role="tab"][aria-selected="true"]::after,
html:root body [data-slot="conversation.tabs"] button[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 6px;
  right: 6px;
  bottom: -1px;
  height: 2px;
  background: var(--dsw-alias-brand-primary);
  transform-origin: center;
  animation: hud-tab-underline 160ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  html:root body [data-slot="conversation.tabs"] [role="tab"][aria-selected="true"]::after,
  html:root body [data-slot="conversation.tabs"] button[aria-selected="true"]::after {
    animation: none;
  }
}

/* Launch screen option cards: the reference slots are a cell plus an inset
   plate. Same idea here: faint outer cell, slightly brighter plate inside. */
html:root body [class*="_heroOptions"] > * {
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 2px;
  box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.05);
}

html:root body [class*="_heroOptions"] > *::before {
  content: "";
  position: absolute;
  inset: 3px;
  border-radius: 1px;
  background: rgba(255, 255, 255, 0.075);
  pointer-events: none;
  z-index: 0;
}

html:root body [class*="_heroOptions"] > * > * {
  position: relative;
  z-index: 1;
}

/* Panel-level motion: dialogs and dock content fade in when they mount, which
   is exactly when a panel is "switched to". One-shot, short, no layout change. */
@media (prefers-reduced-motion: no-preference) {
  @keyframes hud-panel-appear {
    from { opacity: 0; scale: 0.985; }
    to { opacity: 1; scale: 1; }
  }

  @keyframes hud-content-appear {
    from { opacity: 0; transform: translateX(14px); }
    to { opacity: 1; transform: translateX(0); }
  }

  html:root body [class*="_overlay"]:has([class*="_navList"]) > [class*="_panel"] {
    animation: hud-panel-appear 200ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
  }

  html:root body [data-sidebar-right-panel] > div > div {
    animation: hud-content-appear 200ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
  }
}

@media (prefers-reduced-motion: reduce) {
  html:root body [class*="_overlay"]:has([class*="_navList"]) > [class*="_panel"],
  html:root body [data-sidebar-right-panel] > div > div {
    animation: none;
  }
}

/* Entering fullscreen: the sheet slides in from the right and settles. The
   translate property is animated (not transform) so the "no tilt" rule keeps
   winning on the same element. */
@media (prefers-reduced-motion: no-preference) {
  @keyframes hud-dock-fullscreen-in {
    from { opacity: 0.82; translate: 18px 0; }
    to { opacity: 1; translate: 0 0; }
  }

  html:root body[data-hud-dock-expanded] [data-sidebar-right-panel],
  html:root body[data-hud-dock-expanded] [class*="_rightbarCol"] {
    animation: hud-dock-fullscreen-in 260ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
  }
}

@media (prefers-reduced-motion: reduce) {
  html:root body[data-hud-dock-expanded] [data-sidebar-right-panel],
  html:root body[data-hud-dock-expanded] [class*="_rightbarCol"] {
    animation: none;
  }
}

/* Hover on an icon: the reference slots lift the glyph a hair and brighten it,
   while the cell behind it does the colour change. Small and quick. */
html:root body :is(
  [class*="_panelRow"],
  [role="treeitem"][aria-selected],
  [class*="_heroOptions"] > *,
  .dsh-hud-stats__row,
  [class*="_footArea"] button
) svg {
  transition: transform 150ms cubic-bezier(0.22, 0.88, 0.24, 1), color 150ms ease;
}

html:root body :is(
  [class*="_panelRow"],
  [role="treeitem"][aria-selected],
  [class*="_heroOptions"] > *,
  .dsh-hud-stats__row,
  [class*="_footArea"] button
):hover svg {
  transform: scale(1.06);
  color: var(--dsw-alias-label-primary);
}

@media (prefers-reduced-motion: reduce) {
  html:root body [class*="_panelRow"]:hover svg,
  html:root body [role="treeitem"][aria-selected]:hover svg,
  html:root body [class*="_heroOptions"] > *:hover svg,
  html:root body .dsh-hud-stats__row:hover svg,
  html:root body [class*="_footArea"] button:hover svg {
    transform: none;
  }
}

/* Hover on anything that carries the orange bar: text turns white and the block
   lifts a hair, animated. Selection is marked by the bar drawing itself. */
html:root body :is(
  [role="treeitem"][aria-selected],
  [class*="_navCell"],
  [role="menuitem"],
  [role="option"],
  [class*="_panelRow"],
  [data-dockkit-tab],
  [class*="_heroOptions"] > *,
  .dsh-hud-settings__row,
  .dsh-hud-settings__btn,
  .dsh-hud-settings__reset,
  [class*="_footArea"] button,
  [data-hud-new-session],
  [class*="_overlay"]:has([class*="_navList"]) :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
) {
  transition: color 150ms ease, background-color 150ms ease;
}

html:root body :is(
  [role="treeitem"][aria-selected],
  [class*="_navCell"],
  [role="menuitem"],
  [role="option"],
  [class*="_panelRow"],
  [data-dockkit-tab],
  [class*="_heroOptions"] > *,
  .dsh-hud-settings__row,
  .dsh-hud-settings__btn,
  .dsh-hud-settings__reset,
  [class*="_footArea"] button,
  [data-hud-new-session],
  [class*="_overlay"]:has([class*="_navList"]) :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
) {
  transform-origin: left center;
  transition: color 150ms ease, transform 150ms cubic-bezier(0.22, 0.88, 0.24, 1), background-color 150ms ease;
}


html:root body :is(
  [role="treeitem"][aria-selected],
  [class*="_navCell"],
  [role="menuitem"],
  [role="option"],
  [class*="_panelRow"],
  [data-dockkit-tab],
  [class*="_heroOptions"] > *,
  .dsh-hud-settings__row,
  .dsh-hud-settings__btn,
  .dsh-hud-settings__reset,
  [class*="_footArea"] button,
  [data-hud-new-session],
  [class*="_overlay"]:has([class*="_navList"]) :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
):hover {
  color: var(--dsw-alias-label-primary);
}

html:root body :is(
  [role="treeitem"][aria-selected],
  [class*="_navCell"],
  [role="menuitem"],
  [role="option"],
  [class*="_panelRow"],
  [data-dockkit-tab],
  [class*="_heroOptions"] > *,
  .dsh-hud-settings__row,
  .dsh-hud-settings__btn,
  .dsh-hud-settings__reset,
  [class*="_footArea"] button,
  [data-hud-new-session],
  [class*="_overlay"]:has([class*="_navList"]) :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
):hover {
  transform: scale(1.015);
}

/* Popover menu rows: the row itself never moves (that made the hover state
   flicker between neighbouring rows), but its contents grow instead. */
html:root body [role="menuitem"]:hover,
html:root body [role="option"]:hover,
html:root body [role="menuitem"]:active,
html:root body [role="option"]:active {
  transform: none !important;
}

html:root body [role="menuitem"] > *,
html:root body [role="option"] > * {
  transform-origin: left center;
  transition: transform 150ms cubic-bezier(0.22, 0.88, 0.24, 1);
}

html:root body [role="menuitem"]:hover > *,
html:root body [role="option"]:hover > * {
  transform: scale(1.03);
}

@media (prefers-reduced-motion: reduce) {
  html:root body [role="menuitem"]:hover > *,
  html:root body [role="option"]:hover > * {
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  html:root body :is(
    [role="treeitem"][aria-selected],
    [class*="_navCell"],
    [role="menuitem"],
    [role="option"],
    [class*="_panelRow"],
    [data-dockkit-tab],
    [class*="_heroOptions"] > *,
    [class*="_footArea"] button
  ):hover {
    transform: none;
  }
}

/* One rule for every bar animation, so no surface is left without it. */
html:root body [role="treeitem"][aria-selected]:hover::after,
html:root body [class*="_navCell"]:hover::after,
html:root body [role="menuitem"]:hover::after,
html:root body [role="option"]:hover::after,
html:root body [data-dockkit-tab]:hover::after,
html:root body [class*="_panelRow"]:hover::after,
html:root body [class*="_footArea"] button:hover::after,
html:root body [data-hud-new-session]:hover::after,
html:root body .dsh-hud-settings__row:hover::after {
  transform-origin: left center;
  /* Hover is a real state change, so this animation always replays: the bar
     draws itself from the left each time the pointer enters a row. */
  animation: hud-bar-draw 200ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  html:root body [role="treeitem"][aria-selected]:hover::after,
  html:root body [role="treeitem"][aria-selected="true"]::after,
  html:root body [class*="_navCell"]:hover::after,
  html:root body [class*="_navCell"][class*="active"]::after,
  html:root body [role="menuitem"]:hover::after,
  html:root body [role="option"]:hover::after,
  html:root body [data-dockkit-tab]:hover::after,
  html:root body [data-dockkit-tab][aria-selected="true"]::after,
  html:root body [aria-current="true"]::after,
  html:root body [class*="_panelRow"]:hover::after,
  html:root body [class*="_panelRow"][class*="active"]::after,
  html:root body [class*="_footArea"] button:hover::after,
  html:root body .dsh-hud-settings__row:hover::after {
    animation: none;
  }
}

/* Press feedback: the block sinks a hair while the pointer is down, so a click
   feels like it lands before the selection bar draws itself. */
html:root body :is(
  [role="treeitem"][aria-selected],
  [class*="_navCell"],
  [role="menuitem"],
  [role="option"],
  [class*="_panelRow"],
  [data-dockkit-tab],
  [class*="_heroOptions"] > *,
  .dsh-hud-settings__row,
  .dsh-hud-settings__btn,
  .dsh-hud-settings__reset,
  [class*="_footArea"] button,
  [data-hud-new-session],
  [class*="_overlay"]:has([class*="_navList"]) :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
):active {
  transform: scale(0.995);
  transition-duration: 90ms;
}

@media (prefers-reduced-motion: reduce) {
  html:root body :is(
    [role="treeitem"][aria-selected],
    [class*="_navCell"],
    [role="menuitem"],
    [role="option"],
    [class*="_panelRow"],
    [data-dockkit-tab]
  ):active {
    transform: none;
  }
}

/* Light edge while a side panel moves. It lives on a pseudo-element so the
   glow can fade in and out smoothly instead of the shadow snapping. */
html:root body [class*="_sidebarCol"],
html:root body [class*="_rightbarCol"] {
  position: relative;
}

html:root body [class*="_sidebarCol"]::after,
html:root body [class*="_rightbarCol"]::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms ease;
}

html:root body [class*="_sidebarCol"]::after {
  right: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.55));
  box-shadow: 0 0 26px color-mix(in srgb, var(--ba-ac) 30%, transparent);
}

html:root body [class*="_rightbarCol"]::after {
  left: 0;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.55));
  box-shadow: 0 0 26px color-mix(in srgb, var(--ba-ac) 30%, transparent);
}

html:root body[data-hud-left-moving] [class*="_sidebarCol"]::after,
html:root body[data-hud-right-moving] [class*="_rightbarCol"]::after {
  opacity: 1;
}

/* Going full-bleed is not a resize: no travelling light edge there. */
html:root body[data-hud-dock-expanded] [class*="_rightbarCol"]::after {
  opacity: 0 !important;
  box-shadow: none;
}

/* Popover menus (the account menu and friends): no scroll rail. The list is
   short, and the rail was showing up over the three rows. */
html:root body [role="menu"],
html:root body [role="listbox"],
html:root body [class*="_popover"] {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html:root body [role="menu"]::-webkit-scrollbar,
html:root body [role="listbox"]::-webkit-scrollbar,
html:root body [class*="_popover"]::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

/* The account button anchors a popover: scaling it moves the menu under the
   cursor and the hover state oscillates. Colour and bar only. */
html:root body [class*="_footArea"] button:hover,
html:root body [class*="_footArea"] button:active {
  transform: none;
}

/* Turn separation: each user turn opens with a hairline and a small tick, and
   the message itself carries a thin accent edge so the two voices differ at a
   glance. */
html:root body [data-chat-flow-kind="user"] {
  position: relative;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 0.5px solid var(--dsw-alias-border-l1);
}

html:root body [data-chat-flow-kind="user"]::before {
  content: "";
  position: absolute;
  left: 0;
  top: -3px;
  width: 6px;
  height: 6px;
  background: var(--dsw-alias-brand-primary);
}

/* Code blocks: a terminal-ish plate — darker than the page, hairline frame and
   a lit top edge. */
html:root body [data-chat-flow-kind] pre {
  background: rgba(6, 7, 9, 0.72);
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-top: 1.5px solid color-mix(in srgb, var(--ba-ac) 45%, transparent);
  border-radius: 2px;
  padding: 12px 14px;
  overflow: auto;
}

html:root body [data-chat-flow-kind] pre code {
  font-size: 12.5px;
  line-height: 1.55;
}

html:root body [data-chat-flow-kind] :not(pre) > code {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  padding: 0.1em 0.35em;
}

/* Streaming: a light runs along the top edge while the answer is still being
   written. One loop, tied to real activity only. */
@keyframes hud-stream-run {
  from { background-position: -60% 0; }
  to { background-position: 160% 0; }
}

@media (prefers-reduced-motion: no-preference) {
  html:root body [data-streaming] {
    background-image: linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--ba-ac) 65%, transparent) 50%, transparent 100%);
    background-size: 60% 2px;
    background-position: 160% 0;
    background-repeat: no-repeat;
    animation: hud-stream-run 1.8s linear infinite;
  }
}

/* Respect the OS "reduce transparency" preference: blur is the expensive part,
   and a more opaque fill reads better for those users anyway. */
@media (prefers-reduced-transparency: reduce) {
  html:root body [data-slot="conversation.composer"] [class*="_card"],
  html:root body [data-sidebar-right-panel],
  html:root body [data-sidebar-right-panel="fullscreen"],
  html:root body [class*="_overlay"]:has([class*="_navList"]) > [class*="_panel"] {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}

/* Collapsed sidebar: drop the 3D tilt. On a narrow rail the perspective makes
   the visual box and the hit area disagree, which can make the expand control
   unclickable (reported on Windows with display scaling). */
html:root body[data-sidebar-collapsed] [class*="_sidebarCol"],
html:root body [data-sidebar-collapsed] [class*="_sidebarCol"],
html:root body[data-sidebar-state="collapsed"] [class*="_sidebarCol"],
html:root body [data-sidebar-state="collapsed"] [class*="_sidebarCol"] {
  transform: none !important;
  transform-origin: 0% 50%;
}

/* 侧栏展开时的切换按钮：Windows 标题栏模式下 DSH 把它 position: fixed 钉到标题栏左上，
   但展开的侧栏带着倾斜，transform 让侧栏成了 fixed 的定位基准，按钮就落到侧栏左上、压在 logo 上。
   展开时改回普通流，排在 logo 行右端（和 DSH 在非 Windows 上一样）；收起时侧栏不倾斜，照旧钉在标题栏 */
html:root[data-windows-titlebar] body [class*="_root"]:not([class*="_collapsed"]) button[data-sidebar-toggle] {
  position: static;
  flex: none;
}

/* Flow HUD: our own node inside the sidebar column, so it takes part in the
   layout instead of covering the session list. */
/* Two classes beat the single-class base rule on their own, so no !important. */
.dsh-hud-stats.dsh-hud-inline {
  position: relative;
  left: auto;
  bottom: auto;
  width: auto;
  min-width: 0;
  margin: 14px 6px 4px;
  transform: none;
  clip-path: none;
  background: var(--dsw-specific-sidebar-fill);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  box-shadow: none;
}

.dsh-hud-stats__list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

/* While the layout is animating, pause everything that repaints the whole
   window: the contour sweep and the composer's backdrop blur. */
html:root body [data-animating]::after {
  animation-play-state: paused !important;
}

html:root body [data-animating] [data-slot="conversation.composer"] [class*="_card"] {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Settle flash: one short accent ring when a side panel finishes resizing, the
   way the reference menus finish their slide with a lit edge. */
@keyframes hud-settle-ring {
  from { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ba-ac) 26%, transparent), inset 0 0 18px color-mix(in srgb, var(--ba-ac) 10%, transparent); }
  to { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ba-ac) 0%, transparent), inset 0 0 18px color-mix(in srgb, var(--ba-ac) 0%, transparent); }
}

@media (prefers-reduced-motion: no-preference) {
  html:root body[data-hud-left-settled] [class*="_sidebarCol"],
  html:root body[data-hud-right-settled] [class*="_rightbarCol"] {
    animation: hud-settle-ring 240ms ease-out both;
  }
}

/* ── Micro-interactions ──────────────────────────────────────────────────── */
/* Send button: sinks while pressed and emits one ripple. */
@keyframes hud-ripple {
  from { opacity: 0.55; transform: scale(0.25); }
  to { opacity: 0; transform: scale(1.7); }
}

html:root body [data-slot="conversation.composer"] button[class*="_primary"],
html:root body [data-slot="conversation.composer"] button[aria-label*="Send" i] {
  position: relative;
  overflow: hidden;
  transition: transform 90ms ease;
}

html:root body [data-slot="conversation.composer"] button[class*="_primary"]::after,
html:root body [data-slot="conversation.composer"] button[aria-label*="Send" i]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 70%);
}

html:root body [data-slot="conversation.composer"] button[class*="_primary"]:active,
html:root body [data-slot="conversation.composer"] button[aria-label*="Send" i]:active {
  transform: translateY(1px) scale(0.985);
}

@media (prefers-reduced-motion: no-preference) {
  html:root body [data-slot="conversation.composer"] button[class*="_primary"]:active::after,
  html:root body [data-slot="conversation.composer"] button[aria-label*="Send" i]:active::after {
    animation: hud-ripple 260ms ease-out;
  }
}

/* HUD status dot: breathes while a turn runs, double-flashes on error. */
@keyframes hud-node-breathe {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 color-mix(in srgb, var(--ba-ac) 45%, transparent); }
  50% { opacity: 0.55; box-shadow: 0 0 0 4px color-mix(in srgb, var(--ba-ac) 0%, transparent); }
}

@keyframes hud-node-error {
  0%, 100% { opacity: 1; }
  25%, 75% { opacity: 0.25; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: no-preference) {
  html:root body .dsh-hud-stats__status[data-state="active"] {
    background: var(--dsw-alias-brand-primary);
    animation: hud-node-breathe 1.6s ease-in-out infinite;
  }

  html:root body .dsh-hud-stats__status[data-state="error"] {
    background: var(--dsw-alias-state-error-primary);
    animation: hud-node-error 900ms ease-in-out 2;
  }
}

/* Settings sections slide in from the right when you switch category. */
@media (prefers-reduced-motion: no-preference) {
  @keyframes hud-section-in {
    from { opacity: 0; transform: translateX(12px); }
    to { opacity: 1; transform: translateX(0); }
  }

  html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_options"] {
    animation: hud-section-in 190ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
  }
}

/* ── Lite mode / idle ──────────────────────────────────────────────────────
   One switch for weak GPUs: no contour sweep, no backdrop blur, no looping
   pulses. Idle does the same automatically while the window is hidden. */
html:root body[data-hud-lite]::after,
html:root body[data-hud-idle]::after {
  animation-play-state: paused !important;
}

html:root body[data-hud-lite] [data-slot="conversation.composer"] [class*="_card"],
html:root body[data-hud-lite] [data-sidebar-right-panel="fullscreen"],
html:root body[data-hud-lite] [class*="_overlay"]:has([class*="_navList"]) > [class*="_panel"] {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html:root body[data-hud-lite] .dsh-hud-stats__status[data-state="active"],
html:root body[data-hud-lite] .dsh-hud-stats__bar::after {
  animation: none !important;
  transition: none !important;
}

html:root body[data-hud-lite] [class*="_entry"],
html:root body[data-hud-lite] [class*="_overlay"]:has([class*="_navList"]) [class*="_options"] {
  animation: none !important;
}

/* Custom background field in the settings page. */
.dsh-hud-settings__bg {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.dsh-hud-settings__bg .dsh-hud-settings__num {
  flex: 1;
  min-width: 0;
  text-align: left;
}

.dsh-hud-settings__file {
  flex: none;
  width: 88px;
  font-size: 10px;
  color: var(--dsw-alias-label-secondary);
}

/* Header controls (sidebar toggle, new session, utilities): same hover bar as
   every other interactive surface. */
/* 侧栏切换按钮除外：Windows 标题栏模式下 DSH 把它 position: fixed 钉在标题栏左上，
   这里的 position: relative 会把它拉回侧栏里——展开时半截露在倾斜的侧栏边上，收起时随 0 宽的侧栏被裁掉、找不到。 */
html:root body button[class*="_iconButton"]:not([data-sidebar-toggle]),
html:root body button[aria-label="打开侧边栏"]:not([data-sidebar-toggle]),
html:root body button[aria-label="新建会话"],
html:root body button[aria-label*="sidebar" i]:not([data-sidebar-toggle]) {
  position: relative;
}

html:root body button[class*="_iconButton"]:not([data-sidebar-toggle])::after,
html:root body button[aria-label="打开侧边栏"]:not([data-sidebar-toggle])::after,
html:root body button[aria-label="新建会话"]::after,
html:root body button[aria-label*="sidebar" i]:not([data-sidebar-toggle])::after {
  content: "";
  position: absolute;
  left: 2px;
  right: 2px;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 120ms ease;
}

html:root body button[class*="_iconButton"]:not([data-sidebar-toggle]):hover::after,
html:root body button[aria-label="打开侧边栏"]:not([data-sidebar-toggle]):hover::after,
html:root body button[aria-label="新建会话"]:hover::after,
html:root body button[aria-label*="sidebar" i]:not([data-sidebar-toggle]):hover::after {
  opacity: 1;
}

/* Settings nav: no scroll rail. The list is short and the rail sat right next
   to the level-1 items. */
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_navList"] {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_navList"]::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

/* ── Windows ───────────────────────────────────────────────────────────────
   DWM acrylic already blurs what is behind the window, so stacking our own
   backdrop blur on top doubles the cost for little visual gain. Hairlines are
   also nudged to 1px: 0.5px can disappear at 125%/150% display scaling. */
html:root[data-os="win"] [data-slot="conversation.composer"] [class*="_card"],
html:root[data-os="win"] [data-sidebar-right-panel],
html:root[data-os="win"] [data-sidebar-right-panel="fullscreen"],
html:root[data-os="win"] [class*="_overlay"]:has([class*="_navList"]) > [class*="_panel"] {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html:root[data-os="win"] [data-slot="conversation.composer"] [class*="_card"] {
  background: linear-gradient(180deg, rgba(28, 29, 33, 0.92), rgba(20, 21, 24, 0.88));
}

html:root[data-os="win"] [class*="_sidebarCol"],
html:root[data-os="win"] [class*="_centerCol"],
html:root[data-os="win"] [class*="_rightbarCol"],
html:root[data-os="win"] .dsh-hud-stats {
  box-shadow: none;
}

/* Nothing loops while the window is in the background. */
html:root body[data-hud-idle] *,
html:root body[data-hud-idle] *::before,
html:root body[data-hud-idle] *::after {
  animation-play-state: paused !important;
}

/* Right dock "add panel" entries: dressed exactly like the left sidebar rows —
   grey plate, four corner ticks, 3px bar on hover. */
html:root body [class*="_entry"]:not([class*="_entry"] [class*="_entry"]) {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

html:root body [class*="_entry"]:not([class*="_entry"] [class*="_entry"])::before {
  content: "";
  position: absolute;
  inset: 3px;
  pointer-events: none;
  opacity: 0.45;
  color: var(--dsw-alias-label-secondary);
  background:
    linear-gradient(currentColor, currentColor) 0 0 / 3px 3px no-repeat,
    linear-gradient(currentColor, currentColor) 100% 0 / 3px 3px no-repeat,
    linear-gradient(currentColor, currentColor) 0 100% / 3px 3px no-repeat,
    linear-gradient(currentColor, currentColor) 100% 100% / 3px 3px no-repeat;
}

html:root body [class*="_entry"]:not([class*="_entry"] [class*="_entry"])::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 3px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 130ms ease;
}

html:root body [class*="_entry"]:not([class*="_entry"] [class*="_entry"]):hover {
  background: rgba(255, 255, 255, 0.13);
  color: var(--dsw-alias-label-primary);
}

html:root body [class*="_entry"]:not([class*="_entry"] [class*="_entry"]):hover::after {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  html:root body [class*="_entry"]:not([class*="_entry"] [class*="_entry"]):hover::after {
    transform-origin: left center;
    animation: hud-bar-draw 200ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
  }
}

/* Every remaining surface that only faded its bar now draws it too. */
@media (prefers-reduced-motion: no-preference) {
  html:root body [class*="_overlay"]:has([class*="_navList"])
    :is(button:not([class*="_navCell"]), [role="button"]:not([class*="_navCell"]), select, [class*="_preset"], [class*="_tile"]):hover::after,
  html:root body [data-slot="main"]
    :is(button:not([role="switch"]):not([aria-checked]), [role="button"]:not([role="switch"]):not([aria-checked]), [role="option"], [role="menuitem"]):hover::after,
  html:root body [data-slot="main"] [class*="_rows"] > [class*="_row"]:hover::after,
  html:root body [data-slot="main"] [class*="_optionsRow"]:hover::after,
  html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_toggleRow"]:hover::after,
  html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_optionsRow"]:hover::after,
  html:root body .dsh-hud-settings__btn:hover::after {
    transform-origin: left center;
    animation: hud-bar-draw 200ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
  }
}

@media (prefers-reduced-motion: reduce) {
  html:root body [data-slot="main"] [class*="_rows"] > [class*="_row"]:hover::after,
  html:root body [data-slot="main"] [class*="_optionsRow"]:hover::after {
    animation: none;
  }
}

/* The same hover lift on every surface that has a bar. */
html:root body [class*="_entry"]:not([class*="_entry"] [class*="_entry"]),
html:root body [data-slot="main"] [class*="_rows"] > [class*="_row"],
html:root body [class*="_overlay"]:has([class*="_navList"])
  :is(button:not([class*="_navCell"]), [role="button"]:not([class*="_navCell"]), [class*="_preset"], [class*="_tile"]) {
  transform-origin: left center;
  transition: transform 150ms cubic-bezier(0.22, 0.88, 0.24, 1), color 150ms ease, background-color 150ms ease;
}

html:root body [class*="_entry"]:not([class*="_entry"] [class*="_entry"]):hover,
html:root body [data-slot="main"] [class*="_rows"] > [class*="_row"]:hover,
html:root body [class*="_overlay"]:has([class*="_navList"])
  :is(button:not([class*="_navCell"]), [role="button"]:not([class*="_navCell"]), [class*="_preset"], [class*="_tile"]):hover {
  transform: scale(1.012);
}

@media (prefers-reduced-motion: reduce) {
  html:root body [class*="_entry"]:hover,
  html:root body [data-slot="main"] [class*="_rows"] > [class*="_row"]:hover {
    transform: none;
  }
}

/* Right dock file list: rows are button.h_iMMG_row inside li.h_iMMG_item. */
html:root body button[class*="iMMG_row"] {
  position: relative;
  border-radius: 2px;
  transform-origin: left center;
  transition: transform 150ms cubic-bezier(0.22, 0.88, 0.24, 1), color 150ms ease, background-color 150ms ease;
}

html:root body button[class*="iMMG_row"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 130ms ease;
}

html:root body button[class*="iMMG_row"]:hover {
  background: rgba(255, 255, 255, 0.13);
  color: var(--dsw-alias-label-primary);
  transform: scale(1.012);
}

html:root body button[class*="iMMG_row"]:hover::after,
html:root body button[class*="iMMG_row"][aria-selected="true"]::after,
html:root body button[class*="iMMG_row"][class*="ctive"]::after,
html:root body button[class*="iMMG_row"][aria-current="true"]::after {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  html:root body button[class*="iMMG_row"]:hover::after {
    transform-origin: left center;
    animation: hud-bar-draw 200ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
  }
}

/* Dock tab strip: the active tab keeps its bar. */
html:root body [role="tab"][class*="_tabActive_"],
html:root body [class*="_tab_"][class*="_tabActive_"] {
  position: relative;
}

html:root body [role="tab"][class*="_tabActive_"]::after,
html:root body [class*="_tab_"][class*="_tabActive_"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
}

/* Diagnostic: strip every custom paint from the right column so the host's own
   boxes can be compared with ours.
     document.body.dataset.hudNoDockstyle = 'true'    (remove with delete) */
html:root body[data-hud-no-dockstyle] [class*="_rightbarCol"] {
  background: none !important;
  background-image: none !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transform: none !important;
}

/* Window blur dim. */
.dsh-hud-dim {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  background: rgba(4, 5, 7, 0);
  transition: background-color 220ms ease;
}

html:root[data-hud-blur] .dsh-hud-dim {
  background: rgba(4, 5, 7, 0.34);
}

/* Streaming cursor: a block that blinks at the end of the live answer. */
@keyframes hud-cursor-blink {
  0%, 45% { opacity: 1; }
  55%, 100% { opacity: 0.15; }
}



/* HUD values roll up when they change. */
@keyframes hud-value-roll {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: no-preference) {
  html:root body .dsh-hud-stats__value.is-rolling {
    animation: hud-value-roll 220ms cubic-bezier(0.22, 0.88, 0.24, 1);
  }
}

/* Streaming cursor block. */
@keyframes hud-cursor-blink {
  0%, 45% { opacity: 1; }
  55%, 100% { opacity: 0.15; }
}

.dsh-hud-cursor {
  display: inline-block;
  width: 0.5em;
  height: 1em;
  margin-left: 3px;
  vertical-align: -0.12em;
  background: var(--dsw-alias-brand-primary);
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .dsh-hud-cursor {
    animation: hud-cursor-blink 1s steps(1, end) infinite;
  }
}

/* Running tool card: a light travels along its top edge while the call executes.
   Driven by the host's data-phase marker, so it disappears on its own. */
@keyframes hud-tool-run {
  from { background-position: -40% 0; }
  to { background-position: 140% 0; }
}

@media (prefers-reduced-motion: no-preference) {
  html:root body [data-phase="active"] [class*="_callRow"] {
    position: relative;
  }

  html:root body [data-phase="active"] [class*="_callRow"]::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    pointer-events: none;
    background-image: linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--ba-ac) 85%, transparent) 50%, transparent 100%);
    background-size: 40% 100%;
    background-repeat: no-repeat;
    background-position: -40% 0;
    animation: hud-tool-run 1.9s linear infinite;
  }
}

/* Boot-in, reference style: the columns slide in horizontally from their own
   edge and their leading edge flashes once, then the composer and HUD settle. */
/* Use the independent translate/scale properties: animating transform would
   override each column's rotateY tilt and the panel would arrive flat. */
@keyframes hud-boot-in-left {
  from { opacity: 0; translate: -16px 0; }
  to { opacity: 1; translate: 0 0; }
}

@keyframes hud-boot-in-right {
  from { opacity: 0; translate: 18px 0; }
  to { opacity: 1; translate: 0 0; }
}

@keyframes hud-boot-in-fade {
  from { opacity: 0; scale: 0.994; }
  to { opacity: 1; scale: 1; }
}

@keyframes hud-boot-edge {
  0% { box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0); }
  35% { box-shadow: inset -1px 0 0 rgba(255, 190, 120, 0.55); }
  100% { box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0); }
}

@media (prefers-reduced-motion: no-preference) {
  html:root .dsh-hud-booting[class*="_sidebarCol"] {
    animation:
      hud-boot-in-left 380ms cubic-bezier(0.16, 1, 0.3, 1) both,
      hud-boot-edge 520ms ease-out both;
  }

  html:root .dsh-hud-booting[class*="_centerCol"] {
    animation: hud-boot-in-fade 420ms cubic-bezier(0.22, 0.88, 0.24, 1) 60ms both;
  }

  html:root .dsh-hud-booting[class*="_rightbarCol"] {
    animation:
      hud-boot-in-right 380ms cubic-bezier(0.16, 1, 0.3, 1) 110ms both,
      hud-boot-edge 520ms ease-out 110ms both;
  }

  html:root .dsh-hud-booting[class*="_card"] {
    animation: hud-boot-in-fade 400ms cubic-bezier(0.22, 0.88, 0.24, 1) 180ms both;
  }

  html:root .dsh-hud-booting.dsh-hud-stats {
    animation: hud-boot-in-fade 380ms cubic-bezier(0.22, 0.88, 0.24, 1) 230ms both;
  }
}

/* ── Conversation status strip ───────────────────────────────────────────────
   The header row becomes a slim instrument strip: a hairline under it, a dim
   plate behind it, and the session title set small and tracked. */
html:root body [class*="_header"]:has([class*="_titleRow"]) {
  padding: 6px 14px 7px;
  background: transparent;
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
}
/* Windows 标题栏那条和会话标题条原本各自垫了一层底，叠在星空上像另一张背景：都透明，只留细线 */
html:root[data-windows-titlebar] body [class*="_frame"]::before { background: transparent !important; }

html:root body [class*="_header"]:has([class*="_titleRow"]) [class*="_titleCluster"] {
  min-width: 0;
}

html:root body [class*="_header"]:has([class*="_titleRow"]) [class*="_titleRow"] {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--dsw-alias-label-primary);
}

html:root body [class*="_header"]:has([class*="_titleRow"]) [class*="_headerUtilities"] {
  gap: 10px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

html:root body [class*="_centerCol"] {
  border-radius: 4px;
  /* No backdrop blur here: this is the largest surface, and re-sampling it on
     every scroll frame was the main cost. The fill is a touch denser instead. */
  background: var(--hud-main-panel);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    var(--dsw-elevation-panel);
}

/* HUD scrim: the panel is only 42% opaque, so without a darkened environment
   it blends into the wallpaper. One fixed vignette layer sits under the app
   content (z-index:-1) and separates HUD from world, like the game does. */
/* Code keeps crisp strokes: the projected text layers are for prose and HUD
   labels, not for monospace glyphs (a ghost layer makes them look smeared). */
html:root body code,
html:root body pre,
html:root body kbd,
html:root body samp {
  text-shadow: none;
}

/* 主题色变量：脚本按用户选的颜色覆盖到根元素上；这里是脚本跑起来前的默认值（深海蓝）。
   --ba-ac-tx 是底色上的主题色文字，深浅两套各算一个，跟着宿主明暗切换。 */
html:root {
  --ba-ac: #4C6AFC;
  --ba-ac-tx-dark: #9DB5FA;
  --ba-ac-tx-light: #3F5BE8;
  --ba-on-ac: #FFFFFF;
}

html:root body {
  --ba-ac-tx: var(--ba-ac-tx-light);
  --ba-sky: radial-gradient(ellipse at 72% 68%, rgba(120, 110, 200, 0.14), transparent 55%), radial-gradient(ellipse at 25% 20%, rgba(90, 130, 220, 0.14), transparent 50%), linear-gradient(160deg, #f3f5fb, #dfe5f2);
}

html:root body[data-ds-dark-theme] {
  --ba-ac-tx: var(--ba-ac-tx-dark);
  --ba-sky: radial-gradient(ellipse at 72% 68%, rgba(70, 60, 140, 0.22), transparent 55%), radial-gradient(ellipse at 25% 20%, rgba(40, 70, 160, 0.18), transparent 50%), linear-gradient(160deg, #0b1022, #060914);
}

/* 背景：深空渐变 + 星点 + 神经连线，画在一张 canvas 上，平时以 30 帧缓慢运动。
   自定义背景（--hud-bg）开着时代替深空渐变，星点连线照样叠在上面。 */
.ba-backdrop {
  position: fixed;
  inset: 0;
  z-index: -2; /* 在 body::before 的压暗层下面 */
  pointer-events: none;
  overflow: hidden;
  background: var(--hud-bg, var(--ba-sky));
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.ba-backdrop canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  height: 100%;
}

/* 设置页：主题色 */
.ba-pal {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0 16px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
}

.ba-pal__swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.ba-pal__swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  cursor: pointer;
}

.ba-pal__swatch i {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  padding: 3px;
  border: 1px solid var(--dsw-alias-border-l2);
  background-clip: content-box;
  font-style: normal;
  font-size: 18px;
}

.ba-pal__swatch[aria-pressed="true"] {
  color: var(--dsw-alias-label-primary);
}

.ba-pal__swatch[aria-pressed="true"] i {
  border-color: var(--dsw-alias-label-primary);
  box-shadow: 0 4px 0 -2px var(--dsw-alias-label-primary);
}

.ba-pal__swatch--custom i {
  border-style: dashed;
}

.ba-pal__picker {
  display: grid;
  grid-template-columns: minmax(0, 240px) minmax(0, 1fr);
  gap: 8px 18px;
}

.ba-pal__sv {
  position: relative;
  aspect-ratio: 3 / 2;
  cursor: crosshair;
  touch-action: none;
  background: linear-gradient(transparent, #000), linear-gradient(90deg, #fff, var(--ba-hue));
}

.ba-pal__knob {
  position: absolute;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
  transform: rotate(45deg);
  pointer-events: none;
}

.ba-pal__hue {
  position: relative;
  grid-column: 1;
  height: 10px;
  cursor: pointer;
  touch-action: none;
  background: linear-gradient(90deg, red, #ff0, lime, cyan, blue, #f0f, red);
}

.ba-pal__bar {
  position: absolute;
  top: -3px;
  bottom: -3px;
  width: 6px;
  margin-left: -3px;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.45);
  pointer-events: none;
}

.ba-pal__fields {
  grid-column: 2;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.ba-pal__rgb {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.ba-pal__fields .dsh-hud-settings__num {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  text-align: left;
  font-variant-numeric: tabular-nums;
}

.ba-pal__note {
  font-size: 11.5px;
  color: var(--dsw-alias-label-secondary);
}

.ba-pal__note--bad {
  color: var(--dsw-alias-state-error-primary);
}

.ba-pal__sv:focus-visible,
.ba-pal__hue:focus-visible,
.ba-pal__swatch:focus-visible {
  outline: 2px solid var(--ba-ac);
  outline-offset: 2px;
}

html:root body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: var(--hud-scrim);
}

/* HUD geometry: an inset corner bracket on every floating panel, plus one
   orange segment that only appears while a turn is actually running. */
html:root body [class*="_sidebarCol"],
html:root body [class*="_centerCol"] {
  position: relative;
}

html:root body [class*="_sidebarCol"]::before,
html:root body [class*="_centerCol"]::before {
  content: "";
  position: absolute;
  inset: 6px;
  pointer-events: none;
  background:
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 0 0 / 18px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 0 0 / 1px 18px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 100% 0 / 18px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 100% 0 / 1px 18px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 0 100% / 18px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 0 100% / 1px 18px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 100% 100% / 18px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 100% 100% / 1px 18px no-repeat,
    radial-gradient(circle, var(--hud-node) 0 1.2px, transparent 1.9px) 0 0 / 4px 4px no-repeat,
    radial-gradient(circle, var(--hud-node) 0 1.2px, transparent 1.9px) 100% 0 / 4px 4px no-repeat,
    radial-gradient(circle, var(--hud-node) 0 1.2px, transparent 1.9px) 0 100% / 4px 4px no-repeat,
    radial-gradient(circle, var(--hud-node) 0 1.2px, transparent 1.9px) 100% 100% / 4px 4px no-repeat;
}



/* ── HUD stat cluster (bottom-left, above the account row) ─────────────────
   Mirrors the host's [data-composer-stat] readouts into a Division-style
   instrument panel: large tabular numerals, hairline separators, corner ticks.
   Read-only and pointer-transparent, so it never steals a click. */
.dsh-hud-stats {
  position: fixed;
  z-index: 40;
  --fill: 0%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 236px;
  padding: 10px 14px 11px;
  border-radius: 3px;
  pointer-events: none;
  font-variant-numeric: tabular-nums;
  background: rgba(15, 16, 19, 0.95);
  border-top: 0.5px solid var(--dsw-alias-border-l2);
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.dsh-hud-stats::before {
  content: "";
  position: absolute;
  inset: 4px;
  pointer-events: none;
  background:
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 0 5px / 11px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 5px 0 / 1px 11px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 100% 5px / 11px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) calc(100% - 5px) 0 / 1px 11px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 0 calc(100% - 5px) / 11px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 5px 100% / 1px 11px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 100% calc(100% - 5px) / 11px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) calc(100% - 5px) 100% / 1px 11px no-repeat;
}

.dsh-hud-settings {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 6px 0 24px;
  padding: 18px 20px 20px;
  max-width: 600px;
  color: var(--dsw-alias-label-primary);
  background: var(--hud-stats-fill);
  border-radius: 2px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 0 rgba(0, 0, 0, 0.45),
    0 0 0 0.5px var(--hud-bracket),
    4px 8px 18px rgba(0, 0, 0, 0.35);
}

.dsh-hud-settings::before {
  content: "";
  position: absolute;
  inset: 6px;
  pointer-events: none;
  background:
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 0 6px / 13px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 6px 0 / 1px 13px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 100% 6px / 13px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) calc(100% - 6px) 0 / 1px 13px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 0 calc(100% - 6px) / 13px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 6px 100% / 1px 13px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 100% calc(100% - 6px) / 13px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) calc(100% - 6px) 100% / 1px 13px no-repeat;
}

.dsh-hud-settings::after {
  content: "";
  position: absolute;
  top: 8px;
  right: 14px;
  width: 60px;
  height: 3px;
  pointer-events: none;
  background: repeating-linear-gradient(90deg, var(--hud-bracket) 0 1px, transparent 1px 5px);
}


.dsh-hud-settings__title {
  position: relative;
  margin: 0 0 4px;
  padding-left: 12px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.dsh-hud-settings__title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 4px;
  width: 3px;
  height: 14px;
  background: var(--dsw-alias-brand-primary);
}

.dsh-hud-settings__hint {
  margin: 0 0 14px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--dsw-alias-label-secondary);
}

.dsh-hud-settings__row {
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
  gap: 12px;
  min-height: 40px;
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
  position: relative;
}

.dsh-hud-settings__row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.dsh-hud-settings__label {
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--dsw-alias-label-secondary);
}

.dsh-hud-settings__seg {
  display: inline-flex;
  gap: 4px;
}

.dsh-hud-settings__btn {
  min-width: 52px;
  padding: 4px 10px;
  border-radius: 2px;
  border: 0.5px solid var(--dsw-alias-border-l2);
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.dsh-hud-settings__btn:hover {
  background: var(--dsw-alias-interactive-bg-hover);
}

.dsh-hud-settings__btn.is-on {
  position: relative;
  border-color: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-brand-primary);
  background: var(--hud-selection);
}

/* The active control carries the same bar as every other selected row. */
.dsh-hud-settings__btn.is-on::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  /* The generic "settings button" bar rule is far more specific and sets
     opacity 0; this must win for an already-on control. */
  opacity: 1 !important;
  background: var(--dsw-alias-brand-primary);
}

.dsh-hud-settings__num {
  width: 86px;
  padding: 4px 8px;
  border-radius: 2px;
  border: 0.5px solid var(--dsw-alias-border-l2);
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.dsh-hud-settings__foot {
  margin-top: 18px;
}

.dsh-hud-settings__reset {
  padding: 5px 12px;
  border-radius: 2px;
  border: 0.5px solid var(--dsw-alias-border-l2);
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.dsh-hud-settings__reset:hover {
  color: var(--dsw-alias-brand-primary);
  border-color: var(--dsw-alias-brand-primary);
}

/* ── Settings shell: glass + tilt ─────────────────────────────────────────
   Reached through the overlay that owns a settings nav list, so the rules only
   apply to this dialog and degrade to the untouched host look if it changes. */
html:root body [class*="_overlay"]:has([class*="_navList"]) > [class*="_panel"] {
  /* Tunable live:
       document.documentElement.style.setProperty('--hud-settings-fill', 'rgba(12,13,16,.24)')
       document.documentElement.style.setProperty('--hud-settings-blur', '8px') */
  background: var(--hud-settings-fill, rgba(12, 14, 20, 0.9));
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0) 42%);
  backdrop-filter: blur(var(--hud-settings-blur, 12px)) saturate(110%);
  /* Tilted like the reference menus: turned in towards the scene and tipped
     back a touch, with a real drop shadow so the sheet reads as an object.
       --hud-settings-tilt / --hud-settings-tilt-x tune both axes live. */
  /* Perspective distance raised (820 -> 1000) so the far edge distorts less and
     the labels stay legible; the angle is brought closer to the side columns
     (-7deg) so the whole UI reads on one plane. The 0.985 scale is gone: it was
     resampling the text for no visual gain. */
  transform: perspective(1000px)
             rotateY(var(--hud-settings-tilt, -6.5deg))
             rotateX(var(--hud-settings-tilt-x, 1.6deg));
  /* Clearer labels: the panel is translucent, so text reads a step brighter
     than the app-wide values (which are tuned for opaque surfaces). */
  --dsw-alias-label-primary: rgba(248, 250, 255, 0.98);
  --dsw-alias-label-secondary: rgba(232, 238, 246, 0.82);
  --dsw-alias-label-tertiary: rgba(214, 222, 232, 0.74);
  /* Hinge slightly above the middle: the sheet reads as leaning back. */
  transform-origin: 50% 45%;
  box-shadow:
    inset 1px 0 0 rgba(255, 255, 255, 0.10),
    inset -1px 0 0 rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    0 0 0 1px rgba(255, 255, 255, 0.14),
    0 10px 26px rgba(0, 0, 0, 0.34),
    0 34px 72px rgba(0, 0, 0, 0.30);
}

/* The panel is nearly clear now, so labels get ONE flat dark shadow for
   contrast — not the body's three-layer projection, whose white ghost layer is
   what made small settings text look out of focus. */
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_panel"],
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_panel"] * {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
}

html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_mask"] {
  background: var(--hud-settings-mask, rgba(4, 5, 7, 0.22));
  backdrop-filter: none;
}

/* Nav column and page body step back so the panel reads as one glass sheet. */
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_nav"],
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_content"],
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_header"],
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_options"] {
  /* The reference has no card behind the right column: text sits on the scene. */
  background: transparent;
  backdrop-filter: none;
}

/* Nav rows: no fill, no radius — selection is a line. */
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_navCell"] {
  min-height: 30px;
  margin: 0 4px;
  padding: 0 10px;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.07);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.06);
}

html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_navCell"]:hover {
  background: rgba(255, 255, 255, 0.13);
}

html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_navLabel"] {
  letter-spacing: 0.05em;
}

/* Selected: the filled orange bar from the reference menus. */
html:root body [class*="_overlay"]:has([class*="_navList"]) [aria-current="true"],
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_navCell"][class*="active"] {
  background: rgba(255, 255, 255, 0.10);
  color: var(--dsw-alias-label-primary);
  box-shadow: none;
}

html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_navTitle"] {
  letter-spacing: 0.14em;
  text-transform: uppercase;
  box-shadow: none;
}

html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_header"] {
  box-shadow: inset 3px 0 0 0 var(--dsw-alias-brand-primary);
  padding-left: 10px;
}

/* ── Main interface polish: sidebar chrome + composer shell ──────────────── */
/* "New session" becomes a menu bar with an orange hover edge, matching the
   session rows rather than looking like a web button. */
html:root body [data-hud-new-session] {
  border-radius: 0 !important;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.06);
}

html:root body [data-hud-new-session]:hover {
  background: color-mix(in srgb, var(--ba-ac) 12%, transparent);
}

/* Sidebar search field: hairline ghost instead of a white web input. */
html:root body [class*="_search"] input,
html:root body input[type="search"] {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 0.5px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 2px !important;
  box-shadow: none !important;
}

/* Composer: one hairline across the top of the shell so the input reads as a
   docked instrument, plus a warmer edge while it has focus. */
html:root body [data-slot="conversation.composer"] {
  border-top: 0.5px solid var(--dsw-alias-border-l1);
}

html:root body [data-slot="conversation.composer"] [class*="_card"]:focus-within {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    inset 0 -1px 0 rgba(0, 0, 0, 0.50),
    0 0 0 0.5px color-mix(in srgb, var(--ba-ac) 55%, transparent),
    0 0 22px color-mix(in srgb, var(--ba-ac) 18%, transparent),
    4px 8px 18px rgba(0, 0, 0, 0.45);
}

/* ── Right dock "add panel" menu: the four entries in 3D ───────────────────
   The menu rows are host components (…_entry); they get their own perspective
   so the list reads as a tilted stack instead of flat rows. */
html:root body div[class*="_entryCell"] {
  perspective: 900px;
}

html:root body div[class*="_entry"] {
  transform: rotateY(-3deg) rotateX(0.4deg);
  transform-origin: 100% 50%;
  transition: transform 150ms ease, background-color 150ms ease;
}

html:root body div[class*="_entry"]:hover {
  transform: rotateY(-1deg) rotateX(0.2deg) translateZ(6px);
}

@media (prefers-reduced-motion: reduce) {
  html:root body div[class*="_entry"] {
    transition: none;
  }
}

/* Blur is the expensive part while the columns resize: drop it for the
   duration of the animation, restore it when it settles. */
html:root body [data-animating] [class*="_centerCol"] {
  backdrop-filter: none !important;
}

/* Selection motion: the bar draws itself from the left when a row becomes the
   selected one, and a soft flash runs once over the row. One-shot only. */




/* Selection motion: the bar draws itself from the left when a row becomes the
   selected one, and a soft flash runs once over the row. One-shot only. */
@keyframes hud-bar-draw {
  from { transform: scaleX(0); opacity: 0.2; }
  to { transform: scaleX(1); opacity: 1; }
}

@keyframes hud-row-flash {
  from { background-color: color-mix(in srgb, var(--ba-ac) 16%, transparent); }
  to { background-color: rgba(255, 255, 255, 0.10); }
}

html:root body [role="treeitem"][aria-selected="true"]::after,
html:root body [class*="_navCell"][class*="active"]::after,
html:root body [aria-current="true"]::after,
html:root body [data-dockkit-tab][aria-selected="true"]::after,
html:root body [class*="_panelRow"][class*="active"]::after,
html:root body [role="tab"][aria-selected="true"]::after {
  transform-origin: left center;
  animation: hud-bar-draw 200ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
}

html:root body [role="treeitem"][aria-selected="true"] {
  animation: hud-row-flash 320ms ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  html:root body [role="treeitem"][aria-selected="true"]::after,
  html:root body [class*="_navCell"][class*="active"]::after,
  html:root body [aria-current="true"]::after,
  html:root body [data-dockkit-tab][aria-selected="true"]::after,
  html:root body [role="treeitem"][aria-selected="true"] {
    animation: none;
  }
}

/* ── One definition for every hover bar ────────────────────────────────────
   Geometry, colour, timing and the reveal live here only. Each surface just
   lists its selector, so a change never has to be made in five places. */
html:root body [role="treeitem"][aria-selected],
html:root body [class*="_navCell"],
html:root body [role="menuitem"],
html:root body [role="option"],
html:root body [data-dockkit-tab],
html:root body [class*="_panelRow"],
html:root body [data-hud-new-session],
html:root body [class*="_footArea"] button,
html:root body button[class*="_iconButton"]:not([data-sidebar-toggle]),
html:root body .dsh-hud-settings__row {
  position: relative;
}

html:root body [role="treeitem"][aria-selected]::after,
html:root body [class*="_navCell"]::after,
html:root body [role="menuitem"]::after,
html:root body [role="option"]::after,
html:root body [data-dockkit-tab]::after,
html:root body [class*="_panelRow"]::after,
html:root body [data-hud-new-session]::after,
html:root body [class*="_footArea"] button::after,
html:root body button[class*="_iconButton"]:not([data-sidebar-toggle])::after,
html:root body .dsh-hud-settings__row::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transform-origin: left center;
  transition: opacity 130ms ease;
}

/* Level 1 navigation reads heavier than level 2 items. */
html:root body [role="treeitem"][aria-selected]::after,
html:root body [class*="_navCell"]::after,
html:root body [class*="_panelRow"]::after,
html:root body [data-dockkit-tab]::after,
html:root body [data-hud-new-session]::after,
html:root body [class*="_footArea"] button::after {
  height: 3px;
}

html:root body [role="treeitem"][aria-selected]:hover::after,
html:root body [class*="_navCell"]:hover::after,
html:root body [role="menuitem"]:hover::after,
html:root body [role="option"]:hover::after,
html:root body [data-dockkit-tab]:hover::after,
html:root body [class*="_panelRow"]:hover::after,
html:root body [data-hud-new-session]:hover::after,
html:root body [class*="_footArea"] button:hover::after,
html:root body button[class*="_iconButton"]:not([data-sidebar-toggle]):hover::after,
html:root body .dsh-hud-settings__row:hover::after,
html:root body [role="treeitem"][aria-selected="true"]::after,
html:root body [aria-current="true"]::after,
html:root body [class*="_navCell"][class*="active"]::after,
html:root body [class*="_panelRow"][class*="active"]::after,
html:root body [data-dockkit-tab][aria-selected="true"]::after,
html:root body [data-dockkit-tab][data-active]::after,
html:root body [data-dockkit-tab][data-selected]::after,
html:root body [data-dockkit-tab][class*="active"]::after,
html:root body [data-dockkit-tab][class*="selected"]::after,
html:root body [role="tab"][aria-selected="true"]::after {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  html:root body [role="treeitem"][aria-selected]:hover::after,
  html:root body [class*="_navCell"]:hover::after,
  html:root body [role="menuitem"]:hover::after,
  html:root body [role="option"]:hover::after,
  html:root body [data-dockkit-tab]:hover::after,
  html:root body [class*="_panelRow"]:hover::after,
  html:root body [data-hud-new-session]:hover::after,
  html:root body [class*="_footArea"] button:hover::after,
  html:root body button[class*="_iconButton"]:not([data-sidebar-toggle]):hover::after,
  html:root body .dsh-hud-settings__row:hover::after {
    animation: hud-bar-draw 200ms cubic-bezier(0.22, 0.88, 0.24, 1) both;
  }
}

/* ── Game-style menu markers ────────────────────────────────────────────────
   One floating bar, 4px above the row so it never touches icons or labels.
   Level 1 (navigation): the bar shows on hover and stays on the selected row.
   Level 2 (menu items / list options): hovering also fills the row orange. */
html:root body [role="treeitem"][aria-selected],
html:root body [class*="_navCell"],
html:root body [role="menuitem"],
html:root body [role="option"],
html:root body [data-dockkit-tab],
html:root body .dsh-hud-settings__row {
  position: relative;
  padding-top: 5px;
}

html:root body [role="treeitem"][aria-selected]::after,
html:root body [class*="_navCell"]::after,
html:root body [role="menuitem"]::after,
html:root body [role="option"]::after,
html:root body [data-dockkit-tab]::after,
html:root body .dsh-hud-settings__row::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 120ms ease;
}

html:root body [role="treeitem"][aria-selected]:hover::after,
html:root body [class*="_navCell"]:hover::after,
html:root body [role="menuitem"]:hover::after,
html:root body [role="option"]:hover::after,
html:root body [data-dockkit-tab]:hover::after,
html:root body .dsh-hud-settings__row:hover::after,
html:root body [role="treeitem"][aria-selected="true"]::after,
html:root body [aria-current="true"]::after,
html:root body [class*="_navCell"][class*="active"]::after,
/* Right dock: whichever marker the active tab carries. */
html:root body [data-dockkit-tab][aria-selected="true"]::after,
html:root body [data-dockkit-tab][data-active]::after,
html:root body [data-dockkit-tab][data-selected]::after,
html:root body [data-dockkit-tab][class*="active"]::after,
html:root body [data-dockkit-tab][class*="selected"]::after,
html:root body [role="tab"][aria-selected="true"]::after {
  opacity: 1;
}

/* Cards, tiles and buttons inside Settings: one bar per hovered control.
   The :not(A A) guard keeps a nested control from stacking a second bar inside
   its card, and the list deliberately excludes generic "_card" wrappers, which
   matched full-width containers and drew a bar across the whole panel. */
html:root body [class*="_overlay"]:has([class*="_navList"])
  :is(button:not([class*="_navCell"]), [role="button"]:not([class*="_navCell"]), select, [class*="_preset"], [class*="_tile"]):not(
    :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
    :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
  ) {
  position: relative;
}

html:root body [class*="_overlay"]:has([class*="_navList"])
  :is(button:not([class*="_navCell"]), [role="button"]:not([class*="_navCell"]), select, [class*="_preset"], [class*="_tile"]):not(
    :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
    :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
  )::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 120ms ease;
}

html:root body [class*="_overlay"]:has([class*="_navList"])
  :is(button:not([class*="_navCell"]), [role="button"]:not([class*="_navCell"]), select, [class*="_preset"], [class*="_tile"]):not(
    :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
    :is(button, [role="button"], select, [class*="_preset"], [class*="_tile"])
  ):hover::after {
  opacity: 1;
}

/* Level-2 rows inside a page you opened (plugin list, schedule list, any panel
   that renders interactive rows): hairline bar, same gap, one bar per row. */
html:root body [data-slot="main"]
  :is(button:not([role="switch"]):not([aria-checked]), [role="button"]:not([role="switch"]):not([aria-checked]), [role="option"], [role="menuitem"]):not(
    :is(button, [role="button"], [role="option"], [role="menuitem"])
    :is(button, [role="button"], [role="option"], [role="menuitem"])
  ) {
  position: relative;
}

html:root body [data-slot="main"]
  :is(button:not([role="switch"]):not([aria-checked]), [role="button"]:not([role="switch"]):not([aria-checked]), [role="option"], [role="menuitem"]):not(
    :is(button, [role="button"], [role="option"], [role="menuitem"])
    :is(button, [role="button"], [role="option"], [role="menuitem"])
  )::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 120ms ease;
}

html:root body [data-slot="main"]
  :is(button:not([role="switch"]):not([aria-checked]), [role="button"]:not([role="switch"]):not([aria-checked]), [role="option"], [role="menuitem"]):not(
    :is(button, [role="button"], [role="option"], [role="menuitem"])
    :is(button, [role="button"], [role="option"], [role="menuitem"])
  ):hover::after {
  opacity: 1;
}

/* Plugin / option rows: the host renders them as "_rows > _row" (see
   ui-plugin-manager), so the bar goes on the row itself, never on the switch
   inside it. */
html:root body [data-slot="main"] [class*="_rows"] > [class*="_row"] {
  position: relative;
}

html:root body [data-slot="main"] [class*="_rows"] > [class*="_row"]::after,
html:root body [data-slot="main"] [class*="_optionsRow"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 120ms ease;
}

html:root body [data-slot="main"] [class*="_rows"] > [class*="_row"]:hover::after,
html:root body [data-slot="main"] [class*="_optionsRow"]:hover::after {
  opacity: 1;
}

/* Controls that are switches must not draw their own bar. */
html:root body [data-slot="main"] [data-state]::after {
  display: none;
}

/* Setting rows that own a switch: "_toggleRow" (ui-settings-subagent) and the
   generic "_optionsRow". The bar spans the row, and any control inside the row
   keeps its bar hidden so nothing smaller appears. */
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_toggleRow"],
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_optionsRow"] {
  position: relative;
}

html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_toggleRow"]::after,
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_optionsRow"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 120ms ease;
}

html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_toggleRow"]:hover::after,
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_optionsRow"]:hover::after {
  opacity: 1;
}

html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_toggleRow"] :is(button, [role="button"])::after,
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_optionsRow"] :is(button, [role="button"])::after {
  display: none;
}

/* Unselected rows still get the grey plate; selection only adds the bar on
   top of it, exactly like the session rows. */
html:root body [role="menuitem"]:not(:hover),
html:root body [role="option"]:not(:hover),
html:root body [data-dockkit-tab]:not(:hover),
html:root body .dsh-hud-settings__row:not(:hover),
html:root body [class*="_toggleRow"]:not(:hover),
html:root body [class*="_optionsRow"]:not(:hover) {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

/* Selected ones keep the plate slightly brighter under the bar. */
html:root body [role="menuitem"][aria-selected="true"],
html:root body [role="option"][aria-selected="true"],
html:root body [data-dockkit-tab][aria-selected="true"],
html:root body [class*="_navCell"][class*="active"],
html:root body [aria-current="true"] {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
}

/* Bar weight: level 1 (navigation) is heavier, level 2 (items) is a hairline. */
html:root body [role="treeitem"][aria-selected]::after,
html:root body [class*="_navCell"]::after,
html:root body [class*="_panelRow"]::after,
html:root body [data-dockkit-tab]::after {
  height: 3px;
}

html:root body [role="menuitem"]::after,
html:root body [role="option"]::after,
html:root body .dsh-hud-settings__row::after {
  height: 1px;
}

/* Level 2: the bar alone marks the hovered item, no orange fill. */
html:root body [role="menuitem"]:hover,
html:root body [role="option"]:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--dsw-alias-label-primary);
}

@media (prefers-reduced-motion: reduce) {
  html:root body [role="treeitem"][aria-selected]::after,
  html:root body [class*="_navCell"]::after,
  html:root body [role="menuitem"]::after,
  html:root body [role="option"]::after,
      html:root body [data-dockkit-tab]::after,
  html:root body .dsh-hud-settings__row::after {
    transition: none;
  }
}

/* ── Corner squares on every plated block ──────────────────────────────────
   The reference tiles mark their four corners with small squares. Drawn with a
   single pseudo-element (four tiny gradients), so the floating selection bar
   keeps using ::after. */
html:root body [role="treeitem"][aria-selected]::before,
html:root body [class*="_panelRow"]::before,
html:root body [class*="_footArea"] button::before,
html:root body [data-hud-new-session]::before {
  content: "";
  position: absolute;
  inset: 3px;
  pointer-events: none;
  opacity: 0.45;
  background:
    linear-gradient(currentColor, currentColor) 0 0 / 3px 3px no-repeat,
    linear-gradient(currentColor, currentColor) 100% 0 / 3px 3px no-repeat,
    linear-gradient(currentColor, currentColor) 0 100% / 3px 3px no-repeat,
    linear-gradient(currentColor, currentColor) 100% 100% / 3px 3px no-repeat;
  color: var(--dsw-alias-label-secondary);
}



/* New-session button: the same floating bar as the other level-1 rows. */
html:root body [data-hud-new-session] {
  position: relative;
}

html:root body [data-hud-new-session]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 120ms ease;
}

html:root body [data-hud-new-session]:hover::after {
  opacity: 1;
}

/* Corner squares on the settings blocks that carry a grey plate. */
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_toggleRow"]::before,
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_optionsRow"]::before,
html:root body [class*="_overlay"]:has([class*="_navList"]) [class*="_navCell"]::before,
html:root body .dsh-hud-settings__row::before {
  content: "";
  position: absolute;
  inset: 3px;
  pointer-events: none;
  opacity: 0.45;
  color: var(--dsw-alias-label-secondary);
  background:
    linear-gradient(currentColor, currentColor) 0 0 / 3px 3px no-repeat,
    linear-gradient(currentColor, currentColor) 100% 0 / 3px 3px no-repeat,
    linear-gradient(currentColor, currentColor) 0 100% / 3px 3px no-repeat,
    linear-gradient(currentColor, currentColor) 100% 100% / 3px 3px no-repeat;
}



/* ── Left sidebar: remaining blocks ──────────────────────────────────────── */ */
   Group headers, the panel icon rail, the account footer and the collapsed
   rail — all brought onto the same language as the session rows. */
/* Workspace group headers (tree rows that are not selectable sessions). */
html:root body [role="treeitem"]:not([aria-selected]) {
  min-height: 26px;
  margin: 6px 6px 2px;
  padding: 0 8px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: 0;
  background: transparent;
}

/* Panel icon rail (top of the sidebar). */
html:root body [class*="_panelRow"] {
  position: relative;
  min-height: 30px;
  /* Same grey plate as the other sidebar rows. */
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

html:root body [class*="_panelRow"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 120ms ease;
}

html:root body [class*="_panelRow"]:hover {
  background: rgba(255, 255, 255, 0.13);
  color: var(--dsw-alias-label-primary);
}

html:root body [class*="_panelRow"]:hover::after,
html:root body [class*="_panelActive"]::after {
  opacity: 1;
}

html:root body [class*="_panelActive"] {
  background: rgba(255, 255, 255, 0.10);
  color: var(--dsw-alias-label-primary);
}

/* Account / footer row: same bar language, brighter text. */
html:root body [class*="_footArea"] button {
  position: relative;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.05);
}

html:root body [class*="_footArea"] button:hover {
  background: rgba(255, 255, 255, 0.12);
}

html:root body [class*="_footArea"] button::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  pointer-events: none;
  background: var(--dsw-alias-brand-primary);
  opacity: 0;
  transition: opacity 120ms ease;
}

html:root body [class*="_footArea"] button:hover::after {
  opacity: 1;
}

/* Collapsed rail: keep the icons calm, no uppercase on labels. */
html:root body [class*="_collapsed"] [role="treeitem"]:not([aria-selected]) {
  text-transform: none;
  letter-spacing: 0.02em;
  border-bottom: 0;
  margin: 2px;
}

@media (prefers-reduced-motion: reduce) {
  html:root body [class*="_panelRow"]::after,
  html:root body [class*="_footArea"] button::after {
    transition: none;
  }
}

/* ── Embedded HUD: lives inside the sidebar column ───────────────────────── */
.dsh-hud-portal {
  position: absolute;
  left: 6px;
  right: 6px;
  bottom: 10px;
  z-index: 3;
  pointer-events: none;
}

html:root body [class*="_sidebarCol"] {
  position: relative;
}

/* Almost no inline offsets are needed once embedded; it already sits in the
   sidebar's 3D plane, so no extra transform. */
.dsh-hud-stats[data-embedded="true"] {
  position: static;
  left: auto !important;
  bottom: auto !important;
  width: auto !important;
  transform: none !important;
  margin: 0;
}

/* When the width is computed from the sidebar, the content min-widths must not
   push the panel wider than its container. */
.dsh-hud-stats[data-fixed-width="true"],
.dsh-hud-stats[data-fixed-width="true"][data-cols="2"] {
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

/* Position is locked: the panel no longer receives pointer events. */
html:root body .dsh-hud-stats {
  pointer-events: none;
}

/* Agent status node: the one readout that answers "is it working right now". */
.dsh-settings-hints {
  position: fixed;
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
  /* Same plane as the settings sheet, so the keycaps tilt with it. */
  transform: perspective(820px)
             rotateY(var(--hud-settings-tilt, -9deg))
             rotateX(var(--hud-settings-tilt-x, 2deg));
  transform-origin: 0% 50%;
}

.dsh-settings-hints__key {
  padding: 1px 6px;
  border-radius: 2px;
  background: #f4f5f7;
  color: #14161a;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
}

.dsh-settings-hints__label {
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--dsw-alias-label-secondary);
}

.dsh-hud-stats__spark {
  grid-column: 1 / -1;
  width: 100%;
  height: 28px;
  margin-top: 5px;
  overflow: visible;
}

.dsh-hud-stats__status {
  position: absolute;
  top: 7px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  background: var(--dsw-alias-label-secondary);
}

.dsh-hud-stats__status[data-state="idle"] {
  opacity: 0.45;
}

.dsh-hud-stats__status[data-state="active"] {
  background: var(--dsw-alias-brand-primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--ba-ac) 20%, transparent), 0 0 8px color-mix(in srgb, var(--ba-ac) 55%, transparent);
  animation: hud-node-pulse 1.8s ease-in-out infinite;
}

.dsh-hud-stats__status[data-state="error"] {
  background: var(--dsw-alias-state-error-primary);
  box-shadow: 0 0 0 2px rgba(255, 48, 0, 0.22), 0 0 8px rgba(255, 48, 0, 0.55);
}

@keyframes hud-node-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

/* Context almost full: thin warning band under the composer. */
@keyframes hud-warning-pulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.35; }
}

.dsh-hud-warning {
  position: fixed;
  z-index: 41;
  height: 2px;
  pointer-events: none;
  border-radius: 1px;
  background: linear-gradient(90deg, transparent, var(--dsw-alias-state-error-primary) 12%, var(--dsw-alias-brand-primary) 88%, transparent);
  animation: hud-warning-pulse 1.6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .dsh-hud-stats__status[data-state="active"] { animation: none; }
  .dsh-hud-warning { animation: none; }
}

/* Semantic tones on the readout bars. */
.dsh-hud-stats__bar[data-tone="good"]::after { background: repeating-linear-gradient(90deg, var(--dsw-alias-state-success-primary) 0 4px, transparent 4px 6px); }
.dsh-hud-stats__bar[data-tone="warn"]::after { background: repeating-linear-gradient(90deg, var(--dsw-alias-brand-primary) 0 4px, transparent 4px 6px); }
.dsh-hud-stats__bar[data-tone="danger"]::after { background: repeating-linear-gradient(90deg, var(--dsw-alias-state-error-primary) 0 4px, transparent 4px 6px); }
.dsh-hud-stats__bar[data-tone="calm"]::after { background: repeating-linear-gradient(90deg, var(--hud-node) 0 4px, transparent 4px 6px); }

@keyframes hud-warn {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

.dsh-hud-stats:has(.dsh-hud-stats__bar[data-tone="danger"]) {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    inset 3px 0 0 var(--dsw-alias-state-error-primary),
    0 0 0 0.5px var(--dsw-alias-state-error-primary),
    4px 8px 18px rgba(0, 0, 0, 0.45);
}

.dsh-hud-stats:has(.dsh-hud-stats__bar[data-tone="danger"]) .dsh-hud-stats__bar::after {
  animation: hud-warn 1.4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .dsh-hud-stats:has(.dsh-hud-stats__bar[data-tone="danger"]) .dsh-hud-stats__bar::after { animation: none; }
}

@keyframes hud-glitch {
  0% { opacity: 0; transform: translateX(0); }
  20% { opacity: 0.9; transform: translateX(-2px); }
  40% { opacity: 0.3; transform: translateX(2px); }
  60% { opacity: 0.7; transform: translateX(-1px); }
  100% { opacity: 0; transform: translateX(0); }
}

.dsh-hud-stats__glitch {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(90deg, transparent, rgba(255, 48, 0, 0.22), transparent);
  animation: hud-glitch 260ms steps(3, end) 1 both;
}

@media (prefers-reduced-motion: reduce) {
  .dsh-hud-stats__glitch { display: none; }
}

/* Faint scanline texture: reads as a projected panel, costs nothing. */
.dsh-hud-stats__scan {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0.5;
  background: repeating-linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.035) 0 1px,
    transparent 1px 3px
  );
}

/* While a turn is actually running the panel's edge breathes orange. */
@keyframes hud-live {
  0%, 100% { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.10), inset 0 -1px 0 rgba(0, 0, 0, 0.50), 0 0 0 0.5px var(--hud-bracket), 4px 8px 18px rgba(0, 0, 0, 0.45); }
  50% { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.10), inset 0 -1px 0 rgba(0, 0, 0, 0.50), 0 0 0 0.5px var(--dsw-alias-brand-primary), 0 0 18px color-mix(in srgb, var(--ba-ac) 28%, transparent), 4px 8px 18px rgba(0, 0, 0, 0.45); }
}

html:root body:has([data-phase="active"]) .dsh-hud-stats {
  animation: hud-live 2.6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  html:root body:has([data-phase="active"]) .dsh-hud-stats { animation: none; }
}

/* One-shot scan when the readouts actually change. */
@keyframes hud-sweep {
  from { transform: translateX(-130%); }
  to { transform: translateX(340%); }
}

.dsh-hud-stats__sweep {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  border-radius: inherit;
}

.dsh-hud-stats__sweep::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 42%;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--ba-ac) 30%, transparent), transparent);
  animation: hud-sweep 720ms ease-out 1 both;
}

@media (prefers-reduced-motion: reduce) {
  .dsh-hud-stats__sweep { display: none; }
}

/* Scrollbars join the same language: hairline rail, orange on hover. */
html:root body ::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

html:root body ::-webkit-scrollbar-track {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.05));
}

html:root body ::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.14));
  box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.10);
  border-radius: 0;
  transition: background 160ms ease, box-shadow 160ms ease;
}

html:root body ::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(255, 170, 80, 0.85), rgba(232, 145, 45, 0.65));
  box-shadow:
    inset 0 0 0 0.5px rgba(255, 200, 140, 0.45),
    0 0 8px color-mix(in srgb, var(--ba-ac) 35%, transparent);
}

html:root body ::-webkit-scrollbar-thumb:active {
  background: linear-gradient(180deg, rgba(255, 190, 110, 0.95), rgba(232, 145, 45, 0.8));
}

/* Segmented readout bar, like a Division armour/health strip. */
.dsh-hud-stats__bar {
  grid-column: 1 / -1;
  position: relative;
  height: 4px;
  margin-top: 3px;
  background: repeating-linear-gradient(90deg, var(--hud-bracket) 0 4px, transparent 4px 6px);
}

.dsh-hud-stats__bar::after {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--fill);
  transition: width 220ms cubic-bezier(0.22, 0.88, 0.24, 1);
  background: repeating-linear-gradient(90deg, var(--dsw-alias-brand-primary) 0 4px, transparent 4px 6px);
}

/* Top tick ruler: a HUD header line, purely decorative. */
.dsh-hud-stats::after {
  content: "";
  position: absolute;
  top: 3px;
  right: 6px;
  width: 54px;
  height: 3px;
  pointer-events: none;
  background: repeating-linear-gradient(90deg, var(--hud-bracket) 0 1px, transparent 1px 5px);
}

.dsh-hud-stats[data-cols="2"] {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 20px;
  min-width: 420px;
}

.dsh-hud-stats__grip {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 18px;
  pointer-events: auto;
  cursor: grab;
  z-index: 4;
  background:
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 3px 4px / 8px 1px no-repeat,
    linear-gradient(var(--hud-bracket), var(--hud-bracket)) 3px 8px / 8px 1px no-repeat;
}

.dsh-hud-stats__grip:active {
  cursor: grabbing;
}

.dsh-hud-stats__edge {
  position: absolute;
  top: 6px;
  bottom: 18px;
  right: 0;
  width: 7px;
  pointer-events: auto;
  cursor: ew-resize;
  background: transparent;
}

.dsh-hud-stats__bottom {
  position: absolute;
  left: 26px;
  right: 26px;
  bottom: 0;
  height: 5px;
  pointer-events: auto;
  cursor: ns-resize;
  background: transparent;
}

.dsh-hud-stats__resize {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 16px;
  height: 16px;
  z-index: 3;
  pointer-events: auto;
  cursor: ew-resize;
  background:
    linear-gradient(135deg, transparent 45%, var(--hud-bracket) 45% calc(45% + 1px), transparent calc(45% + 1px)) 100% 100% / 12px 12px no-repeat;
}

.dsh-hud-stats[data-cut="true"] {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 0 0 0.5px var(--hud-bracket);
}

.dsh-hud-stats__row {
  display: grid;
  grid-template-columns: 16px auto minmax(0, 1fr);
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 3px 0;
}

.dsh-hud-stats__icon-box {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  color: var(--dsw-alias-label-secondary);
  opacity: 0.85;
}

.dsh-hud-stats__icon-box.is-primary {
  color: var(--dsw-alias-brand-primary);
  opacity: 1;
}

.dsh-hud-stats__icon {
  display: block;
  flex: none;
  width: 15px;
  height: 15px;
  overflow: visible;
}

.dsh-hud-stats__value {
  white-space: nowrap;
  line-height: 1.2;
}

.dsh-hud-stats__value.is-primary {
  line-height: 1.05;
}

.dsh-hud-stats__value {
  font-size: 13px;
  line-height: 1.15;
  color: var(--dsw-alias-label-primary);
  letter-spacing: 0.02em;
}

.dsh-hud-stats__unit {
  margin-left: 3px;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--dsw-alias-label-secondary);
}

.dsh-hud-stats__value.is-primary {
  font-size: 21px;
  line-height: 1;
  color: var(--dsw-alias-brand-primary);
}

.dsh-hud-stats__label {
  justify-self: end;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--dsw-alias-label-secondary);
  white-space: nowrap;
}

@media (max-width: 720px) {
  .dsh-hud-stats { display: none; }
}

/* ── Motion: state changes only ───────────────────────────────────────────
   Every animation here is one-shot and tied to a real interface event (mount,
   focus, turn start). Nothing loops, so reading is never disturbed, and the
   whole block is skipped when the user asks for reduced motion. */
@media (prefers-reduced-motion: no-preference) {
  @keyframes hud-panel-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes hud-tick-in {
    from { opacity: 0; transform: scaleX(0); }
    to { opacity: 1; transform: scaleX(1); }
  }

  @keyframes hud-settle {
    from { opacity: 0.85; }
    to { opacity: 1; }
  }

  /* No mount fade on the columns: the host remounts them on layout changes (and
     our own HUD re-attachment triggers renders), so the animation replays and the
     whole column blinks. */

  /* The running-turn bar draws itself from the left instead of popping in. */
  html:root body:has([data-phase="active"]) [class*="_centerCol"]::after {
    transform-origin: left center;
    animation: hud-tick-in 260ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
  }

  /* Composer focus: the card lifts 3px as its edge turns orange. */
  [data-slot="conversation.composer"] [class*="_card"] {
    transition: box-shadow 160ms ease, background-color 160ms ease;
  }

  [data-slot="conversation.composer"] [class*="_card"]:focus-within {
    animation: hud-settle 180ms ease-out both;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-slot="conversation.composer"] [class*="_card"]::after {
    transition: none;
  }
}
`;

    // ── HUD stat cluster ─────────────────────────────────────────────────────
    // Mirrors the host's [data-composer-stat] readouts into a panel you can
    // move, resize and restyle: drag the grip to move, drag the corner to
    // resize, or set exact values on its Settings page. Everything is stored
    // in localStorage and applied live.
    const h = React.createElement;

    const HUD_KEY = 'blockade-alter.hud.v9';
    const HUD_DEFAULTS = {
      cols: 1,
      width: 'content',     // 'content' | 'sidebar' | 'px'
      widthPx: 280,
      height: 'auto',   // 'auto' | 'px'
      rise: 150,        // px above the account row
      heightPx: 0,
      baseline: 'free',     // 'free' | 'account' | 'composer' | 'window'
      left: 16,
      bottom: 260,
      lift: false,          // only used when the baseline is the composer
      radius: 4,
      cut: true,
      tilt: 7,
      layer: 2,             // same stacking band as the sidebar, not an overlay
      lite: false,          // drop the expensive effects on weak GPUs
      accent: DEFAULT_ACCENT, // 主题色，其余配色由它推算
      stars: true,          // 星空背景
      lattice: true,        // 神经连线
      pulse: false,         // 亮节点缓慢明暗变化
      bg: '',               // custom background: a CSS image value or a data URL
    };

    const HUD_LEGACY_KEYS = ['blockade-alter.hud.v8', 'blockade-alter.hud.v7', 'blockade-alter.hud.v6', 'blockade-alter.hud.v5', 'blockade-alter.hud.v4', 'blockade-alter.hud.v3', 'blockade-alter.hud.v2'];

    function readHudConfig() {
      try {
        const current = localStorage.getItem(HUD_KEY);
        if (current) return Object.assign({}, HUD_DEFAULTS, JSON.parse(current));

        // One-time migration. Everything the user tuned is kept, except the two
        // rules that were requested explicitly afterwards: bottom edge level
        // with the composer, and the account row lifted above the panel.
        for (const key of HUD_LEGACY_KEYS) {
          const legacy = localStorage.getItem(key);
          if (!legacy) continue;
          const merged = Object.assign({}, HUD_DEFAULTS, JSON.parse(legacy), {
            baseline: 'free',     // 'free' | 'account' | 'composer' | 'window'
            lift: false,
            cut: true,
            tilt: 7,
            // A stale fixed height from the first drag pass clipped the panel.
            height: 'auto',
          });
          // Sit a little further from the account row than the previous build.
          merged.bottom = Math.round((Number(merged.bottom) || 220) + 40);
          try {
            localStorage.setItem(HUD_KEY, JSON.stringify(merged));
            HUD_LEGACY_KEYS.forEach((stale) => localStorage.removeItem(stale));
          } catch (error) { /* private mode */ }
          return merged;
        }
        return Object.assign({}, HUD_DEFAULTS);
      } catch (error) {
        return Object.assign({}, HUD_DEFAULTS);
      }
    }

    function writeHudConfig(patch) {
      const next = Object.assign(readHudConfig(), patch || {});
      try { localStorage.setItem(HUD_KEY, JSON.stringify(next)); } catch (error) { /* private mode */ }
      window.dispatchEvent(new CustomEvent('blockade-alter:hud'));
      return next;
    }

    const ICONS = {
      turns: ['M2 4h10', 'M2 8h10', 'M2 12h6'],
      speed: ['M2 10a5 5 0 0 1 10 0', 'M7 10l3.4-3.6', 'M7 10h0.01'],
      tokens: ['M7 2l5 3-5 3-5-3z', 'M2 8l5 3 5-3'],
      cache: ['M8.5 1.5L3.5 8H7l-.5 4.5L11 6H7.5z'],
      context: ['M7 2a5 5 0 1 1-5 5', 'M7 2v5h5'],
      generic: ['M2.5 2.5h9v9h-9z', 'M5 7h4'],
    };

    function classify(text) {
      if (/tok\/s|tok\/sec|tok\/秒/i.test(text)) return 'speed';
      if (/缓存|cache/i.test(text)) return 'cache';
      if (/%/.test(text)) return 'context';
      if (/轮|步|turn|step/i.test(text)) return 'turns';
      if (/tok/i.test(text)) return 'tokens';
      return 'generic';
    }

    const LEADING_UNIT = /^(轮|步|次|项|个|条|秒|分)(?=\s|$)/;

    /** Split "245 turns 811 steps" into two value/unit pairs. */
    const PAIR = /([\d][\d.,]*\s*[MKB]?)\s*(%|tok\/s|tok|[A-Za-z]+|[\u4e00-\u9fff]+)/g;

    function pairUp(text) {
      const out = [];
      let cursor = 0;
      let match;
      PAIR.lastIndex = 0;
      while ((match = PAIR.exec(text)) !== null) {
        out.push({ value: match[1].trim(), unit: match[2].trim(), lead: text.slice(cursor, match.index).trim() });
        cursor = PAIR.lastIndex;
      }
      if (out.length === 0) return [{ value: text, unit: '', lead: '' }];
      const tail = text.slice(cursor).trim();
      if (tail) out[out.length - 1].lead = (out[out.length - 1].lead + ' ' + tail).trim();
      return out;
    }
    function glyph(kind) {
      const paths = ICONS[kind] || ICONS.generic;
      return h('svg', {
        viewBox: '0 0 14 14',
        width: 14,
        height: 14,
        'aria-hidden': true,
        className: 'dsh-hud-stats__icon',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.1,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }, ...paths.map((d) => h('path', { d, key: d })));
    }

    /** Tweens the numeric part of a readout when it changes (game-style roll). */    function toneOf(label, unit, value) {
      if (unit !== '%') return null;
      const numeric = parseFloat(value);
      if (!Number.isFinite(numeric)) return null;
      const efficiency = /缓存|cache/i.test(label);
      // Cache hit: green only when it is genuinely high, amber below that.
      if (efficiency) return numeric >= 90 ? 'good' : 'warn';
      if (numeric >= 80) return 'danger';
      if (numeric >= 60) return 'warn';
      return 'calm';
    }

    /** Trend line for the sampled streaming rate; plain SVG, no dependency. */    const SEPARATOR = /[·•|]/;

    function SettingsHints(props) {
      const t = props.t;
      const [box, setBox] = React.useState(null);

      React.useEffect(() => {
        const measure = () => {
          const nav = document.querySelector('[class*="_navList"]');
          const panel = nav ? nav.closest('[class*="_panel"]') : null;
          if (!panel) { setBox(null); return; }
          const rect = panel.getBoundingClientRect();
          if (rect.width < 240) { setBox(null); return; }
          setBox({
            left: Math.round(rect.left + 20),
            width: Math.round(rect.width - 40),
            bottom: Math.max(12, Math.round(window.innerHeight - rect.bottom + 14)),
          });
        };
        measure();
        const observer = new MutationObserver(measure);
        observer.observe(document.body, { subtree: true, childList: true });
        window.addEventListener('resize', measure);
        return () => {
          observer.disconnect();
          window.removeEventListener('resize', measure);
        };
      }, []);

      if (!box) return null;

      return h('div', {
        className: 'dsh-settings-hints',
        'aria-hidden': true,
        style: { left: box.left + 'px', width: box.width + 'px', bottom: box.bottom + 'px' },
      },
        h('span', { className: 'dsh-settings-hints__key' }, 'Esc'),
        h('span', { className: 'dsh-settings-hints__label' }, t('hintBack')));
    }

    // ── 设置页：主题色 ────────────────────────────────────────────────────────
    // 7 个预设 + 自制色盘（饱和度/明度方块、色相条、HEX、R/G/B）。和其它开关一样改了立即生效。
    // 色盘内部按 HSV 存，拖到灰色（饱和度 0）时色相不丢。
    function AccentPicker(props) {
      const accent = props.accent;
      const update = props.update;
      const [hsv, setHsv] = React.useState(() => rgbToHsv(hexToRgb(accent)));
      const [hexText, setHexText] = React.useState(accent);
      const svRef = React.useRef(null);

      // 外部改了色（预设、恢复默认、灵魂狭间联动）：同步色盘；灰色保留原来的色相
      React.useEffect(() => {
        setHexText(accent);
        if (rgbToHex(hsvToRgb(hsv)) === accent) return;
        const next = rgbToHsv(hexToRgb(accent));
        setHsv(next[1] ? next : [hsv[0], next[1], next[2]]);
      }, [accent]);

      const setFromHsv = (next) => {
        setHsv(next);
        update({ accent: rgbToHex(hsvToRgb(next)) });
      };
      const clamp = (x) => Math.min(1, Math.max(0, x));
      const drag = (event, fn) => {
        if (event.type === 'pointerdown') event.currentTarget.setPointerCapture(event.pointerId);
        else if (event.buttons !== 1) return;
        const r = event.currentTarget.getBoundingClientRect();
        fn(clamp((event.clientX - r.left) / r.width), clamp((event.clientY - r.top) / r.height));
      };
      const onSv = (event) => drag(event, (x, y) => setFromHsv([hsv[0], x, 1 - y]));
      const onHue = (event) => drag(event, (x) => setFromHsv([x * 359.9, hsv[1], hsv[2]]));
      const svKey = (event) => {
        const d = { ArrowRight: [1, 0.02], ArrowLeft: [1, -0.02], ArrowUp: [2, 0.02], ArrowDown: [2, -0.02] }[event.key];
        if (!d) return;
        event.preventDefault();
        const next = hsv.slice();
        next[d[0]] = clamp(next[d[0]] + d[1]);
        setFromHsv(next);
      };
      const hueKey = (event) => {
        const d = { ArrowRight: 2, ArrowUp: 2, ArrowLeft: -2, ArrowDown: -2 }[event.key];
        if (!d) return;
        event.preventDefault();
        setFromHsv([(hsv[0] + d + 360) % 360, hsv[1], hsv[2]]);
      };
      const typedHex = (text) => {
        setHexText(text);
        const v = text.startsWith('#') ? text : '#' + text;
        if (isHex(v)) update({ accent: v.toUpperCase() });
      };
      const rgb = hexToRgb(accent);
      const typedRgb = (i, text) => {
        const n = Number(text);
        if (text === '' || !Number.isInteger(n) || n < 0 || n > 255) return;
        const next = rgb.slice();
        next[i] = n;
        update({ accent: rgbToHex(next) });
      };

      const dark = document.body.hasAttribute('data-ds-dark-theme');
      const mode = dark ? 'dark' : 'light';
      const ratio = contrast(accent, SURFACE[mode]);
      const tx = accentText(accent, mode);
      const preset = PRESETS.find((p) => p[1] === accent);

      return h('div', { className: 'ba-pal' },
        h('div', { className: 'ba-pal__swatches', role: 'group', 'aria-label': '预设主题色' },
          ...PRESETS.map(([name, hex]) => h('button', {
            type: 'button',
            key: hex,
            className: 'ba-pal__swatch',
            'aria-pressed': accent === hex,
            onClick: () => update({ accent: hex }),
          }, h('i', { style: { backgroundColor: hex } }), name)),
          h('button', {
            type: 'button',
            key: 'custom',
            className: 'ba-pal__swatch ba-pal__swatch--custom',
            'aria-pressed': !preset,
            onClick: () => svRef.current && svRef.current.focus(),
          }, h('i', { 'aria-hidden': true }, '+'), '自定义')),
        h('div', { className: 'ba-pal__picker' },
          h('div', {
            ref: svRef,
            className: 'ba-pal__sv',
            role: 'slider',
            tabIndex: 0,
            'aria-label': '饱和度与明度',
            'aria-valuetext': '饱和度 ' + Math.round(hsv[1] * 100) + '%，明度 ' + Math.round(hsv[2] * 100) + '%',
            style: { '--ba-hue': 'hsl(' + hsv[0] + ' 100% 50%)' },
            onPointerDown: onSv,
            onPointerMove: onSv,
            onKeyDown: svKey,
          }, h('i', { className: 'ba-pal__knob', style: { left: hsv[1] * 100 + '%', top: (1 - hsv[2]) * 100 + '%' } })),
          h('div', {
            className: 'ba-pal__hue',
            role: 'slider',
            tabIndex: 0,
            'aria-label': '色相',
            'aria-valuemin': 0,
            'aria-valuemax': 360,
            'aria-valuenow': Math.round(hsv[0]),
            onPointerDown: onHue,
            onPointerMove: onHue,
            onKeyDown: hueKey,
          }, h('i', { className: 'ba-pal__bar', style: { left: (hsv[0] / 360) * 100 + '%' } })),
          h('div', { className: 'ba-pal__fields' },
            h('input', {
              type: 'text',
              className: 'dsh-hud-settings__num',
              'aria-label': '色值 HEX',
              value: hexText,
              maxLength: 7,
              spellCheck: false,
              onChange: (event) => typedHex(event.target.value.trim()),
            }),
            h('div', { className: 'ba-pal__rgb' },
              ...['R', 'G', 'B'].map((c, i) => h('input', {
                key: c,
                type: 'text',
                inputMode: 'numeric',
                className: 'dsh-hud-settings__num',
                'aria-label': c,
                value: rgb[i],
                maxLength: 3,
                onChange: (event) => typedRgb(i, event.target.value.trim()),
              }))),
            h('span', { className: 'ba-pal__note' },
              '与' + (dark ? '深' : '浅') + '色底对比度 ' + ratio.toFixed(1) + ' : 1 · 小字自动改用 ' + tx + '（' + contrast(tx, SURFACE[mode]).toFixed(1) + ' : 1）'),
            ratio < 3 ? h('span', { className: 'ba-pal__note ba-pal__note--bad', role: 'status' }, '这个颜色在当前底色上不够清楚') : null,
            h('button', {
              type: 'button',
              className: 'dsh-hud-settings__btn',
              disabled: accent === DEFAULT_ACCENT,
              onClick: () => update({ accent: DEFAULT_ACCENT }),
            }, '恢复默认色 · 深海蓝'))));
    }

    // ── Settings page ────────────────────────────────────────────────────────
    // Every geometric knob in one place: columns, width, baseline, offsets,
    // corner radius, cut corners and stacking layer. Values apply instantly.
    function HudSettings(props) {
      const t = props.t;
      const [config, setConfig] = React.useState(readHudConfig);

      React.useEffect(() => {
        const sync = () => setConfig(readHudConfig());
        window.addEventListener('blockade-alter:hud', sync);
        return () => window.removeEventListener('blockade-alter:hud', sync);
      }, []);

      const update = (patch) => writeHudConfig(patch);

      const toggle = (key) => h('button', {
        type: 'button',
        className: 'dsh-hud-settings__btn' + (config[key] ? ' is-on' : ''),
        'aria-pressed': Boolean(config[key]),
        onClick: () => update({ [key]: !config[key] }),
      }, config[key] ? '开 · On' : '关 · Off');

      const row = (label, control) => h('div', { className: 'dsh-hud-settings__row' },
        h('span', { className: 'dsh-hud-settings__label' }, label),
        control);

      return h('div', { className: 'dsh-hud-settings' },
        h('h2', { className: 'dsh-hud-settings__title' }, '全鲸封锁'),
        h('p', { className: 'dsh-hud-settings__hint' }, '主题色会同步到灵魂狭间（两边都装时）。要停用皮肤，在插件管理里关掉本插件。'),
        h('h3', { className: 'dsh-hud-settings__title' }, '主题色 · Accent'),
        h(AccentPicker, { accent: accentOf(config), update }),
        row('星空背景 · Stars', toggle('stars')),
        row('神经连线 · Lattice', toggle('lattice')),
        row('节点脉动 · Pulse', toggle('pulse')),
        row('自定义背景 · Custom background', h('span', { className: 'dsh-hud-settings__bg' },
          h('input', {
            type: 'text',
            className: 'dsh-hud-settings__num',
            value: config.bg || '',
            placeholder: 'url("...") / 渐变',
            onChange: (event) => update({ bg: event.target.value }),
          }),
          h('input', {
            type: 'file',
            accept: 'image/*',
            className: 'dsh-hud-settings__file',
            onChange: (event) => {
              const file = event.target.files && event.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => update({ bg: 'url("' + String(reader.result) + '")' });
              reader.readAsDataURL(file);
            },
          }))),
        row('轻量模式 · Lite mode', toggle('lite')),
        h('div', { className: 'dsh-hud-settings__foot' },
          h('button', {
            type: 'button',
            className: 'dsh-hud-settings__reset',
            onClick: () => {
              try { localStorage.removeItem(HUD_KEY); } catch (error) { /* private mode */ }
              window.dispatchEvent(new CustomEvent('blockade-alter:hud'));
            },
          }, '恢复默认 · Reset')));
    }

    // Interval that stops completely while the window is hidden: no wake-ups,
    // no layout reads in the background.
    function startLoop(fn, ms) {
      let id = null;
      const run = () => { if (document.hidden) return; try { fn(); } catch (error) {} };
      const start = () => { if (id === null) id = setInterval(run, ms); };
      const stop = () => { if (id !== null) { clearInterval(id); id = null; } };
      const onVisibility = () => { if (document.hidden) stop(); else start(); };
      document.addEventListener('visibilitychange', onVisibility);
      start();
      return () => { stop(); document.removeEventListener('visibilitychange', onVisibility); };
    }

    // ── Flow HUD (plain DOM) ─────────────────────────────────────────────────
    // Renders the readout cluster inside the sidebar column. Kept out of React on
    // purpose: relocating a React-managed node unmounts the app.
    function mountFlowHud() {
      const host = document.createElement('div');
      host.className = 'dsh-hud-stats dsh-hud-inline';
      host.setAttribute('aria-hidden', 'true');

      const scan = document.createElement('span');
      scan.className = 'dsh-hud-stats__scan';
      host.appendChild(scan);

      const list = document.createElement('div');
      list.className = 'dsh-hud-stats__list';
      host.appendChild(list);

      const spark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      spark.setAttribute('class', 'dsh-hud-stats__spark');
      spark.setAttribute('viewBox', '0 0 100 28');
      spark.setAttribute('preserveAspectRatio', 'none');
      spark.setAttribute('aria-hidden', 'true');
      host.appendChild(spark);

      const status = document.createElement('span');
      status.className = 'dsh-hud-stats__status';
      status.setAttribute('data-state', 'idle');
      host.appendChild(status);

      const icon = (kind) => '<svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" class="dsh-hud-stats__icon" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">' +
        (ICONS[kind] || ICONS.generic).map((d) => '<path d="' + d + '"></path>').join('') + '</svg>';

      const readSegments = () => {
        const out = [];
        document.querySelectorAll('[data-composer-stat]').forEach((node) => {
          const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
          if (!text) return;
          text.split(SEPARATOR).forEach((part) => {
            const segment = part.trim();
            if (segment) out.push(segment);
          });
        });
        return out;
      };

      const samples = [];
      const rowsCache = [];

      const render = () => {
        const segments = readSegments();
        const pairs = [];

        // The host stopped rendering turn/step counts, so count them ourselves:
        // one user message is a turn, one tool call is a step.
        const turns = document.querySelectorAll('[data-chat-flow-kind="user"]').length;
        const steps = document.querySelectorAll('[data-chat-flow-kind="tool-call"], [class*="_callRow"]').length;
        if (turns > 0) pairs.push({ text: 'turns', pair: { value: String(turns), unit: '轮', lead: '' } });
        if (steps > 0) pairs.push({ text: 'steps', pair: { value: String(steps), unit: '步', lead: '' } });

        segments.forEach((segment) => { pairUp(segment).forEach((pair) => pairs.push({ text: segment, pair })); });

        // Build once, then only touch the text nodes: rebuilding innerHTML would
        // restart the bar transitions on every tick.
        if (rowsCache.length !== pairs.length) {
          list.textContent = '';
          rowsCache.length = 0;
          pairs.forEach((entry, index) => {
            const kind = classify(entry.pair.unit + ' ' + entry.pair.lead);
            const row = document.createElement('div');
            row.className = 'dsh-hud-stats__row';
            row.innerHTML =
              '<span class="dsh-hud-stats__icon-box' + (index === 0 ? ' is-primary' : '') + '">' + icon(kind) + '</span>' +
              '<span class="dsh-hud-stats__value' + (index === 0 ? ' is-primary' : '') + '"></span>' +
              '<span class="dsh-hud-stats__label"></span>';
            list.appendChild(row);
            rowsCache.push({
              row,
              value: row.querySelector('.dsh-hud-stats__value'),
              label: row.querySelector('.dsh-hud-stats__label'),
              unit: null,
              bar: null,
            });
          });
        }

        pairs.forEach((entry, index) => {
          const slot = rowsCache[index];
          if (!slot) return;
          const unitRight = index < 4;
          const unit = entry.pair.unit || '';
          const lead = entry.pair.lead || '';
          const numeric = parseFloat(entry.pair.value);
          const percent = unit === '%' && Number.isFinite(numeric) ? Math.max(0, Math.min(100, numeric)) : null;

          if (slot.lastValue !== undefined && slot.lastValue !== entry.pair.value) {
            slot.value.classList.remove('is-rolling');
            void slot.value.offsetWidth;   // restart the one-shot animation
            slot.value.classList.add('is-rolling');
          }
          slot.lastValue = entry.pair.value;
          slot.value.textContent = entry.pair.value;
          if (slot.unit) slot.unit.remove();
          slot.unit = null;
          if (!unitRight && unit) {
            slot.unit = document.createElement('span');
            slot.unit.className = 'dsh-hud-stats__unit';
            slot.unit.textContent = unit;
            slot.value.appendChild(slot.unit);
          }
          // Percent rows usually read "缓存命中 99.8%": keep the label.
          slot.label.textContent = lead || (unitRight ? unit : '');

          if (percent !== null) {
            if (!slot.bar) {
              slot.bar = document.createElement('span');
              slot.bar.className = 'dsh-hud-stats__bar';
              slot.row.appendChild(slot.bar);
            }
            slot.bar.dataset.tone = toneOf(entry.text, unit, entry.pair.value) || 'calm';
            slot.bar.style.setProperty('--fill', percent + '%');
          } else if (slot.bar) {
            slot.bar.remove();
            slot.bar = null;
          }
        });

        // Trend line from the throughput sample.
        const speed = pairs.find((entry) => /tok\/s/i.test(entry.pair.unit));
        if (speed) {
          const value = parseFloat(speed.pair.value);
          if (Number.isFinite(value)) samples.push(value);
          if (samples.length > 24) samples.shift();
        }
        if (samples.length >= 2) {
          const max = Math.max.apply(null, samples.concat(1));
          const step = 100 / (samples.length - 1);
          const path = samples.map((value, index) => {
            const x = index * step;
            const y = 26 - (value / max) * 22;
            return (index === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
          }).join(' ');
          spark.innerHTML =
            '<line x1="0" y1="26.5" x2="100" y2="26.5" stroke="var(--hud-bracket)" stroke-width="0.5" vector-effect="non-scaling-stroke"></line>' +
            '<path d="' + path + '" fill="none" stroke="var(--dsw-alias-brand-primary)" stroke-width="1.2" vector-effect="non-scaling-stroke"></path>';
        }

        const errored = document.querySelectorAll('[data-error]').length > 0;
        const running = Boolean(document.querySelector('[data-phase="active"]'));
        status.setAttribute('data-state', errored ? 'error' : running ? 'active' : 'idle');
      };

      // Insert once. Only act again when the host has actually removed the node:
      // re-inserting while it is attached made React re-render in a loop, which
      // read as the whole sidebar blinking.
      const place = () => {
        if (host.isConnected) return;
        const column = document.querySelector('[class*="_sidebarCol"]');
        if (!column) return;
        const foot = column.querySelector('[class*="_footArea"]');
        if (foot && foot.parentElement) foot.parentElement.insertBefore(host, foot);
        else column.appendChild(host);
      };

      const tick = () => { try { place(); render(); } catch (error) { /* never break the app */ } };
      tick();

      // React re-renders the sidebar on every stat tick and drops foreign nodes.
      // Re-insert synchronously on mutation so the gap never reaches a paint.
      let observer = null;
      const watch = () => {
        const column = document.querySelector('[class*="_sidebarCol"]');
        if (!column) return;
        if (observer && observer._target === column) return;
        if (observer) observer.disconnect();
        observer = new MutationObserver(() => { try { place(); } catch (error) {} });
        observer._target = column;
        observer.observe(column, { childList: true, subtree: true });
      };
      watch();
      const stopLoop = startLoop(() => { watch(); tick(); }, 700);
      return () => {
        stopLoop();
        if (observer) observer.disconnect();
        host.remove();
      };
    }

    return {
      inject: ['theme', 'slots', 'locale'],
      apply(ctx) {
        // A rejected token layer must not take the stylesheet down with it: the
        // palette degrades to the host default, the material system still loads.
        // Dock expansion: the docked panel is about half the window, the
        // full-bleed one fills it, so width is the signal. Clicks on the dock
        // controls update the flag immediately; measurement is the fallback.
        ctx.effect(() => {
          let frame = 0;
          let suppressUntil = 0;

          const visible = (node) => {
            const style = getComputedStyle(node);
            if (style.display === 'none' || style.visibility === 'hidden') return false;
            return node.getBoundingClientRect().width > 80;
          };

          const measure = () => {
            const nodes = Array.from(document.querySelectorAll('[class*="_rightbarCol"], [data-sidebar-right-panel]')).filter(visible);
            if (nodes.length === 0) {
              delete document.body.dataset.hudDockExpanded;
              return;
            }
            const width = Math.max(...nodes.map((node) => node.getBoundingClientRect().width));
            const ratio = width / window.innerWidth;
            const wasExpanded = document.body.dataset.hudDockExpanded === 'true';
            const suppressed = Date.now() < suppressUntil;
            if (ratio > 0.9 && !suppressed) document.body.dataset.hudDockExpanded = 'true';
            else if (ratio < (wasExpanded ? 0.55 : 0.9)) delete document.body.dataset.hudDockExpanded;
          };

          const schedule = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => { frame = 0; measure(); });
          };

          const onClick = (event) => {
            const button = event.target && event.target.closest ? event.target.closest('button') : null;
            if (!button) return;
            if (button.matches('[data-sidebar-right-mode="fullscreen"]')) {
              if (document.body.dataset.hudDockExpanded === 'true') {
                delete document.body.dataset.hudDockExpanded;
                suppressUntil = Date.now() + 1200;
              } else {
                document.body.dataset.hudDockExpanded = 'true';
              }
            } else if (button.matches('[data-sidebar-right-toggle]')) {
              delete document.body.dataset.hudDockExpanded;
              suppressUntil = Date.now() + 1200;
            }
          };

          document.addEventListener('click', onClick, true);
          schedule();
          const stopLoop = startLoop(schedule, 450);
          window.addEventListener('resize', schedule);
          return () => {
            document.removeEventListener('click', onClick, true);
            stopLoop();
            window.removeEventListener('resize', schedule);
            delete document.body.dataset.hudDockExpanded;
          };
        });

        // Per-side motion flags: [data-animating] is global, so both sidebars
        // lit up together. Width changes are tracked separately instead.
        ctx.effect(() => {
          let left = null;
          let right = null;
          let leftUntil = 0;
          let rightUntil = 0;
          let leftSettleAt = 0;
          let rightSettleAt = 0;

          const tick = () => {
            const l = document.querySelector('[class*="_sidebarCol"]');
            const r = document.querySelector('[class*="_rightbarCol"]');
            const lw = l ? Math.round(l.getBoundingClientRect().width) : 0;
            const rw = r ? Math.round(r.getBoundingClientRect().width) : 0;
            const now = Date.now();

            if (left !== null && Math.abs(lw - left) > 2) leftUntil = now + 280;
            if (right !== null && Math.abs(rw - right) > 2) rightUntil = now + 280;
            left = lw;
            right = rw;

            const leftMoving = now < leftUntil;
            const rightMoving = now < rightUntil;

            // Settle flash: fires once when a side stops resizing.
            if (!leftMoving && document.body.dataset.hudLeftMoving && now > leftSettleAt) {
              leftSettleAt = now + 900;
              document.body.dataset.hudLeftSettled = 'true';
              setTimeout(() => delete document.body.dataset.hudLeftSettled, 260);
            }
            if (!rightMoving && document.body.dataset.hudRightMoving && now > rightSettleAt) {
              rightSettleAt = now + 900;
              document.body.dataset.hudRightSettled = 'true';
              setTimeout(() => delete document.body.dataset.hudRightSettled, 260);
            }

            if (leftMoving) document.body.dataset.hudLeftMoving = 'true';
            else delete document.body.dataset.hudLeftMoving;
            if (rightMoving) document.body.dataset.hudRightMoving = 'true';
            else delete document.body.dataset.hudRightMoving;
          };

          const stopLoop = startLoop(tick, 130);
          tick();
          return () => {
            stopLoop();
            delete document.body.dataset.hudLeftMoving;
            delete document.body.dataset.hudRightMoving;
          };
        });

        // Tag the new-session button once, so the long attribute chain does not
        // have to be matched by every stylesheet rule.
        ctx.effect(() => {
          const tag = () => {
            const button = document.querySelector('[class*="_newSession"]');
            if (!button || button.hasAttribute('data-hud-new-session')) return;
            const cls = String(button.className);
            if (/_newSession(Content|Label|Shortcut|LabelMask)/.test(cls)) return;
            button.setAttribute('data-hud-new-session', '');
          };
          tag();
          const stopLoop = startLoop(tag, 1500);
          return () => stopLoop();
        });

        // Platform flag: Windows needs different hairlines and less blur (DWM
        // acrylic already blurs the window behind us).
        ctx.effect(() => {
          const ua = navigator.userAgent || '';
          const platform = /Windows/i.test(ua) ? 'win' : /Mac/i.test(ua) ? 'mac' : 'other';
          document.documentElement.dataset.os = platform;
          if (/Windows/i.test(ua)) document.body.dataset.hudPlatform = 'win';
          return () => {
            delete document.documentElement.dataset.os;
            delete document.body.dataset.hudPlatform;
          };
        });

        // Streaming cursor: keep a blinking block at the end of the live answer.
        // The host marks the running turn with data-phase, not data-streaming.
        ctx.effect(() => {
          const cursor = document.createElement('span');
          cursor.className = 'dsh-hud-cursor';
          cursor.setAttribute('aria-hidden', 'true');

          const findTail = () => {
            const active = document.querySelector('[data-phase="active"]');
            if (!active) return null;
            // Only paragraphs of the answer itself: tool cards and code blocks
            // made the block jump around or sit inside a <pre>.
            const blocks = Array.from(active.querySelectorAll('p')).filter((node) => (
              !node.closest('[class*="_callRow"], pre, [class*="_toolCard"], [data-chat-flow-kind="turn-process"]')
            ));
            return blocks.length ? blocks[blocks.length - 1] : null;
          };

          const tick = () => {
            try {
              const tail = findTail();
              if (!tail) {
                if (cursor.parentElement) cursor.remove();
                return;
              }
              if (cursor.parentElement !== tail) {
                cursor.remove();
                tail.appendChild(cursor);
              }
            } catch (error) { /* never break the app */ }
          };

          tick();
          const stopLoop = startLoop(tick, 400);
          return () => {
            stopLoop();
            cursor.remove();
          };
        });

        // Boot-in: one-time flag on <html> for the first second after load, so the
        // panels rise in sequence exactly once and never replay on re-render.
        ctx.effect(() => {
          let frames = 0;
          const marked = [];
          const mark = () => {
            frames += 1;
            if (frames < 2) { requestAnimationFrame(mark); return; }
            // Tag only the nodes that exist right now: a column the host mounts
            // later must not inherit the entrance and replay it.
            document.querySelectorAll(
              '[class*="_sidebarCol"], [class*="_centerCol"], [class*="_rightbarCol"], ' +
              '[data-slot="conversation.composer"] [class*="_card"], .dsh-hud-stats'
            ).forEach((node) => {
              node.classList.add('dsh-hud-booting');
              marked.push(node);
            });
          };
          requestAnimationFrame(mark);
          const timer = setTimeout(() => marked.forEach((node) => node.classList.remove('dsh-hud-booting')), 900);
          return () => {
            clearTimeout(timer);
            marked.forEach((node) => node.classList.remove('dsh-hud-booting'));
          };
        });

        // Window blur: the whole HUD dims while the app is not focused, like a
        // game that pauses when you look away.
        ctx.effect(() => {
          const dim = document.createElement('div');
          dim.className = 'dsh-hud-dim';
          document.body.appendChild(dim);
          // 焦点进了页面里的 iframe（比如灵魂狭间面板）也会触发 blur，但窗口还在前台：
          // 等焦点落定后用 hasFocus() 判断，子 iframe 有焦点时它仍为 true，不压暗
          const onBlur = () => setTimeout(() => {
            if (!document.hasFocus()) document.documentElement.setAttribute('data-hud-blur', 'true');
          }, 0);
          const onFocus = () => document.documentElement.removeAttribute('data-hud-blur');
          const onVis = () => { if (document.hidden) onBlur(); else onFocus(); };
          window.addEventListener('blur', onBlur);
          window.addEventListener('focus', onFocus);
          document.addEventListener('visibilitychange', onVis);
          return () => {
            window.removeEventListener('blur', onBlur);
            window.removeEventListener('focus', onFocus);
            document.removeEventListener('visibilitychange', onVis);
            document.documentElement.removeAttribute('data-hud-blur');
            dim.remove();
          };
        });

        // 背景：深空 + 星点 + 神经连线（替代原来的等高线与扫光）。固定种子生成，布局只在尺寸、主题色、
        // 明暗、开关变化时重算；平时以 30 帧慢慢动：少数星点闪烁，节点小幅漂移、连线跟着走，
        // 「节点脉动」开着时亮节点呼吸。窗口在后台、轻量模式、系统要求减少动态效果时停在静止的一帧
        ctx.effect(() => {
          const layer = document.createElement('div');
          layer.className = 'ba-backdrop';
          layer.setAttribute('aria-hidden', 'true');
          const canvas = document.createElement('canvas');
          layer.appendChild(canvas);
          document.body.appendChild(layer);
          const g = canvas.getContext('2d');
          const still = window.matchMedia('(prefers-reduced-motion: reduce)');

          // 固定种子的伪随机数（mulberry32），每次打开图案一样
          const rng = (seed) => () => {
            seed = (seed + 0x6d2b79f5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
          };
          const alpha = (hex, a) => 'rgba(' + hexToRgb(hex).join(', ') + ', ' + a.toFixed(3) + ')';
          const TAU = Math.PI * 2;

          let scene = null;
          const build = () => {
            let config = {};
            try { config = readHudConfig(); } catch (error) { /* private mode */ }
            const w = window.innerWidth;
            const hgt = window.innerHeight;
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            canvas.width = w * dpr;
            canvas.height = hgt * dpr;
            g.setTransform(dpr, 0, 0, dpr, 0, 0);
            const rand = rng(20261109);
            const area = w * hgt;
            const stars = config.stars === false ? [] : Array.from({ length: Math.round(area / 2600) }, () => ({
              x: rand() * w, y: rand() * hgt, r: rand() < 0.92 ? 0.6 : 1.2, a: rand(),
              tw: rand() < 0.15 ? 0.5 + rand() * 1.5 : 0, ph: rand() * TAU, // 约 15% 的星点闪烁
            }));
            const nodes = config.lattice === false ? [] : Array.from({ length: Math.round(area / 26000) }, () => ({
              x: rand() * w, y: rand() * hgt, ax: 6 + rand() * 10, ay: 6 + rand() * 10,
              sx: 0.04 + rand() * 0.06, sy: 0.04 + rand() * 0.06, ph: rand() * TAU, lit: rand() < 0.1, px: 0, py: 0,
            }));
            // 每个节点连最近的两个，太远不连：图案稀疏、不成网格。按初始位置算一次，漂移时连线跟着端点走
            const links = [];
            nodes.forEach((a) => {
              nodes.filter((b) => b !== a).map((b) => [b, Math.hypot(a.x - b.x, a.y - b.y)])
                .sort((p, q) => p[1] - q[1]).slice(0, 2)
                .forEach(([b, d]) => { if (d <= 240) links.push([a, b, d]); });
            });
            const dark = document.body.hasAttribute('data-ds-dark-theme');
            scene = { w, hgt, stars, nodes, links, dark, pulse: config.pulse === true, ac: accentOf(config), star: dark ? '200, 215, 255' : '90, 100, 130' };
          };

          const paint = (t) => {
            const { w, hgt, stars, nodes, links, dark, pulse, ac, star } = scene;
            g.clearRect(0, 0, w, hgt);
            for (const s of stars) {
              let a = (dark ? 0.25 : 0.12) + s.a * (dark ? 0.45 : 0.18);
              if (s.tw) a *= 0.55 + 0.45 * Math.sin(t * s.tw + s.ph);
              g.fillStyle = 'rgba(' + star + ', ' + a.toFixed(3) + ')';
              g.fillRect(s.x, s.y, s.r, s.r);
            }
            for (const n of nodes) {
              n.px = n.x + n.ax * Math.sin(t * n.sx + n.ph);
              n.py = n.y + n.ay * Math.cos(t * n.sy + n.ph);
            }
            g.lineWidth = 1;
            for (const [a, b, d] of links) {
              g.strokeStyle = alpha(ac, (dark ? 0.22 : 0.16) * (1 - d / 300));
              g.beginPath();
              g.moveTo(a.px, a.py);
              g.lineTo(b.px, b.py);
              g.stroke();
            }
            for (const n of nodes) {
              const breath = n.lit && pulse ? 0.6 + 0.4 * Math.sin(t * 1.05 + n.ph) : 1;
              if (n.lit) {
                g.fillStyle = alpha(ac, 0.18 * breath);
                g.beginPath();
                g.arc(n.px, n.py, 8, 0, TAU);
                g.fill();
              }
              g.fillStyle = alpha(ac, n.lit ? 0.9 * breath : dark ? 0.45 : 0.35);
              g.beginPath();
              g.arc(n.px, n.py, n.lit ? 2 : 1.3, 0, TAU);
              g.fill();
            }
          };

          const moving = () => !still.matches && !document.hidden
            && !document.body.hasAttribute('data-hud-lite') && !document.body.hasAttribute('data-hud-idle');
          let frame = 0;
          let last = 0;
          const tick = (now) => {
            frame = 0;
            if (!moving()) return;
            frame = requestAnimationFrame(tick);
            if (now - last < 33) return; // 30 帧足够，省一半重绘
            last = now;
            paint(now / 1000);
          };
          const start = () => { if (!frame && moving()) frame = requestAnimationFrame(tick); };
          let pending = 0;
          const later = () => {
            cancelAnimationFrame(pending);
            pending = requestAnimationFrame(() => { build(); paint(performance.now() / 1000); start(); });
          };
          build();
          paint(performance.now() / 1000);
          start();
          window.addEventListener('resize', later);
          window.addEventListener('blockade-alter:hud', later);
          document.addEventListener('visibilitychange', start);
          still.addEventListener('change', start);
          // 宿主切明暗、轻量模式、窗口进出后台：body 上的属性变了就重画并决定动不动
          const mo = new MutationObserver(later);
          mo.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme', 'data-hud-lite', 'data-hud-idle'] });
          return () => {
            cancelAnimationFrame(frame);
            cancelAnimationFrame(pending);
            window.removeEventListener('resize', later);
            window.removeEventListener('blockade-alter:hud', later);
            document.removeEventListener('visibilitychange', start);
            still.removeEventListener('change', start);
            mo.disconnect();
            layer.remove();
          };
        });

        // 主题色联动：和灵魂狭间（dsh-chara-soul）约定的宿主窗口接口。
        //   window.__dshAccent            当前主题色 #RRGGBB
        //   'dsh-accent' 事件 { accent, source }   谁改了色就发一次
        // 两个插件都装了才有人听；只装一个时事件没人接，各管各的。
        ctx.effect(() => {
          let linking = false;
          const sync = () => {
            let config = {};
            try { config = readHudConfig(); } catch (error) { /* private mode */ }
            const accent = accentOf(config);
            paintAccent(accent);
            if (window.__dshAccent === accent) return;
            window.__dshAccent = accent;
            if (!linking) window.dispatchEvent(new CustomEvent('dsh-accent', { detail: { accent, source: 'blockade-alter' } }));
          };
          const onLink = (event) => {
            const d = event.detail || {};
            if (d.source === 'blockade-alter' || !isHex(d.accent) || d.accent.toUpperCase() === window.__dshAccent) return;
            linking = true;
            try { writeHudConfig({ accent: d.accent.toUpperCase() }); } finally { linking = false; }
          };
          sync();
          window.addEventListener('blockade-alter:hud', sync);
          window.addEventListener('dsh-accent', onLink);
          return () => {
            window.removeEventListener('blockade-alter:hud', sync);
            window.removeEventListener('dsh-accent', onLink);
            delete window.__dshAccent;
          };
        });

        // Plain-DOM readout cluster inside the sidebar: same markup and classes as
        // the React one, but we own it, so it can live in the sidebar's flow.
        ctx.effect(() => {
          if (!mountFlowHud) return () => {};
          return mountFlowHud();
        });

        // Lite mode: one switch that drops the shop-window effects. Also marks the
        // document idle when the window is hidden so nothing animates off-screen.
        ctx.effect(() => {
          const apply = () => {
            let config = {};
            try { config = readHudConfig(); } catch (error) { /* private mode */ }
            if (config.lite) document.body.dataset.hudLite = 'true';
            else delete document.body.dataset.hudLite;

            const bg = String(config.bg || '').trim();
            if (bg) document.documentElement.style.setProperty('--hud-bg', bg);
            else document.documentElement.style.removeProperty('--hud-bg');
          };
          apply();
          const onHud = () => apply();
          window.addEventListener('blockade-alter:hud', onHud);

          const onVisibility = () => {
            if (document.hidden) document.body.dataset.hudIdle = 'true';
            else delete document.body.dataset.hudIdle;
          };
          onVisibility();
          document.addEventListener('visibilitychange', onVisibility);
          return () => {
            window.removeEventListener('blockade-alter:hud', onHud);
            document.removeEventListener('visibilitychange', onVisibility);
          };
        });

        // Runtime knobs: __blockadeAlter.hud.set({...}) — persisted in localStorage.
        ctx.effect(() => {
          const api = {
            get: () => readHudConfig(),
            set(patch) {
              const next = Object.assign(readHudConfig(), patch || {});
              try { localStorage.setItem(HUD_KEY, JSON.stringify(next)); } catch (error) { /* private mode */ }
              window.dispatchEvent(new CustomEvent('blockade-alter:hud'));
              return next;
            },
            reset() {
              try { localStorage.removeItem(HUD_KEY); } catch (error) { /* private mode */ }
              window.dispatchEvent(new CustomEvent('blockade-alter:hud'));
              return readHudConfig();
            },
            // Paste the result back if the right dock ignores its styling.
            probe() {
              const dump = (el) => (el ? {
                tag: el.tagName,
                cls: typeof el.className === 'string' ? el.className : String(el.getAttribute('class') || ''),
                data: Object.assign({}, el.dataset),
                role: el.getAttribute('role'),
                ariaSelected: el.getAttribute('aria-selected'),
              } : null);
              const panel = document.querySelector('[data-sidebar-right-panel]');
              const tabs = Array.from(document.querySelectorAll('[data-dockkit-tab], [data-sidebar-right-tab]')).slice(0, 6);
              const buttons = panel ? Array.from(panel.querySelectorAll('button')).slice(0, 6) : [];
              const foot = document.querySelector('[class*="_footArea"]');
              const report = {
                panel: dump(panel),
                foot: dump(foot),
                footRect: foot ? foot.getBoundingClientRect().toJSON() : null,
                columnRect: (() => {
                  const column = document.querySelector('[class*="_sidebarCol"]');
                  return column ? column.getBoundingClientRect().toJSON() : null;
                })(),
                hostBottom: (() => {
                  const host = document.querySelector('.dsh-hud-portal');
                  return host ? getComputedStyle(host).bottom : null;
                })(),
                tabs: tabs.map(dump),
                buttons: buttons.map(dump),
              };
              // Who is actually painted on top of the account row?
              try {
                const foot = document.querySelector('[class*="_footArea"]');
                if (foot) {
                  const rect = foot.getBoundingClientRect();
                  const probePoint = (x, y) => {
                    const el = document.elementFromPoint(Math.round(x), Math.round(y));
                    return el ? { tag: el.tagName, cls: String(el.className || '').slice(0, 120) } : null;
                  };
                  report.accountHit = {
                    rect: rect.toJSON(),
                    center: probePoint(rect.left + rect.width / 2, rect.top + rect.height / 2),
                    icon: probePoint(rect.left + 18, rect.top + rect.height / 2),
                  };
                }
                const hud = document.querySelector('.dsh-hud-stats');
                report.hud = hud ? {
                  rect: hud.getBoundingClientRect().toJSON(),
                  embedded: hud.hasAttribute('data-embedded'),
                  portal: Boolean(document.querySelector('.dsh-hud-portal')),
                  hostBottom: (() => {
                    const host = document.querySelector('.dsh-hud-portal');
                    return host ? getComputedStyle(host).bottom : null;
                  })(),
                } : null;
              } catch (error) { /* ignore */ }

              // Show it on screen so it can be copied without DevTools tricks.
              try {
                const box = document.createElement('textarea');
                box.value = JSON.stringify(report, null, 2);
                box.setAttribute('readonly', 'readonly');
                Object.assign(box.style, {
                  position: 'fixed', left: '24px', top: '24px', width: '560px', height: '420px',
                  zIndex: '2147483000', background: '#0d0e11', color: '#e9edf3', font: '11px/1.45 monospace',
                  border: '1px solid var(--ba-ac)', borderRadius: '3px', padding: '10px',
                });
                const close = document.createElement('button');
                close.textContent = 'close';
                Object.assign(close.style, {
                  position: 'fixed', left: '24px', top: '452px', zIndex: '2147483001',
                  background: 'var(--ba-ac)', color: 'var(--ba-on-ac)', border: '0', padding: '4px 10px',
                  font: '11px monospace', cursor: 'pointer',
                });
                close.onclick = () => { box.remove(); close.remove(); };
                document.body.appendChild(box);
                document.body.appendChild(close);
                box.focus();
                box.select();
              } catch (error) { /* ignore */ }
              return report;
            },
          };
          window.__blockadeAlter = Object.assign(window.__blockadeAlter || {}, { hud: api });
          return () => {
            if (window.__blockadeAlter) delete window.__blockadeAlter.hud;
          };
        });

        // Settings page: one locale namespace, one slot entry.
        if (React && typeof React.createElement === 'function') {
          const text = {
            en: {
              title: 'Whale Blockade',
              hint: 'Where the session readouts sit and how they are laid out.',
              columns: 'Columns',
              width: 'Width',
              widthContent: 'Content',
              widthSidebar: 'Sidebar',
              baseline: 'Bottom edge',
              baselineWindow: 'Window',
              baselineFree: 'Free (drag)',
              baselineAccount: 'Above account',
              baselineComposer: 'Composer',
              lift: 'Lift account row',
              left: 'Left offset',
              bottom: 'Bottom offset',
              rise: 'Raise above account',
              widthPx: 'Fixed px',
              widthPxLabel: 'Width (px)',
              height: 'Height',
              heightAuto: 'Content',
              heightPx: 'Fixed px',
              heightPxLabel: 'Height (px)',
              radius: 'Corner radius',
              cut: 'Cut corners',
              tilt: 'Tilt (deg)',
              layer: 'Stack layer',
              reset: 'Reset to defaults',
              hintBack: 'Back',
              on: 'On',
              off: 'Off',
            },
            zh: {
              title: '全鲸封锁',
              hint: '会话读数放在哪里、怎么排列。',
              columns: '列数',
              width: '宽度',
              widthContent: '按内容',
              widthSidebar: '随侧边栏',
              baseline: '底边对齐',
              baselineWindow: '窗口底',
              baselineFree: '自由摆放',
              baselineAccount: '账号上方',
              baselineComposer: '输入框底',
              lift: '账号行上移',
              left: '左偏移',
              bottom: '底偏移',
              rise: '账号上方高度',
              widthPx: '固定像素',
              widthPxLabel: '宽度（px）',
              height: '高度',
              heightAuto: '按内容',
              heightPx: '固定像素',
              heightPxLabel: '高度（px）',
              radius: '圆角',
              cut: '切角',
              tilt: '倾斜（度）',
              layer: '层级',
              reset: '恢复默认',
              hintBack: '返回',
              on: '开',
              off: '关',
            },
          };
          ctx.effect(() => {
            const disposeZh = ctx.locale.register('blockade-alter', 'zh', text.zh);
            const disposeEn = ctx.locale.register('blockade-alter', 'en', text.en);
            return () => { disposeZh(); disposeEn(); };
          });
          const t = ctx.locale.bind('blockade-alter');
          const Page = () => HudSettings({ t });
          ctx.slots.inject('settings.section', () => ctx.slots.register({
            name: 'settings.section',
            id: 'blockade-alter-hud',
            order: 86,
            label: () => t('title'),
          }, Page));
        }

        if (React && typeof React.createElement === 'function') {
          // The readout cluster is rendered as plain DOM inside the sidebar (see
          // mountFlowHud): a React tree cannot be relocated across containers
          // without unmounting the whole UI. This keeps the slot free.
          const Hints = () => SettingsHints({ t: ctx.locale.bind('blockade-alter') });
          ctx.slots.inject('shell.overlay', () => ctx.slots.register({
            name: 'shell.overlay',
            id: 'blockade-alter-hints',
            order: 22,
          }, Hints));
        }
        ctx.effect(() => {
          const style = document.createElement('style');
          style.setAttribute('data-blockade-alter', SOURCE);
          style.textContent = MATERIAL;
          document.head.appendChild(style);

          // Master switch: disabling the skin removes both its stylesheet and the
          // token override, so the stock interface comes back with no residue.
          let tokenDispose = null;
          let tokenAccent = '';
          const syncEnabled = () => {
            let enabled = true;
            let accent = DEFAULT_ACCENT;
            try {
              const config = readHudConfig();
              accent = accentOf(config);
            } catch (error) { /* private mode */ }
            if (tokenDispose && accent !== tokenAccent) { tokenDispose(); tokenDispose = null; }
            style.disabled = !enabled;
            document.documentElement.classList.toggle('dsh-skin-off', !enabled);
            if (!enabled) {
              if (tokenDispose) { tokenDispose(); tokenDispose = null; }
              if (window.__blockadeAlter) window.__blockadeAlter.disabled = true;
            } else {
              if (!tokenDispose) {
                tokenAccent = accent;
                try { tokenDispose = ctx.theme.overrideTokens(SOURCE, tokens(accent)); } catch (error) { tokenDispose = () => {}; }
              }
              if (window.__blockadeAlter) window.__blockadeAlter.disabled = false;
            }
          };
          syncEnabled();
          window.addEventListener('blockade-alter:hud', syncEnabled);

          return () => {
            window.removeEventListener('blockade-alter:hud', syncEnabled);
            if (tokenDispose) tokenDispose();
            style.remove();
          };
        });

      },
    };
  },
});
