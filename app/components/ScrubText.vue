<script setup lang="ts">
/**
 * Paragraf yang "menyala" kata demi kata mengikuti gulir, seperti sedang
 * dibaca bersama. Tanpa JS atau dengan reduced motion, teks tampil penuh.
 */
const props = defineProps<{ text: string }>()

const words = computed(() => props.text.split(/\s+/))
const root = ref<HTMLElement | null>(null)
const enabled = ref(false)
const litCount = ref(0)

onMounted(() => {
  enabled.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

useScrollFrame(() => {
  if (!root.value) return

  const rect = root.value.getBoundingClientRect()
  const start = window.innerHeight * 0.84
  const end = window.innerHeight * 0.6
  const progress = (start - rect.top) / (start - end + rect.height)

  litCount.value = Math.ceil(Math.min(1, Math.max(0, progress)) * words.value.length)
})
</script>

<template>
  <p ref="root" class="scrub">
    <span
      v-for="(word, index) in words"
      :key="index"
      class="scrub-word"
      :class="{ 'is-dim': enabled && index >= litCount }"
    >{{ word }}{{ ' ' }}</span>
  </p>
</template>
