/**
 * ================================================================
 * OverlayHub v1.0 — layoutManager.js
 *
 * Bertanggung jawab menerapkan semua properti visual dari config
 * ke elemen DOM wrapper setiap overlay:
 *   - Posisi    : left, top
 *   - Ukuran    : width, height
 *   - Layer     : z-index
 *   - Tampilan  : opacity
 *   - Transform : rotate(), scale()
 *   - CSS Kustom: filter, brightness, dll.
 *
 * DEPENDENCY: utils.js harus dimuat sebelum file ini.
 * ================================================================
 */

const LayoutManager = (() => {
  'use strict';


  /* ── Build Transform CSS ─────────────────────────────────────── */

  /**
   * Bangun string CSS transform dari properti rotate dan scale.
   * Mengembalikan 'none' jika tidak ada transformasi.
   *
   * @param {Object} overlay - Data overlay dari config
   * @returns {string}       - CSS transform string
   *
   * @example
   * buildTransform({ rotate: 45, scale: 0.75 })
   * // → "rotate(45deg) scale(0.75)"
   */
  function buildTransform(overlay) {
    const parts = [];

    const rotate = Number(overlay.rotate);
    const scale  = Number(overlay.scale);

    // Tambahkan rotate jika bukan 0 dan valid
    if (!isNaN(rotate) && rotate !== 0) {
      parts.push(`rotate(${rotate}deg)`);
    }

    // Tambahkan scale jika bukan 1 dan valid
    if (!isNaN(scale) && scale !== 1) {
      parts.push(`scale(${scale})`);
    }

    return parts.length > 0 ? parts.join(' ') : 'none';
  }


  /* ── Terapkan CSS Kustom ─────────────────────────────────────── */

  /**
   * Parse dan terapkan string CSS kustom ke elemen secara aman.
   * Menggunakan setProperty() agar tidak menimpa gaya yang sudah ada.
   *
   * @param {HTMLElement} element - Target elemen
   * @param {string}      css     - String CSS dari overlay.css
   */
  function applyCustomCSS(element, css) {
    if (!css || typeof css !== 'string') return;

    const safe = Utils.sanitizeCSS(css);
    if (!safe.trim()) return;

    // Parse deklarasi CSS: "property: value; property: value;"
    const declarations = safe.split(';');

    for (const decl of declarations) {
      const colonIdx = decl.indexOf(':');
      if (colonIdx === -1) continue;

      const property = decl.substring(0, colonIdx).trim();
      const value    = decl.substring(colonIdx + 1).trim();

      if (!property || !value) continue;

      try {
        element.style.setProperty(property, value);
      } catch (err) {
        Utils.warn(`CSS kustom tidak valid dan dilewati: "${property}: ${value}"`);
      }
    }
  }


  /* ── Terapkan Layout ─────────────────────────────────────────── */

  /**
   * Terapkan seluruh properti layout dari satu overlay ke elemen DOM.
   * Ini adalah fungsi utama LayoutManager yang dipanggil oleh OverlayManager.
   *
   * @param {HTMLElement} element - Wrapper div overlay
   * @param {Object}      overlay - Data overlay dari config
   */
  function applyLayout(element, overlay) {
    const s = element.style;

    // ── Posisi (dari kiri dan atas container) ──────────────────
    s.left = Utils.toCSSSize(overlay.x ?? 0, '0px');
    s.top  = Utils.toCSSSize(overlay.y ?? 0, '0px');

    // ── Ukuran ────────────────────────────────────────────────
    s.width  = Utils.toCSSSize(overlay.width  ?? '100%', '100%');
    s.height = Utils.toCSSSize(overlay.height ?? '100%', '100%');

    // ── Z-Index (layer tumpukan) ───────────────────────────────
    const zRaw = parseInt(overlay.z, 10);
    s.zIndex   = (!isNaN(zRaw)) ? String(zRaw) : '1';

    // ── Opacity (0.0 – 1.0) ───────────────────────────────────
    const opacityRaw = parseFloat(overlay.opacity);
    const opacity    = isNaN(opacityRaw) ? 1 : Utils.clamp(opacityRaw, 0, 1);
    s.opacity        = String(opacity);

    // ── Transform: rotate + scale ──────────────────────────────
    s.transform       = buildTransform(overlay);
    s.transformOrigin = 'top left'; // Transformasi relatif terhadap pojok kiri atas

    // ── CSS Kustom (filter, brightness, dll.) ─────────────────
    applyCustomCSS(element, overlay.css);
  }


  /* ── Public API ──────────────────────────────────────────────── */
  return {
    applyLayout,
    buildTransform,
    applyCustomCSS
  };

})();
