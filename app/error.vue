<script setup lang="ts">
import type { NuxtError } from '#app'
import { site } from '~/data/site'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

const title = computed(() =>
  isNotFound.value ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan',
)

const description = computed(() =>
  isNotFound.value
    ? 'Alamat yang Anda buka tidak ada atau sudah dipindahkan. Mari kembali ke beranda.'
    : 'Ada yang tidak berjalan sesuai rencana. Coba muat ulang halaman ini.',
)
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-6 py-20">
    <div class="w-full max-w-lg">
      <p class="eyebrow">
        Error {{ error.statusCode }}
      </p>

      <div class="rule mt-4" aria-hidden="true" />

      <h1 class="mt-6 font-display text-3xl leading-tight sm:text-4xl">
        {{ title }}
      </h1>

      <p class="mt-4 max-w-md text-sm leading-relaxed text-body">
        {{ description }}
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <button type="button" class="btn-primary" @click="clearError({ redirect: '/' })">
          Kembali ke beranda
          <Icon name="lucide:arrow-right" class="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <NuxtLink to="/#contact" class="btn-secondary">
          Hubungi saya
          <Icon name="lucide:mail" class="h-3.5 w-3.5" aria-hidden="true" />
        </NuxtLink>
      </div>

      <p class="mt-10 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
        {{ site.name }} · {{ site.role }}
      </p>
    </div>
  </div>
</template>
