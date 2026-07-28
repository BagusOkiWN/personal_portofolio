# Product Requirements Document (PRD)
## Website Portofolio Profesional

---

## 1. Overview

### 1.1 Tujuan Produk
Membangun website portofolio profesional yang menampilkan identitas, kemampuan teknis, pengalaman kerja, dan hasil karya (project) secara ringkas dan mudah dipahami oleh recruiter dalam waktu singkat.

### 1.2 Target Pengguna
- **Primary:** Recruiter / HR / hiring manager yang melakukan screening cepat
- **Secondary:** Tech lead / engineer yang menilai kemampuan teknis lebih detail
- **Tertiary:** Klien freelance atau kolaborator potensial

### 1.3 Prinsip Utama
- Simple, tidak banyak menu (4 menu utama)
- Cepat dipahami dalam < 30 detik untuk first impression
- Fokus pada bukti nyata (project) dibanding klaim tanpa bukti (hindari progress bar skill %)
- "Sedikit tapi jelas" lebih diutamakan daripada "banyak tapi minim penjelasan"
- Konten (skills, experience, projects) dikelola lewat file JSON, bukan hardcode di komponen, agar mudah diupdate tanpa mengubah logic

### 1.4 Non-Goals (untuk versi awal)
- Tidak ada blog/artikel
- Tidak ada CMS/admin panel (konten dikelola manual via file JSON)
- Tidak ada database eksternal (Postgres/MySQL, dll) — cukup file JSON lokal
- Tidak ada multi-bahasa (versi awal satu bahasa saja)
- Halaman Contact terpisah tidak wajib — cukup di footer

---

## 2. Tech Stack

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| Framework | **Next.js (App Router)** | Deploy paling mulus di Vercel, support SSG/ISR, punya dynamic routing untuk detail project dari data JSON |
| Styling | **Tailwind CSS** | Cepat implementasi tema semi-dark & konsisten dengan token warna di Design.md |
| Animasi | **Framer Motion** | Untuk fade/slide di Home dan scroll-reveal di Experience & Projects |
| Icon | **lucide-react** | Icon set ringan untuk skill badge, social link, tombol |
| Data Source | **File JSON lokal** (`/data/*.json`) | Tidak butuh backend/CMS, cukup edit file lalu redeploy |
| Optimasi gambar | **next/image** | Optimasi otomatis thumbnail project & foto profil |
| Hosting/Deployment | **Vercel** (primary) atau **Netlify** | Auto-deploy dari Git push, cocok untuk static/SSG output Next.js |
| Version Control | **Git + GitHub** | Sumber deploy otomatis ke Vercel/Netlify |

**Rendering strategy:**
- Data JSON dibaca saat **build time** (Static Generation) → hasil akhir berupa halaman statis yang cepat, tapi interaksi (filter, modal, animasi) tetap terasa dinamis di sisi client (client-side state, tanpa perlu reload/backend).
- Halaman detail project menggunakan **dynamic route** `/projects/[slug]`, di-generate dari `projects.json` lewat `generateStaticParams`.
- Tidak butuh API route/database untuk MVP; API route Next.js baru dipakai jika nanti ditambahkan fitur seperti contact form.

**Struktur folder data:**
```
/data
  skills.json
  experience.json
  projects.json
```

---

## 3. Informasi Arsitektur

```
Navbar (sticky)
├── Home
├── Skills
├── Experience
└── Projects

Footer
├── Nama
├── Copyright
├── GitHub / LinkedIn / Email
```

Single-page scroll (one-page application) dengan anchor per section, active navigation mengikuti section yang sedang dilihat. Detail project menjadi pengecualian: dibuka lewat modal (client-side) atau route terpisah `/projects/[slug]` yang tetap Next.js page statis.

---

## 4. Requirements per Fitur

### 4.1 Home

**User Story:** Sebagai recruiter, saya ingin langsung tahu siapa pemilik portofolio ini dan bidang keahliannya dalam beberapa detik pertama.

