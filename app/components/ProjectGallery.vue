<script setup lang="ts">
/**
 * Galeri tangkapan layar pada halaman detail proyek.
 * Gaya "dokumen": tiap gambar diberi nomor gambar, keterangan mono, dan
 * bingkai hairline — sama seperti keterangan gambar di hero.
 * Klik gambar untuk melihat ukuran penuh (overlay), tutup dengan Esc.
 */
import type { ProjectShot } from '~/data/projects'

const props = defineProps<{
  shots: ProjectShot[]
  /** Label kecil di atas galeri */
  label?: string
}>()

const active = ref<number | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
const opener = ref<HTMLElement | null>(null)

const current = computed(() =>
  active.value === null ? null : props.shots[active.value],
)

const number = (index: number) => String(index + 1).padStart(2, '0')

/**
 * Kalau jumlah gambar ganjil, gambar pertama dilebarkan penuh supaya baris
 * terakhir tidak menyisakan kolom kosong.
 */
const isWide = (index: number) => props.shots.length % 2 === 1 && index === 0

/**
 * Ukuran asli tiap gambar. Bingkai galeri mengikuti rasio ini supaya tangkapan
 * layar tidak terpotong; kalau datanya tidak ada, dipakai 16:10 sebagai default.
 */
const shotWidth = (shot: ProjectShot) => shot.width ?? 1600
const shotHeight = (shot: ProjectShot) => shot.height ?? 1000
const shotRatio = (shot: ProjectShot) => `${shotWidth(shot)} / ${shotHeight(shot)}`

const imageSizes = (index: number) =>
  isWide(index)
    ? // Gambar lebar memakai ukuran aslinya agar tidak di-upscale.
      undefined
    : '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 520px'

function open(index: number, event: MouseEvent) {
  opener.value = event.currentTarget as HTMLElement
  active.value = index
}

function close() {
  active.value = null
  nextTick(() => opener.value?.focus())
}

function step(direction: 1 | -1) {
  if (active.value === null) return
  const total = props.shots.length
  active.value = (active.value + direction + total) % total
}

function onKeydown(event: KeyboardEvent) {
  if (active.value === null) return

  if (event.key === 'Escape') close()
  else if (event.key === 'ArrowRight') step(1)
  else if (event.key === 'ArrowLeft') step(-1)
  else return

  event.preventDefault()
}

watch(active, async (value) => {
  if (typeof document === 'undefined') return

  document.body.style.overflow = value === null ? '' : 'hidden'

  if (value !== null) {
    await nextTick()
    closeButton.value?.focus()
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<template>
  <section v-if="shots.length" class="mt-16">
    <div class="flex flex-wrap items-baseline justify-between gap-3 border-t border-rule pt-5">
      <h2 class="label">{{ label ?? 'Tangkapan layar' }}</h2>
      <p class="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
        {{ shots.length }} gambar
      </p>
    </div>

    <div class="mt-7 grid items-start gap-6 sm:grid-cols-2 sm:gap-8">
      <figure
        v-for="(shot, index) in shots"
        :key="shot.src"
        v-anim="index * 60"
        class="shot-card group"
        :class="{ 'sm:col-span-2': isWide(index) }"
      >
        <button
          type="button"
          class="shot-plate block w-full"
          :aria-label="`Perbesar gambar ${number(index)}: ${shot.caption}`"
          @click="open(index, $event)"
        >
          <NuxtImg
            :src="shot.src"
            :alt="shot.caption"
            :width="shotWidth(shot)"
            :height="shotHeight(shot)"
            format="webp"
            :sizes="imageSizes(index)"
            loading="lazy"
            class="w-full object-cover"
            :style="{ aspectRatio: shotRatio(shot) }"
          />
          <span class="shot-zoom" aria-hidden="true">
            <Icon name="lucide:maximize-2" class="h-3.5 w-3.5" />
          </span>
        </button>

        <figcaption class="shot-caption">
          <span class="accent shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.14em]">
            Gbr. {{ number(index) }}
          </span>
          <span class="text-xs leading-snug text-muted">{{ shot.caption }}</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <Teleport to="body">
    <Transition name="shot">
      <div
        v-if="current"
        class="fixed inset-0 z-[80] flex flex-col bg-page/95 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-label="`Gambar ${number(active ?? 0)}: ${current.caption}`"
        @click.self="close"
      >
        <div class="flex items-center justify-between gap-4 border-b border-rule px-5 py-3">
          <p class="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
            <span class="accent">Gbr. {{ number(active ?? 0) }}</span>
            <span class="mx-2 opacity-40">/</span>{{ current.caption }}
          </p>

          <button
            ref="closeButton"
            type="button"
            class="icon-btn shrink-0"
            aria-label="Tutup pratinjau gambar"
            @click="close"
          >
            <Icon name="lucide:x" class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div class="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
          <button
            v-if="shots.length > 1"
            type="button"
            class="icon-btn absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-6"
            aria-label="Gambar sebelumnya"
            @click="step(-1)"
          >
            <Icon name="lucide:arrow-left" class="h-4 w-4" aria-hidden="true" />
          </button>

          <!-- Ukuran elemen dikunci ke area overlay supaya tidak ada lompatan
               tata letak saat gambar berikutnya masih dimuat. -->
          <NuxtImg
            :key="current.src"
            :src="current.src"
            :alt="current.caption"
            :width="shotWidth(current)"
            :height="shotHeight(current)"
            format="webp"
            fit="inside"
            class="h-full w-full object-contain"
          />

          <button
            v-if="shots.length > 1"
            type="button"
            class="icon-btn absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-6"
            aria-label="Gambar berikutnya"
            @click="step(1)"
          >
            <Icon name="lucide:arrow-right" class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Kartu plat: gambar + keterangan dalam satu bingkai, jadi tinggi tiap kartu
   boleh berbeda tanpa membuat keterangannya tampak melayang. */
.shot-card {
  overflow: hidden;
  border: 1px solid hsl(var(--rule));
  border-radius: 0.5rem;
  background: hsl(var(--surface));
  transition:
    border-color 0.3s ease,
    box-shadow 0.4s ease;
}

.shot-card:hover {
  border-color: hsl(var(--hue) 60% 55% / 0.55);
  box-shadow: 0 20px 44px -30px hsl(0 0% 0% / 0.6);
}

.shot-plate {
  position: relative;
  overflow: hidden;
  background: hsl(var(--surface));
}

.shot-plate :deep(img) {
  display: block;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.shot-plate:hover :deep(img) {
  transform: scale(1.012);
}

.shot-caption {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  border-top: 1px solid hsl(var(--rule));
  padding: 0.7rem 0.9rem 0.8rem;
}

.shot-zoom {
  position: absolute;
  right: 0.65rem;
  top: 0.65rem;
  display: grid;
  place-items: center;
  height: 1.9rem;
  width: 1.9rem;
  border-radius: 0.35rem;
  border: 1px solid hsl(var(--rule));
  background: hsl(var(--body) / 0.85);
  color: hsl(var(--text));
  opacity: 0;
  transition:
    opacity 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;
}

.shot-plate:hover .shot-zoom,
.shot-plate:focus-visible .shot-zoom {
  opacity: 1;
  color: hsl(var(--pencil));
  border-color: hsl(var(--hue) 60% 55% / 0.6);
}

.shot-enter-active,
.shot-leave-active {
  transition: opacity 0.22s ease;
}

.shot-enter-from,
.shot-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .shot-card,
  .shot-plate :deep(img) {
    transition: none;
  }
  .shot-plate:hover :deep(img) {
    transform: none;
  }
}
</style>
