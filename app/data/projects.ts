/**
 * Daftar proyek.
 * Tambah proyek baru = tambah satu objek di array `projects`.
 * `slug` dipakai untuk halaman detail /projects/[slug].
 */

export type ProjectCategory = 'Web' | 'Machine Learning' | 'Algoritma' | 'Data'

export interface ProjectLink {
  demo?: string
  repo?: string
}

/** Tangkapan layar tambahan yang ditampilkan sebagai galeri di halaman detail. */
export interface ProjectShot {
  /** Path gambar, mis. '/images/projects/kelas-industri/dashboard-admin.jpg' */
  src: string
  /** Keterangan gambar, dipakai sebagai alt dan caption */
  caption: string
  /**
   * Ukuran asli gambar (piksel). Dipakai agar bingkai galeri mengikuti rasio
   * gambar sehingga tangkapan layar tidak terpotong. Bila kosong, dianggap 16:10.
   */
  width?: number
  height?: number
}

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  year: string
  /** Ringkasan singkat untuk kartu */
  summary: string
  /** Paragraf penjelasan untuk halaman detail */
  description: string[]
  tech: string[]
  highlights: string[]
  cover: string
  coverAlt: string
  links: ProjectLink
  /** Tangkapan layar tambahan; opsional. */
  gallery?: ProjectShot[]
}

