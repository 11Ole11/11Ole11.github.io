# Transparent Overlay Aggregator v1.0

> Gabungkan **banyak overlay livestream** menjadi **satu Browser Source** di OBS Studio, PRISM Live, atau Streamlabs — tanpa server, tanpa instalasi, 100% offline.

---

## Struktur File

```
TransparentOverlayAggregator/
│
├── index.html   ← Tambahkan ini ke OBS sebagai Browser Source
├── config.js    ← EDIT INI untuk menambah/mengubah overlay
├── overlay.js   ← Engine utama (jangan diedit)
├── style.css    ← Stylesheet transparan (jangan diedit)
└── README.md    ← Panduan ini
```

---

## Cara Penggunaan

### Langkah 1 — Edit Konfigurasi

Buka `config.js` menggunakan **Notepad**, **VSCode**, atau teks editor apa pun.

Isi `url` pada setiap overlay yang ingin diaktifkan:

```js
{
  name    : "Sociabuzz Alert 1",
  url     : "https://link-overlay-sociabuzz-anda.com",  // ← isi di sini
  enabled : true,                                        // ← set ke true
  x: 0,  y: 0,
  width: "100%",  height: "100%",
  zIndex: 10,  opacity: 1
},
```

### Langkah 2 — Simpan config.js

Simpan file setelah selesai mengedit.

### Langkah 3 — Tambahkan ke OBS

1. Buka **OBS Studio**
2. Di panel **Sources**, klik tombol **+**
3. Pilih **Browser**
4. Beri nama (contoh: `Overlay Aggregator`)
5. Centang **Local File**
6. Klik **Browse** → pilih file `index.html`
7. Atur **Width: 1920** dan **Height: 1080** (sesuaikan resolusi Anda)
8. Centang **Shutdown source when not visible**
9. Klik **OK**

> Source ini sudah transparan secara otomatis — tidak perlu setting Chroma Key.

---

## Parameter Overlay di config.js

| Parameter | Tipe           | Contoh        | Keterangan                              |
|-----------|----------------|---------------|-----------------------------------------|
| `name`    | string         | `"Sociabuzz"` | Nama pengenal (bebas, untuk referensi)  |
| `url`     | string         | `"https://…"` | Link overlay dari platform              |
| `enabled` | boolean        | `true`        | `true` = aktif, `false` = nonaktif      |
| `x`       | number (px)    | `0`           | Posisi horizontal dari kiri             |
| `y`       | number (px)    | `0`           | Posisi vertikal dari atas               |
| `width`   | string/number  | `"100%"`      | Lebar: `"100%"` atau angka px           |
| `height`  | string/number  | `"100%"`      | Tinggi: `"100%"` atau angka px          |
| `zIndex`  | number         | `10`          | Layer urutan (lebih besar = di depan)   |
| `opacity` | number (0–1)   | `1`           | Transparansi: `0` = invisible, `1` = penuh |

---

## Contoh Konfigurasi

### Alert penuh layar (default)
```js
{
  name: "Sociabuzz Alert 1",
  url : "https://link-overlay-anda.com",
  enabled: true,
  x: 0, y: 0,
  width: "100%", height: "100%",
  zIndex: 10, opacity: 1
}
```

### Chat box kiri bawah
```js
{
  name: "Chat Overlay",
  url : "https://link-chat-anda.com",
  enabled: true,
  x: 20, y: 400,
  width: 400, height: 600,
  zIndex: 5, opacity: 0.95
}
```

### Goal bar bawah layar (resolusi 1920×1080)
```js
{
  name: "Goal Bar",
  url : "https://link-goal-anda.com",
  enabled: true,
  x: 0, y: 980,
  width: "100%", height: 100,
  zIndex: 8, opacity: 1
}
```

---

## Menonaktifkan Overlay Sementara

Ubah `enabled: true` menjadi `enabled: false` — URL tetap tersimpan.

```js
{
  name    : "TikFinity Alert 3",
  url     : "https://link-anda.com",
  enabled : false,   // ← nonaktif sementara
  ...
}
```

---

## Menambah Overlay Baru

Tambahkan objek baru di akhir array `OVERLAYS` dalam `config.js`:

```js
const OVERLAYS = [
  // ... overlay yang sudah ada ...

  // ← tambahkan di sini
  {
    name    : "Overlay Baru Saya",
    url     : "https://link-overlay-baru.com",
    enabled : true,
    x: 0, y: 0,
    width: "100%", height: "100%",
    zIndex: 50, opacity: 1
  },
];
```

---

## Debug Mode

Aktifkan untuk melihat status semua overlay saat setup:

```js
const CONFIG = {
  debug: true,   // ← ubah ke true
  lazyLoadDelay: 150
};
```

Buka `index.html` di browser biasa — panel debug akan muncul di pojok kanan atas berisi:
- Daftar overlay (🟢 = URL terisi, ⚫ = URL kosong)
- Counter loaded / error / skip

> **⚠️ Penting:** Set `debug: false` sebelum mulai streaming!

---

## Tips Performa

- **zIndex unik**: Beri zIndex berbeda pada setiap overlay agar tidak ada konflik layer.
- **lazyLoadDelay**: Naikkan ke 200–300ms jika koneksi lambat atau banyak overlay aktif.
- **Monitor RAM**: Setiap iframe memakan RAM. Pantau Task Manager jika 20+ overlay aktif.
- **Refresh OBS**: Setelah mengedit config.js, klik kanan source di OBS → **Refresh**.
- **CORS**: Beberapa overlay mungkin memblokir pemuatan iframe. Uji di browser dulu.

---

## Persyaratan

- ✅ OBS Studio / PRISM Live Studio / Streamlabs Desktop (Browser Source)
- ✅ Tidak perlu instalasi tambahan
- ✅ Tidak perlu koneksi internet (kecuali URL overlay memerlukan akses online)
- ✅ 100% offline — HTML statis murni

---

## Checklist Sebelum Streaming

- [ ] URL semua overlay sudah diisi di `config.js`
- [ ] `enabled: true` pada overlay yang ingin aktif
- [ ] `debug: false` di bagian CONFIG
- [ ] File `index.html` sudah ditambahkan ke OBS Browser Source
- [ ] Ukuran Browser Source sesuai resolusi streaming (1920×1080)
- [ ] Test dulu di browser biasa sebelum live
