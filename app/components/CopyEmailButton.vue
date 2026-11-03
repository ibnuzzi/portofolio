<script setup lang="ts">
import { site } from '~/data/site'

const copied = ref(false)
const failed = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  failed.value = false

  try {
    await navigator.clipboard.writeText(site.email)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 2200)
  } catch {
    // Fallback bila Clipboard API tidak tersedia/diblokir
    failed.value = true
    window.location.href = `mailto:${site.email}`
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div>
    <button type="button" class="btn-secondary w-full" @click="copyEmail">
      <span aria-live="polite">{{ copied ? 'Email tersalin' : 'Salin email' }}</span>
      <Icon
        :name="copied ? 'lucide:check' : 'lucide:copy'"
        class="h-3.5 w-3.5"
        aria-hidden="true"
      />
    </button>

    <p v-if="failed" class="mt-2 text-xs text-muted">
      Clipboard diblokir browser — membuka aplikasi email sebagai gantinya.
    </p>
  </div>
</template>