export const projects: Project[] = [
  {
    slug: 'magangmatch',
    title: 'MagangMatch',
    category: 'Web',
    year: '2025',
    summary:
      'Sistem informasi magang terpadu Jurusan Teknologi Informasi: pengajuan magang, verifikasi mitra, logbook, penilaian, dan surat magang.',
    description: [
      'MagangMatch (SiMagang JTI) adalah sistem informasi magang untuk Jurusan Teknologi Informasi Polinema. Mahasiswa mengajukan permohonan magang secara online, admin memverifikasi pendaftaran dan data mitra industri, lalu proses magang dipantau sampai penilaian akhir.',
      'Saya membangun backend Laravel dan panel admin berbasis Filament: pengelolaan lowongan dan mitra, approval pendaftaran, logbook mahasiswa dengan persetujuan pembimbing lewat tautan token, penilaian berbasis aspek dan parameter, serta unduh surat magang dalam format PDF.',
    ],
    tech: ['Laravel', 'Filament', 'MySQL', 'Tailwind CSS'],
    highlights: [
      'Alur lengkap: pengajuan magang, verifikasi, pelaksanaan, hingga penilaian.',
      'Logbook mahasiswa disetujui pembimbing lewat tautan token tanpa perlu login.',
      'Surat magang dan rekap logbook bisa diunduh sebagai PDF.',
    ],
    cover: '/images/projects/magangmatch.jpg',
    coverAlt: 'Tangkapan layar beranda MagangMatch',
    links: { repo: 'https://github.com/ibnuzzi/PBL_Magang' },
  },
  {
    slug: 'lab-ncs',
    title: 'Lab NCS',
    category: 'Web',
    year: '2025',
    summary:
      'Portal informasi Laboratorium Network & Cyber Security: profil, layanan, galeri kegiatan, dan arsip, dengan panel admin untuk mengelola kontennya.',
    description: [
      'Website profil Laboratorium Network & Cyber Security Jurusan Teknologi Informasi. Halaman publiknya memuat profil dan struktur organisasi lab, daftar layanan, galeri kegiatan, serta arsip.',
      'Saya membangun halaman publik, skema basis data untuk konten, dan panel admin dengan login agar pengurus lab bisa menambah galeri, memperbarui layanan, mengelola data pengurus, dan menyunting profil tanpa menyentuh kode.',
    ],
    tech: ['PHP', 'MySQL', 'Tailwind CSS'],
    highlights: [
      'Panel admin dengan login untuk mengelola galeri, layanan, dan pengurus.',
      'Konten halaman publik tersimpan di basis data, bukan hardcode.',
      'Struktur halaman: profil, layanan, galeri, dan arsip.',
    ],
    cover: '/images/projects/lab-ncs.jpg',
    coverAlt: 'Sampul proyek website Laboratorium Network & Cyber Security',
    links: { repo: 'https://github.com/ibnuzzi/PBL_LAB_NCS_TI-2A' },
    gallery: [
      {
        src: '/images/projects/lab-ncs/landing-page.png',
        caption: 'Beranda — Pusat Riset Keamanan Jaringan & Siber',
        width: 1398,
        height: 705,
      },
      {
        src: '/images/projects/lab-ncs/layanan-page.png',
        caption: 'Layanan — fasilitas dan sarana prasarana laboratorium',
        width: 1331,
        height: 585,
      },
      {
        src: '/images/projects/lab-ncs/profile-page.png',
        caption: 'Profil — informasi kepala laboratorium',
        width: 1323,
        height: 715,
      },
    ],
  },
  {
    slug: 'spk-laptop',
    title: 'SPK Pemilihan Laptop',
    category: 'Data',
    year: '2026',
    summary:
      'Sistem pendukung keputusan pemilihan laptop memakai pembobotan Entropy dan metode WISP, dengan perhitungan ditampilkan langkah demi langkah.',
    description: [
      'Proyek mata kuliah Sistem Pendukung Keputusan: memilih laptop terbaik dari lima alternatif berdasarkan kriteria harga, RAM, penyimpanan, berat, dan kecepatan prosesor. Tiap kriteria ditandai sebagai benefit atau cost.',
      'Bobot kriteria tidak diisi manual, melainkan dihitung dengan metode Entropy dari sebaran nilai pada matriks keputusan. Bobot itu lalu dipakai metode WISP (Weighted Sum Product) untuk menghasilkan peringkat akhir. Saya membangun antarmuka bertahap dengan Vue 3: input kriteria, input alternatif, input matriks keputusan, lalu halaman hasil yang menampilkan normalisasi, utility measures, dan peringkat.',
    ],
    tech: ['Vue 3', 'Vite', 'JavaScript', 'Entropy', 'WISP'],
    highlights: [
      'Bobot kriteria dihitung otomatis dengan metode Entropy, bukan input manual.',
      'Perhitungan WISP ditampilkan bertahap: normalisasi, utility measures, peringkat.',
      'Alur input berstep: kriteria, alternatif, matriks keputusan, lalu hasil.',
    ],
    cover: '/images/projects/spk-laptop.jpg',
    coverAlt: 'Sampul proyek sistem pendukung keputusan pemilihan laptop',
    links: { repo: 'https://github.com/ibnuzzi/SPK_Kelompok8' },
    gallery: [
      {
        src: '/images/projects/spk-laptop/landing-page.png',
        caption: 'Beranda — pengenalan metode Entropy dan WISP',
        width: 1917,
        height: 925,
      },
      {
        src: '/images/projects/spk-laptop/input-page.png',
        caption: 'Input data — kriteria, alternatif, dan matriks keputusan',
        width: 1917,
        height: 921,
      },
      {
        src: '/images/projects/spk-laptop/analisis-page.png',
        caption: 'Hasil analisis — normalisasi dan perhitungan bertahap',
        width: 1916,
        height: 918,
      },
    ],
  },
  {
    slug: 'kelas-industri',
    title: 'Kelas Industri',
    category: 'Web',
    year: '2023',
    summary:
      'Platform manajemen program kelas industri: data sekolah, mentor, siswa, materi, tugas, ujian, dan presensi dalam satu sistem.',
    description: [
      'Kelas Industri adalah aplikasi manajemen program kelas industri yang menghubungkan sekolah, mentor, dan siswa. Sistem mengelola data sekolah dan generasi angkatan, pembagian kelas, materi dan submateri, tugas beserta pengumpulan, ujian, presensi, serta jurnal mengajar mentor.',
      'Saya terlibat sebagai web developer saat magang di PT Hummatech Indonesia. Pekerjaan saya mencakup pembuatan modul CRUD dengan Laravel, penyesuaian skema basis data lewat migrasi, ekspor data ke Excel dan PDF, serta penerapan hak akses per peran memakai spatie/laravel-permission.',
    ],
    tech: ['Laravel', 'MySQL', 'Blade', 'Bootstrap', 'spatie/laravel-permission'],
    highlights: [
      'Modul per peran: admin, mentor, guru sekolah, dan siswa.',
      'Ekspor rekap data ke Excel (Maatwebsite) dan PDF (DomPDF).',
      'Manajemen materi, tugas, ujian, dan presensi dalam satu alur.',
    ],
    cover: '/images/projects/kelas-industri.jpg',
    coverAlt: 'Sampul proyek Kelas Industri',
    links: {},
    gallery: [
      {
        src: '/images/projects/kelas-industri/dashboard-admin.jpg',
        caption: 'Dashboard admin — sekolah, materi, mentor, siswa, dan keuangan',
        width: 1280,
        height: 800,
      },
      {
        src: '/images/projects/kelas-industri/dashboard-mentor.jpg',
        caption: 'Dashboard mentor — kelas, absensi, jurnal mengajar, dan peringkat',
        width: 1280,
        height: 800,
      },
      {
        src: '/images/projects/kelas-industri/dashboard-siswa.jpg',
        caption: 'Dashboard siswa — tugas, tantangan, event, dan pembayaran',
        width: 1280,
        height: 800,
      },
    ],
  },
  {
    slug: 'mischool',
    title: 'Mischool',
    category: 'Web',
    year: '2024',
    summary:
      'Platform manajemen sekolah multi-tenant: absensi, jurnal mengajar, pelanggaran, dan buku tamu, dipakai beberapa sekolah lewat subdomain masing-masing.',
    description: [
      'Mischool adalah platform manajemen akademik dan operasional sekolah yang dipakai beberapa sekolah sekaligus, masing-masing dengan subdomain sendiri. Fiturnya meliputi absensi siswa dan guru, jurnal mengajar, jurnal staf, pelanggaran dan perbaikan, tanggapan siswa, ujian, hingga buku tamu.',
      'Saya mengerjakan bagian backend Laravel: modul absensi dan detail kehadiran, jurnal guru dan staf, pelanggaran siswa, buku tamu, serta penyesuaian data master sekolah. Sistem juga memakai notifikasi Firebase Cloud Messaging dan ekspor laporan ke Excel dan PDF.',
    ],
    tech: ['Laravel', 'MySQL', 'Blade', 'Firebase FCM', 'Maatwebsite Excel'],
    highlights: [
      'Multi-tenant: satu basis kode melayani banyak sekolah lewat subdomain.',
      'Absensi berbasis kartu dengan rekap harian dan per jam pelajaran.',
      'Notifikasi push ke aplikasi siswa/guru lewat Firebase FCM.',
    ],
    cover: '/images/projects/mischool.jpg',
    coverAlt: 'Tangkapan layar beranda Mischool',
    links: { demo: 'https://mischool.id' },
  },
  {
    slug: 'sipjaki',
    title: 'SIPJAKI',
    category: 'Web',
    year: '2025',
    summary:
      'Sistem Informasi Pembina Jasa Konstruksi Kabupaten Pasuruan: manajemen paket pekerjaan, pelaksana, konsultan, dan monitoring progres.',
    description: [
      'SIPJAKI (Sistem Informasi Pembina Jasa Konstruksi) adalah sistem informasi yang dikelola bersama oleh pembina jasa konstruksi nasional, provinsi, dan kabupaten/kota. Portal ini dipakai Dinas Sumber Daya Air, Bina Marga dan Bina Konstruksi Kabupaten Pasuruan untuk meningkatkan kemudahan akses informasi usaha jasa konstruksi, transparansi, serta memperkuat jaringan bisnis pelaku usaha dalam rantai pasok konstruksi.',
      'Saya ikut mengerjakan sisi web-nya: halaman publik (profil dinas, layanan, informasi, ruas jalan, peraturan, data jasa konstruksi, dan pelatihan) serta modul manajemen paket pekerjaan untuk mengelola paket, pelaksana, konsultan, dan memantau progres pekerjaan secara real-time.',
    ],
    tech: ['Laravel', 'MySQL', 'Tailwind CSS', 'Blade'],
    highlights: [
      'Manajemen paket pekerjaan: ruang lingkup, anggaran, jadwal, dan dokumentasi.',
      'Data pelaksana dan konsultan beserta verifikasi serta penugasan paket.',
      'Monitoring progres paket, milestone, dan laporan kemajuan secara real-time.',
      'Pelaporan & dokumentasi: unggah foto, dokumen, dan hasil inspeksi untuk audit.',
    ],
    cover: '/images/projects/sipjaki.jpg',
    coverAlt: 'Sampul proyek SIPJAKI, sistem informasi pembina jasa konstruksi',
    links: { demo: 'https://sipjaki.pasuruankab.com/' },
    gallery: [
      {
        src: '/images/projects/sipjaki/landing-page.png',
        caption: 'Beranda — sistem informasi pembina jasa konstruksi',
        width: 1896,
        height: 922,
      },
      {
        src: '/images/projects/sipjaki/articles-page.png',
        caption: 'Informasi — artikel dan berita seputar jasa konstruksi',
        width: 1891,
        height: 928,
      },
      {
        src: '/images/projects/sipjaki/organization-structure-page.png',
        caption: 'Profil — struktur organisasi dinas',
        width: 1897,
        height: 922,
      },
      {
        src: '/images/projects/sipjaki/login-page.png',
        caption: 'Halaman masuk untuk pengguna terdaftar',
        width: 1917,
        height: 927,
      },
    ],
  },
  {
    slug: 'tracer-study',
    title: 'Tracer Study SKADA',
    category: 'Web',
    year: '2024',
    summary:
      'Studi pelacakan jejak lulusan dan alumni SMK Negeri 2 Penajam Paser Utara: kuesioner alumni, profil lulusan, galeri, berita, dan lowongan kerja.',
    description: [
      'Tracer Study SKADA adalah studi pelacakan jejak lulusan/alumni di SMK Negeri 2 Penajam Paser Utara (SMKN 2 PPU). Website ini dipakai sekolah untuk menjangkau alumni, mengumpulkan umpan balik, dan memetakan sebaran lulusan setelah mereka menyelesaikan pendidikan.',
      'Saya ikut mengerjakan sisi web-nya saat masih di PT Hummatech Indonesia: halaman publik (beranda, profil, galeri, berita, lowongan kerja, dan daftar perusahaan mitra) serta alur login/register alumni untuk mengisi survei dan memperbarui data diri. Repositori proyek ini sudah bersifat privat di perusahaan, jadi yang bisa saya tampilkan hanya tautan situsnya.',
    ],
    tech: ['Laravel', 'MySQL', 'Bootstrap', 'Blade'],
    highlights: [
      'Survei dan umpan balik alumni sebagai bahan pengembangan kualitas pendidikan.',
      'Profil lulusan: sebaran kerja, keselarasan kurikulum, dan adaptasi di dunia kerja.',
      'Alur login/register alumni untuk mengisi dan memperbarui data tracer study.',
      'Galeri kegiatan, berita, dan daftar lowongan dari perusahaan mitra sekolah.',
    ],
    cover: '/images/projects/tracer-study.jpg',
    coverAlt: 'Sampul proyek Tracer Study SMKN 2 Penajam Paser Utara',
    links: { demo: 'https://tracerstudyskada.com/' },
    gallery: [
      {
        src: '/images/projects/tracer-study/landing-page.png',
        caption: 'Beranda — sambutan dan navigasi situs tracer study',
        width: 847,
        height: 392,
      },
      {
        src: '/images/projects/tracer-study/landing-page2.png',
        caption: 'Beranda — rekap alumni dan profil sekolah',
        width: 847,
        height: 500,
      },
    ],
  },
]

export const projectCategories: Array<ProjectCategory | 'Semua'> = [
  'Semua',
  ...(['Web', 'Machine Learning', 'Algoritma', 'Data'] as ProjectCategory[]).filter(
    (category) => projects.some((project) => project.category === category),
  ),
]

/** Ambil satu proyek berdasarkan slug */
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** Proyek sebelum/sesudah untuk navigasi di halaman detail */
export function getProjectNeighbours(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return { previous: undefined, next: undefined }

  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  }
}
