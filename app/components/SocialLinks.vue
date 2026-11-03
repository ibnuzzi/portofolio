<script setup lang="ts">
import { site } from '~/data/site'

const props = withDefaults(
  defineProps<{
    variant?: 'icon' | 'pill'
    direction?: 'row' | 'column'
    size?: 'sm' | 'md'
    only?: Array<'github' | 'linkedin' | 'instagram' | 'email' | 'cv'>
  }>(),
  { variant: 'icon', direction: 'row', size: 'md' },
)

const links = computed(() => {
  if (!props.only?.length) return site.socials
  return site.socials.filter((social) => props.only?.includes(social.id))
})

const iconClass = computed(() => (props.size === 'sm' ? 'h-4 w-4' : 'h-[1.15rem] w-[1.15rem]'))

const boxClass = computed(() =>
  props.variant === 'pill'
    ? 'gap-2 rounded-md border px-3.5 py-2 text-sm font-medium'
    : 'h-9 w-9 rounded-md border',
)
</script>

<template>
  <ul
    class="flex items-center gap-3"
    :class="direction === 'column' ? 'flex-col' : 'flex-row flex-wrap'"
  >
    <li v-for="link in links" :key="link.id">
      <a
        :href="link.href"
        :target="link.kind === 'external' ? '_blank' : undefined"
        :rel="link.kind === 'external' ? 'noopener noreferrer' : undefined"
        :download="link.kind === 'download' ? site.cv.filename : undefined"
        :aria-label="link.description"
        :title="link.description"
        class="inline-flex items-center justify-center border-line text-body transition duration-200 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-page dark:hover:text-brand-300"
        :class="boxClass"
      >
        <Icon :name="link.icon" :class="iconClass" aria-hidden="true" />
        <span v-if="variant === 'pill'">{{ link.label }}</span>
      </a>
    </li>
  </ul>
</template>
