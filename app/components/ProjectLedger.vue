<script setup lang="ts">
/**
 * Daftar proyek bergaya buku besar. Di desktop, sampul proyek mengambang di
 * sisi kanan dan mengikuti kursor saat barisnya disorot. Lebarnya mengisi
 * ruang kosong di kanan teks, jadi makin lebar layarnya makin besar sampulnya.
 */
import type { Project } from '~/data/projects'

const props = defineProps<{ projects: Project[] }>()

// Kolom nomor (2.75rem + gap) + teks (maks. 30rem) + napas sebelum sampul.
const TEXT_SPAN = 580
const MIN_WIDTH = 340
const MAX_WIDTH = 600
// Sampul boleh keluar dari kolom daftar sampai margin halaman.
const OUTSET = 160

const list = ref<{ $el: HTMLElement } | null>(null)
const preview = ref<HTMLElement | null>(null)
const floating = ref(false)
const activeSlug = ref<string | null>(null)
const size = reactive({ width: MIN_WIDTH, height: (MIN_WIDTH * 5) / 8 })

// Varian webp yang sama dengan srcset sampul di ProjectCard, jadi ikut di-prerender.
const img = useImage()
const previewSrc = (cover: string) =>
  img(cover, { width: 1040, height: 650, format: 'webp', quality: img.options.quality })

const pos = { x: 0, y: 0, targetX: 0, targetY: 0 }
let reduced = false
let frame = 0

function applyTransform() {
  const tilt = Math.max(-5, Math.min(5, (pos.targetY - pos.y) * 0.05))
  if (preview.value) {
    preview.value.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${tilt}deg)`
  }
}

function tick() {
  pos.x += (pos.targetX - pos.x) * 0.14
  pos.y += (pos.targetY - pos.y) * 0.14
  applyTransform()

  const moving =
    Math.abs(pos.targetX - pos.x) > 0.3 || Math.abs(pos.targetY - pos.y) > 0.3
  frame = moving ? requestAnimationFrame(tick) : 0
}

function aim(event: PointerEvent) {
  const bounds = list.value?.$el.getBoundingClientRect()
  if (!bounds) return

  const right = Math.min(window.innerWidth - 32, bounds.right + OUTSET)
  const width = Math.round(
    Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, right - bounds.left - TEXT_SPAN)),
  )
  size.width = width
  size.height = Math.round((width * 5) / 8)

  const drift = (event.clientX - bounds.left) / bounds.width - 0.5
  pos.targetX = right - width + drift * 24
  pos.targetY = Math.max(
    84,
    Math.min(window.innerHeight - size.height - 16, event.clientY - size.height / 2),
  )
}

function onPointerMove(event: PointerEvent) {
  if (!floating.value) return

  const row = (event.target as Element).closest<HTMLElement>('[data-slug]')
  const wasHidden = activeSlug.value === null

  activeSlug.value = row?.dataset.slug ?? null
  aim(event)

  // Baru muncul → langsung di tempatnya, jangan terbang dari posisi lama.
  if (wasHidden || reduced) {
    pos.x = pos.targetX
    pos.y = pos.targetY
    applyTransform()
    return
  }

  if (!frame) frame = requestAnimationFrame(tick)
}

function onPointerLeave() {
  activeSlug.value = null
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  floating.value = window.matchMedia(
    '(hover: hover) and (pointer: fine) and (min-width: 1024px)',
  ).matches
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div>
    <TransitionGroup
      ref="list"
      tag="div"
      name="list"
      appear
      class="ledger relative mt-10"
      @pointermove="onPointerMove"
      @pointerleave="onPointerLeave"
    >
      <ProjectCard
        v-for="(project, index) in props.projects"
        :key="project.slug"
        :project="project"
        :index="index"
      />
    </TransitionGroup>

    <div
      v-if="floating"
      ref="preview"
      class="ledger-preview"
      :class="{ 'is-on': activeSlug }"
      :style="{ width: `${size.width}px` }"
      aria-hidden="true"
    >
      <!-- <img> biasa: elemen ini hanya ada di klien, jadi NuxtImg-nya tidak ikut di-prerender. -->
      <img
        v-for="project in props.projects"
        :key="project.slug"
        :src="previewSrc(project.cover)"
        alt=""
        width="1040"
        height="650"
        :class="{ 'is-current': activeSlug === project.slug }"
      />
    </div>
  </div>
</template>
