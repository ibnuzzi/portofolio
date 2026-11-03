<script setup lang="ts">
/**
 * Jam lokal Malang. Nilainya hanya diisi di browser supaya hasil render
 * server dan klien tidak berbeda.
 */
const time = ref('--:--')

const formatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Jakarta',
})

let timer: ReturnType<typeof setInterval> | undefined

function update() {
  time.value = formatter.format(new Date()).replace('.', ':')
}

onMounted(() => {
  update()
  timer = setInterval(update, 15_000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <span class="tabular-nums">{{ time }} WIB</span>
</template>
