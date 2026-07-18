// ================================================================
//   TRANSPARENT OVERLAY AGGREGATOR v1.0 — config.js
//
//   ★ EDIT FILE INI UNTUK MENAMBAH / MENGUBAH OVERLAY ★
//
//   Parameter setiap overlay:
//   ┌─────────────────────────────────────────────────────────┐
//   │  name    : Nama pengenal overlay (bebas)                │
//   │  url     : Link overlay dari platform (wajib diisi)     │
//   │  enabled : true = aktif | false = nonaktif              │
//   │  x       : Posisi kiri (px). 0 = pojok kiri            │
//   │  y       : Posisi atas (px). 0 = pojok atas            │
//   │  width   : Lebar  – "100%" atau angka px               │
//   │  height  : Tinggi – "100%" atau angka px               │
//   │  zIndex  : Layer (angka besar = tampil di depan)        │
//   │  opacity : Transparansi 0.0 (tak terlihat) – 1 (penuh) │
//   └─────────────────────────────────────────────────────────┘
// ================================================================

const OVERLAYS = [

  // ────────────────────────────────────────────────
  //  SOCIABUZZ ALERTS (Slot 1–10)
  //  Isi url dengan link overlay dari Sociabuzz Anda
  // ────────────────────────────────────────────────

  {
    name    : "Sociabuzz Alert",
    url     : "https://sociabuzz.com/pro/tribe/alert1/v3/7264966058?colorName=%2300ff00&alphaName=1&colorNote=%23ffff00&alphaNote=1&colorFrom=%23eeeeee&alphaFrom=1&gifActive=1&maxDuration=25&font=Open%2BSans%3A800",        // ← Isi link overlay Sociabuzz di sini
    enabled : true,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 10,  opacity: 1
  },
  {
    name    : "Sociabuzz Mediashare",
    url     : "https://sociabuzz.com/pro/tribe/mediashare/v2/7264966058?colorName=%2300ff00&alphaName=1&colorNote=%23ffff00&alphaNote=1&colorFrom=%23eeeeee&alphaFrom=1&mediashareActive=1&mediashareTTS=1&font=Open%2BSans%3A800&mediashareNSFW=0",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 11,  opacity: 1
  },
  {
    name    : "Sociabuzz Top Leaderboard",
    url     : "https://sociabuzz.com/pro/tribe/topleaderboard/v2/7264966058",
    enabled : true,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 12,  opacity: 1
  },
  {
    name    : "Sociabuzz Subathon",
    url     : "https://sociabuzz.com/pro/tribe/timer/v2/7264966058",
    enabled : true,
    x: 0,  y: 600,
    width: "100%",  height: "100%",
    zIndex: 13,  opacity: 1
  },
  {
    name    : "Sociabuzz Alert 5",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 14,  opacity: 1
  },
  {
    name    : "Sociabuzz Alert 6",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 15,  opacity: 1
  },
  {
    name    : "Sociabuzz Alert 7",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 16,  opacity: 1
  },
  {
    name    : "Sociabuzz Alert 8",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 17,  opacity: 1
  },
  {
    name    : "Sociabuzz Alert 9",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 18,  opacity: 1
  },
  {
    name    : "Sociabuzz Alert 10",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 19,  opacity: 1
  },


  // ────────────────────────────────────────────────
  //  TIKFINITY ALERTS (Slot 1–10)
  //  Isi url dengan link overlay dari TikFinity Anda
  // ────────────────────────────────────────────────

  {
    name    : "TikFinity Alert 1",
    url     : "",        // ← Isi link overlay TikFinity di sini
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 20,  opacity: 1
  },
  {
    name    : "TikFinity Alert 2",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 21,  opacity: 1
  },
  {
    name    : "TikFinity Alert 3",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 22,  opacity: 1
  },
  {
    name    : "TikFinity Alert 4",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 23,  opacity: 1
  },
  {
    name    : "TikFinity Alert 5",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 24,  opacity: 1
  },
  {
    name    : "TikFinity Alert 6",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 25,  opacity: 1
  },
  {
    name    : "TikFinity Alert 7",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 26,  opacity: 1
  },
  {
    name    : "TikFinity Alert 8",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 27,  opacity: 1
  },
  {
    name    : "TikFinity Alert 9",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 28,  opacity: 1
  },
  {
    name    : "TikFinity Alert 10",
    url     : "",
    enabled : false,
    x: 0,  y: 0,
    width: "100%",  height: "100%",
    zIndex: 29,  opacity: 1
  },


  // ────────────────────────────────────────────────
  //  OVERLAY TAMBAHAN (Custom)
  //  Hapus tanda // untuk mengaktifkan contoh di bawah
  // ────────────────────────────────────────────────

  // Contoh: Chat Overlay (posisi kiri bawah)
  // {
  //   name    : "Chat Overlay",
  //   url     : "https://link-chat-overlay-anda.com",
  //   enabled : true,
  //   x: 20,  y: 400,
  //   width: 400,  height: 600,
  //   zIndex: 5,  opacity: 0.95
  // },

  // Contoh: Goal Bar (bawah layar)
  // {
  //   name    : "Goal / Progress Bar",
  //   url     : "https://link-goal-overlay-anda.com",
  //   enabled : true,
  //   x: 0,  y: 980,
  //   width: "100%",  height: 100,
  //   zIndex: 8,  opacity: 1
  // },

  // Contoh: Media / Video Alert
  // {
  //   name    : "Media Alert",
  //   url     : "https://link-media-alert-anda.com",
  //   enabled : true,
  //   x: 0,  y: 0,
  //   width: "100%",  height: "100%",
  //   zIndex: 30,  opacity: 1
  // },

];


// ================================================================
//   PENGATURAN GLOBAL
//   Ubah sesuai kebutuhan
// ================================================================

const CONFIG = {

  // DEBUG MODE
  // true  = tampilkan panel debug + log di console browser
  // false = mode senyap untuk produksi streaming
  // ⚠️ Pastikan debug: false sebelum live streaming!
  debug: false,

  // LAZY LOAD DELAY (milidetik antar pemuatan setiap iframe)
  // Mencegah semua overlay dimuat bersamaan → lebih stabil
  // Rekomendasi: 100–300 ms
  // Lebih tinggi = lebih aman tapi butuh waktu lebih lama
  lazyLoadDelay: 200,

};
