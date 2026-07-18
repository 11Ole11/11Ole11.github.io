# OverlayHub v1.0

> Gabungkan semua overlay livestream kamu dalam **satu file HTML transparan**.  
> Satu Browser Source di OBS. Semua overlay berjalan bersamaan.

---

## 🚀 Cara Penggunaan Cepat

### Langkah 1 — Edit Konfigurasi

Buka `js/config.js` dengan text editor (Notepad, VS Code, Notepad++, dll.)

Cari overlay yang ingin diaktifkan, isi URL-nya, lalu ganti `enabled: false` menjadi `enabled: true`:

```javascript
{
  name    : "Overlay Alert",
  url     : "https://url-overlay-kamu.com/alert",  // ← Isi URL di sini
  enabled : true,                                   // ← Aktifkan
  x       : 0,
  y       : 0,
  width   : "100%",
  height  : "100%",
  opacity : 1,
  rotate  : 0,
  scale   : 1,
  z       : 100,
  css     : ""
}
```

### Langkah 2 — Tambahkan ke OBS

1. Buka **OBS Studio**
2. Di panel **Sources**, klik tombol **+** → pilih **Browser**
3. Beri nama (misal: "OverlayHub"), klik **OK**
4. Centang **Local File**
5. Klik **Browse** → pilih file **index.html** dari folder OverlayHub
6. Set **Width**: `1920`, **Height**: `1080`
7. Di kolom **Custom CSS**, isi:
   ```css
   body { background-color: rgba(0, 0, 0, 0) !important; }
   ```
8. Klik **OK**

### Langkah 3 — Selesai!

Semua overlay yang diaktifkan akan tampil dalam satu Browser Source.  
Setiap kali kamu mengubah `config.js`, klik kanan Browser Source → **Refresh**.

---

## 📋 Properti Overlay

| Properti  | Tipe           | Default  | Keterangan |
|-----------|----------------|----------|------------|
| `name`    | string         | -        | Nama untuk referensi (tidak tampil di stream) |
| `url`     | string         | -        | URL layanan overlay **[WAJIB]** |
| `enabled` | boolean        | false    | `true` = aktif, `false` = dilewati |
| `x`       | number         | 0        | Jarak dari kiri layar (pixel) |
| `y`       | number         | 0        | Jarak dari atas layar (pixel) |
| `width`   | number\|string | `"100%"` | Lebar: pixel (`400`) atau persen (`"100%"`) |
| `height`  | number\|string | `"100%"` | Tinggi: pixel (`300`) atau persen (`"100%"`) |
| `opacity` | number         | 1        | Transparansi: `0.0` = tak terlihat, `1.0` = penuh |
| `rotate`  | number         | 0        | Rotasi dalam derajat |
| `scale`   | number         | 1        | Skala: `1.0` = normal, `0.5` = 50%, `2.0` = 200% |
| `z`       | number         | 1        | Z-index: angka lebih besar = tampil di depan |
| `css`     | string         | `""`     | CSS tambahan (`filter`, `brightness`, dll.) |

---

## 📐 Panduan Posisi (Resolusi 1920×1080)

```
(0,0) ─────────────────────────────── (1920,0)
  │                                        │
  │   Pojok kiri atas   Pojok kanan atas   │
  │   x:0, y:0          x:1720, y:0        │
  │                                        │
  │         Tengah: x:760, y:390           │
  │                                        │
  │   Pojok kiri bawah  Pojok kanan bawah  │
  │   x:0, y:880        x:1720, y:880      │
  │                                        │
(0,1080) ─────────────────────────── (1920,1080)
```

**Contoh posisi umum:**

| Layout                    | x    | y    | width | height |
|---------------------------|------|------|-------|--------|
| Fullscreen (Alert, Media) | 0    | 0    | "100%" | "100%" |
| Chat kanan                | 1520 | 0    | 400   | 1080   |
| Chat kiri                 | 0    | 0    | 400   | 1080   |
| Bar bawah (Ticker)        | 0    | 980  | 1920  | 100    |
| Bar atas (Goal)           | 760  | 0    | 400   | 80     |
| Pojok kiri bawah (Gift)   | 0    | 600  | 400   | 480    |
| Pojok kanan atas (Logo)   | 1720 | 20   | 200   | 60     |

---

## 🎨 Contoh CSS Tambahan

Property `css` mendukung semua CSS filter dan property standar:

```javascript
// Drop shadow
css: "filter: drop-shadow(0 4px 16px rgba(0,0,0,0.6));"

// Brightness & contrast
css: "filter: brightness(1.2) contrast(1.1);"

// Blur (misal overlay background)
css: "filter: blur(4px);"

// Kombinasi
css: "filter: brightness(0.9) drop-shadow(0 2px 8px rgba(0,0,0,0.5));"
```

