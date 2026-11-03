<script setup lang="ts">
import { site } from '~/data/site'

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <NuxtLink
    to="/"
    class="group inline-flex items-baseline gap-0.5 rounded-sm font-display text-[0.95rem] leading-none text-ink transition-colors hover:text-brand-600 dark:hover:text-brand-300 sm:text-base"
    aria-label="Muhammad Ibnu Zauzi — kembali ke beranda"
  >
    <span v-if="!compact">{{ site.shortName }}</span>
    <span v-else>{{ site.initials }}</span>
    <span class="accent" aria-hidden="true">.</span>
  </NuxtLink>
</template>
