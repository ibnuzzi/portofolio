import type { MaybeRefOrGetter } from 'vue'

interface ScrollSpyOptions {
  /** Jarak (px) dari atas halaman yang dianggap "di hero" */
  topOffset?: number
}

/**
 * Menandai section yang sedang terlihat di viewport.
 * Dipakai untuk menandai link navigasi yang aktif.
 *
 * Header ada di layout dan tidak pernah di-unmount saat pindah halaman,
 * jadi section dicari ulang setiap halaman selesai dimuat.
 */
export function useScrollSpy(
  ids: MaybeRefOrGetter<string[]>,
  options: ScrollSpyOptions = {},
) {
  const { topOffset = 120 } = options
  const activeId = ref('')

  let observer: IntersectionObserver | null = null
  let handleScroll: (() => void) | null = null

  function teardown() {
    observer?.disconnect()
    observer = null
    if (handleScroll) {
      window.removeEventListener('scroll', handleScroll)
      handleScroll = null
    }
  }

  function setup() {
    teardown()

    const sections = toValue(ids)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) {
      activeId.value = ''
      return
    }

    const updateFromScroll = () => {
      if (window.scrollY < topOffset) {
        activeId.value = sections[0]?.id ?? ''
      }
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

          if (visible[0]) {
            activeId.value = visible[0].target.id
          }
        },
        {
          // area aktif: bagian tengah viewport
          rootMargin: '-45% 0px -50% 0px',
          threshold: [0, 0.25, 0.5, 1],
        },
      )

      sections.forEach((section) => observer?.observe(section))
    }

    handleScroll = updateFromScroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    updateFromScroll()
  }

  // Dengan transisi `out-in`, DOM halaman baru baru ada setelah transisi selesai.
  const nuxtApp = useNuxtApp()
  const stopPageHook = nuxtApp.hook('page:finish', setup)
  const stopTransitionHook = nuxtApp.hook('page:transition:finish', setup)

  onMounted(setup)

  onBeforeUnmount(() => {
    stopPageHook()
    stopTransitionHook()
    teardown()
  })

  return { activeId }
}
