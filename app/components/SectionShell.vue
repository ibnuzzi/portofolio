<script setup lang="ts">
/**
 * Kerangka section bergaya dokumen — sama seperti tata letak CV:
 * garis tipis di atas, lalu label kecil di kolom kiri dan isi di kanan.
 * Di layar lebar label ikut "menempel" saat halaman digulir.
 */
withDefaults(
  defineProps<{
    id: string
    /** Nomor urut section, mis. "01" */
    index: string
    /** Label pendek di kolom kiri, mis. "Tentang" */
    label: string
    /** Tampilkan garis pemisah di atas section */
    rule?: boolean
  }>(),
  { rule: true },
)
</script>

<template>
  <section :id="id" class="section">
    <div class="container-page">
      <div v-if="rule" v-draw class="rule" aria-hidden="true" />

      <div class="grid gap-7 pt-7 sm:gap-9 sm:pt-9 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-16 lg:pt-11">
        <div class="lg:sticky lg:top-[calc(var(--header-height)+2.5rem)] lg:self-start">
          <div class="flex items-baseline gap-3">
            <span class="section-index">{{ index }}</span>
            <span class="label">{{ label }}</span>
          </div>
        </div>

        <div class="min-w-0">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
