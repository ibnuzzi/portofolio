<script setup lang="ts">
/**
 * Satu baris "buku besar" proyek.
 * Di layar sentuh/kecil sampulnya tampil di atas baris; di desktop sampul
 * disembunyikan karena muncul mengambang lewat ProjectLedger.
 */
import type { Project } from '~/data/projects'

const props = defineProps<{
  project: Project
  index: number
}>()

const coverFailed = ref(false)
const number = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<template>
  <article class="ledger-row group" :data-slug="project.slug">
    <NuxtLink
      v-if="!coverFailed"
      :to="`/projects/${project.slug}`"
      class="ledger-cover"
      tabindex="-1"
      aria-hidden="true"
    >
      <NuxtImg
        :src="project.cover"
        alt=""
        width="1200"
        height="750"
        format="webp"
        sizes="(max-width: 640px) 90vw, 520px"
        loading="lazy"
        class="aspect-[16/10] w-full object-cover"
        @error="coverFailed = true"
      />
    </NuxtLink>

    <div class="grid gap-x-6 sm:grid-cols-[2.75rem_minmax(0,1fr)]">
      <span class="accent pt-1 font-mono text-[0.68rem] tabular-nums">{{ number }}</span>

      <div class="min-w-0">
        <p class="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted sm:mt-0">
          {{ project.category }} / {{ project.year }}
        </p>

        <h3 class="ledger-title">
          <NuxtLink :to="`/projects/${project.slug}`">
            {{ project.title }}
          </NuxtLink>
        </h3>

        <p class="mt-3 max-w-[30rem] text-sm leading-relaxed text-body">{{ project.summary }}</p>

        <ul class="mt-4 flex max-w-[30rem] flex-wrap gap-x-3 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">
          <li v-for="tech in project.tech" :key="tech">{{ tech }}</li>
        </ul>

        <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <NuxtLink
            :to="`/projects/${project.slug}`"
            class="link-doc inline-flex items-center gap-1.5"
            :aria-label="`Lihat studi kasus ${project.title}`"
          >
            Studi kasus
            <Icon name="lucide:arrow-right" class="h-3 w-3" aria-hidden="true" />
          </NuxtLink>

          <a
            v-if="project.links.demo"
            :href="project.links.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="link-doc inline-flex items-center gap-1.5"
            :aria-label="`Buka demo ${project.title} (tab baru)`"
          >
            Demo
            <Icon name="lucide:external-link" class="h-3 w-3" aria-hidden="true" />
          </a>

          <a
            v-if="project.links.repo"
            :href="project.links.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="link-doc inline-flex items-center gap-1.5"
            :aria-label="`Buka repositori GitHub ${project.title} (tab baru)`"
          >
            GitHub
            <Icon name="simple-icons:github" class="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
