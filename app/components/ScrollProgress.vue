<script setup lang="ts">
/**
 * Garis kemajuan gulir di paling atas halaman.
 * Di layar sangat lebar perannya diambil alih oleh SheetRuler.
 */
const progress = ref(0)

useScrollFrame(() => {
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] min-[1400px]:hidden"
    aria-hidden="true"
  >
    <div
      class="h-full origin-left bg-brand-500"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>
