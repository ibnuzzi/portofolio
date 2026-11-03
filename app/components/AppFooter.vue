<script setup lang="ts">
import { navigation, site } from '~/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="overflow-hidden border-t border-rule">
    <div class="container-page pt-12 sm:pt-14">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div class="max-w-sm">
          <AppLogo />
          <p class="mt-4 text-sm leading-relaxed text-body">{{ site.tagline }}</p>
          <p class="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
            {{ site.role }} · {{ site.institution }}
          </p>
        </div>

        <nav aria-label="Navigasi footer">
          <h2 class="label">Navigasi</h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in navigation" :key="item.id">
              <NuxtLink
                :to="`/#${item.id}`"
                class="link-underline text-sm text-body hover:text-ink"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <h2 class="label">Terhubung</h2>
          <SocialLinks class="mt-4" size="sm" />
          <a
            :href="site.cv.href"
            :download="site.cv.filename"
            :aria-label="`Unduh CV ${site.name} (PDF)`"
            class="mt-5 inline-flex items-center gap-2 text-sm text-body transition hover:text-ink"
          >
            <Icon name="lucide:file-text" class="h-4 w-4" aria-hidden="true" />
            {{ site.cv.label }}
          </a>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; {{ year }} {{ site.name }}</p>
        <p class="font-mono text-[0.58rem] uppercase tracking-[0.14em]">
          Malang · <LocalClock /> · Nuxt 4 · Tailwind CSS
        </p>
      </div>

      <p class="footer-name mt-8 sm:mt-10" aria-hidden="true">
        Ibnu Zauzi<span class="accent">.</span>
      </p>
    </div>
  </footer>
</template>
