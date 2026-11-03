/**
 * Pengalaman kerja, pendidikan, dan penghargaan.
 * Semua data ini tampil di section #experience sebagai timeline bertab.
 */

export type Track = 'pengalaman' | 'pendidikan' | 'penghargaan'

export interface TimelineEntry {
  id: string
  track: Track
  title: string
  organization: string
  period: string
  description: string
  tags?: string[]
}

export interface TrackMeta {
  id: Track
  label: string
  icon: string
}

export const tracks: TrackMeta[] = [
  { id: 'pengalaman', label: 'Pengalaman', icon: 'lucide:briefcase' },
  { id: 'pendidikan', label: 'Pendidikan', icon: 'lucide:graduation-cap' },
  { id: 'penghargaan', label: 'Penghargaan', icon: 'lucide:trophy' },
]

export const timeline: TimelineEntry[] = [
  // ── Pengalaman ──────────────────────────────────────────────────────────
  {
    id: 'hummatech-kontrak',
    track: 'pengalaman',
    title: 'Web Developer (Kontrak)',
    organization: 'PT Hummatech Indonesia',
    period: 'Jul 2024 — Des 2024',
    description:
      'Diperpanjang menjadi kontrak enam bulan setelah magang selesai. Melanjutkan pengembangan platform Mischool: modul absensi, jurnal guru dan staf, pelanggaran siswa, serta notifikasi Firebase Cloud Messaging. Setelah kontrak selesai, saya fokus penuh ke kuliah.',
    tags: ['Laravel', 'MySQL', 'Firebase FCM'],
  },
  {
    id: 'hummatech-magang',
    track: 'pengalaman',
    title: 'Web Developer Intern (PKL)',
    organization: 'PT Hummatech Indonesia',
    period: 'Jul 2023 — Jun 2024',
    description:
      'Magang satu tahun saat SMK. Mengerjakan aplikasi Kelas Industri dan Mischool memakai Laravel: modul CRUD, migrasi basis data, hak akses per peran, serta ekspor laporan ke Excel dan PDF.',
    tags: ['Laravel', 'Blade', 'Excel Export'],
  },

  // ── Pendidikan ──────────────────────────────────────────────────────────
  {
    id: 'polinema',
    track: 'pendidikan',
    title: 'D-IV Teknik Informatika',
    organization: 'Politeknik Negeri Malang',
    period: '2024 — Sekarang',
    description:
      'Menempuh D-IV Teknik Informatika. Mata kuliah yang relevan: basis data, rekayasa perangkat lunak, serta pemrograman web dan mobile — termasuk Flutter dan PostgreSQL.',
    tags: ['D-IV Informatika'],
  },
  {
    id: 'sekolah',
    track: 'pendidikan',
    title: 'SMK Negeri 2 Trenggalek',
    organization: 'Trenggalek, Jawa Timur',
    period: '2021 — 2024',
    description:
      'Menempuh pendidikan menengah kejuruan, lalu menjalani PKL satu tahun di PT Hummatech Indonesia yang berlanjut menjadi kontrak kerja.',
    tags: ['SMK', 'Trenggalek'],
  },

  // ── Penghargaan ─────────────────────────────────────────────────────────
  {
    id: 'pkm-k-playtester',
    track: 'penghargaan',
    title: 'PKM-K — Lolos Seleksi Internal',
    organization: 'Politeknik Negeri Malang',
    period: '2026',
    description:
      'Tim lolos seleksi internal PKM (Program Kreativitas Mahasiswa) kategori Kewirausahaan di Politeknik Negeri Malang dengan produk Playtester, lalu diajukan ke seleksi nasional.',
    tags: ['PKM-K', 'Playtester', 'Tim'],
  },
]

export function timelineByTrack(track: Track): TimelineEntry[] {
  return timeline.filter((entry) => entry.track === track)
}
