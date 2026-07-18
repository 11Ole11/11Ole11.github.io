/**
 * ================================================================
 * OverlayHub v1.0 — config.js
 *
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  INI ADALAH FILE YANG KAMU EDIT UNTUK MENAMBAH OVERLAY.     ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * CARA PENGGUNAAN:
 * 1. Salin salah satu blok contoh di bawah.
 * 2. Isi URL overlay kamu.
 * 3. Atur posisi (x, y), ukuran (width, height), dan layer (z).
 * 4. Set enabled: true untuk mengaktifkan.
 * 5. Simpan file ini.
 * 6. Refresh Browser Source di OBS.
 *
 * ─────────────────────────────────────────────────────────────
 * PENJELASAN PROPERTI:
 *
 *  name    {string}          Nama overlay, hanya untuk referensi
 *  url     {string}          URL overlay dari layanan streaming
 *  enabled {boolean}         true = aktif | false = nonaktif (dilewati)
 *  x       {number}          Jarak dari kiri layar (pixel)
 *  y       {number}          Jarak dari atas layar (pixel)
 *  width   {number|string}   Lebar dalam pixel (400) atau persen ("100%")
 *  height  {number|string}   Tinggi dalam pixel (300) atau persen ("100%")
 *  opacity {number}          0.0 = tidak terlihat | 1.0 = penuh
 *  rotate  {number}          Rotasi dalam derajat (0 = normal)
 *  scale   {number}          Skala: 1.0 = normal | 0.5 = 50% | 2.0 = 200%
 *  z       {number}          Z-index: angka lebih besar tampil di depan
 *  css     {string}          CSS tambahan, misal: "filter: blur(2px);"
 *
 * TIPS POSISI (resolusi 1920×1080):
 *  Pojok kiri atas    → x: 0,    y: 0
 *  Pojok kanan atas   → x: 1720, y: 0    (untuk overlay lebar 200px)
 *  Pojok kiri bawah   → x: 0,    y: 880  (untuk overlay tinggi 200px)
 *  Pojok kanan bawah  → x: 1720, y: 880
 *  Tengah layar       → x: 760,  y: 390  (untuk overlay 400×300px)
 *  Bar bawah penuh    → x: 0,    y: 980, width: 1920, height: 100
 * ================================================================
 */

