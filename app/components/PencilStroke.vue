<script setup lang="ts">
/**
 * Coretan pensil merah editor: ciri khas situs ini.
 * Diletakkan di dalam elemen `relative`, lalu tergambar saat terlihat.
 * Dekorasi murni, jadi tidak dibaca screen reader.
 */
withDefaults(
  defineProps<{
    variant?: 'underline' | 'circle'
    /** Jeda sebelum mulai menggambar (ms) */
    delay?: number
  }>(),
  { variant: 'underline', delay: undefined },
)
</script>

<template>
  <svg
    v-draw="delay"
    class="pencil"
    :class="`pencil-${variant}`"
    :viewBox="variant === 'circle' ? '0 0 300 70' : '0 0 300 14'"
    fill="none"
    aria-hidden="true"
  >
    <path
      v-if="variant === 'circle'"
      pathLength="1"
      d="M172 6C96 0 15 8 6 33c-8 22 64 34 146 32 73-2 143-14 142-35C293 8 208 2 118 9"
    />
    <path
      v-else
      pathLength="1"
      d="M3 9C38 4 72 3 108 6s70 5 104 3 57-5 85-1"
    />
  </svg>
</template>
