/**
 * Directive reveal saat scroll.
 *
 * `v-anim` — elemen muncul halus saat pertama kali masuk viewport.
 * `v-draw` — garis (hairline atau coretan pensil) tergambar saat terlihat.
 *
 * Prinsip aman:
 * - Kalau elemen v-anim sudah terlihat saat mount (mis. di atas lipatan),
 *   tidak diapa-apakan → tidak ada kedipan.
 * - Kelas penyembunyi baru ditambahkan lewat JS, jadi tanpa JS (atau bila
 *   IntersectionObserver tidak ada) konten tetap terbaca.
 * - `prefers-reduced-motion: reduce` → animasi dilewati sepenuhnya.
 */
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  function reduced() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function getObserver() {
    if (observer) return observer

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 },
    )

    return observer
  }

  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('anim', {
    mounted(el, binding) {
      if (typeof IntersectionObserver === 'undefined' || reduced()) return

      // Sudah di layar → biarkan apa adanya.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

      if (binding.value) el.style.setProperty('--anim-delay', `${binding.value}ms`)

      el.classList.add('anim-pending')
      getObserver().observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  })

  nuxtApp.vueApp.directive<HTMLElement | SVGElement, number | undefined>('draw', {
    mounted(el, binding) {
      if (binding.value) el.style.setProperty('--draw-delay', `${binding.value}ms`)

      el.classList.add('draw-pending')

      if (typeof IntersectionObserver === 'undefined' || reduced()) {
        el.classList.add('is-in')
        return
      }

      getObserver().observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  })
})
