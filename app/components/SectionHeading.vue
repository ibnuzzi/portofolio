<script setup lang="ts">
/**
 * Judul section bergaya editorial: serif, dengan bagian penekanan yang
 * ditulis miring lalu dicoret pensil merah. Semua rata kiri karena label
 * section sudah ada di kolom kiri (lihat SectionShell).
 */
withDefaults(
  defineProps<{
    /** Baris pertama judul */
    title: string
    /** Bagian judul yang dimiringkan */
    accent?: string
    description?: string
    /** Bentuk coretan pada bagian penekanan */
    pencil?: 'underline' | 'circle'
  }>(),
  { accent: undefined, description: undefined, pencil: 'underline' },
)
</script>

<template>
  <div class="max-w-2xl">
    <h2 class="section-title">
      {{ title }}<span v-if="accent" class="accent relative inline-block">{{ accent }}<PencilStroke :variant="pencil" :delay="250" /></span>
    </h2>

    <p v-if="description" class="lede">
      {{ description }}
    </p>
  </div>
</template>
