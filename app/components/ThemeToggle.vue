<script setup lang="ts">
/**
 * `useColorMode()` mengembalikan satu objek reaktif
 * { preference, value, unknown, forced } — bukan { colorMode, preference }.
 */
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const label = computed(() =>
  isDark.value ? 'Aktifkan mode terang' : 'Aktifkan mode gelap',
)

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="icon-btn"
      :aria-label="label"
      :title="label"
      :aria-pressed="isDark"
      @click="toggleTheme"
    >
      <Icon
        :name="isDark ? 'lucide:sun' : 'lucide:moon'"
        class="h-4 w-4"
        aria-hidden="true"
      />
    </button>

    <template #fallback>
      <span class="icon-btn opacity-60" aria-hidden="true">
        <Icon name="lucide:sun-moon" class="h-4 w-4" />
      </span>
    </template>
  </ClientOnly>
</template>
