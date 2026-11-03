<script setup lang="ts">
import { computed } from 'vue'
import type { Skill } from '~/data/skills'

const props = defineProps<{ skill: Skill }>()

const badgeClass = computed(() => {
  if (props.skill.level === 'Mahir') return 'badge-solid'
  if (props.skill.level === 'Terbiasa') return 'badge-outline'
  return 'badge-dashed'
})
</script>

<template>
  <li
    :class="badgeClass"
    :title="`${skill.name} — ${skill.level}`"
  >
    <Icon v-if="skill.icon" :name="skill.icon" class="h-3.5 w-3.5" aria-hidden="true" />
    <span>{{ skill.name }}</span>
  </li>
</template>
