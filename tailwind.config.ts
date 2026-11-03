import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Aksen merah pensil. Ubah --hue di app/assets/css/main.css untuk mengganti warna.
        brand: {
          50: 'hsl(var(--hue) 90% 96% / <alpha-value>)',
          100: 'hsl(var(--hue) 90% 91% / <alpha-value>)',
          200: 'hsl(var(--hue) 90% 84% / <alpha-value>)',
          300: 'hsl(var(--hue) 92% 74% / <alpha-value>)',
          400: 'hsl(var(--hue) 92% 64% / <alpha-value>)',
          500: 'hsl(var(--hue) 88% 56% / <alpha-value>)',
          600: 'hsl(var(--hue) 82% 48% / <alpha-value>)',
          700: 'hsl(var(--hue) 82% 40% / <alpha-value>)',
          800: 'hsl(var(--hue) 78% 33% / <alpha-value>)',
          900: 'hsl(var(--hue) 72% 26% / <alpha-value>)',
          950: 'hsl(var(--hue) 66% 15% / <alpha-value>)',
        },
        // Token semantik: nilainya berganti otomatis di mode terang/gelap.
        page: 'hsl(var(--body) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        elevated: 'hsl(var(--elevated) / <alpha-value>)',
        line: 'hsl(var(--line) / <alpha-value>)',
        rule: 'hsl(var(--rule) / <alpha-value>)',
        ink: 'hsl(var(--title) / <alpha-value>)',
        body: 'hsl(var(--text) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
      },
      fontFamily: {
        // Satu keluarga dengan CV (IBM Plex), hanya beda peran.
        sans: ['IBM Plex Sans Variable', 'IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['IBM Plex Serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
