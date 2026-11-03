import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    const prefersReducedMotion = import.meta.client
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

    if (to.hash) {
      return {
        el: to.hash,
        // Samakan dengan `scroll-padding-top` di assets/css/main.css
        top: 100,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      }
    }

    return { top: 0, behavior: 'auto' }
  },
}
