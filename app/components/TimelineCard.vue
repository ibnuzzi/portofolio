<script setup lang="ts">
import type { TimelineEntry } from '~/data/experiences'

defineProps<{ entry: TimelineEntry }>()
</script>

<template>
  <li class="group grid gap-3 border-b border-rule py-7 sm:grid-cols-[168px_minmax(0,1fr)] sm:gap-10 sm:py-8">
    <p class="label pt-1">{{ entry.period }}</p>

    <div class="min-w-0">
      <h3 class="font-display text-lg leading-snug sm:text-xl">{{ entry.title }}</h3>

      <p class="mt-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">
        {{ entry.organization }}
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
