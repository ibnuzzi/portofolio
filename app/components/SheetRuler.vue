<script setup lang="ts">
/**
 * Penggaris di tepi kiri layar lebar: pengganti scrollbar yang sekaligus
 * jadi navigasi. Jarum merahnya menunjuk posisi baca, dan nomor section
 * diletakkan sesuai letak aslinya di halaman.
 */
import { navigation } from '~/data/site'

interface Mark {
  id: string
  number: string
  label: string
  position: number
}

const marks = ref<Mark[]>([])
const needle = ref(0)

function maxScroll() {
  return document.documentElement.scrollHeight - window.innerHeight
}

function measure() {
  const max = maxScroll()
  if (max <= 0) return

  marks.value = navigation.slice(1).flatMap((item, index) => {
    const el = document.getElementById(item.id)
    if (!el) return []

    return {
      id: item.id,
      number: String(index + 1).padStart(2, '0'),
      label: item.label,
      position: Math.min(1, el.offsetTop / max),
    }
  })
}

useScrollFrame(() => {
  const max = maxScroll()
  needle.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
})

const nuxtApp = useNuxtApp()
const stopPageHook = nuxtApp.hook('page:finish', measure)
const stopTransitionHook = nuxtApp.hook('page:transition:finish', measure)

onMounted(() => {
  measure()
  document.fonts?.ready.then(measure)
  window.addEventListener('resize', measure)
  window.addEventListener('load', measure)
})

onBeforeUnmount(() => {
  stopPageHook()
  stopTransitionHook()
  window.removeEventListener('resize', measure)
  window.removeEventListener('load', measure)
})
</script>

<template>
  <nav class="sheet-ruler" aria-label="Penggaris halaman">
    <span
      class="sheet-needle"
      :style="{ top: `${needle * 100}%` }"
      aria-hidden="true"
    />

    <NuxtLink
      v-for="mark in marks"
      :key="mark.id"
      :to="`/#${mark.id}`"
      class="sheet-mark"
      :class="{ 'is-passed': needle >= mark.position }"
      :style="{ top: `${mark.position * 100}%` }"
      :aria-label="mark.label"
      :title="mark.label"
    >
      {{ mark.number }}
    </NuxtLink>
  </nav>
</template>
