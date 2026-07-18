// ================================================================
//   TRANSPARENT OVERLAY AGGREGATOR v1.0 — overlay.js
//   Core Engine: membaca config → generate iframe → mount ke canvas
//
//   ⚠️  Jangan edit file ini kecuali Anda tahu yang Anda lakukan
// ================================================================

(function () {
  'use strict';

  // ─── STATE ────────────────────────────────────────────────────
  var canvas = null;
  var stats  = { total: 0, loaded: 0, skipped: 0, errors: 0 };
  var debugEl = null;

  // ─── INISIALISASI ─────────────────────────────────────────────
  function init() {
    canvas = document.getElementById('overlay-canvas');

    if (!canvas) {
      console.error('[OA] ❌ Element #overlay-canvas tidak ditemukan!');
      return;
    }

    if (typeof OVERLAYS === 'undefined' || !Array.isArray(OVERLAYS)) {
      console.error('[OA] ❌ OVERLAYS tidak ditemukan. Pastikan config.js sudah dimuat!');
      return;
    }

    var cfg = resolveConfig();

    // Filter overlay yang aktif (enabled !== false)
    var activeOverlays = OVERLAYS.filter(function (o) {
      return o.enabled !== false;
    });

    stats.total = activeOverlays.length;

    log('🚀 Transparent Overlay Aggregator v1.0 dimulai');
    log('📦 Total OVERLAYS: ' + OVERLAYS.length + ' | Aktif: ' + stats.total);

    if (stats.total === 0) {
      log('⚠️ Tidak ada overlay aktif. Set enabled: true pada config.js', 'warn');
      return;
    }

    // Lazy load setiap iframe dengan delay bertahap
    activeOverlays.forEach(function (overlay, index) {
      var delay = index * cfg.lazyLoadDelay;
      setTimeout(function () {
        buildFrame(overlay, index, cfg);
      }, delay);
    });

    // Tampilkan debug panel jika aktif
    if (cfg.debug) {
      setTimeout(function () {
        buildDebugPanel(activeOverlays);
      }, 300);
    }
  }

  // ─── BUILD IFRAME ─────────────────────────────────────────────
  function buildFrame(overlay, index, cfg) {

    // Skip jika URL kosong / belum diisi
    if (!overlay.url || overlay.url.trim() === '') {
      stats.skipped++;
      log('⏭ Skip [' + overlay.name + ']: URL belum diisi');
      refreshDebugStats();
      return;
    }

    try {
      // ── Wrapper div ──────────────────────────────────────────
      var wrapper = document.createElement('div');
      wrapper.className   = 'overlay-wrapper';
      wrapper.id          = 'oa-' + index;
      wrapper.setAttribute('data-overlay-name', overlay.name);

      var wLeft   = toDim(overlay.x      != null ? overlay.x      : 0);
      var wTop    = toDim(overlay.y      != null ? overlay.y      : 0);
      var wWidth  = toDim(overlay.width  != null ? overlay.width  : '100%');
      var wHeight = toDim(overlay.height != null ? overlay.height : '100%');
      var wZ      = overlay.zIndex  != null ? overlay.zIndex  : 1;
      var wOpac   = overlay.opacity != null ? overlay.opacity : 1;

      wrapper.style.cssText = [
        'position:absolute',
        'overflow:hidden',
        'background:transparent',
        'pointer-events:none',
        'left:'    + wLeft,
        'top:'     + wTop,
        'width:'   + wWidth,
        'height:'  + wHeight,
        'z-index:' + wZ,
        'opacity:' + wOpac
      ].join(';');

      // ── Iframe ────────────────────────────────────────────────
      var iframe = document.createElement('iframe');
      iframe.src       = overlay.url;
      iframe.className = 'overlay-frame';
      iframe.title     = overlay.name;
      iframe.setAttribute('frameborder',        '0');
      iframe.setAttribute('scrolling',          'no');
      iframe.setAttribute('allowtransparency',  'true');
      iframe.setAttribute('allow',              'autoplay; clipboard-read; clipboard-write; camera; microphone');

      iframe.style.cssText = [
        'display:block',
        'width:100%',
        'height:100%',
        'border:none',
        'outline:none',
        'background:transparent',
        'pointer-events:none'
      ].join(';');

      // ── Event handlers ────────────────────────────────────────
      iframe.addEventListener('load', function () {
        stats.loaded++;
        log('✅ [' + stats.loaded + '/' + stats.total + '] Loaded: ' + overlay.name);
        refreshDebugStats();
      });

      iframe.addEventListener('error', function () {
        stats.errors++;
        log('❌ Error saat memuat: ' + overlay.name, 'error');
        refreshDebugStats();
      });

      // ── Mount ─────────────────────────────────────────────────
      wrapper.appendChild(iframe);
      canvas.appendChild(wrapper);

      log('⚙️  Generating: ' + overlay.name +
          ' | pos(' + wLeft + ',' + wTop + ')' +
          ' size(' + wWidth + 'x' + wHeight + ')' +
          ' z:' + wZ);

    } catch (err) {
      stats.errors++;
      log('💥 Exception [' + overlay.name + ']: ' + err.message, 'error');
      refreshDebugStats();
    }
  }

  // ─── DEBUG PANEL ──────────────────────────────────────────────
  function buildDebugPanel(overlays) {
    debugEl = document.createElement('div');
    debugEl.id = 'oa-debug-panel';
    debugEl.style.cssText = [
      'position:fixed',
      'top:12px',
      'right:12px',
      'background:rgba(12,12,12,0.88)',
      'color:#d4d4d4',
      'font-family:Consolas,monospace',
      'font-size:11px',
      'line-height:1.7',
      'padding:12px 16px',
      'border-radius:8px',
      'z-index:2147483647',
      'pointer-events:none',
      'max-width:300px',
      'border:1px solid rgba(255,255,255,0.1)',
      'backdrop-filter:blur(4px)'
    ].join(';');

    var rows = overlays.map(function (o) {
      var hasUrl = o.url && o.url.trim() !== '';
      return '<div>' +
        (hasUrl ? '🟢' : '⚫') +
        ' ' + escHtml(o.name) +
      '</div>';
    }).join('');

    debugEl.innerHTML =
      '<div style="color:#facc15;font-weight:bold;font-size:12px;margin-bottom:4px">' +
        '⚡ Overlay Aggregator [DEBUG]' +
      '</div>' +
      '<div id="oa-debug-stats" style="color:#7dd3fc;margin-bottom:8px">' +
        'Loaded: <b>0</b>/' + overlays.length +
        ' &nbsp;|&nbsp; Error: <b style="color:#f87171">0</b>' +
        ' &nbsp;|&nbsp; Skip: <b style="color:#a3a3a3">0</b>' +
      '</div>' +
      '<hr style="border:0;border-top:1px solid #2a2a2a;margin:6px 0">' +
      rows;

    document.body.appendChild(debugEl);
  }

  function refreshDebugStats() {
    var el = document.getElementById('oa-debug-stats');
    if (!el) return;
    el.innerHTML =
      'Loaded: <b>' + stats.loaded + '</b>/' + stats.total +
      ' &nbsp;|&nbsp; Error: <b style="color:#f87171">' + stats.errors + '</b>' +
      ' &nbsp;|&nbsp; Skip: <b style="color:#a3a3a3">' + stats.skipped + '</b>';
  }

  // ─── HELPERS ──────────────────────────────────────────────────

  // Konversi number → px string, biarkan string apa adanya
  function toDim(val) {
    if (typeof val === 'number') return val + 'px';
    return String(val);
  }

  // Ambil config dengan fallback default
  function resolveConfig() {
    var defaults = {
      debug         : false,
      lazyLoadDelay : 150
    };
    if (typeof CONFIG !== 'undefined' && typeof CONFIG === 'object') {
      var merged = {};
      for (var k in defaults) merged[k] = defaults[k];
      for (var k in CONFIG)   merged[k] = CONFIG[k];
      return merged;
    }
    return defaults;
  }

  // Logger – hanya tampil jika debug: true (kecuali warn/error)
  function log(msg, type) {
    var lvl = type || 'log';
    var cfg = resolveConfig();
    if (cfg.debug) {
      (console[lvl] || console.log)('[OA] ' + msg);
    } else if (lvl === 'warn' || lvl === 'error') {
      (console[lvl])('[OA] ' + msg);
    }
  }

  // Escape HTML untuk debug panel
  function escHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ─── BOOT ─────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