---

## 💻 Penggunaan di Software Streaming Lain

### PRISM Live Studio
1. Tambahkan Source → **Browser Source**
2. Mode: **Local File** → pilih `index.html`
3. Aktifkan **Chroma Key** / **Background Transparent**

### Streamlabs Desktop
1. Tambahkan Source → **Browser Source**
2. Centang **Local File** → pilih `index.html`
3. Custom CSS: `body { background: transparent !important; }`

### vMix
1. Add Input → **Web Browser**
2. URL: masukkan path file `index.html` (misal: `file:///C:/OverlayHub/index.html`)
3. Pastikan resolusi sesuai

### XSplit Broadcaster
1. Add Source → **Webpage**
2. Mode: **Local**
3. Pilih `index.html`

---

## 🛠️ Debug & Troubleshooting

### Aktifkan Mode Debug

Di `js/config.js`, ubah `debug: false` menjadi `debug: true`:
```javascript
settings: {
  debug: true
}
```

Buka **DevTools** (F12 di OBS: klik kanan Browser Source → **Interact** → F12),  
lalu lihat tab **Console** untuk log detail.

### Perintah Debug di Console

```javascript
OverlayHub.list()     // Tampilkan semua overlay beserta status
OverlayHub.reload()   // Render ulang semua overlay
OverlayHub.destroy()  // Hapus semua overlay dari layar
OverlayHub.config()   // Tampilkan konfigurasi aktif
```

### Masalah Umum

| Masalah | Kemungkinan Penyebab | Solusi |
|---------|----------------------|--------|
| Background tidak transparan | Custom CSS belum diisi | Isi `body { background-color: rgba(0,0,0,0) !important; }` di OBS |
| Overlay tidak muncul | `enabled: false` | Ganti ke `enabled: true` |
| Overlay tidak muncul | URL kosong | Isi URL yang valid di `url: ""` |
| Overlay ditimpa overlay lain | Z-index terlalu rendah | Naikkan nilai `z` |
| Overlay keluar dari layar | Posisi x/y terlalu besar | Periksa nilai x dan y |
| iframe diblokir di browser biasa | X-Frame-Options dari layanan | Normal — coba di OBS langsung |

---

## 📁 Struktur Folder

```
OverlayHub/
├── index.html               ← Buka di OBS Browser Source
│
├── css/
│   └── style.css            ← Gaya dasar (jangan diubah)
│
├── js/
│   ├── config.js            ← ⚙️ EDIT INI untuk tambah overlay
│   ├── utils.js             ← Fungsi pembantu & validasi
│   ├── layoutManager.js     ← Logika posisi & transform CSS
│   ├── overlayManager.js    ← Logika pembuatan & render iframe
│   └── script.js            ← Entry point aplikasi
│
├── assets/
│   ├── icon/                ← Ikon (untuk pengembangan masa depan)
│   └── image/               ← Gambar aset (untuk pengembangan masa depan)
│
├── profiles/                ← Template profil (untuk Fase 2)
│   ├── default.json
│   ├── gaming.json
│   └── tiktok.json
│
└── README.md                ← Dokumentasi ini
```

---

## 🔄 Rencana Pengembangan

| Fase | Status | Fitur |
|------|--------|-------|
| **Fase 1** | ✅ Selesai | Offline, config via `config.js`, semua overlay tampil di satu halaman |
| **Fase 2** | 🔜 Berikutnya | Editor visual, impor/ekspor profil JSON, drag & drop posisi |
| **Fase 3** | 📋 Direncanakan | Dashboard web, akun pengguna, cloud sync, berbagi preset |

---

## ⚙️ Persyaratan Sistem

- **OS**: Windows 10/11 (atau macOS/Linux)
- **Browser**: Google Chrome, Microsoft Edge, atau browser berbasis Chromium
- **Software Streaming**: OBS Studio 27+, PRISM Live, Streamlabs Desktop, vMix, XSplit
- **Resolusi**: 1920×1080 (default), mendukung 720p, 1440p, 4K

**Tidak memerlukan:**
- Node.js, NPM, PHP, Python
- Database atau server lokal
- Koneksi internet *(kecuali URL overlay dari layanan online)*

---

## 📄 Lisensi

MIT License — bebas digunakan, dimodifikasi, dan didistribusikan.

---

*OverlayHub v1.0 — Dibuat untuk streamer Indonesia 🇮🇩*
