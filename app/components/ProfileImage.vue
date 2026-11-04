<script setup lang="ts">
/**
 * Foto profil (potongan setengah badan, latar transparan) dengan fallback
 * monogram. Bila `public/images/profile.png` gagal dimuat, yang tampil adalah
 * plat monogram — bukan kotak "taruh foto di sini" yang terlihat belum jadi.
 */
const props = defineProps<{
  src: string
  alt: string
  initials: string
  priority?: boolean
}>()

const failed = ref(false)
const isDev = import.meta.dev
</script>

<template>
  <NuxtImg
    v-if="!failed"
    :src="props.src"
    :alt="props.alt"
    width="900"
    height="1200"
    format="webp"
    sizes="220px lg:230px"
    :loading="priority ? 'eager' : 'lazy'"
    :preload="priority"
    class="h-auto w-full select-none object-contain"
    draggable="false"
    @error="failed = true"
  />

  <div
    v-else
    class="relative grid aspect-[3/4] w-full place-items-center overflow-hidden bg-elevated"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.35]"
      style="
        background-image: linear-gradient(hsl(var(--rule)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--rule)) 1px, transparent 1px);
        background-size: 28px 28px;
      "
      aria-hidden="true"
    />

    <span class="relative font-display text-[4.5rem] leading-none text-ink/85">
      {{ initials }}
    </span>

    <p
      v-if="isDev"
      class="absolute inset-x-0 bottom-0 border-t border-rule bg-page/80 px-3 py-2 text-center font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted"
    >
      public/images/profile.png
    </p>
  </div>
</template>
