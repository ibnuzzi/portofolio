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
    coverAlt: 'Sampul proyek MagangMatch',
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
    coverAlt: 'Sampul proyek Mischool',
    links: { demo: 'https://mischool.id' },
  },
  {
    slug: 'path-finder',
    title: 'Path Finder Visualizer',
    category: 'Algoritma',
    year: '2025',
    summary:
      'Visualisasi algoritma pencarian jalur (A*, BFS, DFS) di atas grid, untuk memahami perilaku tiap algoritma.',
    description: [
      'Alat bantu belajar algoritma pencarian: pengguna menggambar dinding di grid, menentukan titik awal dan tujuan, lalu melihat bagaimana A*, BFS, dan DFS mengeksplorasi ruang pencarian langkah demi langkah.',
      'Proyek ini saya buat untuk memperkuat pemahaman struktur data dan heuristik. Visualisasi memperlihatkan urutan node yang dikunjungi serta perbedaan jumlah langkah antar algoritma.',
    ],
    tech: ['Python', 'Streamlit', 'NumPy'],
    highlights: [
      'Tiga algoritma dengan visualisasi urutan eksplorasi node.',
      'Perbandingan jumlah langkah dan waktu antar algoritma.',
      'Grid interaktif: gambar dinding, pindahkan start/goal.',
    ],
    cover: '/images/projects/path-finder.jpg',
    coverAlt: 'Sampul proyek visualisasi algoritma pencarian jalur',
    links: {},
  },
  {
    slug: 'analisis-sentimen',
    title: 'Analisis Sentimen Ulasan',
    category: 'Machine Learning',
    year: '2025',
    summary:
      'Klasifikasi sentimen ulasan produk berbahasa Indonesia dengan TF-IDF dan beberapa model pembanding.',
    description: [
      'Eksperimen analisis sentimen pada ulasan produk berbahasa Indonesia. Teks dibersihkan, dinormalisasi, lalu diekstraksi fiturnya dengan TF-IDF sebelum diklasifikasikan.',
      'Saya membandingkan beberapa model (Naive Bayes, SVM, Logistic Regression) dengan metrik akurasi, precision, recall, dan F1-score, lalu memilih model dengan performa paling seimbang.',
    ],
    tech: ['Python', 'Pandas', 'scikit-learn', 'Sastrawi'],
    highlights: [
      'Praproses teks Indonesia: case folding, slang normalization, stemming.',
      'Perbandingan tiga model dengan cross-validation.',
      'Evaluasi memakai confusion matrix dan classification report.',
    ],
    cover: '/images/projects/analisis-sentimen.jpg',
    coverAlt: 'Sampul proyek analisis sentimen ulasan',
    links: {},
  },
]

export const projectCategories: Array<ProjectCategory | 'Semua'> = [
  'Semua',
  'Web',
  'Machine Learning',
  'Algoritma',
  'Data',
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