window.OVERLAY_CONFIG = {

  /* ── Pengaturan Global ──────────────────────────────────────── */
  settings: {
    /**
     * debug: true  → Tampilkan log detail di DevTools Console (F12)
     * debug: false → Mode senyap, tidak ada log (untuk produksi/stream)
     */
    debug: false
  },

  /* ── Daftar Overlay ─────────────────────────────────────────── */
  /*
    Tambahkan overlay sebanyak yang kamu butuhkan.
    Tidak ada batasan jumlah.
    Overlay dengan enabled: false akan dilewati (tidak dimuat).
  */
  overlays: [

    // ═══════════════════════════════════════════════════════════
    // CONTOH 1 — Alert Fullscreen
    // Untuk: Follow Alert, Donation Alert, Sub Alert, Gift Alert
    // Gunakan fullscreen ("100%") agar animasi bisa muncul di mana saja
    // ═══════════════════════════════════════════════════════════
    {
      name    : "Overlay Alert",
      url     : "https://sociabuzz.com/pro/tribe/mediashare/v2/7264966058?colorName=%2300ff00&alphaName=1&colorNote=%23ffff00&alphaNote=1&colorFrom=%23eeeeee&alphaFrom=1&mediashareActive=1&mediashareTTS=1&font=Open%2BSans%3A800&mediashareNSFW=0",        // ← Tempel URL overlay alert kamu di sini
      enabled : true,     // ← Ganti ke true untuk mengaktifkan
      x       : 0,
      y       : 0,
      width   : "100%",   // Fullscreen lebar
      height  : "100%",   // Fullscreen tinggi
      opacity : 1,
      rotate  : 0,
      scale   : 1,
      z       : 100,       // Z tinggi agar tampil di paling depan
      css     : ""
    },

    // ═══════════════════════════════════════════════════════════
    // CONTOH 2 — Chat Box (Panel Kanan)
    // Posisi: kanan layar, memanjang dari atas ke bawah
    // ═══════════════════════════════════════════════════════════
    {
      name    : "Overlay Chat",
      url     : "",
      enabled : false,
      x       : 1520,     // 1920 - 400 = 1520 (panel 400px dari kanan)
      y       : 0,
      width   : 400,
      height  : 1080,
      opacity : 1,
      rotate  : 0,
      scale   : 1,
      z       : 10,
      css     : ""
    },

    // ═══════════════════════════════════════════════════════════
    // CONTOH 3 — Donasi Ticker (Bar Bawah)
    // Posisi: memanjang di bagian bawah layar
    // ═══════════════════════════════════════════════════════════
    {
      name    : "Overlay Donasi",
      url     : "",
      enabled : false,
      x       : 0,
      y       : 980,      // 1080 - 100 = 980 (bar tinggi 100px dari bawah)
      width   : 1920,
      height  : 100,
      opacity : 1,
      rotate  : 0,
      scale   : 1,
      z       : 20,
      css     : ""
    },

    // ═══════════════════════════════════════════════════════════
    // CONTOH 4 — Gift TikTok (Panel Kiri Bawah)
    // Posisi: pojok kiri bawah
    // ═══════════════════════════════════════════════════════════
    {
      name    : "Overlay Gift TikTok",
      url     : "",
      enabled : false,
      x       : 0,
      y       : 600,
      width   : 400,
      height  : 480,
      opacity : 1,
      rotate  : 0,
      scale   : 1,
      z       : 15,
      css     : ""
    },

    // ═══════════════════════════════════════════════════════════
    // CONTOH 5 — Goal / Progress Bar (Atas Tengah)
    // Posisi: tengah atas layar
    // ═══════════════════════════════════════════════════════════
    {
      name    : "Overlay Goal",
      url     : "",
      enabled : false,
      x       : 760,      // (1920 - 400) / 2 = 760 (tengah untuk lebar 400px)
      y       : 0,
      width   : 400,
      height  : 80,
      opacity : 1,
      rotate  : 0,
      scale   : 1,
      z       : 12,
      css     : ""
    },

    // ═══════════════════════════════════════════════════════════
    // CONTOH 6 — Countdown Timer (Tengah Layar)
    // ═══════════════════════════════════════════════════════════
    {
      name    : "Overlay Countdown",
      url     : "",
      enabled : false,
      x       : 860,      // (1920 - 200) / 2 = 860 (tengah untuk lebar 200px)
      y       : 440,      // (1080 - 200) / 2 = 440 (tengah untuk tinggi 200px)
      width   : 200,
      height  : 200,
      opacity : 1,
      rotate  : 0,
      scale   : 1,
      z       : 50,
      css     : ""
    },

    // ═══════════════════════════════════════════════════════════
    // CONTOH 7 — Media Share Fullscreen
    // Untuk: YouTube media share, video request
    // ═══════════════════════════════════════════════════════════
    {
      name    : "Overlay Media Share",
      url     : "",
      enabled : false,
      x       : 0,
      y       : 0,
      width   : "100%",
      height  : "100%",
      opacity : 1,
      rotate  : 0,
      scale   : 1,
      z       : 80,
      css     : ""
    },

    // ═══════════════════════════════════════════════════════════
    // CONTOH 8 — Event List / Recent Events (Panel Kiri Atas)
    // ═══════════════════════════════════════════════════════════
    {
      name    : "Overlay Event List",
      url     : "",
      enabled : false,
      x       : 0,
      y       : 0,
      width   : 350,
      height  : 500,
      opacity : 1,
      rotate  : 0,
      scale   : 1,
      z       : 8,
      css     : ""
    },

    // ═══════════════════════════════════════════════════════════
    // CONTOH 9 — Sponsor Logo (Pojok Kanan Atas)
    // Dengan drop shadow menggunakan CSS filter
    // ═══════════════════════════════════════════════════════════
    {
      name    : "Overlay Sponsor",
      url     : "",
      enabled : false,
      x       : 1720,     // 1920 - 200 = 1720 (dari kanan, lebar 200px)
      y       : 20,
      width   : 200,
      height  : 80,
      opacity : 0.9,
      rotate  : 0,
      scale   : 1,
      z       : 5,
      css     : "filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));"
    },

    // ═══════════════════════════════════════════════════════════
    // CONTOH 10 — Custom Overlay dengan Transform
    // Contoh penggunaan rotate dan scale
    // ═══════════════════════════════════════════════════════════
    {
      name    : "Overlay Custom",
      url     : "",
      enabled : false,
      x       : 100,
      y       : 100,
      width   : 400,
      height  : 300,
      opacity : 1,
      rotate  : 0,        // Ganti ke 45 untuk rotasi 45 derajat
      scale   : 1,        // Ganti ke 0.75 untuk 75% ukuran
      z       : 7,
      css     : ""        // Contoh: "filter: brightness(1.2) contrast(1.1);"
    }

    // ═══════════════════════════════════════════════════════════
    // TAMBAHKAN OVERLAY BARU DI BAWAH SINI
    // Salin blok berikut, hapus tanda komentar, lalu sesuaikan:
    // ═══════════════════════════════════════════════════════════
    //
    // ,{
    //   name    : "Nama Overlay Baru",
    //   url     : "https://url-overlay-kamu.com/path",
    //   enabled : true,
    //   x       : 0,
    //   y       : 0,
    //   width   : 400,
    //   height  : 300,
    //   opacity : 1,
    //   rotate  : 0,
    //   scale   : 1,
    //   z       : 10,
    //   css     : ""
    // }

  ]

};
