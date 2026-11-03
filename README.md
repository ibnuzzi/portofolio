# Portofolio — Muhammad Ibnu Zauzi

Website portofolio pribadi: one-page (hero, about, projects, experience, contact) plus halaman detail proyek. Dibangun dengan **Nuxt 4**, **Vue 3 (Composition API + TypeScript)**, dan **Tailwind CSS**.

Konsep desainnya **"dokumen yang hidup"**: bahasa visual CV (IBM Plex, hairline, label kolom kiri, section bernomor 01–04) ditambah coretan **pensil merah editor** sebagai ciri khas, jadi website dan CV terasa satu identitas.

## Stack

| Kebutuhan | Paket |
| --- | --- |
| Framework | Nuxt 4 (`nuxt@^4.6`, `vue-router@^5`) |
| Styling | Tailwind CSS (`@nuxtjs/tailwindcss`) |
| Dark/light mode | `@nuxtjs/color-mode` v4 (default **gelap**) |
| Ikon | `@nuxt/icon` v2 + `@iconify-json/lucide`, `@iconify-json/simple-icons` |
| Optimasi gambar | `@nuxt/image` v2 |
| Font | IBM Plex Serif + IBM Plex Sans + IBM Plex Mono (`@fontsource*`, self-hosted, subset latin) |
| Animasi | CSS + canvas 2D + directive `v-anim` / `v-draw`, tanpa library animasi |

## Menjalankan secara lokal

```bash
# 1. Install dependensi (Node.js ^22.22.3, ^24.15.0, atau >=26)
npm install

# 2. Jalankan dev server
npm run dev
# buka http://localhost:3000

# 3. Build produksi
npm run build
npm run preview
```

Perintah lain:

```bash
npm run generate   # prerender statis (GitHub Pages / Netlify)
npm run typecheck  # cek tipe TypeScript
npm run dev:clean  # hapus cache .nuxt lalu jalankan dev
```

> Hentikan dev server sebelum `npm install` yang mengganti versi paket, lalu jalankan ulang.
> Dev server yang masih berjalan akan memakai berkas lama dan membalas error 500.

## Struktur folder

```text
portofolio/
├─ app/                          # kode situs (default Nuxt 4)
│  ├─ assets/css/main.css        # entry Tailwind + design token, komponen, animasi
│  ├─ components/
│  │  ├─ AppHeader.vue           # header + nav + scroll spy + menu mobile
│  │  ├─ AppFooter.vue           # footer + nama raksasa + jam lokal
│  │  ├─ AppLogo.vue
│  │  ├─ HeroGrid.vue            # canvas grid gambar teknik yang mengikuti kursor
│  │  ├─ RoundStamp.vue          # stempel bundar yang berputar mengikuti gulir
│  │  ├─ PencilStroke.vue        # coretan pensil merah (underline / circle)
│  │  ├─ StackMarquee.vue        # pita stack, kecepatannya mengikuti gulir
│  │  ├─ ScrubText.vue           # paragraf yang menyala kata demi kata
│  │  ├─ ProjectLedger.vue       # daftar proyek + sampul mengambang
│  │  ├─ ProjectCard.vue         # satu baris daftar proyek
│  │  ├─ SheetRuler.vue          # penggaris navigasi di tepi kiri (layar ≥1400px)
│  │  ├─ ScrollProgress.vue      # garis kemajuan gulir (layar <1400px)
│  │  ├─ LocalClock.vue          # jam Malang (WIB)
│  │  ├─ ThemeToggle.vue         # tombol mode gelap/terang
│  │  ├─ SocialLinks.vue         # tautan ikon (GitHub, LinkedIn, Instagram, Email, CV)
│  │  ├─ SectionShell.vue        # kerangka section: hairline + label kolom kiri
│  │  ├─ SectionHeading.vue      # judul section (serif, bagian miring + coretan)
│  │  ├─ ProfileImage.vue        # foto + fallback monogram
│  │  ├─ SkillBadge.vue
│  │  ├─ TimelineCard.vue
│  │  ├─ CopyEmailButton.vue
│  │  └─ ContactForm.vue
│  ├─ composables/
│  │  ├─ useScrollSpy.ts         # section aktif untuk navigasi
│  │  └─ useScrollFrame.ts       # callback per frame saat gulir/resize
│  ├─ data/                      # SEMUA konten ada di sini
│  │  ├─ site.ts                 # profil, sosial, navigasi, CV, domain
│  │  ├─ skills.ts               # skill + level + kelompok
│  │  ├─ projects.ts             # daftar proyek
│  │  └─ experiences.ts          # pengalaman / pendidikan / penghargaan
│  ├─ layouts/default.vue
│  ├─ pages/
│  │  ├─ index.vue               # one-page
│  │  └─ projects/[slug].vue     # detail proyek
│  ├─ plugins/anim.ts            # directive v-anim dan v-draw
│  ├─ app.vue                    # NuxtRouteAnnouncer + layout
│  ├─ error.vue                  # halaman 404 / error
│  └─ router.options.ts          # smooth scroll + offset hash
├─ public/
│  ├─ images/profile.png         # GANTI dengan foto Anda
│  ├─ images/projects/*.jpg      # GANTI dengan screenshot proyek
│  ├─ images/og-default.jpg      # gambar Open Graph
│  ├─ cv-muhammad-ibnu-zauzi.pdf # hasil build dari folder cv/
│  ├─ favicon.svg
│  └─ apple-touch-icon.png
├─ cv/                           # sumber CV (HTML + CSS + font) → PDF
│  ├─ cv.html                    # isi & tata letak CV (A4, 1 halaman)
│  ├─ fonts.css + fonts/*.woff2
│  ├─ build.ps1                  # render ke PDF + salin ke public/
│  └─ CV_Muhammad_Ibnu_Zauzi.pdf
├─ nuxt.config.ts
└─ tailwind.config.ts
```

