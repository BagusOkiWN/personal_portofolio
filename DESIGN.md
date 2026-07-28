# Design.md
## Design Guideline — Website Portofolio Profesional

Konsep visual: **Simple, Techy, Semi-Dark**

---

## 1. Design Principles

1. **Clarity over decoration** — setiap elemen visual harus membantu recruiter memahami informasi lebih cepat, bukan sekadar estetika.
2. **Consistent rhythm** — spacing, ukuran font, dan warna konsisten di semua section.
3. **Subtle motion** — animasi digunakan untuk membantu fokus (reveal on scroll), bukan mengalihkan perhatian.
4. **Evidence-based over claim-based** — hindari elemen yang terasa "menjual diri" berlebihan (contoh: progress bar skill %).

---

## 2. Visual Style

### 2.1 Tone
Semi-dark, modern, techy — kesan seperti developer tools / terminal-inspired tapi tetap rapi dan profesional (bukan gelap pekat/gothic).

### 2.2 Color Palette (referensi, bisa disesuaikan)

| Token | Fungsi | Contoh nilai |
|-------|--------|--------------|
| `--bg-primary` | Background utama | `#0F1115` (semi-dark, bukan hitam pekat) |
| `--bg-secondary` | Background card/section alternatif | `#161A21` |
| `--bg-elevated` | Card, modal | `#1C212B` |
| `--text-primary` | Teks utama | `#E6E9EF` |
| `--text-secondary` | Teks sekunder/deskripsi | `#9AA4B2` |
| `--accent` | Warna aksen (CTA, highlight, link aktif) | Biru/cyan techy, contoh `#4DA3FF` atau `#22D3EE` |
| `--accent-soft` | Aksen untuk badge/border tipis | Versi opacity rendah dari accent |
| `--success` | Status "Open to Work" | Hijau lembut `#3DD68C` |
| `--border` | Garis pemisah, outline card | `#262B35` |

Catatan: bila menambahkan light mode, mapping token di atas cukup dibalik/disesuaikan tanpa mengubah struktur komponen.

### 2.3 Typography

| Elemen | Font style | Ukuran (desktop) |
|--------|-----------|-------------------|
| Nama (Home) | Bold, besar | 40–56px |
| Headline | Medium/regular, monospace opsional untuk kesan techy | 18–22px |
| Section title (Skills/Experience/Projects) | Bold | 28–32px |
| Body text | Regular | 15–16px |
| Badge/tag | Medium, uppercase kecil opsional | 12–13px |

Saran: gunakan satu font sans-serif modern untuk teks utama (contoh: Inter, Sora, atau Space Grotesk), dan boleh tambahkan satu monospace font (contoh: JetBrains Mono) khusus untuk elemen kecil seperti badge tech stack agar kesan "techy" terasa tanpa berlebihan.

### 2.4 Grid / Pattern Background
- Pola grid tipis (garis halus, opacity rendah ~5–10%) di background Home
- Bisa dikombinasikan dengan gradient radial halus di belakang foto profil untuk depth
- Hindari partikel/efek 3D berat yang memperlambat load

---

## 3. Layout per Section

### 3.1 Navbar
- Sticky di atas, background semi-transparan + blur saat discroll
- Logo/inisial di kiri, menu di kanan (desktop); hamburger menu di mobile
- Active state: underline tipis atau warna accent pada menu section yang sedang aktif

### 3.2 Home
- Layout dua kolom (desktop): kiri teks (nama, headline, deskripsi, CTA, sosial), kanan foto/ilustrasi
- Mobile: stack — foto di atas, teks di bawah, center-aligned
- CTA "View Projects" = tombol solid warna accent
- CTA "Download CV" = tombol outline
- Status "Open to Work" = badge kecil dengan dot indikator hijau, di atas nama atau dekat headline
- Animasi: fade-in + slight slide-up saat halaman load (durasi singkat, staggered antar elemen)

