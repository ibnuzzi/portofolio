/**
 * Profil, tautan, dan navigasi.
 */

export type SocialKind = 'external' | 'email' | 'download'

export interface SocialLink {
  id: 'github' | 'linkedin' | 'instagram' | 'email' | 'cv'
  label: string
  href: string
  icon: string
  kind: SocialKind
  /** aria-label agar tautan ikon tetap jelas untuk screen reader */
  description: string
}

export interface NavItem {
  id: string
  label: string
}

export const site = {
  name: 'Muhammad Ibnu Zauzi',
  shortName: 'Ibnu Zauzi',
  initials: 'MZ',
  role: 'Web Developer',
  institution: 'Politeknik Negeri Malang',
  location: 'Malang, Jawa Timur',

  // Bagian hero
  tagline:
    'Membangun aplikasi web Laravel yang rapi, terstruktur, dan dipakai orang banyak.',

  // Bio (About)
  description:
    'Saya web developer dengan pengalaman magang satu tahun dan kontrak enam bulan di PT Hummatech Indonesia, sekarang menempuh D-IV Teknik Informatika di Politeknik Negeri Malang. Saya membangun sistem Laravel dari ujung ke ujung: skema basis data, modul backend, hak akses, dan pelaporan.',

  // Bahasa (sama seperti di CV)
  languages: [
    { name: 'Indonesia', level: 'Native' },
    { name: 'Inggris', level: 'Dasar, sedang belajar' },
  ],

  // Foto profil (transparan, rasio ±3:4). Ganti file di public/images/.
  photo: '/images/profile.png',
  photoAlt: 'Foto Muhammad Ibnu Zauzi',

  // Kontak (dipakai juga di form kontak & tombol copy email)
  email: 'muhammadibnzzi@gmail.com',

  cv: {
    label: 'Unduh CV',
    href: '/cv-muhammad-ibnu-zauzi.pdf',
    filename: 'CV_Muhammad_Ibnu_Zauzi.pdf',
  },

  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/ibnuzzi',
      icon: 'simple-icons:github',
      kind: 'external',
      description: 'Buka profil GitHub Muhammad Ibnu Zauzi (tab baru)',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/muhammad-ibnu-zauzi-a092aa319/',
      icon: 'simple-icons:linkedin',
      kind: 'external',
      description: 'Buka profil LinkedIn Muhammad Ibnu Zauzi (tab baru)',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/ibnzzi',
      icon: 'simple-icons:instagram',
      kind: 'external',
      description: 'Buka profil Instagram Muhammad Ibnu Zauzi (tab baru)',
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:muhammadibnzzi@gmail.com',
      icon: 'lucide:mail',
      kind: 'email',
      description: 'Kirim email ke Muhammad Ibnu Zauzi',
    },
    {
      id: 'cv',
      label: 'CV',
      href: '/cv-muhammad-ibnu-zauzi.pdf',
      icon: 'lucide:file-text',
      kind: 'download',
      description: 'Unduh CV Muhammad Ibnu Zauzi dalam format PDF',
    },
  ] satisfies SocialLink[],
} as const

/**
 * Endpoint form kontak (opsional).
 * Kosongkan untuk memakai fallback `mailto:`.
 * Contoh: 'https://formspree.io/f/xxxxxxx'
 */
export const contactEndpoint: string = ''

/**
 * Domain produksi tanpa garis miring di akhir, mis. 'https://ibnuzauzi.dev'.
 * Dipakai untuk gambar Open Graph, yang wajib berupa URL absolut.
 */
export const siteUrl: string = ''

/** Ubah path publik menjadi URL absolut (tetap relatif selama `siteUrl` kosong) */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`
}

export const navigation: NavItem[] = [
  { id: 'hero', label: 'Beranda' },
  { id: 'about', label: 'Tentang' },
  { id: 'projects', label: 'Proyek' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'contact', label: 'Kontak' },
]

export const sectionIds = navigation.map((item) => item.id)
