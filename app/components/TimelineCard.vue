<script setup lang="ts">
import type { TimelineEntry } from '~/data/experiences'

defineProps<{ entry: TimelineEntry }>()
</script>

<template>
  <li class="group grid gap-3 border-b border-rule py-7 sm:grid-cols-[168px_minmax(0,1fr)] sm:gap-10 sm:py-8">
    <div class="pt-1 sm:flex sm:flex-col sm:items-center sm:text-center">
      <p class="label">{{ entry.period }}</p>

      <NuxtImg
        v-if="entry.logo"
        :src="entry.logo"
        alt=""
        width="144"
        height="144"
        format="webp"
        loading="lazy"
        class="mt-6 h-16 w-18 object-contain sm:mx-auto sm:h-[4.5rem] sm:w-[4.5rem]"
      />
    </div>

    <div class="min-w-0">
      <h3 class="font-display text-lg leading-snug sm:text-xl">{{ entry.title }}</h3>

      <p class="mt-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">
        <a
          v-if="entry.url"
          :href="entry.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 decoration-rule underline-offset-4 transition-colors hover:text-ink hover:underline hover:decoration-current"
          :aria-label="`Buka situs ${entry.organization} (tab baru)`"
        >
          {{ entry.organization }}
          <Icon name="lucide:external-link" class="h-3 w-3 shrink-0" aria-hidden="true" />
        </a>
        <template v-else>{{ entry.organization }}</template>
      </p>

      <p class="mt-4 max-w-2xl text-sm leading-relaxed text-body">{{ entry.description }}</p>

      <ul v-if="entry.tags?.length" class="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        <li
          v-for="tag in entry.tags"
          :key="tag"
          class="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted"
        >
          {{ tag }}
        </li>
      </ul>
    </div>
  </li>
</template>