## Status pengerjaan

- [x] **Tahap 1** — setup, layout, tema gelap/terang, smooth scroll
- [x] **Tahap 2** — Hero + About (bio, pendidikan, skill per kategori, bahasa)
- [x] **Tahap 3** — Projects (filter kategori) + halaman detail `/projects/[slug]`
- [x] **Tahap 4** — Timeline pengalaman (tab), Contact (form + copy email + sosial), SEO/OG, favicon, halaman 404
- [x] **Redesign** — identitas menyatu dengan CV: IBM Plex (serif/sans/mono), hairline, label kolom kiri, section bernomor
- [x] **CV** — CV satu halaman (A4, IBM Plex Serif) di `cv/cv.html`, di-build ke `public/cv-muhammad-ibnu-zauzi.pdf`
- [x] **Nuxt 4** — upgrade framework dan modul, kode dipindah ke `app/`
- [x] **Dokumen yang hidup** — pensil merah, grid interaktif, buku besar proyek, penggaris navigasi
- [ ] **Tahap 5** — konfigurasi deploy (Vercel / Netlify / GitHub Pages) + panduan kustomisasi

## Yang wajib diganti sebelum deploy

1. `app/data/site.ts`
   - `siteUrl` → isi domain produksi, supaya gambar Open Graph jadi URL absolut
   - `email`, `socials`, dan `location` sudah diisi; ubah bila perlu
2. `public/images/profile.png` → foto Anda (±900×1200 px). Saat ini berisi plat
   monogram MZ yang memang didesain, jadi situs tetap rapi walau foto belum ada.
3. `public/images/projects/*.jpg` → screenshot proyek asli (1200×750 px).
   Saat ini berisi sampul generatif yang motifnya diturunkan dari isi proyek.
4. `cv/cv.html` → sunting isi CV, lalu jalankan `powershell -File cv/build.ps1`
   (menghasilkan `cv/CV_Muhammad_Ibnu_Zauzi.pdf` dan menyalinnya ke `public/`)
5. `app/data/projects.ts` → lengkapi `links.repo` / `links.demo` yang masih kosong
6. `app/data/experiences.ts` → perbarui riwayat bila ada yang baru

## Kustomisasi cepat

| Ingin mengubah | File | Bagian |
| --- | --- | --- |
| Warna aksen & pensil | `app/assets/css/main.css` | `--hue` (`14` = merah, `220` = biru, `150` = hijau), `--pencil` |
| Teks & bio | `app/data/site.ts` | `site.*` |
| Skill | `app/data/skills.ts` | `skills[]` (`group`: `bahasa` / `framework` / `database` / `tools` / `kuliah`, `level`) |
| Proyek | `app/data/projects.ts` | `projects[]` |
| Pengalaman | `app/data/experiences.ts` | `timeline[]` (`track`) |
| Font | `nuxt.config.ts` + `tailwind.config.ts` | `css[]`, `fontFamily` (`display` = serif, `sans`, `mono`) |
| CV (PDF) | `cv/cv.html` → `cv/build.ps1` | isi teks, margin `@page`, ukuran font `body` |
| Endpoint form kontak | `app/data/site.ts` | `contactEndpoint` (kosong = fallback `mailto:`) |
| Teks stempel | `app/components/RoundStamp.vue` | isi `textPath` |
| Kekuatan lengkung grid hero | `app/components/HeroGrid.vue` | `STRENGTH` |
| Coretan pada judul | `SectionHeading` | prop `pencil` (`underline` / `circle`) |
| Kecepatan/animasi | `app/assets/css/main.css` + `app/plugins/anim.ts` | `.hero-*`, `.anim-pending`, `.pencil`, `v-anim="<delay ms>"`, `v-draw="<delay ms>"` |

Semua efek gerak mematuhi `prefers-reduced-motion`, dan seluruh konten tetap terbaca tanpa JavaScript.
