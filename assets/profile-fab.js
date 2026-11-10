/* Floating "Download Profile" button, shared by every page.
   - Fixed to the bottom-right of the viewport, so it travels with the scroll.
   - Expands while the visitor is active; 5 s after the last activity it shrinks
     to a small spinning badge that stays visible and pulses now and then.
   - Hover / touch makes it flash.
   - Its colours change with the scroll position and are always picked to
     contrast with whatever is behind it. */
(function () {
  var PDF = 'assets/ShreeHarsha-Profile.pdf';
  var IDLE_MS = 5000;
  // [button background, text]; every pair is at least 6:1 inside
  var PALETTE = [
    ['#E3B04B', '#260710'], // temple gold
    ['#F08A2C', '#260710'], // saffron
    ['#F2709C', '#260710'], // lotus
    ['#3EC1B6', '#1A0A0E'], // peacock
    ['#F7ECDA', '#4A0F1D'], // cream
    ['#5E1527', '#F4DCA4'], // maroon (for light backgrounds)
    ['#B3182F', '#FFF5E6']  // kumkum
  ];
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css = '' +
  '.pfab{position:fixed;z-index:60;right:calc(18px + env(safe-area-inset-right,0px));bottom:calc(18px + env(safe-area-inset-bottom,0px));' +
  '--b:#E3B04B;--t:#260710;display:flex;align-items:center;gap:10px;height:58px;padding:0 20px 0 8px;border-radius:999px;' +
  'background:var(--b);color:var(--t);text-decoration:none;font:600 15px/1 "Alegreya Sans","Segoe UI",Arial,sans-serif;letter-spacing:.02em;' +
  'box-shadow:0 10px 28px rgba(20,0,6,.45),0 0 0 2px color-mix(in oklab,var(--t) 70%,transparent),0 0 0 5px color-mix(in oklab,var(--b) 35%,transparent);' +
  'transition:background-color .45s,color .45s,max-width .55s cubic-bezier(.6,0,.2,1),padding .55s cubic-bezier(.6,0,.2,1),transform .25s,box-shadow .45s;' +
  'max-width:320px;overflow:hidden;white-space:nowrap;-webkit-tap-highlight-color:transparent;isolation:isolate}' +
  '.pfab:hover{transform:translateY(-2px) scale(1.03)}' +
  '.pfab:focus-visible{outline:3px solid var(--t);outline-offset:4px}' +
  '.pfab .pf-ic{position:relative;flex:none;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:var(--t);color:var(--b);transition:background-color .45s,color .45s}' +
  '.pfab .pf-ic svg{width:20px;height:20px}' +
  '.pfab .pf-ic svg.pf-ring{position:absolute;left:50%;top:50%;width:62px;height:62px;margin:-31px 0 0 -31px;opacity:0;transition:opacity .4s;pointer-events:none}' +
  '.pfab .pf-ring text{fill:var(--t);font:700 8.6px "IBM Plex Mono",monospace;letter-spacing:1.2px}' +
  '.pfab .pf-tx{display:grid;gap:3px;transition:opacity .3s .15s}' +
  '.pfab .pf-tx small{font:500 10.5px "IBM Plex Mono",monospace;letter-spacing:.08em;opacity:.8;text-transform:uppercase}' +
  /* compact state: just the badge, still alive */
  '.pfab.compact{max-width:62px;width:62px;height:62px;padding:0;gap:0;justify-content:center;overflow:visible}' +
  '.pfab.compact .pf-tx{position:absolute;visibility:hidden}' +
  '.pfab.compact .pf-tx{opacity:0;transition-delay:0s}' +
  '.pfab.compact .pf-ic{width:34px;height:34px;background:var(--t);color:var(--b)}' +
  '.pfab.compact .pf-ic svg.pf-ring{opacity:1;animation:pf-spin 12s linear infinite}' +
  '.pfab.compact::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:0 0 0 0 var(--b);animation:pf-pulse 3.2s ease-out infinite;z-index:-1}' +
  /* flash on hover / touch */
  '.pfab::before{content:"";position:absolute;top:0;bottom:0;left:-60%;width:45%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.85),transparent);transform:skewX(-18deg);opacity:0;pointer-events:none}' +
  '.pfab.flash{animation:pf-flash .7s ease-out}' +
  '.pfab.flash::before{animation:pf-sheen .7s ease-out}' +
  '@keyframes pf-flash{0%{filter:brightness(1)}20%{filter:brightness(1.55) saturate(1.2)}45%{filter:brightness(.95)}65%{filter:brightness(1.35)}100%{filter:brightness(1)}}' +
  '@keyframes pf-sheen{0%{left:-60%;opacity:1}100%{left:130%;opacity:1}}' +
  '@keyframes pf-spin{to{transform:rotate(360deg)}}' +
  '@keyframes pf-pulse{0%{box-shadow:0 0 0 0 color-mix(in oklab,var(--b) 75%,transparent)}70%{box-shadow:0 0 0 18px transparent}100%{box-shadow:0 0 0 0 transparent}}' +
  '.pfab.arrive{animation:pf-in .6s cubic-bezier(.2,1.4,.4,1)}' +
  '@keyframes pf-in{from{transform:translateY(30px) scale(.6);opacity:0}}' +
  '@media (max-width:540px){.pfab{height:52px;font-size:14px;right:calc(12px + env(safe-area-inset-right,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px))}.pfab .pf-ic{width:38px;height:38px}.pfab.compact{max-width:58px;width:58px;height:58px}.pfab .pf-ic svg.pf-ring{transform-origin:50% 50%;scale:.935}}' +
  '@media (prefers-reduced-motion:reduce){.pfab,.pfab *{animation:none!important;transition:none!important}}';

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var a = document.createElement('a');
  a.className = 'pfab arrive';
  a.href = PDF;
  a.setAttribute('download', 'ShreeHarsha-Profile.pdf');
  a.setAttribute('aria-label', 'Download ShreeHarsha’s artist profile (PDF, 3.3 MB)');
  a.innerHTML =
    '<span class="pf-ic" aria-hidden="true">' +
      '<svg class="pf-ring" viewBox="0 0 62 62"><defs><path id="pfc" d="M31,31 m-24,0 a24,24 0 1,1 48,0 a24,24 0 1,1 -48,0"/></defs>' +
      '<text><textPath href="#pfc" textLength="148" lengthAdjust="spacing">DOWNLOAD • PROFILE • </textPath></text></svg>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>' +
    '</span>' +
    '<span class="pf-tx"><span>Download Profile</span><small>PDF · 3.3 MB</small></span>';
  document.body.appendChild(a);

  /* ---- expand on activity, shrink after 5 s idle ---- */
  var timer = null;
  function wake() {
    a.classList.remove('compact');
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (document.activeElement === a || a.matches(':hover')) { wake(); return; }
      a.classList.add('compact');
    }, IDLE_MS);
  }
  ['scroll', 'pointermove', 'pointerdown', 'touchstart', 'keydown', 'wheel'].forEach(function (ev) {
    addEventListener(ev, wake, { passive: true });
  });
  a.addEventListener('focus', wake);
  wake();

  /* ---- flash on hover / touch ---- */
  function flash() {
    a.classList.remove('flash');
    void a.offsetWidth; // restart the animation
    a.classList.add('flash');
  }
  a.addEventListener('pointerenter', flash);
  a.addEventListener('touchstart', flash, { passive: true });
  a.addEventListener('animationend', function (e) { if (e.animationName === 'pf-flash') a.classList.remove('flash'); });

  /* ---- colours follow the scroll and always contrast with what is behind ---- */
  function lum(rgb) {
    var c = rgb.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function hexRgb(h) { h = h.replace('#', ''); return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
  function contrast(l1, l2) { var hi = Math.max(l1, l2), lo = Math.min(l1, l2); return (hi + 0.05) / (lo + 0.05); }
  function parse(c) { var m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null; var p = m[1].split(',').map(parseFloat); return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 }; }

  // luminance of whatever sits behind the button's centre
  var probe = document.createElement('canvas'); probe.width = probe.height = 1;
  var pctx = null; try { pctx = probe.getContext('2d', { willReadFrequently: true }); } catch (e) {}
  function samples() {
    var r = a.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var pts = [[cx, cy], [r.left + 4, cy], [r.right - 4, cy], [cx, r.top + 4], [cx, r.bottom - 4]];
    a.style.visibility = 'hidden';
    var out = pts.map(function (pt) { return lumAt(pt[0], pt[1]); });
    a.style.visibility = '';
    return out;
  }
  function lumAt(x, y) {
    var stack = document.elementsFromPoint ? document.elementsFromPoint(x, y) : [document.elementFromPoint(x, y)];
    for (var i = 0; i < stack.length; i++) {
      var el = stack[i];
      if (!el || el === a || a.contains(el)) continue;
      if (el.tagName === 'IMG' && el.complete && el.naturalWidth && pctx) {
        try { // sample the photo pixel under the button
          var ir = el.getBoundingClientRect();
          var sx = (x - ir.left) / ir.width * el.naturalWidth, sy = (y - ir.top) / ir.height * el.naturalHeight;
          pctx.clearRect(0, 0, 1, 1); pctx.drawImage(el, sx, sy, 1, 1, 0, 0, 1, 1);
          var d = pctx.getImageData(0, 0, 1, 1).data;
          if (d[3] > 120) return lum([d[0], d[1], d[2]]);
        } catch (e) { return 0.25; }
        continue;
      }
      var cs = getComputedStyle(el), bg = parse(cs.backgroundColor);
      if (bg && bg.a > 0.5) return lum(bg.rgb);
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && cs.backgroundImage.indexOf('url(') > -1) return 0.45; // frieze band
    }
    var body = parse(getComputedStyle(document.body).backgroundColor);
    return body ? lum(body.rgb) : 0.02;
  }

  var current = -1, raf = 0;
  function recolour() {
    raf = 0;
    var max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    var p = Math.min(0.999, Math.max(0, scrollY / max));
    var bl = samples();
    // start from the colour for this stretch of the page...
    var want = Math.floor(p * PALETTE.length);
    var best = want, bestC = 0;
    // ...keep it if it stands out by at least 3:1, otherwise take the most contrasting one
    for (var k = 0; k < PALETTE.length; k++) {
      var idx = (want + k) % PALETTE.length, L = lum(hexRgb(PALETTE[idx][0]));
      var c = Math.min.apply(null, bl.map(function (v) { return contrast(L, v); }));
      if (k === 0 && c >= 3) { best = idx; break; }
      if (c > bestC) { bestC = c; best = idx; }
    }
    if (best !== current) {
      current = best;
      a.style.setProperty('--b', PALETTE[best][0]);
      a.style.setProperty('--t', PALETTE[best][1]);
    }
  }
  function queue() { if (!raf) raf = requestAnimationFrame(recolour); }
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  var hTrack = document.getElementById('track');
  if (hTrack) hTrack.addEventListener('scroll', queue, { passive: true });
  addEventListener('load', queue);
  setTimeout(queue, 300);
  if (!reduce) setInterval(queue, 1500); // catches animated / sideways-moving backgrounds
})();
