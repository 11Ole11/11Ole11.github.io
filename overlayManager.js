/**
 * ================================================================
 * OverlayHub v1.0 — overlayManager.js
 *
 * Bertanggung jawab atas lifecycle semua overlay:
 *   - Membuat elemen wrapper + iframe untuk setiap overlay
 *   - Merender semua overlay yang aktif ke DOM
 *   - Menghapus semua overlay dari DOM
 *
 * DEPENDENCY: utils.js dan layoutManager.js harus dimuat sebelum ini.
 * ================================================================
 */

const OverlayManager = (() => {
  'use strict';

  /** ID dari container utama di index.html */
  const CONTAINER_ID = 'overlay-container';


  /* ── Dapatkan Container ──────────────────────────────────────── */

  /**
   * Dapatkan elemen container utama dari DOM.
   * Jika tidak ditemukan, buat baru dan tambahkan ke body.
   *
   * @returns {HTMLElement}
   */
  function getContainer() {
    let container = document.getElementById(CONTAINER_ID);

    if (!container) {
      Utils.warn(`Elemen #${CONTAINER_ID} tidak ditemukan di HTML. Membuat baru...`);
      container = document.createElement('div');
      container.id = CONTAINER_ID;
      document.body.appendChild(container);
    }

    return container;
  }


  /* ── Buat Satu Elemen Overlay ───────────────────────────────── */

  /**
   * Buat elemen DOM untuk satu overlay: sebuah wrapper div
   * berisi satu iframe yang memuat URL overlay.
   *
   * @param {Object} overlay - Data overlay dari config
   * @param {number} index   - Posisi dalam array overlays
   * @returns {HTMLElement}  - Wrapper div yang siap dimasukkan ke container
   */
  function createOverlayElement(overlay, index) {
    // ── Wrapper Div ────────────────────────────────────────────
    const wrapper = document.createElement('div');
    wrapper.className = 'overlay-wrapper';

    // Data attributes untuk debugging dan referensi
    wrapper.dataset.overlayIndex = index;
    wrapper.dataset.overlayName  = overlay.name || `overlay-${index}`;

    // Terapkan posisi, ukuran, transform, dll. via LayoutManager
    LayoutManager.applyLayout(wrapper, overlay);

    // ── iframe ─────────────────────────────────────────────────
    const iframe = document.createElement('iframe');
    iframe.className = 'overlay-iframe';
    iframe.src = overlay.url.trim();

    // Atribut penting untuk transparansi iframe
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('marginwidth', '0');
    iframe.setAttribute('marginheight', '0');

    // Izin tambahan yang umum diperlukan overlay
    iframe.setAttribute(
      'allow',
      'autoplay; clipboard-read; clipboard-write; microphone; camera'
    );

    // Jangan bocorkan referrer ke layanan overlay
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

    // Log error jika iframe gagal dimuat
    iframe.addEventListener('error', () => {
      Utils.warn(`Gagal memuat iframe: "${overlay.name}" → ${overlay.url}`);
    });

    wrapper.appendChild(iframe);

    Utils.log(`Overlay dibuat: "${overlay.name}" [${index}]`, {
      url    : overlay.url,
      posisi : { x: overlay.x, y: overlay.y },
      ukuran : { lebar: overlay.width, tinggi: overlay.height },
      z      : overlay.z
    });

    return wrapper;
  }


  /* ── Render Semua Overlay ────────────────────────────────────── */

  /**
   * Iterasi seluruh array overlays dari config,
   * buat elemen DOM untuk setiap overlay yang aktif dan valid,
   * lalu tambahkan ke container.
   *
   * Overlay dengan enabled: false akan dilewati tanpa error.
   * Overlay dengan URL tidak valid akan dilewati dengan peringatan.
   *
   * @param {Array} overlays - Array overlay dari OVERLAY_CONFIG.overlays
   */
  function renderAllOverlays(overlays) {
    const container  = getContainer();
    let   totalAktif = 0;
    let   totalSkip  = 0;

    overlays.forEach((overlay, index) => {

      // Lewati overlay yang dinonaktifkan
      if (overlay.enabled === false) {
        Utils.log(`Dilewati (disabled): "${overlay.name || index}"`);
        totalSkip++;
        return;
      }

      // Validasi data overlay
      if (!Utils.validateOverlay(overlay, index)) {
        totalSkip++;
        return;
      }

      // Buat dan tambahkan elemen ke container
      try {
        const element = createOverlayElement(overlay, index);
        container.appendChild(element);
        totalAktif++;
      } catch (err) {
        console.error(
          `[OverlayHub] Gagal membuat overlay[${index}] "${overlay.name}":`,
          err
        );
        totalSkip++;
      }

    });

    Utils.log(
      `Render selesai. Aktif: ${totalAktif} | Dilewati: ${totalSkip} | Total: ${overlays.length}`
    );
  }


  /* ── Hapus Semua Overlay ─────────────────────────────────────── */

  /**
   * Hapus semua elemen overlay dari container.
   * iframe akan berhenti memuat setelah dihapus dari DOM.
   */
  function destroyAllOverlays() {
    const container = document.getElementById(CONTAINER_ID);
    if (!container) return;

    // Hapus semua child elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    Utils.log('Semua overlay dihapus dari DOM.');
  }


  /* ── Reload Overlay ──────────────────────────────────────────── */

  /**
   * Hapus semua overlay yang ada, lalu render ulang dari config.
   * Berguna jika config diubah secara programatik tanpa refresh halaman.
   *
   * @param {Array} overlays - Array overlay baru
   */
  function reloadOverlays(overlays) {
    destroyAllOverlays();
    renderAllOverlays(overlays);
    Utils.log('Overlay di-reload.');
  }


  /* ── Public API ──────────────────────────────────────────────── */
  return {
    renderAllOverlays,
    destroyAllOverlays,
    reloadOverlays
  };

})();