**Functional Requirements:**
| ID | Requirement |
|----|-------------|
| H-1 | Menampilkan foto profil / ilustrasi (via `next/image`) |
| H-2 | Menampilkan nama lengkap |
| H-3 | Menampilkan headline profesional (contoh: "Informatics Graduate \| Web Developer \| Cyber Security Enthusiast") |
| H-4 | Menampilkan deskripsi singkat 2–3 kalimat |
| H-5 | Tombol CTA "View Projects" → scroll ke section Projects |
| H-6 | Tombol CTA "Download CV" → download/membuka file CV (PDF, disimpan di `/public`) |
| H-7 | Link sosial: GitHub, LinkedIn, Email |
| H-8 | Status badge kecil, contoh: "Open to Work" |

**Non-Functional:**
- Background semi-dark dengan grid/pola teknologi halus
- Animasi teks ringan via Framer Motion (bukan efek berat/mengganggu)
- Section pertama harus load cepat — dibantu SSG Next.js (tidak ada fetch runtime yang memblok render)

---

### 4.2 Skills

**User Story:** Sebagai recruiter, saya ingin melihat kemampuan teknis yang terorganisir per kategori, bukan daftar panjang tanpa struktur.

**Functional Requirements:**
| ID | Requirement |
|----|-------------|
| S-1 | Skill dikelompokkan ke 5 kategori: Programming Languages, Web Development, Database, DevOps & Deployment, Cyber Security |
| S-2 | Setiap skill ditampilkan sebagai badge/card dengan icon + nama |
| S-3 | Level opsional per skill: Familiar / Intermediate / Proficient (bukan progress bar %) |
| S-4 | Data skill dibaca dari `data/skills.json`, di-render lewat `.map()` per kategori |

**Daftar Skill (data awal):**
- **Programming Languages:** PHP, JavaScript, Python, SQL
- **Web Development:** Laravel, Vue.js, HTML, CSS, REST API
- **Database:** MySQL, SQLite
- **DevOps & Deployment:** Docker, Linux, Git, GitHub, Cloudflare, CI/CD
- **Cyber Security:** Burp Suite, Nmap, Wazuh, OWASP Top 10, Vulnerability Assessment, Web Application Testing

**Constraint:** Tidak menggunakan progress bar persentase (dianggap subjektif dan kurang profesional).

---

### 4.3 Experience

**User Story:** Sebagai recruiter, saya ingin melihat riwayat pengalaman kerja/organisasi secara kronologis dengan konteks kontribusi yang jelas.

**Functional Requirements:**
| ID | Requirement |
|----|-------------|
| E-1 | Setiap entri experience memiliki: nama perusahaan/instansi, posisi, periode, lokasi, deskripsi singkat, poin kontribusi/pencapaian, tech stack |
| E-2 | Ditampilkan dalam format vertical timeline |
| E-3 | Periode berada di sisi kiri, card di sisi kanan (desktop); menyesuaikan jadi stacked di mobile |
| E-4 | Tech stack ditampilkan sebagai tag/badge kecil |
| E-5 | Animasi muncul (fade/slide in) saat section terlihat di viewport, via Framer Motion `whileInView` |
| E-6 | Data experience dibaca dari `data/experience.json`, di-render lewat `.map()` |

---

### 4.4 Projects

**User Story:** Sebagai recruiter, saya ingin melihat bukti nyata kemampuan melalui project yang pernah dikerjakan, lengkap dengan konteks masalah dan solusinya.

**Functional Requirements:**
| ID | Requirement |
|----|-------------|
| P-1 | Menampilkan 3–6 project terbaik (kurasi, bukan seluruh project), diambil dari `data/projects.json` |
| P-2 | Setiap card project menampilkan: thumbnail/screenshot (`next/image`), nama, deskripsi singkat, tech stack, tombol Live Demo / GitHub / View Details |
| P-3 | Filter project berdasarkan kategori (client-side state, tanpa reload): All, Web Development, Backend, Cyber Security, Mobile |
| P-4 | Klik card / "View Details" membuka modal (client component) atau navigasi ke route `/projects/[slug]` |
| P-5 | Detail project berisi: latar belakang, role, fitur utama, tech stack, tantangan, solusi, screenshot tambahan — semua dari field `detail` di JSON |
| P-6 | Tombol Live Demo / GitHub bersifat opsional per project (field `liveDemoUrl` / `githubUrl` bisa kosong) |

