<script setup lang="ts">
import { site, contactEndpoint } from '~/data/site'

type FormState = 'idle' | 'sending' | 'sent' | 'error'

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive<Record<'name' | 'email' | 'message', string>>({
  name: '',
  email: '',
  message: '',
})

const state = ref<FormState>('idle')
const feedback = ref('')

const isSending = computed(() => state.value === 'sending')

function validate() {
  errors.name = form.name.trim().length < 2 ? 'Nama minimal 2 karakter.' : ''
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ? ''
    : 'Alamat email belum valid.'
  errors.message = form.message.trim().length < 10 ? 'Pesan minimal 10 karakter.' : ''

  return !errors.name && !errors.email && !errors.message
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.message = ''
}

async function onSubmit() {
  feedback.value = ''
  if (!validate()) {
    state.value = 'idle'
    return
  }

  // Tanpa endpoint: buka aplikasi email pengunjung (fallback yang selalu bekerja).
  if (!contactEndpoint) {
    const subject = encodeURIComponent(`Pesan dari ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    state.value = 'sent'
    feedback.value = 'Aplikasi email Anda dibuka. Silakan kirim pesan dari sana.'
    return
  }

  state.value = 'sending'

  try {
    const response = await fetch(contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      }),
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    state.value = 'sent'
    feedback.value = 'Terima kasih! Pesan Anda sudah terkirim.'
    resetForm()
  } catch {
    state.value = 'error'
    feedback.value =
      'Pesan gagal dikirim. Silakan coba lagi atau hubungi lewat email.'
  }
}
</script>

<template>
  <form class="border-t border-rule pt-7" novalidate @submit.prevent="onSubmit">
    <div class="grid gap-7 sm:grid-cols-2 sm:gap-8">
      <div>
        <label for="contact-name" class="label block">Nama</label>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          placeholder="Nama Anda"
          class="field mt-2"
          :aria-invalid="Boolean(errors.name)"
          :aria-describedby="errors.name ? 'contact-name-error' : undefined"
        />
        <p v-if="errors.name" id="contact-name-error" class="mt-2 text-xs text-red-500">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <label for="contact-email" class="label block">Email</label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="nama@email.com"
          class="field mt-2"
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="errors.email ? 'contact-email-error' : undefined"
        />
        <p v-if="errors.email" id="contact-email-error" class="mt-2 text-xs text-red-500">
          {{ errors.email }}
        </p>
      </div>
    </div>

    <div class="mt-7">
      <label for="contact-message" class="label block">Pesan</label>
      <textarea
        id="contact-message"
        v-model="form.message"
        name="message"
        rows="4"
        placeholder="Ceritakan proyek atau peluang yang ingin Anda diskusikan…"
        class="field mt-2 resize-y"
        :aria-invalid="Boolean(errors.message)"
        :aria-describedby="errors.message ? 'contact-message-error' : undefined"
      />
      <p v-if="errors.message" id="contact-message-error" class="mt-2 text-xs text-red-500">
        {{ errors.message }}
      </p>
    </div>

    <div class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
      <button type="submit" class="btn-primary" :disabled="isSending">
        <span>{{ isSending ? 'Mengirim…' : 'Kirim pesan' }}</span>
        <Icon
          :name="isSending ? 'lucide:loader-circle' : 'lucide:arrow-up-right'"
          class="h-3.5 w-3.5"
          :class="isSending ? 'animate-spin' : ''"
          aria-hidden="true"
        />
      </button>

      <p class="text-xs text-muted">
        Atau email langsung:
        <a :href="`mailto:${site.email}`" class="link-underline text-ink">{{ site.email }}</a>
      </p>
    </div>

    <p
      v-if="feedback"
      class="mt-4 text-sm"
      :class="state === 'error' ? 'text-red-500' : 'text-brand-600 dark:text-brand-300'"
      role="status"
      aria-live="polite"
    >
      {{ feedback }}
    </p>
  </form>
</template>
