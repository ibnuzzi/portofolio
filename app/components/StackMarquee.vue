<script setup lang="ts">
/**
 * Pita berjalan berisi stack utama. Makin cepat halaman digulir, makin
 * cepat pitanya. Isi yang sama ada di section Tentang, jadi pita ini
 * disembunyikan dari screen reader.
 */
import { skills } from '~/data/skills'

const names = skills
  .filter((skill) => skill.level !== 'Sedang belajar')
  .map((skill) => skill.name)

const track = ref<HTMLElement | null>(null)

let lastY = 0
let settle: ReturnType<typeof setTimeout> | undefined

useScrollFrame(() => {
  const animation = track.value?.getAnimations()[0]
  if (!animation) return

  const speed = Math.abs(window.scrollY - lastY)
  lastY = window.scrollY

  animation.updatePlaybackRate(1 + Math.min(speed / 10, 6))

  clearTimeout(settle)
  settle = setTimeout(() => animation.updatePlaybackRate(1), 160)
})

onBeforeUnmount(() => clearTimeout(settle))
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div ref="track" class="marquee-track">
      <ul v-for="group in 2" :key="group" class="marquee-group">
        <template v-for="round in 2" :key="round">
          <li v-for="name in names" :key="name" class="marquee-item">
            {{ name }}<span class="marquee-mark">/</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