---

## 5. Fitur Pendukung (Cross-cutting)

| ID | Requirement |
|----|-------------|
| X-1 | Responsive design (mobile, tablet, desktop) via Tailwind breakpoints |
| X-2 | Navbar sticky dengan active state sesuai section aktif (intersection observer) |
| X-3 | Smooth scrolling antar section (CSS `scroll-behavior` atau lib scroll) |
| X-4 | Dark/light mode (opsional, default semi-dark) via Tailwind `dark:` class + context/localStorage |
| X-5 | Loading animation ringan saat awal load |
| X-6 | SEO metadata via Next.js Metadata API (`generateMetadata` / `metadata` export), termasuk Open Graph tags |
| X-7 | Custom 404 page via `app/not-found.tsx` (built-in Next.js convention) |
| X-8 | Footer: nama, copyright, link GitHub/LinkedIn/Email |

---

## 6. Prioritas Pengembangan (MVP vs Nice-to-have)

**MVP (wajib untuk versi awal):**
- Setup project Next.js + Tailwind, struktur `/data/*.json`
- Home, Skills, Experience, Projects (data-driven dari JSON, statis di build time)
- Responsive layout
- Navbar sticky + smooth scroll
- 3–6 project dengan detail lengkap (modal atau route `/projects/[slug]`)
- Footer dengan link sosial
- Deploy awal ke Vercel (connect repo GitHub)

**Nice-to-have (fase berikutnya):**
- Dark/light mode toggle
- Filter project dinamis (sudah cukup ringan diimplementasi sejak awal, tapi bisa didahulukan/ditunda sesuai waktu)
- Animasi scroll-reveal (Framer Motion) di Experience & Projects
- Custom 404 page bertema
- Contact form (kalau nanti dibutuhkan, pakai Next.js API route + email service seperti Resend)
- ISR (Incremental Static Regeneration) kalau data JSON dipindah ke sumber eksternal di masa depan

---

## 7. Metrik Keberhasilan (Success Criteria)

- Recruiter dapat memahami identitas & bidang keahlian dalam < 30 detik di Home
- Semua project menampilkan konteks masalah + solusi (bukan hanya screenshot)
- Website tetap ringan & cepat diakses di mobile (skor performa baik di Lighthouse, dibantu SSG Next.js)
- Navigasi tidak membingungkan — hanya 4 menu utama, tidak ada nested menu
- Update konten (skill/experience/project baru) cukup lewat edit file JSON + git push, tanpa ubah kode komponen

---

## 8. Struktur Data (JSON, sumber konten)

### `data/skills.json`
```json
[
  {
    "category": "Programming Languages",
    "items": [
      { "name": "PHP", "icon": "php", "level": "Proficient" },
      { "name": "JavaScript", "icon": "javascript", "level": "Proficient" }
    ]
  }
]
```

### `data/experience.json`
```json
[
  {
    "company": "string",
    "position": "string",
    "period": "string",
    "location": "string",
    "description": "string",
    "achievements": ["string"],
    "techStack": ["string"]
  }
]
```

### `data/projects.json`
```json
[
  {
    "slug": "string",
    "name": "string",
    "thumbnail": "/images/projects/xxx.png",
    "shortDescription": "string",
    "category": "Web Development",
    "techStack": ["string"],
    "liveDemoUrl": "string | null",
    "githubUrl": "string | null",
    "detail": {
      "background": "string",
      "role": "string",
      "mainFeatures": ["string"],
      "techStack": ["string"],
      "challenges": "string",
      "solution": "string",
      "screenshots": ["/images/projects/xxx-1.png"]
    }
  }
]
```

---

## 9. Deployment Notes

- **Vercel:** connect repo GitHub → auto-detect Next.js → tidak perlu konfigurasi build tambahan (`next build` default sudah cukup)
- **Netlify:** jika dipilih sebagai alternatif, gunakan plugin `@netlify/plugin-nextjs` agar App Router & image optimization tetap berjalan
- Environment variable belum dibutuhkan untuk MVP (semua data lokal/JSON, tidak ada API key eksternal)
- Setiap update `data/*.json` cukup di-push ke branch utama → auto redeploy