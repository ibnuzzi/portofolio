/**
 * Menjalankan `callback` maksimal sekali per frame saat halaman digulir
 * atau diubah ukurannya. Dipakai semua efek yang mengikuti posisi gulir.
 */
export function useScrollFrame(callback: () => void) {
  let frame = 0

  function schedule() {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      callback()
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    callback()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    if (frame) cancelAnimationFrame(frame)
  })
}
