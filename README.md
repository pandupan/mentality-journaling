# 📔 Mentality Journaling — Digital Mental Health Journal

Aplikasi **jurnal mental digital** untuk mencatat pemikiran, perasaan, dan refleksi harian. Membantu pengguna melatih mindfulness, melacak mood, dan menjaga kesehatan mental melalui journaling terstruktur.

## ✨ Fitur

### 📝 Journaling
- **Tulis Jurnal Harian** — Catat pemikiran & perasaan setiap hari
- **Kategori Mood** — Pilih suasana hati saat menulis
- **Riwayat Jurnal** — Lihat kembali catatan sebelumnya

### 📊 Mood Tracker
- **Pemantauan Suasana Hati** — Lacak perubahan mood harian
- **Kalender** — Lihat mood dalam tampilan kalender (`date-fns`)
- **Visualisasi** — Grafik perkembangan mood dari waktu ke waktu

### 🔐 Autentikasi
- **Login/Register** — NextAuth dengan kredensial email
- **Protected Routes** — Hanya pengguna terautentikasi yang bisa akses
- **API Auth** — Endpoint register (`/api/auth/register`) & login (`/api/auth/[...nextauth]`)

### 💬 Quotes
- **Kutipan Motivasi** — Inspirasi harian untuk menjaga semangat

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Library** | shadcn/ui (Radix primitives) |
| **Auth** | NextAuth.js + bcrypt |
| **Backend** | Firebase |
| **State** | localStorage (offline support) |
| **Date** | date-fns |
| **Animation** | Framer Motion |

## 📁 Struktur Proyek

```
app/
├── page.tsx                      # Landing page (public)
├── login/page.tsx                # Halaman login
├── register/page.tsx             # Halaman registrasi
└── api/auth/
    ├── [...nextauth]/route.ts    # NextAuth handler
    └── register/route.ts         # Register API

components/
├── layouts/
│   ├── Header.tsx                # Navigasi (dinamis: login/logout)
│   ├── Footer.tsx
│   └── AuthProvider.tsx          # NextAuth provider wrapper
├── pages/
│   ├── HeroSection.tsx           # Hero landing
│   ├── JournalSection.tsx        # Jurnal (core feature)
│   ├── MoodSection.tsx           # Mood tracker
│   └── QuotesSection.tsx         # Kutipan motivasi
└── ui/
    ├── button.tsx
    ├── calendar.tsx              # Kalender interaktif
    ├── card.tsx
    └── input.tsx
```

## 🚀 Cara Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

> **Note**: Setup NextAuth provider dan Firebase credentials di environment variables.

## 📄 Lisensi

MIT License

---

> Dibuat oleh [Pandu Pangestu](https://github.com/pandupan)
