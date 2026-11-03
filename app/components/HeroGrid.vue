<script setup lang="ts">
/**
 * Kertas gambar teknik di belakang hero: grid hairline yang melengkung
 * mengikuti kursor, lengkap dengan garis bidik dan koordinat.
 *
 * Tanpa kursor (sentuh, atau sebelum mouse bergerak) titik lengkungnya
 * berkeliling sendiri. Render berhenti saat hero tidak terlihat, dan
 * `prefers-reduced-motion` hanya menggambar satu frame diam.
 */
const canvas = ref<HTMLCanvasElement | null>(null)
const colorMode = useColorMode()

const STEP = 18
const STRENGTH = 0.42

let draw: (() => void) | null = null
let readColors: (() => void) | null = null
let cleanup: (() => void) | null = null

watch(
  () => colorMode.value,
  async () => {
    await nextTick()
    readColors?.()
    draw?.()
  },
)

onMounted(() => {
  const el = canvas.value
  const ctx = el?.getContext('2d')
  if (!el || !ctx) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let width = 0
  let height = 0
  let spacing = 48
  let radius = 180
  let lineColor = ''
  let pencilColor = ''
  let frame = 0
  let inView = true
  let time = 0

  const point = { x: 0, y: 0, targetX: 0, targetY: 0, tracking: false }

  readColors = () => {
    const style = getComputedStyle(document.documentElement)
    lineColor = `hsl(${style.getPropertyValue('--rule').trim()} / 0.5)`
    pencilColor = `hsl(${style.getPropertyValue('--pencil').trim()})`
  }

  function resize() {
    const rect = el!.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    width = rect.width
    height = rect.height
    el!.width = Math.round(width * dpr)
    el!.height = Math.round(height * dpr)
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

    spacing = width < 640 ? 38 : 48
    radius = Math.max(120, width * 0.17)
  }

  function warp(x: number, y: number) {
    const dx = x - point.x
    const dy = y - point.y
    const force = Math.exp(-(dx * dx + dy * dy) / (2 * radius * radius)) * STRENGTH

    return [
      x + dx * force + Math.sin(y * 0.006 + time) * 2.5,
      y + dy * force + Math.cos(x * 0.006 + time) * 2.5,
    ] as const
  }

  function tracePolyline(fromX: number, fromY: number, toX: number, toY: number) {
    const steps = Math.ceil(Math.hypot(toX - fromX, toY - fromY) / STEP)

    for (let i = 0; i <= steps; i++) {
      const [x, y] = warp(
        fromX + ((toX - fromX) * i) / steps,
        fromY + ((toY - fromY) * i) / steps,
      )
      if (i === 0) ctx!.moveTo(x, y)
      else ctx!.lineTo(x, y)
    }
  }

  function drawCrosshair() {
    const { x, y } = point

    ctx!.strokeStyle = pencilColor
    ctx!.fillStyle = pencilColor
    ctx!.beginPath()
    ctx!.moveTo(x - 14, y)
    ctx!.lineTo(x - 4, y)
    ctx!.moveTo(x + 4, y)
    ctx!.lineTo(x + 14, y)
    ctx!.moveTo(x, y - 14)
    ctx!.lineTo(x, y - 4)
    ctx!.moveTo(x, y + 4)
    ctx!.lineTo(x, y + 14)
    ctx!.stroke()

    ctx!.font = '500 10px "IBM Plex Mono", monospace'
    ctx!.fillText(`x ${Math.round(x)} · y ${Math.round(y)}`, x + 18, y - 10)
  }

  draw = () => {
    ctx!.clearRect(0, 0, width, height)
    ctx!.lineWidth = 1
    ctx!.strokeStyle = lineColor
    ctx!.beginPath()

    for (let x = 0; x <= width + spacing; x += spacing) {
      tracePolyline(x, -spacing, x, height + spacing)
    }
    for (let y = 0; y <= height + spacing; y += spacing) {
      tracePolyline(-spacing, y, width + spacing, y)
    }

    ctx!.stroke()

    if (point.tracking) drawCrosshair()
  }

  function tick() {
    time += 0.006

    if (!point.tracking) {
      point.targetX = width * (0.66 + 0.24 * Math.sin(time * 1.3))
      point.targetY = height * (0.42 + 0.26 * Math.cos(time * 0.9))
    }

    point.x += (point.targetX - point.x) * 0.09
    point.y += (point.targetY - point.y) * 0.09

    draw?.()
    frame = requestAnimationFrame(tick)
  }

  function start() {
    if (!frame && !reduced && inView && !document.hidden) {
      frame = requestAnimationFrame(tick)
    }
  }

  function stop() {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === 'touch') return

    const rect = el!.getBoundingClientRect()
    point.targetX = event.clientX - rect.left
    point.targetY = event.clientY - rect.top
    point.tracking = point.targetY >= 0 && point.targetY <= rect.height
  }

  function onVisibility() {
    if (document.hidden) stop()
    else start()
  }

  const viewObserver = new IntersectionObserver(([entry]) => {
    inView = Boolean(entry?.isIntersecting)
    if (inView) start()
    else stop()
  })

  const sizeObserver = new ResizeObserver(() => {
    resize()
    if (reduced) {
      point.x = width * 0.68
      point.y = height * 0.42
    }
    draw?.()
  })

  readColors()
  resize()
  point.x = point.targetX = width * 0.66
  point.y = point.targetY = height * 0.42
  draw()

  viewObserver.observe(el)
  sizeObserver.observe(el)
  document.addEventListener('visibilitychange', onVisibility)
  if (!reduced) window.addEventListener('pointermove', onPointerMove, { passive: true })

  start()

  cleanup = () => {
    stop()
    viewObserver.disconnect()
    sizeObserver.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('pointermove', onPointerMove)
  }
})

onBeforeUnmount(() => {
  cleanup?.()
  draw = null
  readColors = null
})
</script>

<template>
  <canvas ref="canvas" class="hero-grid" aria-hidden="true" />
</template>
