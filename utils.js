/**
 * ================================================================
 * OverlayHub v1.0 — utils.js
 * 
 * Fungsi-fungsi pembantu yang digunakan oleh semua modul lainnya.
 * File ini harus dimuat PERTAMA sebelum modul lainnya.
 * ================================================================
 */

const Utils = (() => {
  'use strict';

  /* ── Validasi Overlay ────────────────────────────────────────── */

  /**
   * Validasi satu objek overlay dari config.
   * Mengembalikan true jika valid dan bisa dirender, false jika tidak.
   *
   * @param {Object} overlay - Objek overlay dari config.js
   * @param {number} index   - Posisi dalam array (untuk pesan error)
   * @returns {boolean}
   */
  function validateOverlay(overlay, index) {
    const label = `Overlay[${index}] "${overlay?.name || 'Tanpa Nama'}"`;

    // Pastikan adalah object
    if (typeof overlay !== 'object' || overlay === null) {
      console.error(`[OverlayHub] ${label}: Bukan objek yang valid.`);
      return false;
    }

    // URL wajib ada
    if (!overlay.url || typeof overlay.url !== 'string' || overlay.url.trim() === '') {
      log(`${label}: URL kosong, overlay dilewati.`);
      return false;
    }

    // Validasi format URL
    try {
      new URL(overlay.url.trim());
    } catch (_) {
      console.warn(`[OverlayHub] ${label}: URL tidak valid → "${overlay.url}". Overlay dilewati.`);
      return false;
    }

    return true;
  }


  /* ── Konversi Ukuran ─────────────────────────────────────────── */

  /**
   * Konversi nilai ukuran ke string CSS yang valid.
   * Menerima pixel (angka atau string angka) atau string persen.
   *
   * @param {number|string} value - Nilai ukuran
   * @param {string} fallback     - Nilai fallback jika tidak valid
   * @returns {string}            - CSS size string (misal: "400px" atau "100%")
   */
  function toCSSSize(value, fallback = '0px') {
    if (value === null || value === undefined) return fallback;

    // Jika string berisi "%", kembalikan apa adanya
    if (typeof value === 'string' && value.trim().endsWith('%')) {
      const num = parseFloat(value);
      return isNaN(num) ? fallback : value.trim();
    }

    // Coba parse sebagai angka
    const num = parseFloat(value);
    if (isNaN(num)) return fallback;

    return `${num}px`;
  }


  /* ── Sanitasi CSS ────────────────────────────────────────────── */

  /**
   * Sanitasi string CSS tambahan dari user untuk mencegah
   * injeksi berbahaya. Ini bukan full sanitizer, hanya lapisan
   * perlindungan dasar karena file dijalankan secara lokal.
   *
   * @param {string} css - String CSS dari overlay.css
   * @returns {string}   - CSS yang sudah disanitasi
   */
  function sanitizeCSS(css) {
    if (typeof css !== 'string') return '';

    // Hapus pola yang berpotensi berbahaya
    return css
      .replace(/<\/?script[^>]*>/gi, '')      // tag script
      .replace(/javascript\s*:/gi, '')         // javascript: protocol
      .replace(/expression\s*\(/gi, '')        // IE expression()
      .replace(/@import\s/gi, '')              // @import
      .replace(/url\s*\(\s*['"]?\s*javascript/gi, '') // url(javascript:...)
      .trim();
  }


  /* ── Klamping Nilai ──────────────────────────────────────────── */

  /**
   * Batasi nilai numerik dalam range [min, max].
   *
   * @param {number} value - Nilai yang akan diklamping
   * @param {number} min   - Batas bawah
   * @param {number} max   - Batas atas
   * @returns {number}
   */
  function clamp(value, min, max) {
    const num = Number(value);
    if (isNaN(num)) return min;
    return Math.min(Math.max(num, min), max);
  }


  /* ── Logging Debug ───────────────────────────────────────────── */

  /**
   * Log pesan ke console, hanya jika debug: true di OVERLAY_CONFIG.
   * Tidak berpengaruh pada performa saat debug: false.
   *
   * @param {string} message - Pesan yang akan dilog
   * @param {*}      [data]  - Data opsional
   */
  function log(message, data) {
    try {
      const isDebug = window.OVERLAY_CONFIG?.settings?.debug === true;
      if (!isDebug) return;

      if (data !== undefined) {
        console.log(`[OverlayHub] ${message}`, data);
      } else {
        console.log(`[OverlayHub] ${message}`);
      }
    } catch (_) {
      // Abaikan jika config belum tersedia
    }
  }

  /**
   * Log peringatan ke console (selalu tampil, tidak butuh debug mode).
   *
   * @param {string} message
   */
  function warn(message) {
    console.warn(`[OverlayHub] ${message}`);
  }


  /* ── Public API ──────────────────────────────────────────────── */
  return {
    validateOverlay,
    toCSSSize,
    sanitizeCSS,
    clamp,
    log,
    warn
  };

})();
