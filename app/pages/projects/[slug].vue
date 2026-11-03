<script setup lang="ts">
import { absoluteUrl } from '~/data/site'
import { getProject, getProjectNeighbours } from '~/data/projects'

const route = useRoute()
const slug = String(route.params.slug)
const project = getProject(slug)

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Proyek tidak ditemukan',
    fatal: true,
  })
}

const { previous, next } = getProjectNeighbours(slug)

useSeoMeta({
  title: `${project.title} · Proyek`,
  description: project.summary,
  ogTitle: `${project.title} — Muhammad Ibnu Zauzi`,
  ogDescription: project.summary,
  ogType: 'article',
  ogImage: absoluteUrl(project.cover),
  twitterCard: 'summary_large_image',
  twitterTitle: `${project.title} — Muhammad Ibnu Zauzi`,
  twitterDescription: project.summary,
})
</script>

<template>
  <div class="pb-20 pt-28 sm:pt-32">
    <div class="container-page">
      <NuxtLink
        to="/#projects"
        class="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted transition hover:text-ink"
      >
        <Icon name="lucide:arrow-left" class="h-3.5 w-3.5" aria-hidden="true" />
        Kembali ke proyek
      </NuxtLink>

      <div class="rule mt-8" aria-hidden="true" />

      <header class="mt-8 max-w-3xl">
        <div class="flex flex-wrap items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.14em]">
          <span class="accent">{{ project.category }}</span>
          <span class="h-px w-6 bg-rule" aria-hidden="true" />
          <span class="text-muted">{{ project.year }}</span>
        </div>

        <h1 class="mt-5 font-display text-[2rem] leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem] lg:text-[3.1rem]">
          {{ project.title }}
        </h1>

        <p class="mt-5 text-base leading-relaxed text-body">{{ project.summary }}</p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a
            v-if="project.links.demo"
            :href="project.links.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
            :aria-label="`Buka demo ${project.title} (tab baru)`"
          >
            Lihat demo
            <Icon name="lucide:external-link" class="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <a
            v-if="project.links.repo"
            :href="project.links.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
            :aria-label="`Buka repositori GitHub ${project.title} (tab baru)`"
          >
            Repositori
            <Icon name="simple-icons:github" class="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <NuxtLink to="/#contact" class="btn-secondary">
            Diskusikan proyek serupa
            <Icon name="lucide:mail" class="h-3.5 w-3.5" aria-hidden="true" />
          </NuxtLink>
        </div>
      </header>

      <div
        v-anim="60"
        class="relative mt-12 overflow-hidden rounded-lg border border-rule bg-surface"
      >
        <NuxtImg
          :src="project.cover"
          :alt="project.coverAlt"
          width="1600"
          height="1000"
          format="webp"
          sizes="(max-width: 1024px) 100vw, 1120px"
          class="aspect-[16/10] w-full object-cover"
        />
      </div>

      <div class="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div v-anim>
          <h2 class="font-display text-xl sm:text-2xl">Tentang proyek</h2>

          <div class="mt-5 space-y-4 text-sm leading-relaxed text-body sm:text-base">
            <p v-for="(paragraph, index) in project.description" :key="index">
              {{ paragraph }}
            </p>
          </div>

          <h2 class="mt-12 font-display text-xl sm:text-2xl">Yang saya kerjakan</h2>
          <ul class="mt-5 space-y-3">
            <li
              v-for="highlight in project.highlights"
              :key="highlight"
              class="flex gap-3 text-sm leading-relaxed text-body"
            >
              <Icon
                name="lucide:minus"
                class="mt-1 h-4 w-4 shrink-0 text-brand-500"
                aria-hidden="true"
              />
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </div>

        <aside v-anim="100" class="space-y-8">
          <div>
            <h2 class="label">Tech stack</h2>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li
                v-for="tech in project.tech"
                :key="tech"
                class="rounded-md border border-rule px-3 py-1.5 font-mono text-[0.66rem] text-body"
              >
                {{ tech }}
              </li>
            </ul>
          </div>

          <div class="border-t border-rule">
            <h2 class="label mt-5">Detail</h2>
            <dl class="mt-4 space-y-3 text-sm">
              <div class="flex justify-between gap-4 border-b border-line pb-3">
                <dt class="text-muted">Kategori</dt>
                <dd class="text-ink">{{ project.category }}</dd>
              </div>
              <div class="flex justify-between gap-4 border-b border-line pb-3">
                <dt class="text-muted">Tahun</dt>
                <dd class="text-ink">{{ project.year }}</dd>
              </div>
              <div class="flex justify-between gap-4">
                <dt class="text-muted">Peran</dt>
                <dd class="text-ink">Pengembang</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      <nav class="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2" aria-label="Navigasi proyek">
        <NuxtLink
          v-if="previous"
          :to="`/projects/${previous.slug}`"
          class="card card-hover p-6"
        >
          <span class="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
            <Icon name="lucide:arrow-left" class="h-3.5 w-3.5" aria-hidden="true" />
            Sebelumnya
          </span>
          <p class="mt-2 font-display text-base">{{ previous.title }}</p>
        </NuxtLink>

        <NuxtLink
          v-if="next"
          :to="`/projects/${next.slug}`"
          class="card card-hover p-6 text-right sm:col-start-2"
        >
          <span class="flex items-center justify-end gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
            Berikutnya
            <Icon name="lucide:arrow-right" class="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <p class="mt-2 font-display text-base">{{ next.title }}</p>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
