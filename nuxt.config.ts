export default defineNuxtConfig({
  compatibilityDate: '2026-10-24',
  // DevTools dimatikan: ikon mengambangnya ikut ter-inject di build produksi.
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/image',
  ],

  // Font di-self-host lewat CSS (tidak bergantung Google Fonts).
  // Satu keluarga dengan CV: IBM Plex Serif (judul), IBM Plex Sans (isi),
  // IBM Plex Mono (label, angka, metadata). Hanya subset latin → file kecil.
  css: [
    '@fontsource/ibm-plex-serif/latin-400.css',
    '@fontsource/ibm-plex-serif/latin-400-italic.css',
    '@fontsource/ibm-plex-serif/latin-600.css',
    '@fontsource-variable/ibm-plex-sans/wght.css',
    '@fontsource/ibm-plex-mono/latin-400.css',
    '@fontsource/ibm-plex-mono/latin-500.css',
    '~/assets/css/main.css',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config',
    viewer: false,
  },

  colorMode: {
    classSuffix: '',
    // Portofolio ini dark-first, tapi pengunjung bisa pindah ke mode terang.
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'ibnu-portfolio-theme',
    dataValue: 'theme',
  },

  icon: {
    mode: 'svg',
    size: '1.25em',
    class: 'inline-block shrink-0',
    aliases: {
      github: 'simple-icons:github',
      linkedin: 'simple-icons:linkedin',
    },
  },

  image: {
    quality: 82,
    format: ['webp'],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280 },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      titleTemplate: '%s · Muhammad Ibnu Zauzi',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#100f0e' },
        { name: 'author', content: 'Muhammad Ibnu Zauzi' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  typescript: { strict: true, typeCheck: false },

  // Manifest rute tidak dipakai (situs statis, tanpa route rules),
  // dan mematikan ini menghindari error `#app-manifest` saat dev di Windows.
  experimental: {
    appManifest: false,
  },

  nitro: { compressPublicAssets: true },
})