### 3.3 Skills
- Grid per kategori (5 kategori), masing-masing kategori punya heading kecil
- Skill item = badge/chip dengan icon kiri, nama tengah, level (jika ada) sebagai label kecil di kanan atau sebagai warna border berbeda
- Level direpresentasikan lewat **teks label kecil atau warna border**, bukan bar
- Hover state: sedikit elevasi/border glow warna accent

### 3.4 Experience
- Vertical timeline dengan garis vertikal di kiri (desktop)
- Titik/dot di garis timeline menandai tiap entri
- Periode (contoh: "Jan 2025 – Jul 2025") ditampilkan di sisi kiri garis, card detail di kanan
- Mobile: garis timeline pindah ke kiri penuh, card full-width di kanan garis
- Tech stack ditampilkan sebagai chip kecil di bagian bawah card
- Animasi: reveal on scroll (fade + slide dari samping), trigger via intersection observer

### 3.5 Projects
- Filter bar di atas grid: tombol pill (All, Web Development, Backend, Cyber Security, Mobile), state aktif dengan background accent
- Grid card responsif (3 kolom desktop → 2 tablet → 1 mobile)
- Card: thumbnail di atas (rounded corners), judul, deskripsi singkat 1–2 baris, tech stack chip, lalu 3 tombol aksi di bawah (Live Demo / GitHub / Detail) — tombol Detail selalu ada, dua lainnya opsional
- Klik card atau "Detail" → modal overlay (bukan pindah halaman penuh, agar tetap terasa ringan) berisi: galeri screenshot, latar belakang, role, fitur utama, tech stack, tantangan & solusi

### 3.6 Footer
- Simple, satu baris atau dua baris
- Nama + copyright di kiri, link GitHub/LinkedIn/Email (icon only) di kanan
- Background sedikit lebih gelap dari section terakhir untuk penanda batas halaman

---

## 4. Component Inventory

| Komponen | Digunakan di |
|----------|--------------|
| `Navbar` (sticky, active-link) | Global |
| `Button` (solid, outline variant) | Home, Projects |
| `SocialLinks` | Home, Footer |
| `StatusBadge` | Home |
| `SkillCategoryGroup` | Skills |
| `SkillBadge` | Skills |
| `TimelineItem` | Experience |
| `TechTag` | Experience, Projects |
| `ProjectFilterBar` | Projects |
| `ProjectCard` | Projects |
| `ProjectDetailModal` | Projects |
| `Footer` | Global |
| `Custom404` | Routing fallback |

---

## 5. Motion Guidelines

| Interaksi | Efek | Durasi |
|-----------|------|--------|
| Page load (Home) | Fade + slide-up, staggered | 400–600ms |
| Scroll reveal (Experience, Projects) | Fade + slide-in dari bawah/samping | 300–500ms |
| Hover card/badge | Scale halus (1.02x) + border glow | 150–200ms |
| Navbar active link | Underline transition | 200ms |
| Modal open/close | Fade + scale | 200–300ms |

Prinsip: semua animasi harus terasa **ringan dan cepat**, hindari durasi > 700ms yang membuat interaksi terasa lambat bagi recruiter yang scanning cepat.

---

## 6. Responsive Breakpoints (referensi)

| Breakpoint | Lebar |
|------------|-------|
| Mobile | < 640px |
| Tablet | 640px – 1024px |
| Desktop | > 1024px |

Perubahan utama antar breakpoint:
- Home: dua kolom → stack
- Experience: timeline dua sisi → satu sisi
- Projects: grid 3 kolom → 2 → 1
- Navbar: menu horizontal → hamburger

---

## 7. Accessibility Notes

- Kontras teks terhadap background semi-dark harus memenuhi minimal WCAG AA
- Semua tombol/icon harus punya label aksesibel (aria-label untuk icon-only button seperti social link)
- Animasi harus menghormati preferensi `prefers-reduced-motion`
- Filter project dan modal harus bisa dinavigasi via keyboard