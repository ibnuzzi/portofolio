/**
 * Keahlian, dikelompokkan per jenis (sama seperti CV):
 * bahasa pemrograman, framework, basis data, tools, dan mata kuliah.
 *
 * `level` menentukan tampilan badge:
 * - "Mahir"          → badge solid (dipakai sehari-hari di proyek nyata)
 * - "Terbiasa"       → badge outline
 * - "Sedang belajar" → badge garis putus-putus
 *
 * Tidak memakai persentase — hanya nama + level + kelompok.
 */

export type SkillLevel = 'Mahir' | 'Terbiasa' | 'Sedang belajar'
export type SkillGroup = 'bahasa' | 'framework' | 'database' | 'tools' | 'kuliah'

export interface Skill {
  name: string
  level: SkillLevel
  group: SkillGroup
  /** Nama ikon Iconify (opsional) */
  icon?: string
}

export const skills: Skill[] = [
  // Bahasa pemrograman
  { name: 'PHP', level: 'Mahir', group: 'bahasa', icon: 'simple-icons:php' },
  { name: 'SQL', level: 'Mahir', group: 'bahasa', icon: 'lucide:database' },
  { name: 'JavaScript', level: 'Terbiasa', group: 'bahasa', icon: 'simple-icons:javascript' },

  // Framework & library
  { name: 'Laravel', level: 'Mahir', group: 'framework', icon: 'simple-icons:laravel' },
  { name: 'Livewire', level: 'Terbiasa', group: 'framework', icon: 'simple-icons:livewire' },
  { name: 'REST API', level: 'Terbiasa', group: 'framework', icon: 'lucide:plug' },
  {
    name: 'Tailwind CSS',
    level: 'Terbiasa',
    group: 'framework',
    icon: 'simple-icons:tailwindcss',
  },
  { name: 'Vue / Nuxt', level: 'Sedang belajar', group: 'framework', icon: 'simple-icons:nuxt' },

  // Basis data
  { name: 'MySQL', level: 'Mahir', group: 'database', icon: 'simple-icons:mysql' },
  {
    name: 'Schema Design & Migrations',
    level: 'Terbiasa',
    group: 'database',
    icon: 'lucide:table-properties',
  },

  // Tools
  { name: 'Git', level: 'Terbiasa', group: 'tools', icon: 'simple-icons:git' },
  { name: 'GitHub', level: 'Terbiasa', group: 'tools', icon: 'simple-icons:github' },
  { name: 'Composer', level: 'Terbiasa', group: 'tools', icon: 'simple-icons:composer' },
  { name: 'VS Code', level: 'Terbiasa', group: 'tools', icon: 'simple-icons:visualstudiocode' },
  { name: 'Figma', level: 'Terbiasa', group: 'tools', icon: 'simple-icons:figma' },

  // Mata kuliah (bukan pengalaman produksi)
  { name: 'Flutter', level: 'Sedang belajar', group: 'kuliah', icon: 'simple-icons:flutter' },
  {
    name: 'PostgreSQL',
    level: 'Sedang belajar',
    group: 'kuliah',
    icon: 'simple-icons:postgresql',
  },
]

export interface SkillGroupMeta {
  id: SkillGroup
  title: string
  description: string
}

export const skillGroups: SkillGroupMeta[] = [
  {
    id: 'bahasa',
    title: 'Bahasa Pemrograman',
    description: 'Bahasa yang saya pakai untuk membangun aplikasi web.',
  },
  {
    id: 'framework',
    title: 'Framework & Library',
    description: 'Alat utama saya sehari-hari: Laravel dan ekosistemnya.',
  },
  {
    id: 'database',
    title: 'Basis Data',
    description: 'Merancang skema relasional dan mengelola migrasi.',
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Peralatan kerja harian, dari versi kontrol sampai desain.',
  },
  {
    id: 'kuliah',
    title: 'Mata Kuliah',
    description: 'Dipelajari lewat mata kuliah di kampus, belum dipakai di proyek produksi.',
  },
]

/** Ambil skill berdasarkan kelompok, urut sesuai data */
export function skillsByGroup(group: SkillGroup): Skill[] {
  return skills.filter((skill) => skill.group === group)
}
