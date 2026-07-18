/**
 * ================================================================
 * OverlayHub v1.0 — script.js
 *
 * Entry point utama aplikasi.
 * File ini dimuat TERAKHIR setelah semua modul siap.
 *
 * Tugas utama:
 *   1. Validasi keberadaan OVERLAY_CONFIG
 *   2. Inisialisasi semua overlay
 *   3. Expose API global window.OverlayHub untuk keperluan debugging
 *
 * DEPENDENCY: utils.js, config.js, layoutManager.js, overlayManager.js
 * ================================================================
 */

(function () {
  'use strict';


  /* ── Validasi Config ─────────────────────────────────────────── */

  /**
   * Pastikan OVERLAY_CONFIG telah dimuat dengan benar dari config.js.
   *
   * @returns {boolean} true jika valid, false jika ada masalah
   */
  function validateConfig() {
    // Cek keberadaan config global
    if (typeof window.OVERLAY_CONFIG === 'undefined') {
      console.error(
        '[OverlayHub] FATAL: OVERLAY_CONFIG tidak ditemukan.\n' +
        'Pastikan file js/config.js ada dan dimuat sebelum script.js di index.html.'
      );
      return false;
    }

    const config = window.OVERLAY_CONFIG;

    // Cek array overlays
    if (!Array.isArray(config.overlays)) {
      console.error(
        '[OverlayHub] FATAL: OVERLAY_CONFIG.overlays bukan array.\n' +
        'Periksa format di js/config.js.'
      );
      return false;
    }

    // Cek settings (opsional, beri default jika tidak ada)
    if (typeof config.settings !== 'object' || config.settings === null) {
      config.settings = { debug: false };
    }

    return true;
  }


  /* ── Inisialisasi Aplikasi ───────────────────────────────────── */

  /**
   * Fungsi init utama. Dipanggil setelah DOM siap.
   */
  function init() {
    Utils.log('═══════════════════════════════');
    Utils.log('  OverlayHub v1.0 dimulai...');
    Utils.log('═══════════════════════════════');

    // Validasi config sebelum lanjut
    if (!validateConfig()) return;

    const config   = window.OVERLAY_CONFIG;
    const overlays = config.overlays;

    Utils.log(`Jumlah overlay di config: ${overlays.length}`);

    // Render semua overlay yang aktif
    OverlayManager.renderAllOverlays(overlays);

    Utils.log('OverlayHub siap. Semua overlay aktif sedang berjalan.');
    Utils.log('Untuk menambah overlay, edit js/config.js lalu refresh.');
  }


  /* ── Expose API Global (untuk Debugging) ─────────────────────── */

  /**
   * window.OverlayHub adalah API global yang bisa diakses dari
   * DevTools Console untuk keperluan debugging dan kontrol manual.
   *
   * Contoh penggunaan di Console:
   *   OverlayHub.reload()   → render ulang semua overlay
   *   OverlayHub.destroy()  → hapus semua overlay dari DOM
   *   OverlayHub.config()   → tampilkan konfigurasi aktif
   */
  window.OverlayHub = {
    version: '1.0',

    /**
     * Reload semua overlay tanpa refresh halaman.
     * Berguna setelah mengubah config secara programatik.
     */
    reload() {
      if (!validateConfig()) return;
      OverlayManager.reloadOverlays(window.OVERLAY_CONFIG.overlays);
    },

    /**
     * Hapus semua overlay dari DOM.
     */
    destroy() {
      OverlayManager.destroyAllOverlays();
      console.log('[OverlayHub] Semua overlay dihapus.');
    },

    /**
     * Tampilkan konfigurasi aktif di console.
     */
    config() {
      console.log('[OverlayHub] Konfigurasi aktif:', window.OVERLAY_CONFIG);
    },

    /**
     * Tampilkan semua overlay beserta statusnya.
     */
    list() {
      const overlays = window.OVERLAY_CONFIG?.overlays ?? [];
      console.table(
        overlays.map((o, i) => ({
          '#'      : i,
          Nama     : o.name   || '-',
          URL      : o.url    || '(kosong)',
          Aktif    : o.enabled ? '✅' : '❌',
          Posisi   : `x:${o.x}, y:${o.y}`,
          Ukuran   : `${o.width}×${o.height}`,
          'Z-Index': o.z ?? 1
        }))
      );
    }
  };


  /* ── Bootstrap ───────────────────────────────────────────────── */

  // Tunggu DOM siap sebelum menginisialisasi
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM sudah siap (script dimuat di akhir body)
    init();
  }

})();
