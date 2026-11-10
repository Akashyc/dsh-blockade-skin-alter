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

    // GSAP 内嵌在这里，由 scripts/vendor-gsap.mjs 生成，别手改（npm run vendor）。
    // 只用在主线程本来就要算的动画上（高度过渡）；透明度/位移类动画留给 CSS 和 WAAPI，
    // 它们跑在合成线程，宿主主线程忙时也不掉帧，GSAP 做不到这一点。
    /* gsap:start */
    const gsap = (() => {
      const names = ['gsap', 'gsapVersions', 'TweenLite', 'TweenMax', 'TimelineLite', 'TimelineMax'];
      const before = names.map((k) => [k, Object.getOwnPropertyDescriptor(window, k)]);
      const exports = {};
      const module = { exports };
/*!
 * GSAP 3.15.1
 * https://gsap.com
 * 
 * @license Copyright 2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function r(t){return"string"==typeof t}function s(t){return"function"==typeof t}function t(t){return"number"==typeof t}function u(t){return void 0===t}function v(t){return"object"==typeof t}function w(t){return!1!==t}function x(){return"undefined"!=typeof window}function y(t){return s(t)||r(t)}function R(t){return(i=bt(t,ht))&&Fe}function S(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function T(t,e){return!e&&console.warn(t)}function U(t,e){return t&&(ht[t]=e)&&i&&(i[t]=e)||ht}function V(){return 0}function ga(t){var e,r,i=t[0];if(v(i)||s(i)||(t=[t]),!(e=(i._gsap||{}).harness)){for(r=yt.length;r--&&!yt[r].targetTest(i););e=yt[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new qt(t[r],e)))||t.splice(r,1);return t}function ha(t){return t._gsap||ga(Pt(t))[0]._gsap}function ia(t,e,r){return(r=t[e])&&s(r)?t[e]():u(r)&&t.getAttribute&&t.getAttribute(e)||r}function ja(t,e){return(t=t.split(",")).forEach(e)||t}function ka(t){return Math.round(1e5*t)/1e5||0}function la(t){return Math.round(1e7*t)/1e7||0}function ma(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),"+"===r?t+i:"-"===r?t-i:"*"===r?t*i:t/i}function na(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r}function oa(){var t,e,r=pt.length,i=pt.slice(0);for(_t={},t=pt.length=0;t<r;t++)(e=i[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function pa(t){return!!(t._initted||t._startAt||t.add)}function qa(t,e,r,i){pt.length&&!L&&oa(),t.render(e,r,i||!!(L&&e<0&&pa(t))),pt.length&&!L&&oa()}function ra(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(ot).length<2?e:r(t)?t.trim():t}function sa(t){return t}function ta(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function wa(t,e){for(var r in e)"__proto__"!==r&&"constructor"!==r&&"prototype"!==r&&(t[r]=v(e[r])?wa(t[r]||(t[r]={}),e[r]):e[r]);return t}function xa(t,e){var r,i={};for(r in t)r in e||(i[r]=t[r]);return i}function ya(t){var e=t.parent||I,r=t.keyframes?function _setKeyframeDefaults(i){return function(t,e){for(var r in e)r in t||"duration"===r&&i||"ease"===r||(t[r]=e[r])}}(K(t.keyframes)):ta;if(w(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t}function Aa(t,e,r,i,n){void 0===r&&(r="_first"),void 0===i&&(i="_last");var a,s=t[i];if(n)for(a=e[n];s&&s[n]>a;)s=s._prev;return s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=s,e.parent=e._dp=t,e}function Ba(t,e,r,i){void 0===r&&(r="_first"),void 0===i&&(i="_last");var n=e._prev,a=e._next;n?n._next=a:t[r]===e&&(t[r]=a),a?a._prev=n:t[i]===e&&(t[i]=n),e._next=e._prev=e.parent=null}function Ca(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0}function Da(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t}function Fa(t,e,r,i){return t._startAt&&(L?t._startAt.revert(ft):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))}function Ha(t){return t._repeat?wt(t._tTime,t=t.duration()+t._rDelay)*t:0}function Ja(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function Ka(t){return t._end=la(t._start+(t._tDur/Math.abs(t._ts||t._rts||X)||0))}function La(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=la(r._time-(0<t._ts?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ka(t),r._dirty||Da(r,t)),t}function Ma(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(r=Ja(t.rawTime(),e),(!e._dur||Mt(0,e.totalDuration(),r)-e._tTime>X)&&e.render(r,!0)),Da(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)0<=r.rawTime()&&r.totalTime(r._tTime),r=r._dp;t._zTime=-X}}function Na(e,r,i,n){return r.parent&&Ca(r),r._start=la((t(i)?i:!i&&xt(r)&&(!e._last||e._last._start>=e._time)?e._last?e._last._start:e._time:i||e!==I?Ot(e,i,r):e._time)+r._delay),r._end=la(r._start+(r.totalDuration()/Math.abs(r.timeScale())||0)),Aa(e,r,"_first","_last",e._sort?"_start":0),xt(r)||(e._recent=r),n||Ma(e,r),e._ts<0&&La(e,e._tTime),e}function Oa(t,e){return(ht.ScrollTrigger||S("scrollTrigger",e))&&ht.ScrollTrigger.create(e,t)}function Pa(t,e,r,i,n){return $t(t,e,n),t._initted?!r&&t._pt&&!L&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&f!==Lt.frame?(pt.push(t),t._lazy=[n,i],1):void 0:1}function Ua(t,e,r,i){var n=t._repeat,a=la(e)||0,s=t._tTime/t._tDur;return s&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=n?n<0?1e10:la(a*(n+1)+t._rDelay*n):a,0<s&&!i&&La(t,t._tTime=t._tDur*s),t.parent&&Ka(t),r||Da(t.parent,t),t}function Va(t){return t instanceof Gt?Da(t):Ua(t,t._dur)}function Ya(e,r,i){var n,a,s=t(r[1]),o=(s?2:1)+(e<2?0:1),u=r[o];if(s&&(u.duration=r[1]),u.parent=i,e){for(n=u,a=i;a&&!("immediateRender"in n);)n=a.vars.defaults||{},a=w(a.vars.inherit)&&a.parent;u.immediateRender=w(n.immediateRender),e<2?u.runBackwards=1:u.startAt=r[o-1]}return new te(r[0],u,r[1+o])}function Za(t,e){return t||0===t?e(t):e}function _a(t,e){return r(t)&&(e=ut.exec(t))?e[1]:""}function cb(t,e){return t&&v(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&v(t[0]))&&!t.nodeType&&t!==h}function fb(r){return r=Pt(r)[0]||T("Invalid scope")||{},function(t){var e=r.current||r.nativeElement||r;return Pt(t,e.querySelectorAll?e:e===r?T("Invalid scope")||a.createElement("div"):r)}}function gb(t){return t.sort(function(){return.5-Math.random()})}function hb(t){if(s(t))return t;var p=v(t)?t:{each:t},_=jt(p.ease),m=p.from||0,g=parseFloat(p.base)||0,y={},e=0<m&&m<1,T=isNaN(m)||e,b=p.axis,w=m,x=m;return r(m)?w=x={center:.5,edges:.5,end:1}[m]||0:!e&&T&&(w=m[0],x=m[1]),function(t,e,r){var i,n,a,s,o,u,h,l,f,c=(r||p).length,d=y[c];if(!d){if(!(f="auto"===p.grid?0:(p.grid||[1,q])[1])){for(h=-q;h<(h=r[f++].getBoundingClientRect().left)&&f<c;);f<c&&f--}for(d=y[c]=[],i=T?Math.min(f,c)*w-.5:m%f,n=f===q?0:T?c*x/f-.5:m/f|0,l=q,u=h=0;u<c;u++)a=u%f-i,s=n-(u/f|0),d[u]=o=b?Math.abs("y"===b?s:a):H(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&gb(d),d.max=h-l,d.min=l,d.v=c=(parseFloat(p.amount)||parseFloat(p.each)*(c<f?c-1:b?"y"===b?c/f:f:Math.max(f,c/f))||0)*("edges"===m?-1:1),d.b=c<0?g-c:g,d.u=_a(p.amount||p.each)||0,_=_&&c<0?Yt(_):_}return c=(d[t]-d.min)/d.max||0,la(d.b+(_?_(c):c)*d.v)+d.u}}function ib(i){var n=Math.pow(10,((i+"").split(".")[1]||"").length);return function(e){var r=la(Math.round(parseFloat(e)/i)*i*n);return(r-r%1)/n+(t(e)?0:_a(e))}}function jb(h,e){var l,f,r=K(h);return!r&&v(h)&&(l=r=h.radius||q,h.values?(h=Pt(h.values),(f=!t(h[0]))&&(l*=l)):h=ib(h.increment)),Za(e,r?s(h)?function(t){return f=h(t),Math.abs(f-t)<=l?f:t}:function(e){for(var r,i,n=parseFloat(f?e.x:e),a=parseFloat(f?e.y:0),s=q,o=0,u=h.length;u--;)(r=f?(r=h[u].x-n)*r+(i=h[u].y-a)*i:Math.abs(h[u]-n))<s&&(s=r,o=u);return o=!l||s<=l?h[o]:e,f||o===e||t(e)?o:o+_a(e)}:ib(h))}function kb(t,e,r,i){return Za(K(t)?!e:!0===r?!!(r=0):!i,function(){return K(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+.99*r))/r)*r*i)/i})}function ob(e,r,t){return Za(t,function(t){return e[~~r(t)]})}function rb(t){return t.replace(tt,function(t){var e=t.indexOf("[")+1,r=t.substring(e||7,e?t.indexOf("]"):t.length-1).split(et);return kb(e?r:+r[0],e?0:+r[1],+r[2]||1e-5)})}function ub(t,e,r){var i,n,a,s=t.labels,o=q;for(i in s)(n=s[i]-e)<0==!!r&&n&&o>(n=Math.abs(n))&&(a=i,o=n);return a}function wb(t){return Ca(t),t.scrollTrigger&&t.scrollTrigger.kill(!!L),t.progress()<1&&At(t,"onInterrupt"),t}function zb(t){if(t)if(t=!t.name&&t.default||t,x()||t.headless){var e=t.name,r=s(t),i=e&&!r&&t.init?function(){this._props=[]}:t,n={init:V,render:_e,add:Ht,kill:Te,modifier:ve,rawVars:0},a={targetTest:0,get:0,getSetter:ue,aliases:{},register:0};if(It(),t!==i){if(mt[e])return;ta(i,ta(xa(t,n),a)),bt(i.prototype,bt(n,xa(t,a))),mt[i.prop=e]=i,t.targetTest&&(yt.push(i),dt[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}U(e,i),t.register&&t.register(Fe,i,we)}else Dt.push(t)}function Cb(t,e,r){return(6*(t+=t<0?1:1<t?-1:0)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*zt+.5|0}function Db(e,r,i){var n,a,s,o,u,h,l,f,c,d,p=e?t(e)?[e>>16,e>>8&zt,e&zt]:0:Rt.black;if(!p){if(","===e.substr(-1)&&(e=e.substr(0,e.length-1)),Rt[e])p=Rt[e];else if("#"===e.charAt(0)){if(e.length<6&&(e="#"+(n=e.charAt(1))+n+(a=e.charAt(2))+a+(s=e.charAt(3))+s+(5===e.length?e.charAt(4)+e.charAt(4):"")),9===e.length)return[(p=parseInt(e.substr(1,6),16))>>16,p>>8&zt,p&zt,parseInt(e.substr(7),16)/255];p=[(e=parseInt(e.substr(1),16))>>16,e>>8&zt,e&zt]}else if("hsl"===e.substr(0,3))if(p=d=e.match(rt),r){if(~e.indexOf("="))return p=e.match(it),i&&p.length<4&&(p[3]=1),p}else o=+p[0]%360/360,u=p[1]/100,n=2*(h=p[2]/100)-(a=h<=.5?h*(u+1):h+u-h*u),3<p.length&&(p[3]*=1),p[0]=Cb(o+1/3,n,a),p[1]=Cb(o,n,a),p[2]=Cb(o-1/3,n,a);else p=e.match(rt)||Rt.transparent;p=p.map(Number)}return r&&!d&&(n=p[0]/zt,a=p[1]/zt,s=p[2]/zt,h=((l=Math.max(n,a,s))+(f=Math.min(n,a,s)))/2,l===f?o=u=0:(c=l-f,u=.5<h?c/(2-l-f):c/(l+f),o=l===n?(a-s)/c+(a<s?6:0):l===a?(s-n)/c+2:(n-a)/c+4,o*=60),p[0]=~~(o+.5),p[1]=~~(100*u+.5),p[2]=~~(100*h+.5)),i&&p.length<4&&(p[3]=1),p}function Eb(t){var r=[],i=[],n=-1;return t.split(Et).forEach(function(t){var e=t.match(nt)||[];r.push.apply(r,e),i.push(n+=e.length+1)}),r.c=i,r}function Fb(t,e,r){var i,n,a,s,o="",u=(t+o).match(Et),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=Db(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=Eb(t),(i=r.c).join(o)!==a.c.join(o)))for(s=(n=t.replace(Et,"1").split(nt)).length-1;l<s;l++)o+=n[l]+(~i.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!n)for(s=(n=t.split(Et)).length-1;l<s;l++)o+=n[l]+u[l];return o+n[s]}function Ib(t){var e,r=t.join(" ");if(Et.lastIndex=0,Et.test(r))return e=Ft.test(r),t[1]=Fb(t[1],e),t[0]=Fb(t[0],e,Eb(t[1])),!0}function Rb(t){var e=(t+"").split("("),r=Bt[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,i,n={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,i=r.substr(0,e),n[s]=isNaN(i)?i.replace(Ut,"").trim():+i,s=r.substr(e+1).trim();return n}(e[1])]:function _valueInParentheses(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)}(t).split(",").map(ra)):Bt._CE&&Nt.test(t)?Bt._CE("",t):r}function Ub(t,e,r,i){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===i&&(i=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var n,a={easeIn:e,easeOut:r,easeInOut:i};return ja(t,function(t){for(var e in Bt[t]=ht[t]=a,Bt[n=t.toLowerCase()]=r,a)Bt[n+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=Bt[t+"."+e]=a[e]}),a}function Vb(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Wb(r,t,e){function Gm(t){return 1===t?1:i*Math.pow(2,-10*t)*Q((t-a)*n)+1}var i=1<=t?t:1,n=(e||(r?.3:.45))/(t<1?t:1),a=n/G*(Math.asin(1/i)||0),s="out"===r?Gm:"in"===r?function(t){return 1-Gm(1-t)}:Vb(Gm);return n=G/n,s.config=function(t,e){return Wb(r,t,e)},s}function Xb(e,r){function Om(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?Om:"in"===e?function(t){return 1-Om(1-t)}:Vb(Om);return t.config=function(t){return Xb(e,t)},t}var F,L,l,I,h,n,a,i,o,f,c,d,p,_,m,g,b,k,O,M,C,P,A,D,z,E,B,N,Y={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},j={duration:.5,overwrite:!1,delay:0},q=1e8,X=1/q,G=2*Math.PI,Z=G/4,W=0,H=Math.sqrt,$=Math.cos,Q=Math.sin,J="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},K=Array.isArray,tt=/random\([^)]+\)/g,et=/,\s*/g,rt=/(?:-?\.?\d|\.)+/gi,it=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,nt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,at=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,st=/[+-]=-?[.\d]+/,ot=/[^,'"\[\]\s]+/gi,ut=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ht={},lt={suppressEvents:!0,isStart:!0,kill:!1},ft={suppressEvents:!0,kill:!1},ct={suppressEvents:!0},dt={},pt=[],_t={},mt={},gt={},vt=30,yt=[],Tt="",bt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},wt=function _animationCycle(t,e){var r=Math.floor(t=la(t/e));return t&&r===t?r-1:r},xt=function _isFromOrFromStart(t){var e=t.data;return"isFromStart"===e||"isStart"===e},kt={_start:0,endTime:V,totalDuration:V},Ot=function _parsePosition(t,e,i){var n,a,s,o=t.labels,u=t._recent||kt,h=t.duration()>=q?u.endTime(!1):t._dur;return r(e)&&(isNaN(e)||e in o)?(a=e.charAt(0),s="%"===e.substr(-1),n=e.indexOf("="),"<"===a||">"===a?(0<=n&&(e=e.replace(/=/,"")),("<"===a?u._start:u.endTime(0<=u._repeat))+(parseFloat(e.substr(1))||0)*(s?(n<0?u:i).totalDuration()/100:1)):n<0?(e in o||(o[e]=h),o[e]):(a=parseFloat(e.charAt(n-1)+e.substr(n+1)),s&&i&&(a=a/100*(K(i)?i[0]:i).totalDuration()),1<n?_parsePosition(t,e.substr(0,n-1),i)+a:h+a)):null==e?h:+e},Mt=function _clamp(t,e,r){return r<t?t:e<r?e:r},Ct=[].slice,Pt=function toArray(t,e,i){return l&&!e&&l.selector?l.selector(t):!r(t)||i||!n&&It()?K(t)?function _flatten(t,e,i){return void 0===i&&(i=[]),t.forEach(function(t){return r(t)&&!e||cb(t,1)?i.push.apply(i,Pt(t)):i.push(t)})||i}(t,i):cb(t)?Ct.call(t,0):t?[t]:[]:Ct.call((e||a).querySelectorAll(t),0)},St=function mapRange(e,t,r,i,n){var a=t-e,s=i-r;return Za(n,function(t){return r+((t-e)/a*s||0)})},At=function _callback(t,e,r){var i,n,a,s=t.vars,o=s[e],u=l,h=t._ctx;if(o)return i=s[e+"Params"],n=s.callbackScope||t,r&&pt.length&&oa(),h&&(l=h),a=i?o.apply(n,i):o.call(n),l=u,a},Dt=[],zt=255,Rt={aqua:[0,zt,zt],lime:[0,zt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,zt],navy:[0,0,128],white:[zt,zt,zt],olive:[128,128,0],yellow:[zt,zt,0],orange:[zt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[zt,0,0],pink:[zt,192,203],cyan:[0,zt,zt],transparent:[zt,zt,zt,0]},Et=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";for(t in Rt)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),Ft=/hsl[a]?\(/,Lt=(O=Date.now,M=500,C=33,P=O(),A=P,z=D=1e3/240,g={time:0,frame:0,tick:function tick(){zl(!0)},deltaRatio:function deltaRatio(t){return b/(1e3/(t||60))},wake:function wake(){o&&(!n&&x()&&(h=n=window,a=h.document||{},ht.gsap=Fe,(h.gsapVersions||(h.gsapVersions=[])).push(Fe.version),R(i||h.GreenSockGlobals||!h.gsap&&h||{}),Dt.forEach(zb)),m="undefined"!=typeof requestAnimationFrame&&requestAnimationFrame,p&&g.sleep(),_=m||function(t){return setTimeout(t,z-1e3*g.time+1|0)},d=1,zl(2))},sleep:function sleep(){(m?cancelAnimationFrame:clearTimeout)(p),d=0,_=V},lagSmoothing:function lagSmoothing(t,e){M=t||1/0,C=Math.min(e||33,M)},fps:function fps(t){D=1e3/(t||240),z=1e3*g.time+D},add:function add(n,t,e){var a=t?function(t,e,r,i){n(t,e,r,i),g.remove(a)}:n;return g.remove(n),E[e?"unshift":"push"](a),It(),a},remove:function remove(t,e){~(e=E.indexOf(t))&&E.splice(e,1)&&e<=k&&k--},_listeners:E=[]}),It=function _wake(){return!d&&Lt.wake()},Bt={},Nt=/^[\d.\-M][\d.\-,\s]/,Ut=/["']/g,Yt=function _invertEase(e){return function(t){return 1-e(1-t)}},jt=function _parseEase(t,e){return t&&(s(t)?t:Bt[t]||Rb(t))||e};function zl(t){var e,r,i,n,a=O()-A,s=!0===t;if((M<a||a<0)&&(P+=a-C),(0<(e=(i=(A+=a)-P)-z)||s)&&(n=++g.frame,b=i-1e3*g.time,g.time=i/=1e3,z+=e+(D<=e?0:D-e),r=1),s||(p=_(zl)),r)for(k=0;k<E.length;k++)E[k](i,b,n,t)}function dn(t){return t<N?B*t*t:t<.7272727272727273?B*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?B*(t-=2.25/2.75)*t+.9375:B*Math.pow(t-2.625/2.75,2)+.984375}ja("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;Ub(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),Bt.Linear.easeNone=Bt.none=Bt.Linear.easeIn,Ub("Elastic",Wb("in"),Wb("out"),Wb()),B=7.5625,N=1/2.75,Ub("Bounce",function(t){return 1-dn(1-t)},dn),Ub("Expo",function(t){return Math.pow(2,10*(t-1))*t+t*t*t*t*t*t*(1-t)}),Ub("Circ",function(t){return-(H(1-t*t)-1)}),Ub("Sine",function(t){return 1===t?1:1-$(t*Z)}),Ub("Back",Xb("in"),Xb("out"),Xb()),Bt.SteppedEase=Bt.steps=ht.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,i=t+(e?0:1),n=e?1:0;return function(t){return((i*Mt(0,.99999999,t)|0)+n)*r}}},j.ease=Bt["quad.out"],ja("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return Tt+=t+","+t+"Params,"});var Vt,qt=function GSCache(t,e){this.id=W++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:ia,this.set=e?e.getSetter:ue},Xt=((Vt=Animation.prototype).delay=function delay(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},Vt.duration=function duration(t){return arguments.length?this.totalDuration(0<this._repeat?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},Vt.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Ua(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},Vt.totalTime=function totalTime(t,e){if(It(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(La(this,t),!r._dp||r.parent||Ma(r,this);r&&r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(0<this._ts&&t<this._tDur||this._ts<0&&0<t||!this._tDur&&!t)&&Na(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!e||this._initted&&Math.abs(this._zTime)===X||!this._initted&&this._dur&&t||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),qa(this,t,e)),this},Vt.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Ha(this))%(this._dur+this._rDelay)||(t?this._dur:0),e):this._time},Vt.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):0<=this.rawTime()&&this._initted?1:0},Vt.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+Ha(this),e):this.duration()?Math.min(1,this._time/this._dur):0<this.rawTime()?1:0},Vt.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?wt(this._tTime,r)+1:1},Vt.timeScale=function timeScale(t,e){if(!arguments.length)return this._rts===-X?0:this._rts;if(this._rts===t)return this;var r=this.parent&&this._ts?Ja(this.parent._time,this):this._tTime,i=this._rts<0;this._rts=+t||0,this._ts=this._ps||t===-X?0:this._rts;var n=this.totalDuration();return(i!=this._rts<0||0<r&&r<n)&&this.totalTime(Mt(-Math.abs(this._delay),n,r),!1!==e),Ka(this),function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this)},Vt.paused=function paused(t){if(!arguments.length)return this._ps;if(this._ps!==t)if(this._ps=t)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{It(),this._ts=this._rts;var e,r=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,i=1===this.progress()&&Math.abs(this._zTime)!==X;if(i)for(this._tTime-=X,e=this._first;e;){if(!e._dur&&e._zTime<0&&e._ts&&e._start<=r+X){i=!1;break}e=e._next}this.totalTime(r,i)}return this},Vt.startTime=function startTime(t){if(arguments.length){this._start=la(t);var e=this.parent||this._dp;return!e||!e._sort&&this.parent||Na(e,this,this._start-this._delay),this}return this._start},Vt.endTime=function endTime(t){return this._start+(w(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},Vt.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ja(e.rawTime(t),this):this._tTime:this._tTime},Vt.revert=function revert(t){void 0===t&&(t=ct);var e=L;return L=t,pa(this)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),"nested"!==this.data&&!1!==t.kill&&this.kill(),L=e,this},Vt.globalTime=function globalTime(t){for(var e=this,r=arguments.length?t:e.rawTime();e;)r=e._start+r/(Math.abs(e._ts)||1),e=e._dp;return!this.parent&&this._sat?this._sat.globalTime(t):r},Vt.repeat=function repeat(t){return arguments.length?(this._repeat=t===1/0?-2:t,Va(this)):-2===this._repeat?1/0:this._repeat},Vt.repeatDelay=function repeatDelay(t){if(arguments.length){var e=this._time;return this._rDelay=t,Va(this),e?this.time(e):this}return this._rDelay},Vt.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},Vt.seek=function seek(t,e){return this.totalTime(Ot(this,t),w(e))},Vt.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,w(e)),this._dur||(this._zTime=-X),this},Vt.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},Vt.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},Vt.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},Vt.resume=function resume(){return this.paused(!1)},Vt.reversed=function reversed(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-X:0)),this):this._rts<0},Vt.invalidate=function invalidate(){return this._initted=this._act=0,this._zTime=-X,this},Vt.isActive=function isActive(){var t,e=this.parent||this._dp,r=this._start;return!(e&&!(this._ts&&this._initted&&e.isActive()&&(t=e.rawTime(!0))>=r&&t<this.endTime(!0)-X))},Vt.eventCallback=function eventCallback(t,e,r){var i=this.vars;return 1<arguments.length?(e?(i[t]=e,r&&(i[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete i[t],this):i[t]},Vt.then=function then(t){var i=this,n=i._prom;return new Promise(function(e){function Fo(){var t=i.then;i.then=null,n&&n(),s(r)&&(r=r(i))&&(r.then||r===i)&&(i.then=t),e(r),i.then=t}var r=s(t)?t:sa;i._initted&&1===i.totalProgress()&&0<=i._ts||!i._tTime&&i._ts<0?Fo():i._prom=Fo})},Vt.kill=function kill(){wb(this)},Animation);function Animation(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ua(this,+t.duration,1,1),this.data=t.data,l&&(this._ctx=l).data.push(this),d||Lt.wake()}ta(Xt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-X,_prom:0,_ps:!1,_rts:1});var Gt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=w(t.sortChildren),I&&Na(t.parent||I,_assertThisInitialized(r),e),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Oa(_assertThisInitialized(r),t.scrollTrigger),r}_inheritsLoose(Timeline,i);var e=Timeline.prototype;return e.to=function to(t,e,r){return Ya(0,arguments,this),this},e.from=function from(t,e,r){return Ya(1,arguments,this),this},e.fromTo=function fromTo(t,e,r,i){return Ya(2,arguments,this),this},e.set=function set(t,e,r){return e.duration=0,e.parent=this,ya(e).repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new te(t,e,Ot(this,r),1),this},e.call=function call(t,e,r){return Na(this,te.delayedCall(0,t,e),r)},e.staggerTo=function staggerTo(t,e,r,i,n,a,s){return r.duration=e,r.stagger=r.stagger||i,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new te(t,r,Ot(this,n)),this},e.staggerFrom=function staggerFrom(t,e,r,i,n,a,s){return r.runBackwards=1,ya(r).immediateRender=w(r.immediateRender),this.staggerTo(t,e,r,i,n,a,s)},e.staggerFromTo=function staggerFromTo(t,e,r,i,n,a,s,o){return i.startAt=r,ya(i).immediateRender=w(i.immediateRender),this.staggerTo(t,e,i,n,a,s,o)},e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,c,d,p,_=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=t<=0?0:la(t),y=this._zTime<0!=t<0&&(this._initted||!g);if(this!==I&&m<v&&0<=t&&(v=m),v!==this._tTime||r||y){if(_!==this._time&&g&&(v+=this._time-_,t+=this._time-_),i=v,f=this._start,u=!(l=this._ts),y&&(g||(_=this._zTime),!t&&e||(this._zTime=t)),this._repeat){if(d=this._yoyo,o=g+this._rDelay,this._repeat<-1&&t<0)return this.totalTime(100*o+t,e,r);if(i=la(v%o),v===m?(s=this._repeat,i=g):((s=~~(c=la(v/o)))&&s===c&&(i=g,s--),g<i&&(i=g)),c=wt(this._tTime,o),!_&&this._tTime&&c!==s&&this._tTime-c*o-this._dur<=0&&(c=s),d&&1&s&&(i=g-i,p=1),s!==c&&!this._lock){var T=d&&1&c,b=T===(d&&1&s);if(s<c&&(T=!T),_=T?0:v%g?g:v,this._lock=1,this.render(_||(p?0:la(s*o)),e,!g)._lock=0,this._tTime=v,!e&&this.parent&&At(this,"onRepeat"),this.vars.repeatRefresh&&!p&&(this.invalidate()._lock=1,c=s),_&&_!==this._time||u!=!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(g=this._dur,m=this._tDur,b&&(this._lock=2,_=T?g:-1e-4,this.render(_,!0),this.vars.repeatRefresh&&!p&&this.invalidate()),this._lock=0,!this._ts&&!u)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var i;if(e<r)for(i=t._first;i&&i._start<=r;){if("isPause"===i.data&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if("isPause"===i.data&&i._start<e)return i;i=i._prev}}(this,la(_),la(i)))&&(v-=i-(i=h._start)),this._tTime=v,this._time=i,this._act=!!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t,_=0),!_&&v&&g&&!e&&!c&&(At(this,"onStart"),this._tTime!==v))return this;if(_<=i&&0<=t)for(n=this._first;n;){if(a=n._next,(n._act||i>=n._start)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(i-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(i-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-X);break}}n=a}else{n=this._last;for(var w=t<0?t:i;n;){if(a=n._prev,(n._act||w<=n._end)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(w-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(w-n._start)*n._ts,e,r||L&&pa(n)),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-X:X);break}}n=a}}if(h&&!e&&(this.pause(),h.render(_<=i?0:-X)._zTime=_<=i?1:-1,this._ts))return this._start=f,Ka(this),this.render(t,e,r);this._onUpdate&&!e&&At(this,"onUpdate",!0),(v===m&&this._tTime>=this.totalDuration()||!v&&_)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||this._lock||(!t&&g||!(v===m&&0<this._ts||!v&&this._ts<0)||Ca(this,1),e||t<0&&!_||!v&&!_&&m||(At(this,v===m&&0<=t?"onComplete":"onReverseComplete",!0),!this._prom||v<m&&0<this.timeScale()||this._prom())))}return this},e.add=function add(e,i){var n=this;if(t(i)||(i=Ot(this,i,e)),!(e instanceof Xt)){if(K(e))return e.forEach(function(t){return n.add(t,i)}),this;if(r(e))return this.addLabel(e,i);if(!s(e))return this;e=te.delayedCall(0,e)}return this!==e?Na(this,e,i):this},e.getChildren=function getChildren(t,e,r,i){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===i&&(i=-q);for(var n=[],a=this._first;a;)a._start>=i&&(a instanceof te?e&&n.push(a):(r&&n.push(a),t&&n.push.apply(n,a.getChildren(!0,e,r)))),a=a._next;return n},e.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},e.remove=function remove(t){return r(t)?this.removeLabel(t):s(t)?this.killTweensOf(t):(t.parent===this&&Ba(this,t),t===this._recent&&(this._recent=this._last),Da(this))},e.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=la(Lt.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},e.addLabel=function addLabel(t,e){return this.labels[t]=Ot(this,e),this},e.removeLabel=function removeLabel(t){return delete this.labels[t],this},e.addPause=function addPause(t,e,r){var i=te.delayedCall(0,e||V,r);return i.data="isPause",this._hasPause=1,Na(this,i,Ot(this,t))},e.removePause=function removePause(t){var e=this._first;for(t=Ot(this,t);e;)e._start===t&&"isPause"===e.data&&Ca(e),e=e._next},e.killTweensOf=function killTweensOf(t,e,r){for(var i=this.getTweensOf(t,r),n=i.length;n--;)Zt!==i[n]&&i[n].kill(t,e);return this},e.getTweensOf=function getTweensOf(e,r){for(var i,n=[],a=Pt(e),s=this._first,o=t(r);s;)s instanceof te?na(s._targets,a)&&(o?(!Zt||s._initted&&s._ts)&&s.globalTime(0)<=r&&s.globalTime(s.totalDuration())>r:!r||s.isActive())&&n.push(s):(i=s.getTweensOf(a,r)).length&&n.push.apply(n,i),s=s._next;return n},e.tweenTo=function tweenTo(t,e){e=e||{};var r,i=this,n=Ot(i,t),a=e.startAt,s=e.onStart,o=e.onStartParams,u=e.immediateRender,h=te.to(i,ta({ease:e.ease||"none",lazy:!1,immediateRender:!1,time:n,overwrite:"auto",duration:e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale())||X,onStart:function onStart(){if(i.pause(),!r){var t=e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale());h._dur!==t&&Ua(h,t,0,1).render(h._time,!0,!0),r=1}s&&s.apply(h,o||[])}},e));return u?h.render(0):h},e.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,ta({startAt:{time:Ot(this,t)}},r))},e.recent=function recent(){return this._recent},e.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),ub(this,Ot(this,t))},e.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),ub(this,Ot(this,t),1)},e.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+X)},e.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);var i,n=this._first,a=this.labels;for(t=la(t);n;)n._start>=r&&(n._start+=t,n._end+=t),n=n._next;if(e)for(i in a)a[i]>=r&&(a[i]+=t);return Da(this)},e.invalidate=function invalidate(t){var e=this._first;for(this._lock=0;e;)e.invalidate(t),e=e._next;return i.prototype.invalidate.call(this,t)},e.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._dp&&(this._time=this._tTime=this._pTime=0),t&&(this.labels={}),Da(this)},e.totalDuration=function totalDuration(t){var e,r,i,n=0,a=this,s=a._last,o=q;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-t:t));if(a._dirty){for(i=a.parent;s;)e=s._prev,s._dirty&&s.totalDuration(),o<(r=s._start)&&a._sort&&s._ts&&!a._lock?(a._lock=1,Na(a,s,r-s._delay,1)._lock=0):o=r,r<0&&s._ts&&(n-=r,(!i&&!a._dp||i&&i.smoothChildTiming)&&(a._start+=la(r/a._ts),a._time-=r,a._tTime-=r),a.shiftChildren(-r,!1,-Infinity),o=0),s._end>n&&s._ts&&(n=s._end),s=e;Ua(a,a===I&&a._time>n?a._time:n,1,1),a._dirty=0}return a._tDur},Timeline.updateRoot=function updateRoot(t){if(I._ts&&(qa(I,Ja(t,I)),f=Lt.frame),Lt.frame>=vt){vt+=Y.autoSleep||120;var e=I._first;if((!e||!e._ts)&&Y.autoSleep&&Lt._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||Lt.sleep()}}},Timeline}(Xt);ta(Gt.prototype,{_lock:0,_hasPause:0,_forcing:0});function cc(t,e,i,n,a,o){var u,h,l,f;if(mt[t]&&!1!==(u=new mt[t]).init(a,u.rawVars?e[t]:function _processVars(t,e,i,n,a){if(s(t)&&(t=Qt(t,a,e,i,n)),!v(t)||t.style&&t.nodeType||K(t)||J(t))return r(t)?Qt(t,a,e,i,n):t;var o,u={};for(o in t)u[o]=Qt(t[o],a,e,i,n);return u}(e[t],n,a,o,i),i,n,o)&&(i._pt=h=new we(i._pt,a,t,0,1,u.render,u,0,u.priority),i!==c))for(l=i._ptLookup[i._targets.indexOf(a)],f=u._props.length;f--;)l[u._props[f]]=h;return u}function ic(t,r,e,i){var n,a,s=r.ease||i||"power1.inOut";if(K(r))a=e[t]||(e[t]=[]),r.forEach(function(t,e){return a.push({t:e/(r.length-1)*100,v:t,e:s})});else for(n in r)a=e[n]||(e[n]=[]),"ease"===n||a.push({t:parseFloat(t),v:r[n],e:s})}var Zt,Wt,Ht=function _addPropTween(t,e,i,n,a,o,u,h,l,f){s(n)&&(n=n(a||0,t,o));var c,d=t[e],p="get"!==i?i:s(d)?l?t[e.indexOf("set")||!s(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():d,_=s(d)?l?se:ae:ie;if(r(n)&&(~n.indexOf("random(")&&(n=rb(n)),"="===n.charAt(1)&&(!(c=ma(p,n)+(_a(p)||0))&&0!==c||(n=c))),!f||p!==n||Wt)return isNaN(p*n)||""===n?(d||e in t||S(e,n),function _addComplexStringPropTween(t,e,r,i,n,a,s){var o,u,h,l,f,c,d,p,_=new we(this._pt,t,e,0,1,pe,null,n),m=0,g=0;for(_.b=r,_.e=i,r+="",(d=~(i+="").indexOf("random("))&&(i=rb(i)),a&&(a(p=[r,i],t,e),r=p[0],i=p[1]),u=r.match(at)||[];o=at.exec(i);)l=o[0],f=i.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(c=parseFloat(u[g-1])||0,_._pt={_next:_._pt,p:f||1===g?f:",",s:c,c:"="===l.charAt(1)?ma(c,l)-c:parseFloat(l)-c,m:h&&h<4?Math.round:0},m=at.lastIndex);return _.c=m<i.length?i.substring(m,i.length):"",_.fp=s,(st.test(i)||d)&&(_.e=0),this._pt=_}.call(this,t,e,p,n,_,h||Y.stringFilter,l)):(c=new we(this._pt,t,e,+p||0,n-(p||0),"boolean"==typeof d?de:fe,0,_),l&&(c.fp=l),u&&c.modifier(u,this,t),this._pt=c)},$t=function _initTween(t,e,r){var i,n,a,s,o,u,h,l,f,c,d,p,_,m=t.vars,g=m.ease,v=m.startAt,y=m.immediateRender,T=m.lazy,b=m.onUpdate,x=m.runBackwards,k=m.yoyoEase,O=m.keyframes,M=m.autoRevert,C=t._dur,P=t._startAt,S=t._targets,A=t.parent,D=A&&"nested"===A.data?A.vars.targets:S,z="auto"===t._overwrite&&!F,R=t.timeline,E=m.easeReverse||k;if(!R||O&&g||(g="none"),t._ease=jt(g,j.ease),t._rEase=E&&(jt(E)||t._ease),t._from=!R&&!!m.runBackwards,t._from&&(t.ratio=1),!R||O&&!m.stagger){if(p=(l=S[0]?ha(S[0]).harness:0)&&m[l.prop],i=xa(m,dt),P&&(P._zTime<0&&P.progress(1),e<0&&x&&y&&!M?P.render(-1,!0):P.revert(x&&C?ft:lt),P._lazy=0),v){if(Ca(t._startAt=te.set(S,ta({data:"isStart",overwrite:!1,parent:A,immediateRender:!0,lazy:!P&&w(T),startAt:null,delay:0,onUpdate:b&&function(){return At(t,"onUpdate")},stagger:0},v))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(L||!y&&!M)&&t._startAt.revert(ft),y&&C&&e<=0&&r<=0)return void(e&&(t._zTime=e))}else if(x&&C&&!P)if(e&&(y=!1),a=ta({overwrite:!1,data:"isFromStart",lazy:y&&!P&&w(T),immediateRender:y,stagger:0,parent:A},i),p&&(a[l.prop]=p),Ca(t._startAt=te.set(S,a)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(L?t._startAt.revert(ft):t._startAt.render(-1,!0)),t._zTime=e,y){if(!e)return}else _initTween(t._startAt,X,X);for(t._pt=t._ptCache=0,T=C&&w(T)||T&&!C,n=0;n<S.length;n++){if(h=(o=S[n])._gsap||ga(S)[n]._gsap,t._ptLookup[n]=c={},_t[h.id]&&pt.length&&oa(),d=D===S?n:D.indexOf(o),l&&!1!==(f=new l).init(o,p||i,t,d,D)&&(t._pt=s=new we(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){c[t]=s}),f.priority&&(u=1)),!l||p)for(a in i)mt[a]&&(f=cc(a,i,t,d,o,D))?f.priority&&(u=1):c[a]=s=Ht.call(t,o,a,"get",i[a],d,D,0,m.stringFilter);t._op&&t._op[n]&&t.kill(o,t._op[n]),z&&t._pt&&(Zt=t,I.killTweensOf(o,c,t.globalTime(e)),_=!t.parent,Zt=0),t._pt&&T&&(_t[h.id]=1)}u&&be(t),t._onInit&&t._onInit(t)}t._onUpdate=b,t._initted=(!t._op||t._pt)&&!_,O&&e<=0&&R.render(q,!0,!0)},Qt=function _parseFuncOrString(t,e,i,n,a){return s(t)?t.call(e,i,n,a):r(t)&&~t.indexOf("random(")?rb(t):t},Jt=Tt+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Kt={};ja(Jt+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return Kt[t]=1}),Jt=Jt.split(",");var te=function(E){function Tween(e,r,i,n){var a;"number"==typeof r&&(i.duration=r,r=i,i=null);var s,o,u,h,l,f,c,d,p=(a=E.call(this,n?r:ya(r))||this).vars,_=p.duration,m=p.delay,g=p.immediateRender,b=p.stagger,x=p.overwrite,k=p.keyframes,O=p.defaults,M=p.scrollTrigger,C=r.parent||I,P=(K(e)||J(e)?t(e[0]):"length"in r)?[e]:Pt(e);if(a._targets=P.length?ga(P):T("GSAP target "+e+" not found. https://gsap.com",!Y.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=x,k||b||y(_)||y(m)){var S=(r=a.vars).easeReverse||r.yoyoEase;if((s=a.timeline=new Gt({data:"nested",defaults:O||{},targets:C&&"nested"===C.data?C.vars.targets:P})).kill(),s.parent=s._dp=_assertThisInitialized(a),s._start=0,b||y(_)||y(m)){if(h=P.length,c=b&&hb(b),v(b))for(l in b)~Jt.indexOf(l)&&((d=d||{})[l]=b[l]);for(o=0;o<h;o++)(u=xa(r,Kt)).stagger=0,S&&(u.easeReverse=S),d&&bt(u,d),f=P[o],u.duration=+Qt(_,_assertThisInitialized(a),o,f,P),u.delay=(+Qt(m,_assertThisInitialized(a),o,f,P)||0)-a._delay,!b&&1===h&&u.delay&&(a._delay=m=u.delay,a._start+=m,u.delay=0),s.to(f,u,c?c(o,f,P):0),s._ease=Bt.none;s.duration()?_=m=0:a.timeline=0}else if(k){ya(ta(s.vars.defaults,{ease:"none"})),s._ease=jt(k.ease||r.ease||"none");var A,D,z,R=0;if(K(k))k.forEach(function(t){return s.to(P,t,">")}),s.duration();else{for(l in u={},k)"ease"===l||"easeEach"===l||ic(l,k[l],u,k.easeEach);for(l in u)for(A=u[l].sort(function(t,e){return t.t-e.t}),o=R=0;o<A.length;o++)(z={ease:(D=A[o]).e,duration:(D.t-(o?A[o-1].t:0))/100*_})[l]=D.v,s.to(P,z,R),R+=z.duration;s.duration()<_&&s.to({},{duration:_-s.duration()})}}_||a.duration(_=s.duration())}else a.timeline=0;return!0!==x||F||(Zt=_assertThisInitialized(a),I.killTweensOf(P),Zt=0),Na(C,_assertThisInitialized(a),i),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(g||!_&&!k&&a._start===la(C._time)&&w(g)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(a))&&"nested"!==C.data)&&(a._tTime=-X,a.render(Math.max(0,-m)||0)),M&&Oa(_assertThisInitialized(a),M),a}_inheritsLoose(Tween,E);var e=Tween.prototype;return e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f=this._time,c=this._tDur,d=this._dur,p=t<0,_=c-X<t&&!p?c:t<X?0:t;if(d){if(_!==this._tTime||!t||r||!this._initted&&this._tTime||this._startAt&&this._zTime<0!=p||this._lazy){if(i=_,l=this.timeline,this._repeat){if(s=d+this._rDelay,this._repeat<-1&&p)return this.totalTime(100*s+t,e,r);if(i=la(_%s),_===c?(a=this._repeat,i=d):(a=~~(o=la(_/s)))&&a===o?(i=d,a--):d<i&&(i=d),(u=this._yoyo&&1&a)&&(i=d-i),o=wt(this._tTime,s),i===f&&!r&&this._initted&&a===o)return this._tTime=_,this;a!==o&&this.vars.repeatRefresh&&!u&&!this._lock&&i!==s&&this._initted&&(this._lock=r=1,this.render(la(s*a),!0).invalidate()._lock=0)}if(!this._initted){if(Pa(this,p?t:i,r,e,_))return this._tTime=0,this;if(!(f===this._time||r&&this.vars.repeatRefresh&&a!==o))return this;if(d!==this._dur)return this.render(t,e,r)}if(this._rEase){var m=i<f;if(m!==this._inv){var g=m?f:d-f;this._inv=m,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=f,this._invRecip=g?(m?-1:1)/g:0,this._invScale=m?-this.ratio:1-this.ratio,this._invEase=m?this._rEase:this._ease}this.ratio=h=this._invRatio+this._invScale*this._invEase((i-this._invTime)*this._invRecip)}else this.ratio=h=this._ease(i/d);if(this._from&&(this.ratio=h=1-h),this._tTime=_,this._time=i,!this._act&&this._ts&&(this._act=1,this._lazy=0),!f&&_&&!e&&!o&&(At(this,"onStart"),this._tTime!==_))return this;for(n=this._pt;n;)n.r(h,n.d),n=n._next;l&&l.render(t<0?t:l._dur*l._ease(i/this._dur),e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(p&&Fa(this,t,0,r),At(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&At(this,"onRepeat"),_!==this._tDur&&_||this._tTime!==_||(p&&!this._onUpdate&&Fa(this,t,0,!0),!t&&d||!(_===this._tDur&&0<this._ts||!_&&this._ts<0)||Ca(this,1),e||p&&!f||!(_||f||u)||(At(this,_===c?"onComplete":"onReverseComplete",!0),!this._prom||_<c&&0<this.timeScale()||this._prom()))}}else!function _renderZeroDurationTween(t,e,r,i){var n,a,s,o=t.ratio,u=e<0||!e&&(!t._start&&function _parentPlayheadIsBeforeStart(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||_parentPlayheadIsBeforeStart(e))}(t)&&(t._initted||!xt(t))||(t._ts<0||t._dp._ts<0)&&!xt(t))?0:1,h=t._rDelay,l=0;if(h&&t._repeat&&(l=Mt(0,t._tDur,e),a=wt(l,h),t._yoyo&&1&a&&(u=1-u),a!==wt(t._tTime,h)&&(o=1-u,t.vars.repeatRefresh&&t._initted&&t.invalidate())),u!==o||L||i||t._zTime===X||!e&&t._zTime){if(!t._initted&&Pa(t,e,i,r,l))return;for(s=t._zTime,t._zTime=e||(r?X:0),r=r||e&&!s,t.ratio=u,t._from&&(u=1-u),t._time=0,t._tTime=l,n=t._pt;n;)n.r(u,n.d),n=n._next;e<0&&Fa(t,e,0,!0),t._onUpdate&&!r&&At(t,"onUpdate"),l&&t._repeat&&!r&&t.parent&&At(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===u&&(u&&Ca(t,1),r||L||(At(t,u?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)}(this,t,e,r);return this},e.targets=function targets(){return this._targets},e.invalidate=function invalidate(t){return t&&this.vars.runBackwards||(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),E.prototype.invalidate.call(this,t)},e.resetTo=function resetTo(t,e,r,i,n){d||Lt.wake(),this._ts||this.play();var a,s=Math.min(this._dur,(this._dp._time-this._start)*this._ts);return this._initted||$t(this,s),a=this._ease(s/this._dur),function _updatePropTweens(t,e,r,i,n,a,s,o){var u,h,l,f,c=(t._pt&&t._ptCache||(t._ptCache={}))[e];if(!c)for(c=t._ptCache[e]=[],l=t._ptLookup,f=t._targets.length;f--;){if((u=l[f][e])&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Wt=1,t.vars[e]="+=0",$t(t,s),Wt=0,o?T(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(f=c.length;f--;)(u=(h=c[f])._pt||h).s=!i&&0!==i||n?u.s+(i||0)+a*u.c:i,u.c=r-u.s,h.e&&(h.e=ka(r)+_a(h.e)),h.b&&(h.b=u.s+_a(h.b))}(this,t,e,r,i,a,s,n)?this.resetTo(t,e,r,i,1):(La(this,0),this.parent||Aa(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e))return this._lazy=this._pt=0,this.parent?wb(this):this.scrollTrigger&&this.scrollTrigger.kill(!!L),this;if(this.timeline){var i=this.timeline.totalDuration();return this.timeline.killTweensOf(t,e,Zt&&!0!==Zt.vars.overwrite)._first||wb(this),this.parent&&i!==this.timeline.totalDuration()&&Ua(this,this._dur*this.timeline._tDur/i,0,1),this}var n,a,s,o,u,h,l,f=this._targets,c=t?Pt(t):f,d=this._ptLookup,p=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0}(f,c))return"all"===e&&(this._pt=0),wb(this);for(n=this._op=this._op||[],"all"!==e&&(r(e)&&(u={},ja(e,function(t){return u[t]=1}),e=u),e=function _addAliasesToVars(t,e){var r,i,n,a,s=t[0]?ha(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(i in r=bt({},e),o)if(i in r)for(n=(a=o[i].split(",")).length;n--;)r[a[n]]=r[i];return r}(f,e)),l=f.length;l--;)if(~c.indexOf(f[l]))for(u in a=d[l],"all"===e?(n[l]=e,o=a,s={}):(s=n[l]=n[l]||{},o=e),o)(h=a&&a[u])&&("kill"in h.d&&!0!==h.d.kill(u)||Ba(this,h,"_pt"),delete a[u]),"all"!==s&&(s[u]=1);return this._initted&&!this._pt&&p&&wb(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return Ya(1,arguments)},Tween.delayedCall=function delayedCall(t,e,r,i){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},Tween.fromTo=function fromTo(t,e,r){return Ya(2,arguments)},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return I.killTweensOf(t,e,r)},Tween}(Xt);ta(te.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ja("staggerTo,staggerFrom,staggerFromTo",function(r){te[r]=function(){var t=new Gt,e=Ct.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function qc(t,e,r){return t.setAttribute(e,r)}function yc(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)}var ie=function _setterPlain(t,e,r){return t[e]=r},ae=function _setterFunc(t,e,r){return t[e](r)},se=function _setterFuncWithParam(t,e,r,i){return t[e](i.fp,r)},ue=function _getSetter(t,e){return s(t[e])?ae:u(t[e])&&t.setAttribute?qc:ie},fe=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e6*(e.s+e.c*t))/1e6,e)},de=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},pe=function _renderComplexString(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(1===t&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},_e=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},ve=function _addPluginModifier(t,e,r,i){for(var n,a=this._pt;a;)n=a._next,a.p===i&&a.modifier(t,e,r),a=n},Te=function _killPropTweensOf(t){for(var e,r,i=this._pt;i;)r=i._next,i.p===t&&!i.op||i.op===t?Ba(this,i,"_pt"):i.dep||(e=1),i=r;return!e},be=function _sortPropTweensByPriority(t){for(var e,r,i,n,a=t._pt;a;){for(e=a._next,r=i;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:n)?a._prev._next=a:i=a,(a._next=r)?r._prev=a:n=a,a=e}t._pt=i},we=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=yc,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,i,n,a,s,o,u){this.t=e,this.s=i,this.c=n,this.p=r,this.r=a||fe,this.d=s||this,this.set=o||ie,this.pr=u||0,(this._next=t)&&(t._prev=this)}ja(Tt+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(t){return dt[t]=1}),ht.TweenMax=ht.TweenLite=te,ht.TimelineLite=ht.TimelineMax=Gt,I=new Gt({sortChildren:!1,defaults:j,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),Y.stringFilter=Ib;function Gc(t){return(Oe[t]||Me).map(function(t){return t()})}function Hc(){var t=Date.now(),o=[];2<t-Ce&&(Gc("matchMediaInit"),ke.forEach(function(t){var e,r,i,n,a=t.queries,s=t.conditions;for(r in a)(e=h.matchMedia(a[r]).matches)&&(i=1),e!==s[r]&&(s[r]=e,n=1);n&&(t.revert(),i&&o.push(t))}),Gc("matchMediaRevert"),o.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Ce=t,Gc("matchMedia"))}var xe,ke=[],Oe={},Me=[],Ce=0,Pe=0,Se=((xe=Context.prototype).add=function add(t,i,n){function Lw(){var t,e=l,r=a.selector;return e&&e!==a&&e.data.push(a),n&&(a.selector=fb(n)),l=a,t=i.apply(a,arguments),s(t)&&a._r.push(t),l=e,a.selector=r,a.isReverted=!1,t}s(t)&&(n=i,i=t,t=s);var a=this;return a.last=Lw,t===s?Lw(a,function(t){return a.add(null,t)}):t?a[t]=Lw:Lw},xe.ignore=function ignore(t){var e=l;l=null,t(this),l=e},xe.getTweens=function getTweens(){var e=[];return this.data.forEach(function(t){return t instanceof Context?e.push.apply(e,t.getTweens()):t instanceof te&&!(t.parent&&"nested"===t.parent.data)&&e.push(t)}),e},xe.clear=function clear(){this._r.length=this.data.length=0},xe.kill=function kill(i,t){var n=this;if(i?function(){for(var t,e=n.getTweens(),r=n.data.length;r--;)"isFlip"===(t=n.data[r]).data&&(t.revert(),t.getChildren(!0,!0,!1).forEach(function(t){return e.splice(e.indexOf(t),1)}));for(e.map(function(t){return{g:t._dur||t._delay||t._sat&&!t._sat.vars.immediateRender?t.globalTime(0):-1/0,t:t}}).sort(function(t,e){return e.g-t.g||-1/0}).forEach(function(t){return t.t.revert(i)}),r=n.data.length;r--;)(t=n.data[r])instanceof Gt?"nested"!==t.data&&(t.scrollTrigger&&t.scrollTrigger.revert(),t.kill()):t instanceof te||!t.revert||t.revert(i);n._r.forEach(function(t){return t(i,n)}),n.isReverted=!0}():this.data.forEach(function(t){return t.kill&&t.kill()}),this.clear(),t){for(var e=ke.length;e--;)ke[e].id===this.id&&ke.splice(e,1);this._mqs&&this._mqs.forEach(function(t){return t.removeListener?t.removeListener(Hc):t.removeEventListener("change",Hc)}),this._mqs=null}},xe.revert=function revert(t){this.kill(t||{})},Context);function Context(t,e){this.selector=e&&fb(e),this.data=[],this._r=[],this.isReverted=!1,this.id=Pe++,t&&this.add(t)}var De,Re=((De=MatchMedia.prototype).add=function add(t,e,r){v(t)||(t={matches:t});var i,n,a,s=new Se(0,r||this.scope),o=s.conditions={};for(n in l&&!s.selector&&(s.selector=l.selector),this.contexts.push(s),e=s.add("onMatch",e),s.queries=t)"all"===n?a=1:(i=h.matchMedia(t[n]))&&(ke.indexOf(s)<0&&ke.push(s),(o[n]=i.matches)&&(a=1),i.addListener?i.addListener(Hc):i.addEventListener("change",Hc),(s._mqs||(s._mqs=[])).push(i));return a&&e(s,function(t){return s.add(null,t)}),this},De.revert=function revert(t){this.kill(t||{})},De.kill=function kill(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},MatchMedia);function MatchMedia(t){this.contexts=[],this.scope=t,l&&l.data.push(this)}var Ee={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return zb(t)})},timeline:function timeline(t){return new Gt(t)},getTweensOf:function getTweensOf(t,e){return I.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,n){r(i)&&(i=Pt(i)[0]);var a=ha(i||{}).get,s=e?sa:ra;return"native"===e&&(e=""),i?t?s((mt[t]&&mt[t].get||a)(i,t,e,n)):function(t,e,r){return s((mt[t]&&mt[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,i){if(1<(r=Pt(r)).length){var n=r.map(function(t){return Fe.quickSetter(t,e,i)}),a=n.length;return function(t){for(var e=a;e--;)n[e](t)}}r=r[0]||{};var s=mt[e],o=ha(r),u=o.harness&&(o.harness.aliases||{})[e]||e,h=s?function(t){var e=new s;c._pt=0,e.init(r,i?t+i:t,c,0,[r]),e.render(1,e),c._pt&&_e(1,c)}:o.set(r,u);return s?h:function(t){return h(r,u,i?t+i:t,o,1)}},quickTo:function quickTo(t,i,e){function ey(t,e,r){return n.resetTo(i,t,e,r)}var r,n=Fe.to(t,ta(((r={})[i]="+=0.1",r.paused=!0,r.stagger=0,r),e||{}));return ey.tween=n,ey},isTweening:function isTweening(t){return 0<I.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=jt(t.ease,j.ease)),wa(j,t||{})},config:function config(t){return wa(Y,t||{})},registerEffect:function registerEffect(t){var i=t.name,n=t.effect,e=t.plugins,a=t.defaults,r=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!mt[t]&&!ht[t]&&T(i+" effect requires "+t+" plugin.")}),gt[i]=function(t,e,r){return n(Pt(t),ta(e||{},a),r)},r&&(Gt.prototype[i]=function(t,e,r){return this.add(gt[i](t,v(e)?e:(r=e)&&{},this),r)})},registerEase:function registerEase(t,e){Bt[t]=jt(e)},parseEase:function parseEase(t,e){return arguments.length?jt(t,e):Bt},getById:function getById(t){return I.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,i,n=new Gt(t);for(n.smoothChildTiming=w(t.smoothChildTiming),I.remove(n),n._dp=0,n._time=n._tTime=I._time,r=I._first;r;)i=r._next,!e&&!r._dur&&r instanceof te&&r.vars.onComplete===r._targets[0]||Na(n,r,r._start-r._delay),r=i;return Na(I,n,0),n},context:function context(t,e){return t?new Se(t,e):l},matchMedia:function matchMedia(t){return new Re(t)},matchMediaRefresh:function matchMediaRefresh(){return ke.forEach(function(t){var e,r,i=t.conditions;for(r in i)i[r]&&(i[r]=!1,e=1);e&&t.revert()})||Hc()},addEventListener:function addEventListener(t,e){var r=Oe[t]||(Oe[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function removeEventListener(t,e){var r=Oe[t],i=r&&r.indexOf(e);0<=i&&r.splice(i,1)},utils:{wrap:function wrap(e,t,r){var i=t-e;return K(e)?ob(e,wrap(0,e.length),t):Za(r,function(t){return(i+(t-e)%i)%i+e})},wrapYoyo:function wrapYoyo(e,t,r){var i=t-e,n=2*i;return K(e)?ob(e,wrapYoyo(0,e.length-1),t):Za(r,function(t){return e+(i<(t=(n+(t-e)%n)%n||0)?n-t:t)})},distribute:hb,random:kb,snap:jb,normalize:function normalize(t,e,r){return St(t,e,0,1,r)},getUnit:_a,clamp:function clamp(e,r,t){return Za(t,function(t){return Mt(e,r,t)})},splitColor:Db,toArray:Pt,selector:fb,mapRange:St,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||_a(t))}},interpolate:function interpolate(e,i,t,n){var a=isNaN(e+i)?0:function(t){return(1-t)*e+t*i};if(!a){var s,o,u,h,l,f=r(e),c={};if(!0===t&&(n=1)&&(t=null),f)e={p:e},i={p:i};else if(K(e)&&!K(i)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=i}else n||(e=bt(K(e)?[]:{},e));if(!u){for(s in i)Ht.call(c,e,s,"get",i[s]);a=function func(t){return _e(t,c)||(f?e.p:e)}}}return Za(t,a)},shuffle:gb},install:R,effects:gt,ticker:Lt,updateRoot:Gt.updateRoot,plugins:mt,globalTimeline:I,core:{PropTween:we,globals:U,Tween:te,Timeline:Gt,Animation:Xt,getCache:ha,_removeLinkedListItem:Ba,reverting:function reverting(){return L},context:function context(t){return t&&l&&(l.data.push(t),t._ctx=l),l},suppressOverwrites:function suppressOverwrites(t){return F=t}}};ja("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return Ee[t]=te[t]}),Lt.add(Gt.updateRoot),c=Ee.to({},{duration:0});function Lc(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function Nc(t,a){return{name:t,headless:1,rawVars:1,init:function init(t,n,e){e._onInit=function(t){var e,i;if(r(n)&&(e={},ja(n,function(t){return e[t]=1}),n=e),a){for(i in e={},n)e[i]=a(n[i]);n=e}!function _addModifiers(t,e){var r,i,n,a=t._targets;for(r in e)for(i=a.length;i--;)(n=(n=t._ptLookup[i][r])&&n.d)&&(n._pt&&(n=Lc(n,r)),n&&n.modifier&&n.modifier(e[r],t,a[i],r))}(t,n)}}}}var Fe=Ee.registerPlugin({name:"attr",init:function init(t,e,r,i,n){var a,s,o;for(a in this.tween=r,e)o=t.getAttribute(a)||"",(s=this.add(t,"setAttribute",(o||0)+"",e[a],i,n,0,0,a)).op=a,s.b=o,this._props.push(a)},render:function render(t,e){for(var r=e._pt;r;)L?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",headless:1,init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},Nc("roundProps",ib),Nc("modifiers"),Nc("snap",jb))||Ee;te.version=Gt.version=Fe.version="3.15.1",o=1,x()&&It();function xd(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function yd(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function zd(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function Ad(t,e){return e.set(e.t,e.p,1===t?e.e:t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function Bd(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function Cd(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function Dd(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function Ed(t,e,r){return t.style[e]=r}function Fd(t,e,r){return t.style.setProperty(e,r)}function Gd(t,e,r){return t._gsap[e]=r}function Hd(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function Id(t,e,r,i,n){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(n,a)}function Jd(t,e,r,i,n){var a=t._gsap;a[e]=r,a.renderTransform(n,a)}function Md(t,e){var r=this,i=this.target,n=i.style,a=i._gsap;if(t in ur&&n){if(this.tfm=this.tfm||{},"transform"===t)return _r.transform.split(",").forEach(function(t){return Md.call(r,t,e)});if(~(t=_r[t]||t).indexOf(",")?t.split(",").forEach(function(t){return r.tfm[t]=wr(i,t)}):this.tfm[t]=a.x?a[t]:wr(i,t),t===gr&&(this.tfm.zOrigin=a.zOrigin),0<=this.props.indexOf(mr))return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(gr,e,"")),t=mr}(n||e)&&this.props.push(t,e,n[t])}function Nd(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))}function Od(){var t,e,r=this.props,i=this.target,n=i.style,a=i._gsap;for(t=0;t<r.length;t+=3)r[t+1]?2===r[t+1]?i[r[t]](r[t+2]):i[r[t]]=r[t+2]:r[t+2]?n[r[t]]=r[t+2]:n.removeProperty("--"===r[t].substr(0,2)?r[t]:r[t].replace(cr,"-$1").toLowerCase());if(this.tfm){for(e in this.tfm)a[e]=this.tfm[e];a.svg&&(a.renderTransform(),i.setAttribute("data-svg-origin",this.svgo||"")),(t=je())&&t.isStart||n[mr]||(Nd(n),a.zOrigin&&n[gr]&&(n[gr]+=" "+a.zOrigin+"px",a.zOrigin=0,a.renderTransform()),a.uncache=1)}}function Pd(t,e){var r={target:t,props:[],revert:Od,save:Md};return t._gsap||Fe.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(t){return r.save(t)}),r}function Rd(t,e){var r=Ie.createElementNS?Ie.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Ie.createElement(t);return r&&r.style?r:Ie.createElement(t)}function Sd(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(cr,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&Sd(t,yr(e)||e,1)||""}function Vd(){(function _windowExists(){return"undefined"!=typeof window})()&&window.document&&(Le=window,Ie=Le.document,Be=Ie.documentElement,Ue=Rd("div")||{style:{}},Rd("div"),mr=yr(mr),gr=mr+"Origin",Ue.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Ve=!!yr("perspective"),je=Fe.core.reverting,Ne=1)}function Wd(t){var e,r=t.ownerSVGElement,i=Rd("svg",r&&r.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=t.cloneNode(!0);n.style.display="block",i.appendChild(n),Be.appendChild(i);try{e=n.getBBox()}catch(t){}return i.removeChild(n),Be.removeChild(i),e}function Xd(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function Yd(e){var r,i;try{r=e.getBBox()}catch(t){r=Wd(e),i=1}return r&&(r.width||r.height)||i||(r=Wd(e)),!r||r.width||r.x||r.y?r:{x:+Xd(e,["x","cx","x1"])||0,y:+Xd(e,["y","cy","y1"])||0,width:0,height:0}}function Zd(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!Yd(t))}function $d(t,e){if(e){var r,i=t.style;e in ur&&e!==gr&&(e=mr),i.removeProperty?("ms"!==(r=e.substr(0,2))&&"webkit"!==e.substr(0,6)||(e="-"+e),i.removeProperty("--"===r?e:e.replace(cr,"-$1").toLowerCase())):i.removeAttribute(e)}}function _d(t,e,r,i,n,a){var s=new we(t._pt,e,r,0,1,a?Dd:Cd);return(t._pt=s).b=i,s.e=n,t._props.push(r),s}function ce(t,e,r,i){var n,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=Ue.style,f=dr.test(e),c="svg"===t.tagName.toLowerCase(),d=(c?"client":"offset")+(f?"Width":"Height"),p="px"===i,_="%"===i;if(i===h||!u||Tr[i]||Tr[h])return u;if("px"===h||p||(u=ce(t,e,r,"px")),o=t.getCTM&&Zd(t),(_||"%"===h)&&(ur[e]||~e.indexOf("adius")))return n=o?t.getBBox()[f?"width":"height"]:t[d],ka(_?u/n*100:u/100*n);if(l[f?"width":"height"]=100+(p?h:i),a="rem"!==i&&~e.indexOf("adius")||"em"===i&&t.appendChild&&!c?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==Ie&&a.appendChild||(a=Ie.body),(s=a._gsap)&&_&&s.width&&f&&s.time===Lt.time&&!s.uncache)return ka(u/s.width*100);if(!_||"height"!==e&&"width"!==e)!_&&"%"!==h||br[Sd(a,"display")]||(l.position=Sd(t,"position")),a===t&&(l.position="static"),a.appendChild(Ue),n=Ue[d],a.removeChild(Ue),l.position="absolute";else{var m=t.style[e];t.style[e]=100+i,n=t[d],m?t.style[e]=m:$d(t,e)}return f&&_&&((s=ha(a)).time=Lt.time,s.width=a[d]),ka(p?n*u/100:n&&u?100/n*u:0)}function ee(t,e,r,i){if(!r||"none"===r){var n=yr(e,t,1),a=n&&Sd(t,n,1);a&&a!==r?(e=n,r=a):"borderColor"===e&&(r=Sd(t,"borderTopColor"))}var s,o,u,h,l,f,c,d,p,_,m,g=new we(this._pt,t.style,e,0,1,pe),v=0,y=0;if(g.b=r,g.e=i,r+="","var(--"===(i+="").substring(0,6)&&(i=Sd(t,i.substring(4,i.indexOf(")")))),"auto"===i&&(f=t.style[e],t.style[e]=i,i=Sd(t,e)||i,f?t.style[e]=f:$d(t,e)),Ib(s=[r,i]),i=s[1],u=(r=s[0]).match(nt)||[],(i.match(nt)||[]).length){for(;o=nt.exec(i);)c=o[0],p=i.substring(v,o.index),l?l=(l+1)%5:"rgba("!==p.substr(-5)&&"hsla("!==p.substr(-5)||(l=1),c!==(f=u[y++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),"="===c.charAt(1)&&(c=ma(h,c)+m),d=parseFloat(c),_=c.substr((d+"").length),v=nt.lastIndex-_.length,_||(_=_||Y.units[e]||m,v===i.length&&(i+=_,g.e+=_)),m!==_&&(h=ce(t,e,f,_)||0),g._pt={_next:g._pt,p:p||1===y?p:",",s:h,c:d-h,m:l&&l<4||"zIndex"===e?Math.round:0});g.c=v<i.length?i.substring(v,i.length):""}else g.r="display"===e&&"none"===i?Dd:Cd;return st.test(i)&&(g.e=0),this._pt=g}function ge(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==i&&"right"!==i||(t=r,r=i,i=t),e[0]=xr[r]||r,e[1]=xr[i]||i,e.join(" ")}function he(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,i,n,a=e.t,s=a.style,o=e.u,u=a._gsap;if("all"===o||!0===o)s.cssText="",i=1;else for(n=(o=o.split(",")).length;-1<--n;)r=o[n],ur[r]&&(i=1,r="transformOrigin"===r?gr:mr),$d(a,r);i&&($d(a,mr),u&&(u.svg&&a.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",Cr(a,1),u.uncache=1,Nd(s)))}}function le(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function me(t){var e=Sd(t,mr);return le(e)?Or:e.substr(7).match(it).map(ka)}function ne(t,e){var r,i,n,a,s=t._gsap||ha(t),o=t.style,u=me(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(n=t.transform.baseVal.consolidate().matrix).a,n.b,n.c,n.d,n.e,n.f]).join(",")?Or:u:(u!==Or||t.offsetParent||t===Be||s.svg||(n=o.display,o.display="block",(r=t.parentNode)&&(t.offsetParent||t.getBoundingClientRect().width)||(a=1,i=t.nextElementSibling,Be.appendChild(t)),u=me(t),n?o.display=n:$d(t,"display"),a&&(i?r.insertBefore(t,i):r?r.appendChild(t):Be.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function oe(t,e,r,i,n,a){var s,o,u,h=t._gsap,l=n||ne(t,!0),f=h.xOrigin||0,c=h.yOrigin||0,d=h.xOffset||0,p=h.yOffset||0,_=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==Or&&(o=_*v-m*g)&&(u=w*(-m/o)+x*(_/o)-(_*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=Yd(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),i||!1!==i&&h.smooth?(y=w-f,T=x-c,h.xOffset=d+(y*_+T*g)-y,h.yOffset=p+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!i,h.origin=e,h.originIsAbsolute=!!r,t.style[gr]="0px 0px",a&&(_d(a,h,"xOrigin",f,w),_d(a,h,"yOrigin",c,x),_d(a,h,"xOffset",d,h.xOffset),_d(a,h,"yOffset",p,h.yOffset)),t.setAttribute("data-svg-origin",w+" "+x)}function re(t,e,r){var i=_a(e);return ka(parseFloat(e)+parseFloat(ce(t,"x",r+"px",i)))+i}function ye(t,e,i,n,a){var s,o,u=360,h=r(a),l=parseFloat(a)*(h&&~a.indexOf("rad")?hr:1)-n,f=n+l+"deg";return h&&("short"===(s=a.split("_")[1])&&(l%=u)!==l%180&&(l+=l<0?u:-u),"cw"===s&&l<0?l=(l+36e9)%u-~~(l/u)*u:"ccw"===s&&0<l&&(l=(l-36e9)%u-~~(l/u)*u)),t._pt=o=new we(t._pt,e,i,n,l,yd),o.e=f,o.u="deg",t._props.push(i),o}function ze(t,e){for(var r in e)t[r]=e[r];return t}function Ae(t,e,r){var i,n,a,s,o,u,h,l=ze({},r._gsap),f=r.style;for(n in l.svg?(a=r.getAttribute("transform"),r.setAttribute("transform",""),f[mr]=e,i=Cr(r,1),$d(r,mr),r.setAttribute("transform",a)):(a=getComputedStyle(r)[mr],f[mr]=e,i=Cr(r,1),f[mr]=a),ur)(a=l[n])!==(s=i[n])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(n)<0&&(o=_a(a)!==(h=_a(s))?ce(r,n,a,h):parseFloat(a),u=parseFloat(s),t._pt=new we(t._pt,i,n,o,u-o,xd),t._pt.u=h||0,t._props.push(n));ze(i,l)}var Le,Ie,Be,Ne,Ue,Ye,je,Ve,qe=Bt.Power0,Xe=Bt.Power1,Ge=Bt.Power2,Ze=Bt.Power3,We=Bt.Power4,He=Bt.Linear,$e=Bt.Quad,Qe=Bt.Cubic,Je=Bt.Quart,Ke=Bt.Quint,tr=Bt.Strong,er=Bt.Elastic,rr=Bt.Back,ir=Bt.SteppedEase,nr=Bt.Bounce,ar=Bt.Sine,sr=Bt.Expo,or=Bt.Circ,ur={},hr=180/Math.PI,lr=Math.PI/180,fr=Math.atan2,cr=/([A-Z])/g,dr=/(left|right|width|margin|padding|x)/i,pr=/[\s,\(]\S/,_r={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},mr="transform",gr=mr+"Origin",vr="O,Moz,ms,Ms,Webkit".split(","),yr=function _checkPropPrefix(t,e,r){var i=(e||Ue).style,n=5;if(t in i&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);n--&&!(vr[n]+t in i););return n<0?null:(3===n?"ms":0<=n?vr[n]:"")+t},Tr={deg:1,rad:1,turn:1},br={grid:1,flex:1},wr=function _get(t,e,r,i){var n;return Ne||Vd(),e in _r&&"transform"!==e&&~(e=_r[e]).indexOf(",")&&(e=e.split(",")[0]),ur[e]&&"transform"!==e?(n=Cr(t,i),n="transformOrigin"!==e?n[e]:n.svg?n.origin:Pr(Sd(t,gr))+" "+n.zOrigin+"px"):(n=t.style[e])&&"auto"!==n&&!i&&!~(n+"").indexOf("calc(")||(n=kr[e]&&kr[e](t,e,r)||Sd(t,e)||ia(t,e)||("opacity"===e?1:0)),r&&!~(n+"").trim().indexOf(" ")?ce(t,e,n,r)+r:n},xr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},kr={clearProps:function clearProps(t,e,r,i,n){if("isFromStart"!==n.data){var a=t._pt=new we(t._pt,e,r,0,0,he);return a.u=i,a.pr=-10,a.tween=n,t._props.push(r),1}}},Or=[1,0,0,1,0,0],Mr={},Cr=function _parseTransform(t,e){var r=t._gsap||new qt(t);if("x"in r&&!e&&!r.uncache)return r;var i,n,a,s,o,u,h,l,f,c,d,p,_,m,g,v,y,T,b,w,x,k,O,M,C,P,S,A,D,z,R,E,F=t.style,L=r.scaleX<0,I="deg",B=getComputedStyle(t),N=Sd(t,gr)||"0";return i=n=a=u=h=l=f=c=d=0,s=o=1,r.svg=!(!t.getCTM||!Zd(t)),B.translate&&("none"===B.translate&&"none"===B.scale&&"none"===B.rotate||(F[mr]=("none"!==B.translate?"translate3d("+(B.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+("none"!==B.rotate?"rotate("+B.rotate+") ":"")+("none"!==B.scale?"scale("+B.scale.split(" ").join(",")+") ":"")+("none"!==B[mr]?B[mr]:"")),F.scale=F.rotate=F.translate="none"),m=ne(t,r.svg),r.svg&&(M=r.uncache?(C=t.getBBox(),N=r.xOrigin-C.x+"px "+(r.yOrigin-C.y)+"px",""):!e&&t.getAttribute("data-svg-origin"),oe(t,M||N,!!M||r.originIsAbsolute,!1!==r.smooth,m)),p=r.xOrigin||0,_=r.yOrigin||0,m!==Or&&(T=m[0],b=m[1],w=m[2],x=m[3],i=k=m[4],n=O=m[5],6===m.length?(s=Math.sqrt(T*T+b*b),o=Math.sqrt(x*x+w*w),u=T||b?fr(b,T)*hr:0,(f=w||x?fr(w,x)*hr+u:0)&&(o*=Math.abs(Math.cos(f*lr))),r.svg&&(i-=p-(p*T+_*w),n-=_-(p*b+_*x))):(E=m[6],z=m[7],S=m[8],A=m[9],D=m[10],R=m[11],i=m[12],n=m[13],a=m[14],h=(g=fr(E,D))*hr,g&&(M=k*(v=Math.cos(-g))+S*(y=Math.sin(-g)),C=O*v+A*y,P=E*v+D*y,S=k*-y+S*v,A=O*-y+A*v,D=E*-y+D*v,R=z*-y+R*v,k=M,O=C,E=P),l=(g=fr(-w,D))*hr,g&&(v=Math.cos(-g),R=x*(y=Math.sin(-g))+R*v,T=M=T*v-S*y,b=C=b*v-A*y,w=P=w*v-D*y),u=(g=fr(b,T))*hr,g&&(M=T*(v=Math.cos(g))+b*(y=Math.sin(g)),C=k*v+O*y,b=b*v-T*y,O=O*v-k*y,T=M,k=C),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=ka(Math.sqrt(T*T+b*b+w*w)),o=ka(Math.sqrt(O*O+E*E)),g=fr(k,O),f=2e-4<Math.abs(g)?g*hr:0,d=R?1/(R<0?-R:R):0),r.svg&&(M=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!le(Sd(t,mr)),M&&t.setAttribute("transform",M))),90<Math.abs(f)&&Math.abs(f)<270&&(L?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),e=e||r.uncache,r.x=i-((r.xPercent=i&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-i)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+"px",r.y=n-((r.yPercent=n&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-n)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+"px",r.z=a+"px",r.scaleX=ka(s),r.scaleY=ka(o),r.rotation=ka(u)+I,r.rotationX=ka(h)+I,r.rotationY=ka(l)+I,r.skewX=f+I,r.skewY=c+I,r.transformPerspective=d+"px",(r.zOrigin=parseFloat(N.split(" ")[2])||!e&&r.zOrigin||0)&&(F[gr]=Pr(N)),r.xOffset=r.yOffset=0,r.force3D=Y.force3D,r.renderTransform=r.svg?Er:Ve?Rr:Sr,r.uncache=0,r},Pr=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},Sr=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Rr(t,e)},Ar="0deg",Dr="0px",zr=") ",Rr=function _renderCSSTransforms(t,e){var r=e||this,i=r.xPercent,n=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,c=r.skewY,d=r.scaleX,p=r.scaleY,_=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==Ar||h!==Ar)){var b,w=parseFloat(h)*lr,x=Math.sin(w),k=Math.cos(w);w=parseFloat(l)*lr,b=Math.cos(w),a=re(g,a,x*b*-v),s=re(g,s,-Math.sin(w)*-v),o=re(g,o,k*b*-v+v)}_!==Dr&&(y+="perspective("+_+zr),(i||n)&&(y+="translate("+i+"%, "+n+"%) "),!T&&a===Dr&&s===Dr&&o===Dr||(y+=o!==Dr||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+zr),u!==Ar&&(y+="rotate("+u+zr),h!==Ar&&(y+="rotateY("+h+zr),l!==Ar&&(y+="rotateX("+l+zr),f===Ar&&c===Ar||(y+="skew("+f+", "+c+zr),1===d&&1===p||(y+="scale("+d+", "+p+zr),g.style[mr]=y||"translate(0, 0)"},Er=function _renderSVGTransforms(t,e){var r,i,n,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,c=o.rotation,d=o.skewX,p=o.skewY,_=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),k=parseFloat(f);c=parseFloat(c),d=parseFloat(d),(p=parseFloat(p))&&(d+=p=parseFloat(p),c+=p),c||d?(c*=lr,d*=lr,r=Math.cos(c)*_,i=Math.sin(c)*_,n=Math.sin(c-d)*-m,a=Math.cos(c-d)*m,d&&(p*=lr,s=Math.tan(d-p),n*=s=Math.sqrt(1+s*s),a*=s,p&&(s=Math.tan(p),r*=s=Math.sqrt(1+s*s),i*=s)),r=ka(r),i=ka(i),n=ka(n),a=ka(a)):(r=_,a=m,i=n=0),(x&&!~(l+"").indexOf("px")||k&&!~(f+"").indexOf("px"))&&(x=ce(g,"x",l,"px"),k=ce(g,"y",f,"px")),(v||y||T||b)&&(x=ka(x+v-(v*r+y*n)+T),k=ka(k+y-(v*i+y*a)+b)),(u||h)&&(s=g.getBBox(),x=ka(x+u/100*s.width),k=ka(k+h/100*s.height)),s="matrix("+r+","+i+","+n+","+a+","+x+","+k+")",g.setAttribute("transform",s),w&&(g.style[mr]=s)};ja("padding,margin,Width,Radius",function(e,r){var t="Right",i="Bottom",n="Left",o=(r<3?["Top",t,i,n]:["Top"+n,"Top"+t,i+t,i+n]).map(function(t){return r<2?e+t:"border"+t+e});kr[1<r?"border"+e:e]=function(e,t,r,i,n){var a,s;if(arguments.length<4)return a=o.map(function(t){return wr(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(i+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,n)}});var Fr,Lr,Ir,Br={name:"css",register:Vd,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,i,n,a){var s,o,u,h,l,f,c,d,p,_,m,g,v,y,T,b,w,x=this._props,k=t.style,O=i.vars.startAt;for(c in Ne||Vd(),this.styles=this.styles||Pd(t),b=this.styles.props,this.tween=i,e)if("autoRound"!==c&&(o=e[c],!mt[c]||!cc(c,e,i,n,t,a)))if(l=typeof o,f=kr[c],"function"===l&&(l=typeof(o=o.call(i,n,t,a))),"string"===l&&~o.indexOf("random(")&&(o=rb(o)),f)f(this,t,c,o,i)&&(T=1);else if("--"===c.substr(0,2))s=(getComputedStyle(t).getPropertyValue(c)+"").trim(),o+="",Et.lastIndex=0,Et.test(s)||(d=_a(s),(p=_a(o))?d!==p&&(s=ce(t,c,s,p)+p):d&&(o+=d)),this.add(k,"setProperty",s,o,n,a,0,0,c),x.push(c),b.push(c,0,k[c]);else if("undefined"!==l){if(O&&c in O?(s="function"==typeof O[c]?O[c].call(i,n,t,a):O[c],r(s)&&~s.indexOf("random(")&&(s=rb(s)),_a(s+"")||"auto"===s||(s+=Y.units[c]||_a(wr(t,c))||""),"="===(s+"").charAt(1)&&(s=wr(t,c))):s=wr(t,c),h=parseFloat(s),(_="string"===l&&"="===o.charAt(1)&&o.substr(0,2))&&(o=o.substr(2)),u=parseFloat(o),c in _r&&("autoAlpha"===c&&(1===h&&"hidden"===wr(t,"visibility")&&u&&(h=0),b.push("visibility",0,k.visibility),_d(this,k,"visibility",h?"inherit":"hidden",u?"inherit":"hidden",!u)),"scale"!==c&&"transform"!==c&&~(c=_r[c]).indexOf(",")&&(c=c.split(",")[0])),m=c in ur){if(this.styles.save(c),w=o,"string"===l&&"var(--"===o.substring(0,6)){if("calc("===(o=Sd(t,o.substring(4,o.indexOf(")")))).substring(0,5)){var M=t.style.perspective;t.style.perspective=o,o=Sd(t,"perspective"),M?t.style.perspective=M:$d(t,"perspective")}u=parseFloat(o)}if(g||((v=t._gsap).renderTransform&&!e.parseTransform||Cr(t,e.parseTransform),y=!1!==e.smoothOrigin&&v.smooth,(g=this._pt=new we(this._pt,k,mr,0,1,v.renderTransform,v,0,-1)).dep=1),"scale"===c)this._pt=new we(this._pt,v,"scaleY",v.scaleY,(_?ma(v.scaleY,_+u):u)-v.scaleY||0,xd),this._pt.u=0,x.push("scaleY",c),c+="X";else{if("transformOrigin"===c){b.push(gr,0,k[gr]),o=ge(o),v.svg?oe(t,o,0,y,0,this):((p=parseFloat(o.split(" ")[2])||0)!==v.zOrigin&&_d(this,v,"zOrigin",v.zOrigin,p),_d(this,k,c,Pr(s),Pr(o)));continue}if("svgOrigin"===c){oe(t,o,1,y,0,this);continue}if(c in Mr){ye(this,v,c,h,_?ma(h,_+o):o);continue}if("smoothOrigin"===c){_d(this,v,"smooth",v.smooth,o);continue}if("force3D"===c){v[c]=o;continue}if("transform"===c){Ae(this,o,t);continue}}}else c in k||(c=yr(c)||c);if(m||(u||0===u)&&(h||0===h)&&!pr.test(o)&&c in k)u=u||0,(d=(s+"").substr((h+"").length))!==(p=_a(o)||(c in Y.units?Y.units[c]:d))&&(h=ce(t,c,s,p)),this._pt=new we(this._pt,m?v:k,c,h,(_?ma(h,_+u):u)-h,m||"px"!==p&&"zIndex"!==c||!1===e.autoRound?xd:Bd),this._pt.u=p||0,m&&w!==o?(this._pt.b=s,this._pt.e=w,this._pt.r=Ad):d!==p&&"%"!==p&&(this._pt.b=s,this._pt.r=zd);else if(c in k)ee.call(this,t,c,s,_?_+o:o);else if(c in t)this.add(t,c,s||t[c],_?_+o:o,n,a);else if("parseTransform"!==c){S(c,o);continue}m||(c in k?b.push(c,0,k[c]):"function"==typeof t[c]?b.push(c,2,t[c]()):b.push(c,1,s||t[c])),x.push(c)}T&&be(this)},render:function render(t,e){if(e.tween._time||!je())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:wr,aliases:_r,getSetter:function getSetter(t,e,r){var i=_r[e];return i&&i.indexOf(",")<0&&(e=i),e in ur&&e!==gr&&(t._gsap.x||wr(t,"x"))?r&&Ye===r?"scale"===e?Hd:Gd:(Ye=r||{})&&("scale"===e?Id:Jd):t.style&&!u(t.style[e])?Ed:~e.indexOf("-")?Fd:ue(t,e)},core:{_removeProperty:$d,_getMatrix:ne}};Fe.utils.checkPrefix=yr,Fe.core.getStyleSaver=Pd,Ir=ja((Fr="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(Lr="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){ur[t]=1}),ja(Lr,function(t){Y.units[t]="deg",Mr[t]=1}),_r[Ir[13]]=Fr+","+Lr,ja("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");_r[e[1]]=Ir[e[0]]}),ja("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){Y.units[t]="px"}),Fe.registerPlugin(Br);var Nr=Fe.registerPlugin(Br)||Fe,Ur=Nr.core.Tween;e.Back=rr,e.Bounce=nr,e.CSSPlugin=Br,e.Circ=or,e.Cubic=Qe,e.Elastic=er,e.Expo=sr,e.Linear=He,e.Power0=qe,e.Power1=Xe,e.Power2=Ge,e.Power3=Ze,e.Power4=We,e.Quad=$e,e.Quart=Je,e.Quint=Ke,e.Sine=ar,e.SteppedEase=ir,e.Strong=tr,e.TimelineLite=Gt,e.TimelineMax=Gt,e.TweenLite=te,e.TweenMax=Ur,e.default=Nr,e.gsap=Nr;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});
;
      before.forEach(([k, d]) => { if (d) Object.defineProperty(window, k, d); else delete window[k]; });
      return exports.gsap;
    })();
    /* gsap:end */

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
/* 宿主的菜单面（输入框 + 菜单等）只在 macOS 上垫一层底色（_backing），Windows 上是全透明的，
   后面的消息会透出来：直接给菜单面铺上皮肤的菜单底色 */
html:root body [class*="_surface"][data-menu-material] {
  background: var(--dsw-specific-menu);
}

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
  /* 跟随明暗主题：原来写死深色，浅色主题下成了黑底深字。 */
  background: var(--dsw-alias-markdown-code-block);
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

html:root body[data-ds-dark-theme] [data-chat-flow-kind] pre {
  background: rgba(6, 7, 9, 0.72);
}

html:root body [data-chat-flow-kind] :not(pre) > code {
  background: var(--dsw-alias-markdown-inline-code);
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
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 7px 14px;
}

.dsh-hud-stats__row:not(.is-half) { grid-column: 1 / -1; }
.dsh-hud-stats__row.is-half { grid-template-columns: 16px minmax(0, 1fr); }
.dsh-hud-stats__row.is-half .dsh-hud-stats__label:empty { display: none; }

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

/* 「清除」按钮：只在有内嵌图片时出现，和「选择文件」并排。 */
.dsh-hud-settings__clear {
  flex: none;
  width: 44px;
  height: 22px;
  padding: 0;
  font-size: 10px;
  color: var(--dsw-alias-label-secondary);
  background: transparent;
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: 3px;
  cursor: pointer;
}

.dsh-hud-settings__clear:hover {
  color: var(--dsw-alias-label-primary);
  border-color: var(--dsw-alias-border-l2);
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
  /* 跟随明暗主题：原来写死深色，浅色主题下输入框成了一块黑板。 */
  background: var(--dsw-alias-bg-overlay);
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

/* 接在设置行后面的小节标题（如「花费」）和上一行拉开距离 */
.dsh-hud-settings__row + .dsh-hud-settings__title {
  margin-top: 24px;
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

/* 读数面板的「详细」按钮和展开的数据。面板本身不接收指针，只有按钮接 */
.dsh-hud-stats__more {
  align-self: flex-end;
  pointer-events: auto;
  padding: 2px 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 10px;
  letter-spacing: 0.09em;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
}

.dsh-hud-stats__more:hover,
.dsh-hud-stats__more:focus-visible {
  color: var(--dsw-alias-brand-primary);
}

.dsh-hud-stats__more:focus-visible {
  outline: 1px solid var(--dsw-alias-brand-primary);
  outline-offset: 2px;
}

.dsh-hud-stats__detail {
  display: grid;
  gap: 10px;
  padding-top: 8px;
  border-top: 0.5px solid var(--dsw-alias-border-l2);
}

/* 读数整块、详细按钮、详细数据收起后用 hidden 藏掉 */
.dsh-hud-stats__list[hidden],
.dsh-hud-stats__detail[hidden],
.dsh-hud-stats__more[hidden] {
  display: none;
}

.dsh-hud-stats__dsec h4 {
  margin: 0 0 4px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.09em;
  color: var(--dsw-alias-label-secondary);
}

.dsh-hud-stats__drow {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 11px;
  line-height: 1.7;
  color: var(--dsw-alias-label-secondary);
}

.dsh-hud-stats__drow span:last-child {
  color: var(--dsw-alias-label-primary);
  font-variant-numeric: tabular-nums;
}

.dsh-hud-stats__dnote {
  margin: 0;
  font-size: 10px;
  color: var(--dsw-alias-label-secondary);
  opacity: 0.8;
}

.dsh-hud-settings__prices {
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 84px;
  resize: vertical;
  font-family: ui-monospace, Consolas, monospace;
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

/* Clearer labels: the panel is translucent, so text reads a step brighter
   than the app-wide values (which are tuned for opaque surfaces). Dark theme
   only: in light theme the host's controls stay white, and white labels on
   them were unreadable. */
html:root body[data-ds-dark-theme] [class*="_overlay"]:has([class*="_navList"]) > [class*="_panel"] {
  --dsw-alias-label-primary: rgba(248, 250, 255, 0.98);
  --dsw-alias-label-secondary: rgba(232, 238, 246, 0.82);
  --dsw-alias-label-tertiary: rgba(214, 222, 232, 0.74);
}

/* The panel is nearly clear now, so labels get ONE flat dark shadow for
   contrast — not the body's three-layer projection, whose white ghost layer is
   what made small settings text look out of focus. */
html:root body[data-ds-dark-theme] [class*="_overlay"]:has([class*="_navList"]) [class*="_panel"],
html:root body[data-ds-dark-theme] [class*="_overlay"]:has([class*="_navList"]) [class*="_panel"] * {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
}

/* 浅色主题：设置面板换成浅色磨砂，标签用宿主的深色字，宿主的白底控件才看得清。 */
html:root body:not([data-ds-dark-theme]) [class*="_overlay"]:has([class*="_navList"]) > [class*="_panel"] {
  background: var(--hud-settings-fill, rgba(246, 247, 250, 0.96));
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 42%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    0 0 0 1px rgba(20, 22, 26, 0.12),
    0 10px 26px rgba(15, 18, 24, 0.16),
    0 34px 72px rgba(15, 18, 24, 0.14);
}

html:root body:not([data-ds-dark-theme]) [class*="_overlay"]:has([class*="_navList"]) [class*="_navCell"] {
  background: rgba(20, 22, 26, 0.04);
  box-shadow: inset 0 0 0 0.5px rgba(20, 22, 26, 0.08);
}

html:root body:not([data-ds-dark-theme]) [class*="_overlay"]:has([class*="_navList"]) [class*="_navCell"]:hover,
html:root body:not([data-ds-dark-theme]) [class*="_overlay"]:has([class*="_navList"]) [class*="_navCell"]:is([aria-current="true"], [class*="active"]) {
  background: rgba(20, 22, 26, 0.08);
}

/* 吸顶栏：dshmarket 拿 --dsw-alias-bg-base 当遮挡底色，本皮肤把它设成了
   全透明好露出星空，结果一滚动卡片就从标题栏底下透出来、文字叠在一起。给它们一层实底。 */
html:root body [class*="_stickyHead"],
html:root body [data-dsh-market-plugins-tab="true"]:not([data-dsh-market-fullscreen="true"]) :is([class$="_head"], [class*="_head "], [class$="_cats"], [class*="_cats "]) {
  background: var(--dsw-alias-bg-overlay);
  backdrop-filter: blur(12px);
}

/* 浮层：dshmarket 的「任务」面板用 bg-layer-1 当底，本皮肤里它只有一半不透明，下面的卡片字全透上来。 */
html:root body [class*="_opPanel"] {
  background: var(--dsw-alias-bg-overlay);
  backdrop-filter: blur(14px);
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
      prices: '',           // 自定义价目表：每行「模型 | 缓存命中 | 输入 | 输出」，元 / 百万 token
      detail: false,        // 读数面板展开详细数据
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
      try { localStorage.setItem(HUD_KEY, JSON.stringify(next)); } catch (error) {
        // localStorage 每站点约 500 万字符，大图的 data URL 会撑爆；别静默吞掉，让用户知道没存上。
        if (error && error.name === 'QuotaExceededError') {
          window.alert('设置没保存：本地存储空间不够，多半是自定义背景图太大（建议 3 MB 以内），换张小点的图再试。');
        }
      }
      window.dispatchEvent(new CustomEvent('blockade-alter:hud'));
      return next;
    }

    /* bg-apply:start */
    // 自定义背景：CSS 自定义属性的值有 2 MiB（2,097,152 字符）硬上限，超了整条
    // 声明会被浏览器静默丢弃、背景回退成深空渐变（不报错也没提示）。所以超过安全
    // 线的值不再塞进 --hud-bg，而是直接写到背景层的内联 background-image：
    // 直接声明没有这个上限，几 MB 的 data URL 照样能画。
    const HUD_BG_VAR_LIMIT = 2090000;
    let backdropEl = null; // .ba-backdrop 层，由背景 effect 挂上
    let bgValue = '';      // 当前生效的背景值（归一后）
    let bgApplied = null;  // 上一次写进页面的值，避免重复塞几 MB 的字符串

    // 背景值归一：裸的 data: URL 自动包成 url("...")，其余（url()、渐变、颜色）原样。
    function normalizeBg(value) {
      const bg = String(value == null ? '' : value).trim();
      if (!bg) return '';
      if (/^data:/i.test(bg)) return 'url("' + bg + '")';
      return bg;
    }

    // 把当前背景值真正写到页面上：小值仍走 --hud-bg（保持原路径），大值走内联。
    function syncBackground() {
      const bg = bgValue;
      const root = document.documentElement.style;
      if (!bg) root.removeProperty('--hud-bg');
      else if (bg.length <= HUD_BG_VAR_LIMIT) root.setProperty('--hud-bg', bg);
      else root.removeProperty('--hud-bg');
      if (!backdropEl) return;
      if (bg) backdropEl.style.setProperty('background-image', bg);
      else {
        backdropEl.style.removeProperty('background-image');
        // 清空后别在元素上留个空的 style="" 属性。
        if (!backdropEl.style.length) backdropEl.removeAttribute('style');
      }
    }

    function applyCustomBackground(value) {
      const bg = normalizeBg(value);
      bgValue = bg;
      if (bg === bgApplied) return; // 没变就不重写：几 MB 的字符串每次重塞会卡
      bgApplied = bg;
      syncBackground();
    }

    function attachBackdrop(el) {
      backdropEl = el;
      syncBackground();
    }

    function detachBackdrop(el) {
      if (backdropEl !== el) return;
      backdropEl = null;
      bgApplied = null;
    }

    // 内嵌图片（data URL）识别。设置面板靠它决定要不要把值放进输入框。
    function isInlineBg(value) {
      return /^(?:url\(\s*['"]?\s*)?data:/i.test(String(value == null ? '' : value).trim());
    }

    // 内嵌图片的摘要：别把几 MB 的 base64 显示出来，只报个大小。
    function inlineBgLabel(value) {
      const chars = String(value == null ? '' : value).length;
      const kb = Math.round((chars * 3) / 4 / 1024);
      return '已选内嵌图片 · 约 ' + (kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB');
    }
    /* bg-apply:end */

    // 3D 背景：星点、节点和连线放进一个有纵深的盒子里做透视投影，近大远小、远处更淡；
    // 镜头缓慢漂移，跟鼠标做轻微视差（近处的动得多）。原生 WebGL1，不引依赖，每帧两次绘制。
    // 连线不用 gl.LINES（大多数显卡只有 1 像素宽），每段拆成两个三角形，在屏幕上按像素撑开宽度。
    // 拿不到 WebGL 时返回 null，调用方退回 2D。
    function createDeepField(canvas) {
      // 不开 MSAA：点和线的边缘在着色器里自己羽化了，全屏多重采样每帧白花显存带宽
      const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
      if (!gl) return null;

      // 两个着色器共用的漂移与投影：节点在 xy 上做小幅正弦漂移，透视按 w = 深度
      const COMMON = `
        uniform float uT, uAspect, uF; uniform vec3 uCam;
        vec4 project(vec3 pos, vec4 drift, float ph) {
          vec3 p = pos + vec3(drift.x * sin(uT * drift.z + ph), drift.y * cos(uT * drift.w + ph), 0.0);
          vec3 v = p - uCam;
          return vec4(v.x * uF / uAspect, v.y * uF, 0.0, max(-v.z, 0.05));
        }
        float fade(float d) { return clamp(1.3 - d / 6.0, 0.25, 1.0); }`;

      // 点：位置 3 · 漂移 4 · 相位、大小、透明度、闪烁速度 4 · 种类 1（0 星点 · 1 节点 · 2 亮节点）
      const POINT_VS = COMMON + `
        attribute vec3 aPos; attribute vec4 aDrift; attribute vec4 aLook; attribute float aKind;
        uniform float uDpr, uPulse;
        varying float vA; varying float vKind;
        void main() {
          vec4 c = project(aPos, aDrift, aLook.x);
          float a = aLook.z * fade(c.w);
          float size = aLook.y;
          if (aLook.w > 0.0) a *= 0.55 + 0.45 * sin(uT * aLook.w + aLook.x);
          if (aKind > 1.5 && uPulse > 0.5) {
            float b = 0.5 + 0.5 * sin(uT * 1.1 + aLook.x); // 呼吸：亮度和大小一起变
            a *= 0.3 + 0.7 * b;
            size *= 0.7 + 0.6 * b;
          }
          vA = a; vKind = aKind;
          gl_Position = c;
          gl_PointSize = size * uDpr * 3.0 / c.w;
        }`;
      const POINT_FS = `
        precision mediump float;
        uniform vec3 uStar, uAccent; varying float vA; varying float vKind;
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          if (r > 1.0) discard;
          float a = vA * (vKind > 1.5 ? 0.45 * exp(-r * r * 4.0) + smoothstep(0.28, 0.12, r) : smoothstep(1.0, 0.45, r));
          gl_FragColor = vec4((vKind < 0.5 ? uStar : uAccent) * a, a);
        }`;

      // 线：每个顶点带「自己这端」和「另一端」的位置、漂移、相位，再加朝哪边撑开（±1）和透明度
      const LINE_VS = COMMON + `
        attribute vec3 aPos; attribute vec4 aDrift; attribute float aPh;
        attribute vec3 bPos; attribute vec4 bDrift; attribute float bPh;
        attribute float aSide; attribute float aAlpha;
        uniform vec2 uView; uniform float uDpr, uWidth;
        varying float vA; varying float vSide;
        void main() {
          vec4 s = project(aPos, aDrift, aPh);
          vec4 o = project(bPos, bDrift, bPh);
          vec2 dir = (o.xy / o.w - s.xy / s.w) * uView;
          vec2 n = length(dir) > 0.0001 ? normalize(vec2(-dir.y, dir.x)) : vec2(0.0, 1.0);
          float px = max(uWidth * uDpr * 3.0 / s.w, uDpr) + 1.0; // 近粗远细，最细一像素，外加一像素羽化
          gl_Position = s + vec4(n * aSide * px / uView * s.w, 0.0, 0.0);
          vA = aAlpha * fade(s.w);
          vSide = aSide;
        }`;
      const LINE_FS = `
        precision mediump float;
        uniform vec3 uAccent; varying float vA; varying float vSide;
        void main() {
          float a = vA * smoothstep(1.0, 0.35, abs(vSide));
          gl_FragColor = vec4(uAccent * a, a);
        }`;

      const F = 1.732; // 视角 60°
      let point = null;
      let line = null;
      let opts = null;
      let lost = false;
      const cam = { x: 0, y: 0 };
      const aim = { x: 0, y: 0 };

      const program = (vs, fs, attrs, uniforms) => {
        const shader = (type, src) => {
          const s = gl.createShader(type);
          gl.shaderSource(s, src);
          gl.compileShader(s);
          if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
          return s;
        };
        const p = gl.createProgram();
        gl.attachShader(p, shader(gl.VERTEX_SHADER, vs));
        gl.attachShader(p, shader(gl.FRAGMENT_SHADER, fs));
        gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link');
        const loc = {};
        for (const n of uniforms) loc[n] = gl.getUniformLocation(p, n);
        // attrs: [名字, 几个数]，按顺序紧挨着放
        let off = 0;
        const layout = attrs.map(([n, size]) => { const a = { at: gl.getAttribLocation(p, n), size, off }; off += size; return a; });
        return { p, loc, layout, stride: off, buf: gl.createBuffer(), n: 0 };
      };
      const COMMON_U = ['uT', 'uAspect', 'uF', 'uCam', 'uDpr', 'uAccent'];
      const init = () => {
        point = program(POINT_VS, POINT_FS, [['aPos', 3], ['aDrift', 4], ['aLook', 4], ['aKind', 1]], [...COMMON_U, 'uPulse', 'uStar']);
        line = program(LINE_VS, LINE_FS, [['aPos', 3], ['aDrift', 4], ['aPh', 1], ['bPos', 3], ['bDrift', 4], ['bPh', 1], ['aSide', 1], ['aAlpha', 1]], [...COMMON_U, 'uView', 'uWidth']);
        gl.enable(gl.BLEND);
      };
      try { init(); } catch (error) { return null; }

      const onLost = (event) => { event.preventDefault(); lost = true; };
      const onRestored = () => {
        try { init(); lost = false; if (opts) build(opts); } catch (error) { /* 恢复不了就停在空白，CSS 渐变还在 */ }
      };
      const onPointer = (event) => {
        aim.x = (event.clientX / window.innerWidth) * 2 - 1;
        aim.y = 1 - (event.clientY / window.innerHeight) * 2;
      };
      canvas.addEventListener('webglcontextlost', onLost);
      canvas.addEventListener('webglcontextrestored', onRestored);
      window.addEventListener('pointermove', onPointer, { passive: true });

      const upload = (prog, data) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, prog.buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        prog.n = data.length / prog.stride;
      };

      // o: { w, h, dpr, dark, accent: [r,g,b] 0-255（浅色主题传加深过的主题色）, stars, lattice, pulse, rand }
      function build(o) {
        opts = o;
        if (lost) return;
        const { w, h, rand, dark } = o;
        const aspect = w / h;
        const area = w * h;
        // 屏幕上均匀撒点，再给一个深度：近处的稀、远处的密，整屏看起来都一样匀。多撒 15%，视差时边缘不露底
        const spot = (near, far) => {
          const d = near + rand() * (far - near);
          return [(rand() * 2 - 1) * 1.15 * aspect * d / F, (rand() * 2 - 1) * 1.15 * d / F, -d];
        };
        const pts = [];
        if (o.stars) {
          for (let i = Math.round(area / 2600); i > 0; i--) {
            const a = dark ? 0.25 + rand() * 0.45 : 0.2 + rand() * 0.3;
            const tw = rand() < 0.15 ? 0.5 + rand() * 1.5 : 0; // 约 15% 的星点闪烁
            pts.push(...spot(1.2, 7), 0, 0, 0, 0, rand() * 6.283, rand() < 0.92 ? 1.2 : 2.4, a, tw, 0);
          }
        }
        const seg = [];
        if (o.lattice) {
          const nodes = Array.from({ length: Math.round(area / 26000) }, () => {
            const p = spot(1.6, 5.5);
            const k = -p[2] / 3; // 漂移幅度随深度放大，屏幕上看起来一样大
            return {
              p, lit: rand() < 0.12, ph: rand() * 6.283,
              drift: [(0.012 + rand() * 0.02) * k, (0.012 + rand() * 0.02) * k, 0.04 + rand() * 0.06, 0.04 + rand() * 0.06],
            };
          });
          for (const n of nodes) pts.push(...n.p, ...n.drift, n.ph, n.lit ? 22 : 4, n.lit ? 1 : dark ? 0.6 : 0.7, 0, n.lit ? 2 : 1);
          // 每个节点连 3D 里最近的两个，太远不连（超过平均最近距离的 1.8 倍）：图案稀疏、不成网格
          const dist = (a, b) => Math.hypot(a.p[0] - b.p[0], a.p[1] - b.p[1], a.p[2] - b.p[2]);
          const near = nodes.map((a) => nodes.filter((b) => b !== a).map((b) => [b, dist(a, b)]).sort((x, y) => x[1] - y[1]).slice(0, 2));
          const mean = near.reduce((s, l) => s + (l[0] ? l[0][1] : 0), 0) / Math.max(1, nodes.length);
          const seen = new Set();
          nodes.forEach((a, i) => near[i].forEach(([b, d]) => {
            const key = a.ph < b.ph ? a.ph + ':' + b.ph : b.ph + ':' + a.ph;
            if (d > mean * 1.8 || seen.has(key)) return;
            seen.add(key);
            const al = (dark ? 0.42 : 0.55) * (1 - d / (mean * 2.2));
            const v = (s, t, side) => seg.push(...s.p, ...s.drift, s.ph, ...t.p, ...t.drift, t.ph, side, al);
            // 两个三角形拼成一条带宽度的线；另一端看过来法线反向，所以 b 端的 ±1 反过来
            v(a, b, 1); v(a, b, -1); v(b, a, -1);
            v(a, b, -1); v(b, a, 1); v(b, a, -1);
          }));
        }
        upload(point, pts);
        upload(line, seg);
      }

      const use = (prog, t) => {
        const { w, h, dpr, accent } = opts;
        gl.useProgram(prog.p);
        gl.bindBuffer(gl.ARRAY_BUFFER, prog.buf);
        for (const a of prog.layout) {
          gl.enableVertexAttribArray(a.at);
          gl.vertexAttribPointer(a.at, a.size, gl.FLOAT, false, prog.stride * 4, a.off * 4);
        }
        const L = prog.loc;
        gl.uniform1f(L.uT, t);
        gl.uniform1f(L.uAspect, w / h);
        gl.uniform1f(L.uF, F);
        gl.uniform3f(L.uCam, cam.x, cam.y, cam.z);
        gl.uniform1f(L.uDpr, dpr);
        gl.uniform3f(L.uAccent, accent[0] / 255, accent[1] / 255, accent[2] / 255);
        return L;
      };

      // t：秒；moving 为 false 时镜头停在原位，不跟鼠标
      function paint(t, moving) {
        if (lost || !opts) return;
        const { dark } = opts;
        if (moving) {
          cam.x += (aim.x * 0.12 - cam.x) * 0.06;
          cam.y += (aim.y * 0.08 - cam.y) * 0.06;
        }
        const m = moving ? 1 : 0;
        cam.z = m * 0.15 * Math.sin(t * 0.03);
        const keep = { x: cam.x, y: cam.y };
        cam.x += m * 0.05 * Math.sin(t * 0.05);
        cam.y += m * 0.035 * Math.sin(t * 0.07);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // 深色叠加发光；浅色底上叠加看不见，改普通混合
        if (dark) gl.blendFunc(gl.ONE, gl.ONE);
        else gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        if (line.n) {
          const L = use(line, t);
          gl.uniform2f(L.uView, canvas.width, canvas.height);
          gl.uniform1f(L.uWidth, 0.9);
          gl.drawArrays(gl.TRIANGLES, 0, line.n);
        }
        if (point.n) {
          const L = use(point, t);
          gl.uniform1f(L.uPulse, opts.pulse ? 1 : 0);
          const s = dark ? [200, 215, 255] : [70, 80, 110];
          gl.uniform3f(L.uStar, s[0] / 255, s[1] / 255, s[2] / 255);
          gl.drawArrays(gl.POINTS, 0, point.n);
        }
        cam.x = keep.x;
        cam.y = keep.y;
      }

      function dispose() {
        canvas.removeEventListener('webglcontextlost', onLost);
        canvas.removeEventListener('webglcontextrestored', onRestored);
        window.removeEventListener('pointermove', onPointer);
      }

      return { build, paint, dispose };
    }

    const ICONS = {
      turns: ['M2 4h10', 'M2 8h10', 'M2 12h6'],
      speed: ['M2 10a5 5 0 0 1 10 0', 'M7 10l3.4-3.6', 'M7 10h0.01'],
      tokens: ['M7 2l5 3-5 3-5-3z', 'M2 8l5 3 5-3'],
      cache: ['M8.5 1.5L3.5 8H7l-.5 4.5L11 6H7.5z'],
      context: ['M7 2a5 5 0 1 1-5 5', 'M7 2v5h5'],
      generic: ['M2.5 2.5h9v9h-9z', 'M5 7h4'],
      money: ['M4 2.5l3 4 3-4', 'M7 6.5V12', 'M4.5 8h5', 'M4.5 10h5'],
    };

    function classify(text) {
      if (/本轮|会话/.test(text)) return 'money';
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
            // 色盘一直显示着，聚焦它看不出变化；改成选中 HEX 输入框，直接敲色值。
            onClick: (event) => {
              const input = event.currentTarget.closest('.ba-pal').querySelector('.ba-pal__fields input');
              if (input) { input.focus(); input.select(); }
            },
          }, h('i', { 'aria-hidden': true }, '+'), '自定义')),
        h('div', { className: 'ba-pal__picker' },
          h('div', {
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

    // 设置里的「刷新官方价」：让宿主部分马上取一次价格快照，告诉用户现在用的是哪天的价
    function PriceRefresh() {
      const [state, setState] = React.useState({ busy: false, text: '' });
      const refresh = () => {
        setState({ busy: true, text: '正在取…' });
        fetch('/blockade-alter/prices/refresh', { cache: 'no-store' })
          .then((res) => (res.ok ? res.json() : null))
          .then((j) => {
            if (!j) throw new Error('no answer');
            setState({ busy: false, text: (j.fetched ? '已更新，' : '没取到，继续用') + '官方价 ' + (j.pricesAt || '—') });
            window.dispatchEvent(new CustomEvent('blockade-alter:hud')); // 面板马上按新价重算
          })
          .catch(() => setState({ busy: false, text: '刷新失败，宿主部分没有响应' }));
      };
      return h('span', { className: 'dsh-hud-settings__bg' },
        h('button', { type: 'button', className: 'dsh-hud-settings__btn', disabled: state.busy, onClick: refresh }, '刷新 · Refresh'),
        h('span', { className: 'ba-pal__note', role: 'status' }, state.text));
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
            // 内嵌图片不塞进输入框：几 MB 的 data URL 放进去，点一下都要卡死。
            // 有图时只显示摘要，要清掉按旁边的「清除」。
            value: isInlineBg(config.bg) ? '' : (config.bg || ''),
            placeholder: isInlineBg(config.bg) ? inlineBgLabel(config.bg) : 'url("...") / 渐变',
            onChange: (event) => update({ bg: event.target.value }),
          }),
          h('input', {
            type: 'file',
            accept: 'image/*',
            className: 'dsh-hud-settings__file',
            onChange: (event) => {
              const input = event.target;
              const file = input.files && input.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => update({ bg: 'url("' + String(reader.result) + '")' });
              reader.readAsDataURL(file);
              // 清掉选中值，同一个文件才能再选一次。
              try { input.value = ''; } catch (error) { /* keep */ }
            },
          }),
          isInlineBg(config.bg) ? h('button', {
            type: 'button',
            className: 'dsh-hud-settings__clear',
            onClick: () => update({ bg: '' }),
          }, '清除') : null)),
        row('轻量模式 · Lite mode', toggle('lite')),
        h('h3', { className: 'dsh-hud-settings__title' }, '花费 · Cost'),
        h('p', { className: 'dsh-hud-settings__hint' },
          '侧栏「本轮 / 会话」默认按 DeepSeek 官方价算（分峰谷，周末和法定节假日按空闲价）。走别的渠道或用别的模型时，在下面写价目，'
          + '每行一个模型：模型 | 缓存命中 | 输入 | 输出，单位元 / 百万 token。空着的沿用官方价；自定义的价不分峰谷。改完马上按新价重算，以前的会话也一样。'),
        row('官方价 · Official prices', h(PriceRefresh)),
        h('textarea', {
          className: 'dsh-hud-settings__num dsh-hud-settings__prices',
          'aria-label': '自定义价目表',
          rows: 4,
          spellCheck: false,
          value: config.prices || '',
          placeholder: 'deepseek-v4.1-flash | 0.02 | 1 | 4',
          onChange: (event) => update({ prices: event.target.value }),
        }),
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
    // 宿主前端的 sessions 服务，apply 里接上后才有；面板拿它读会话的统计
    let sessionsService = null;
    let onSessionsChange = null; // 会话列表一变（切会话），面板马上重画

    /** 正在看的会话 id：对话区上标着（和 dsh-claude-style 读同一个属性），没有时退回主视图占着的会话。 */
    function viewedSession() {
      const el = document.querySelector('[data-conversation-session]');
      const id = el && el.getAttribute('data-conversation-session');
      if (id) return id;
      try {
        const shown = Object.values(sessionsService.list.getSnapshot().byId).filter((s) => (s.retainedBy.mainView ?? 0) > 0);
        const s = shown.find((x) => !x.blank) || shown[0];
        return s ? String(s.id) : '';
      } catch (error) { return ''; } // 宿主改了 sessions 的结构也不能让读数面板停住
    }

    /** 宿主给某个会话维护的统计（sessionStats 用时、tokenUsage 用量），拿不到返回 null。 */
    function sessionFace(sid, key) {
      try {
        const face = sessionsService.binding(sid).session.projections.faceOf(key);
        return face && typeof face.getSnapshot === 'function' ? face : null;
      } catch (error) { return null; }
    }

    const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function mountFlowHud() {
      const host = document.createElement('div');
      host.className = 'dsh-hud-stats dsh-hud-inline';

      // 读数是输入框下方宿主读数的复制，读屏不用再读一遍；只有「详细」按钮和展开的内容给读屏
      const scan = document.createElement('span');
      scan.className = 'dsh-hud-stats__scan';
      scan.setAttribute('aria-hidden', 'true');
      host.appendChild(scan);

      const list = document.createElement('div');
      list.className = 'dsh-hud-stats__list';
      list.setAttribute('aria-hidden', 'true');
      host.appendChild(list);

      const detail = document.createElement('div');
      detail.className = 'dsh-hud-stats__detail';
      detail.id = 'dsh-hud-stats-detail';
      detail.hidden = true;

      const more = document.createElement('button');
      more.type = 'button';
      more.className = 'dsh-hud-stats__more';
      more.setAttribute('aria-controls', detail.id);
      more.addEventListener('click', () => writeHudConfig({ detail: !readHudConfig().detail }));

      const spark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      spark.setAttribute('class', 'dsh-hud-stats__spark');
      spark.setAttribute('viewBox', '0 0 100 28');
      spark.setAttribute('preserveAspectRatio', 'none');
      spark.setAttribute('aria-hidden', 'true');
      host.appendChild(spark);

      const status = document.createElement('span');
      status.className = 'dsh-hud-stats__status';
      status.setAttribute('data-state', 'idle');
      status.setAttribute('aria-hidden', 'true');
      host.appendChild(status);
      host.appendChild(more);
      host.appendChild(detail);

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

      // 金额由宿主半边（index.js）算好。做法同 dsh-claude-style：切会话立刻去取，旧会话的数字最多留 0.8 秒，
      // 取到就马上重画，不等下一次 700ms 的刷新；平时 2 秒一次，宿主结算了用量就提前取
      let cost = null;
      let costAt = 0;
      let costSid = null;
      let askGen = 0;
      let holdTimer = 0;
      let frame = 0;
      const poke = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; tick(); }); };
      // 价目表、展开状态改了要马上生效；不在每次 tick 里读设置，设置里可能有几 MB 的背景图
      let config = readHudConfig();
      const onHud = () => { config = readHudConfig(); costAt = 0; poke(); };
      window.addEventListener('blockade-alter:hud', onHud);

      let faces = { sid: null, stats: null, usage: null, off: [] };
      const watchFaces = (sid) => {
        faces.off.forEach((off) => { try { off(); } catch (error) {} });
        faces = { sid, svc: sessionsService, stats: sessionFace(sid, 'sessionStats'), usage: sessionFace(sid, 'tokenUsage'), off: [] };
        const settle = () => { costAt = Math.min(costAt, Date.now() - 1500); poke(); }; // 用量结算了，0.5 秒内重取金额
        for (const face of [faces.stats, faces.usage]) {
          try { if (face && face.subscribe) faces.off.push(face.subscribe(settle)); } catch (error) {}
        }
      };
      const snap = (face) => { try { return face ? face.getSnapshot() : null; } catch (error) { return null; } };

      const fetchCost = () => {
        const sid = viewedSession();
        if (sid !== costSid) {
          costSid = sid;
          costAt = 0;
          watchFaces(sid);
          clearTimeout(holdTimer);
          // 0.8 秒还没等到新会话的金额，就别再挂着上一个会话的数字
          holdTimer = setTimeout(() => { if (costSid === sid && cost && cost.sid !== sid) { cost = null; poke(); } }, 800);
        } else if (faces.svc !== sessionsService) watchFaces(sid); // 面板比 sessions 服务先挂上，服务到了再订一次
        if (costAt && Date.now() - costAt < 2000) return;
        costAt = Date.now();
        const gen = ++askGen;
        const q = [sid ? 'sid=' + encodeURIComponent(sid) : '', config.prices ? 'prices=' + encodeURIComponent(config.prices) : ''].filter(Boolean).join('&');
        fetch('/blockade-alter/cost.json' + (q ? '?' + q : ''), { cache: 'no-store' })
          .then((res) => (res.ok ? res.json() : null))
          .then((j) => { if (gen !== askGen) return; cost = j && j.sid ? j : null; poke(); })
          .catch(() => { if (gen === askGen) { cost = null; poke(); } });
      };
      const yuan = (v) => (cost ? '¥' + (v < 1 ? v.toFixed(4) : v.toFixed(2)) : '¥—');
      const toks = (n) => Math.round(n).toLocaleString('en-US'); // 详情给完整数字，千位分隔
      const secs = (ms) => (ms >= 60000 ? Math.floor(ms / 60000) + ' 分 ' + Math.round((ms % 60000) / 1000) + ' 秒' : (ms / 1000).toFixed(1) + ' 秒');

      // 官方余额：只在展开详细时去问，一分钟一次（宿主那边也缓存一分钟）
      let bal = null;
      let balAt = 0;
      const fetchBalance = () => {
        if (balAt && Date.now() - balAt < 60000) return;
        balAt = Date.now();
        fetch('/blockade-alter/balance.json', { cache: 'no-store' })
          .then((res) => (res.ok ? res.json() : null))
          .then((j) => { bal = j || { ok: false, reason: 'failed' }; poke(); })
          .catch(() => { bal = { ok: false, reason: 'failed' }; poke(); });
      };
      const money = (v) => (Number.isFinite(v) ? (bal && bal.currency === 'USD' ? '$' : '¥') + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—');

      // 展开后的详细数据：和 dsh-claude-style 同一套，时间、用量两组，没有的项不列；再加官方账户余额
      let detailSig = '';
      // 显示、隐藏都用高度和透明度一起过渡（读数整块、「详细」按钮、详细数据）。
      // 途中反向，从当前的高度和透明度接着走，不跳回起点；系统要求减少动态时直接切换
      const slider = (el) => {
        let moving = null; // { opening, tween（GSAP 高度过渡）或 anim（WAAPI 淡出） }
        const PROPS = 'height,paddingTop,opacity,overflow';
        const stop = () => {
          if (moving) { if (moving.anim) moving.anim.cancel(); else moving.tween.kill(); }
          moving = null;
        };
        const settle = (opening) => { moving = null; if (!opening) el.hidden = true; gsap.set(el, { clearProps: PROPS }); };
        // 高度本来就在主线程上算，交给 GSAP：途中反向从当前值接着走，不跳回起点
        const slide = (opening) => {
          const cs = getComputedStyle(el);
          const none = { height: 0, paddingTop: 0, opacity: 0 };
          const from = moving ? { height: cs.height, paddingTop: cs.paddingTop, opacity: cs.opacity } : opening ? none : null;
          stop();
          el.hidden = false;
          gsap.set(el, { clearProps: PROPS });
          // 开始时量一次高度，按像素过渡；过渡到 auto 每帧都要重新量内容，侧栏会卡
          const now = getComputedStyle(el);
          const full = { height: now.height, paddingTop: now.paddingTop, opacity: 1 };
          const tween = gsap.fromTo(el, { ...(from || full), overflow: 'hidden' },
            { ...(opening ? full : none), duration: 0.22, ease: 'power3.out', onComplete: () => settle(opening) });
          moving = { tween, opening };
        };
        // 离开会话页时宿主正在加载新页面，主线程很忙：只淡出（WAAPI 透明度在合成线程上跑，GSAP 不行），淡完再一次藏掉
        const fadeOut = () => {
          const from = getComputedStyle(el).opacity;
          stop();
          const anim = el.animate([{ opacity: from }, { opacity: 0 }], { duration: 160, easing: 'ease-out', fill: 'forwards' });
          moving = { anim, opening: false };
          anim.finished.then(() => { settle(false); anim.cancel(); }, () => {}); // 被打断 cancel 掉的走这里，什么都不做
        };
        const shown = () => (moving ? moving.opening : !el.hidden);
        const set = (show, leaving) => {
          if (show === shown()) return;
          if (reduceMotion()) {
            stop();
            settle(show);
            return;
          }
          if (!show && leaving) fadeOut();
          else slide(show);
        };
        return set;
      };
      const showList = slider(list);
      const showMore = slider(more);
      const showDetail = slider(detail);

      const renderDetail = (show) => {
        showMore(show, !show);
        const open = show && Boolean(config.detail);
        more.setAttribute('aria-expanded', String(open));
        more.textContent = open ? '收起 ▴' : '详细 ▾';
        if (open) fillDetail(); // 先填好再展开
        showDetail(open, !show);
      };

      const fillDetail = () => {
        fetchBalance();
        const st = snap(faces.stats) || {};
        const us = snap(faces.usage) || {};
        const time = [];
        if (st.llmMs > 0) time.push(['模型用时', secs(st.llmMs)]);
        if (st.toolMs > 0) time.push(['工具用时', secs(st.toolMs)]);
        if (st.ttftSteps > 0) time.push(['首字平均', secs(st.ttftMs / st.ttftSteps)]);
        if (st.decodeMs > 0) time.push(['输出速度', (st.decodeTokens / (st.decodeMs / 1000)).toFixed(1) + ' tok/s']);
        const usage = [];
        if (cost) usage.push(['花费', yuan(cost.session)]);
        const billed = (us.uncachedInputTokens || 0) + (us.cacheReadTokens || 0) + (us.cacheWriteTokens || 0);
        if (billed > 0 || us.outputTokens > 0) {
          if (billed > 0) usage.push(['缓存命中', ((us.cacheReadTokens || 0) / billed * 100).toFixed(1) + '%']);
          usage.push(['输入（未命中）', toks(us.uncachedInputTokens || 0)]);
          usage.push(['缓存读', toks(us.cacheReadTokens || 0)]);
          if (us.cacheWriteTokens) usage.push(['缓存写', toks(us.cacheWriteTokens)]);
          usage.push(['输出', toks(us.outputTokens || 0)]);
        }
        const account = [];
        if (bal && bal.ok) {
          account.push([bal.source === 'account' ? '余额（登录账号）' : '余额', money(bal.total) + (bal.available ? '' : ' · 不可用')]);
          if (bal.granted !== null) account.push(['赠送', money(bal.granted)]);
          if (bal.toppedUp !== null) account.push(['充值', money(bal.toppedUp)]);
        } else if (bal) {
          account.push(['余额', { 'no-key': '没有 DeepSeek 密钥，也没登录账号', 'bad-key': '密钥无效，账号也查不到' }[bal.reason] || '暂时取不到']);
        }
        const groups = [['时间 · Time', time], ['用量 · Usage', usage], ['账户 · DeepSeek 官方', account]].filter((g) => g[1].length);
        const tierNote = cost && cost.tier ? (cost.tier === 'peak' ? '现在按高峰价（工作日 9–12、14–18）' : '现在按空闲价') + ' · ' : '';
        const note = cost && cost.pricesAt ? tierNote + '官方价 ' + cost.pricesAt + (config.prices ? ' · 含自定义价目' : '') : '';
        const sig = JSON.stringify([groups, note]);
        if (sig === detailSig) return;
        detailSig = sig;
        detail.textContent = '';
        if (!groups.length) {
          const empty = document.createElement('p');
          empty.className = 'dsh-hud-stats__dnote';
          empty.textContent = '这个会话还没有统计';
          detail.appendChild(empty);
        }
        for (const [title, rows] of groups) {
          const sec = document.createElement('section');
          sec.className = 'dsh-hud-stats__dsec';
          const head = document.createElement('h4');
          head.textContent = title;
          sec.appendChild(head);
          for (const [label, value] of rows) {
            const row = document.createElement('div');
            row.className = 'dsh-hud-stats__drow';
            const a = document.createElement('span');
            a.textContent = label;
            const b = document.createElement('span');
            b.textContent = value;
            row.append(a, b);
            sec.appendChild(row);
          }
          detail.appendChild(sec);
        }
        if (note) {
          const foot = document.createElement('p');
          foot.className = 'dsh-hud-stats__dnote';
          foot.textContent = note;
          detail.appendChild(foot);
        }
      };

      let emptySince = 0;
      const render = () => {
        fetchCost();
        const segments = readSegments();
        const pairs = [];

        // 宿主重画读数时会空一瞬：空了 0.5 秒以上才算离开会话页，免得整块收起又马上展开
        if (segments.length) emptySince = 0;
        else if (!emptySince) emptySince = Date.now();
        // 会话页节点都没了就是真离开，不用等那 0.5 秒，马上收起
        const leftPage = !segments.length && !document.querySelector('[data-conversation-session]');
        const present = segments.length > 0 || (!leftPage && Date.now() - emptySince < 500);
        if (!segments.length && present) setTimeout(poke, 520);
        renderDetail(present);
        // 金额两行跟宿主的读数同进同出，数字变化时和其他行一样上滚
        if (segments.length) {
          const tier = cost && cost.tier ? (cost.tier === 'peak' ? ' · 峰' : ' · 谷') : '';
          // 行首图标已经是 ¥，数字里去掉
          pairs.push({ text: 'round', pair: { value: yuan(cost && cost.round).slice(1), unit: '本轮' + tier, lead: '' } });
          pairs.push({ text: 'session', pair: { value: yuan(cost && cost.session).slice(1), unit: '会话', lead: '' } });
        }

        segments.forEach((segment) => { pairUp(segment).forEach((pair) => pairs.push({ text: segment, pair })); });

        // Build once, then only touch the text nodes: rebuilding innerHTML would
        // restart the bar transitions on every tick.
        if (pairs.length && rowsCache.length !== pairs.length) {
          list.textContent = '';
          rowsCache.length = 0;
          pairs.forEach((entry, index) => {
            const kind = classify(entry.pair.unit + ' ' + entry.pair.lead);
            const row = document.createElement('div');
            // 轮、步、速度、用量各占半行，两两并排
            row.className = 'dsh-hud-stats__row' + (/^(turns|speed|tokens)$/.test(kind) ? ' is-half' : '');
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
          const unitRight = index < 2; // 只有金额两行把「本轮 / 会话」放右边
          const unit = entry.pair.unit || '';
          const lead = entry.pair.lead || '';
          const numeric = parseFloat(entry.pair.value);
          const percent = unit === '%' && Number.isFinite(numeric) ? Math.max(0, Math.min(100, numeric)) : null;

          // 流式输出时读数一秒变好几次：上一次还没播完就不重播，免得一直闪
          if (slot.lastValue !== undefined && slot.lastValue !== entry.pair.value && !reduceMotion()
            && (!slot.anim || slot.anim.playState === 'finished')) {
            slot.anim = slot.value.animate([{ opacity: 0.35, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }],
              { duration: 260, easing: 'cubic-bezier(0.22, 0.88, 0.24, 1)' });
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

        // 不在会话页时读数整块收起，收起途中留着原来的行；展开放在行更新之后，量到的是新高度
        showList(present, !present);

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
          if (path !== spark.dataset.path) { // 没变就不重画
            spark.dataset.path = path;
            spark.innerHTML =
              '<line x1="0" y1="26.5" x2="100" y2="26.5" stroke="var(--hud-bracket)" stroke-width="0.5" vector-effect="non-scaling-stroke"></line>' +
              '<path d="' + path + '" fill="none" stroke="var(--dsw-alias-brand-primary)" stroke-width="1.2" vector-effect="non-scaling-stroke"></path>';
          }
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
      // 切页时宿主换掉 [data-slot="main"] 的直接子节点（会话页是 main.conversation）：
      // 只盯它的直接子节点（流式输出不触发），离开会话下一帧就收起，不等 700ms 轮询
      let pageObserver = null;
      const watchPage = () => {
        const parent = document.querySelector('[data-slot="main"]');
        if (!parent || (pageObserver && pageObserver._target === parent)) return;
        if (pageObserver) pageObserver.disconnect();
        pageObserver = new MutationObserver(poke);
        pageObserver._target = parent;
        pageObserver.observe(parent, { childList: true });
      };
      const watch = () => {
        watchPage();
        const column = document.querySelector('[class*="_sidebarCol"]');
        if (!column) return;
        if (observer && observer._target === column) return;
        if (observer) observer.disconnect();
        // 侧栏别处变了（切会话、切页时选中项会换）就下一帧重画，不等 700ms 的轮询；
        // 面板自己在侧栏里，render 改面板引起的变动要跳过，不然自己触发自己
        observer = new MutationObserver((list) => {
          try { place(); } catch (error) {}
          if (list.some((m) => !host.contains(m.target))) poke();
        });
        observer._target = column;
        observer.observe(column, { childList: true, subtree: true });
      };
      watch();
      const stopLoop = startLoop(() => { watch(); tick(); }, 700);
      onSessionsChange = poke;
      return () => {
        stopLoop();
        onSessionsChange = null;
        cancelAnimationFrame(frame);
        clearTimeout(holdTimer);
        faces.off.forEach((off) => { try { off(); } catch (error) {} });
        window.removeEventListener('blockade-alter:hud', onHud);
        if (observer) observer.disconnect();
        if (pageObserver) pageObserver.disconnect();
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

          let l = null;
          let r = null;
          let later = 0;
          const flag = (key, on) => {
            if (on === (key in document.body.dataset)) return; // 拉宽时每帧都会进来，没变就不写，免得每帧重算样式
            if (on) document.body.dataset[key] = 'true';
            else delete document.body.dataset[key];
          };

          const tick = () => {
            // 宿主切页会重挂侧栏，旧节点脱离后量出来是 0，会被当成「在拉宽」而闪一下：先换成新节点
            if ((l && !l.isConnected) || (r && !r.isConnected)) bind();
            // ResizeObserver 回调里布局已经算好，这里读宽度不会强制重排
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

            flag('hudLeftMoving', leftMoving);
            flag('hudRightMoving', rightMoving);
            // 宽度停了 ResizeObserver 就不再回调，补一次 tick 把「在动」收掉、放出落定闪光
            clearTimeout(later);
            if (leftMoving || rightMoving) later = setTimeout(tick, 300);
          };

          // 以前每 130ms 量一次两边宽度，一直在强制重排；现在只在宽度真变了时回调。
          // 宿主会重挂侧栏节点，所以每 1.5 秒看一眼节点换没换（只查选择器，不量布局）
          const ro = new ResizeObserver(tick);
          const bind = () => {
            const nl = document.querySelector('[class*="_sidebarCol"]');
            const nr = document.querySelector('[class*="_rightbarCol"]');
            if (nl === l && nr === r) return;
            // 换了节点就重新起量：新节点的宽度不跟旧节点比，重挂不算拉宽
            if (nl !== l) left = null;
            if (nr !== r) right = null;
            ro.disconnect();
            l = nl;
            r = nr;
            if (l) ro.observe(l);
            if (r) ro.observe(r);
          };
          bind();
          tick();
          const stopLoop = startLoop(bind, 1500);
          return () => {
            stopLoop();
            ro.disconnect();
            clearTimeout(later);
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
              // 输入框也在这个 active 容器里、排在最后：插进编辑器的段落会让编辑器重渲染，把刚打开的 + 菜单关掉
              !node.closest('[class*="_callRow"], pre, [class*="_toolCard"], [data-chat-flow-kind="turn-process"], [role="textbox"], [contenteditable], [data-slot="conversation.composer"]')
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
            // 打上标记后才开始计时：窗口在后台启动时 rAF 会迟到，先计时的话标记永远摘不掉，
            // 之后宿主每次重挂节点都会重播入场动画（面板又从透明淡入一遍）
            timer = setTimeout(() => marked.forEach((node) => node.classList.remove('dsh-hud-booting')), 900);
          };
          let timer = 0;
          const first = requestAnimationFrame(mark);
          return () => {
            cancelAnimationFrame(first);
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
          attachBackdrop(layer);
          // 拿得到 WebGL 就画 3D 的（createDeepField）；拿不到退回下面这套 2D 画法
          const field = createDeepField(canvas);
          const g = field ? null : canvas.getContext('2d');
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
            const dpr = Math.min(field ? 1.5 : 2, window.devicePixelRatio || 1); // 3D 背景本来就是糊在下面的，1.5 倍够了
            canvas.width = w * dpr;
            canvas.height = hgt * dpr;
            const rand = rng(20261109);
            if (field) {
              const dark = document.body.hasAttribute('data-ds-dark-theme');
              const ac = accentOf(config);
              // 浅色底上用加深过的主题色，和浅色下的强调字同一套算法
              field.build({ w, h: hgt, dpr, dark, accent: hexToRgb(dark ? ac : accentText(ac, 'light')), stars: config.stars !== false, lattice: config.lattice !== false, pulse: config.pulse === true, rand });
              scene = {};
              return;
            }
            g.setTransform(dpr, 0, 0, dpr, 0, 0);
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
            if (field) return field.paint(t, moving());
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
            if (field) field.dispose();
            detachBackdrop(layer);
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
        // 宿主前端的 sessions 服务：会话统计从这里读，列表一变（切会话）就让面板重画
        ctx.inject(['sessions'], (scope) => {
          sessionsService = scope.sessions;
          scope.effect(() => {
            let off = null;
            try { off = scope.sessions.list.subscribe(() => { if (onSessionsChange) onSessionsChange(); }); } catch (error) {}
            return () => { sessionsService = null; if (typeof off === 'function') off(); };
          });
        });

        // Lite mode: one switch that drops the shop-window effects. Also marks the
        // document idle when the window is hidden so nothing animates off-screen.
        ctx.effect(() => {
          const apply = () => {
            let config = {};
            try { config = readHudConfig(); } catch (error) { /* private mode */ }
            if (config.lite) document.body.dataset.hudLite = 'true';
            else delete document.body.dataset.hudLite;

            applyCustomBackground(config.bg);
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
            set: (patch) => writeHudConfig(patch),
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
