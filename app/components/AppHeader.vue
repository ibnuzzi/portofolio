<script setup lang="ts">
import { navigation, sectionIds, site } from '~/data/site'

const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const { activeId } = useScrollSpy(sectionIds)

function closeMenu() {
  isMenuOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

function onScroll() {
  isScrolled.value = window.scrollY > 8
}

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <ScrollProgress />

  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300"
    :class="
      isScrolled
        ? 'border-rule/70 bg-page/85 backdrop-blur-md'
        : 'border-transparent bg-transparent'
    "
  >
    <div class="container-page flex h-[4.25rem] items-center justify-between gap-4">
      <AppLogo />

      <nav class="hidden items-center gap-9 lg:flex" aria-label="Navigasi utama">
        <NuxtLink
          v-for="item in navigation"
          :key="item.id"
          :to="`/#${item.id}`"
          :aria-current="activeId === item.id ? 'location' : undefined"
          class="relative font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300"
          :class="
            activeId === item.id
              ? 'text-ink'
              : 'text-muted hover:text-ink'
          "
        >
          <span
            class="absolute -left-3.5 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-brand-500 transition-opacity duration-300"
            :class="activeId === item.id ? 'opacity-100' : 'opacity-0'"
            aria-hidden="true"
          />
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <a
          :href="site.cv.href"
          :download="site.cv.filename"
          :aria-label="`Unduh CV ${site.name} (PDF)`"
          class="hidden items-center gap-2 rounded-md border border-rule px-3.5 py-2 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-ink transition hover:border-brand-400 sm:inline-flex"
        >
          <Icon name="lucide:download" class="h-3 w-3" aria-hidden="true" />
          CV
        </a>

        <ThemeToggle />

        <button
          type="button"
          class="icon-btn lg:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          :aria-label="isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Icon
            :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'"
            class="h-4 w-4"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div
        v-show="isMenuOpen"
        id="mobile-menu"
        class="border-t border-rule bg-page/95 backdrop-blur-md lg:hidden"
      >
        <nav class="container-page flex flex-col py-3" aria-label="Navigasi seluler">
          <NuxtLink
            v-for="item in navigation"
            :key="item.id"
            :to="`/#${item.id}`"
            :aria-current="activeId === item.id ? 'location' : undefined"
            class="flex items-center justify-between border-b border-line py-3.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors"
            :class="activeId === item.id ? 'text-ink' : 'text-muted'"
            @click="closeMenu"
          >
            {{ item.label }}
            <Icon
              v-if="activeId === item.id"
              name="lucide:minus"
              class="h-3.5 w-3.5 text-brand-500"
              aria-hidden="true"
            />
          </NuxtLink>

          <a
            :href="site.cv.href"
            :download="site.cv.filename"
            :aria-label="`Unduh CV ${site.name} (PDF)`"
            class="btn-primary mt-4"
            @click="closeMenu"
          >
            <Icon name="lucide:download" class="h-3.5 w-3.5" aria-hidden="true" />
            Unduh CV
          </a>

          <SocialLinks class="mt-5 justify-center" size="sm" />
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
