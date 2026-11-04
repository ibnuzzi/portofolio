<script setup lang="ts">
import { absoluteUrl, site } from '~/data/site'
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from '~/data/projects'
import { skillGroups, skillsByGroup } from '~/data/skills'
import { timelineByTrack, tracks, type Track } from '~/data/experiences'

useSeoMeta({
  title: `${site.role} · ${site.institution}`,
  description: site.description,
  ogTitle: `${site.name} — ${site.role}`,
  ogDescription: site.description,
  ogType: 'profile',
  ogLocale: 'id_ID',
  ogImage: absoluteUrl('/images/og-default.jpg'),
  twitterCard: 'summary_large_image',
  twitterTitle: `${site.name} — ${site.role}`,
  twitterDescription: site.description,
})

// ── Nama hero ──────────────────────────────────────────────────────────────
// Dipecah per huruf untuk animasi; `index` menentukan jeda tiap huruf.
function toChars(text: string, offset = 0) {
  return [...text].map((char, position) => ({ char, index: position + offset }))
}

const heroFirstLine = toChars('Muhammad')
const heroMiddleName = toChars('Ibnu', 8)
const heroLastName = toChars('Zauzi', 12)

// ── Filter proyek ──────────────────────────────────────────────────────────
const activeCategory = ref<ProjectCategory | 'Semua'>('Semua')

const filteredProjects = computed(() =>
  activeCategory.value === 'Semua'
    ? projects
    : projects.filter((project) => project.category === activeCategory.value),
)

function countByCategory(category: ProjectCategory | 'Semua') {
  return category === 'Semua'
    ? projects.length
    : projects.filter((project) => project.category === category).length
}

// ── Tab timeline ───────────────────────────────────────────────────────────
const activeTrack = ref<Track>('pengalaman')
const timelineEntries = computed(() => timelineByTrack(activeTrack.value))
const activeTrackIndex = computed(() =>
  Math.max(
    0,
    tracks.findIndex((track) => track.id === activeTrack.value),
  ),
)

// ── Lembar data diri (kolom kanan About) ───────────────────────────────────
const facts = computed(() => [
  { label: 'Lokasi', value: site.location },
  { label: 'Kampus', value: site.institution },
  { label: 'Program', value: 'D-IV Teknik Informatika' },
])
</script>

<template>
  <div>
    <!-- ================= HERO ================= -->
    <section id="hero" class="relative overflow-hidden pb-10 pt-24 sm:pt-28 lg:pb-12 lg:pt-32">
      <HeroGrid />

      <div class="container-page relative">
        <div class="grid gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_230px] lg:items-end lg:gap-x-12 lg:gap-y-0">
          <div class="min-w-0 lg:order-none lg:col-start-1 lg:row-start-1">
            <div
              class="hero-fade flex flex-wrap items-center justify-between gap-x-6 gap-y-1"
              style="--line-delay: 60ms"
            >
              <p class="eyebrow">Portofolio · 2026</p>
              <p class="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                {{ site.location }} · <LocalClock />
              </p>
            </div>

            <h1 class="hero-name mt-6" :aria-label="site.name">
              <span class="hero-line" aria-hidden="true">
                <span
                  v-for="item in heroFirstLine"
                  :key="item.index"
                  class="hero-char"
                  :style="{ '--i': item.index }"
                >{{ item.char }}</span>
              </span>
              <span class="hero-line" aria-hidden="true">
                <span
                  v-for="item in heroMiddleName"
                  :key="item.index"
                  class="hero-char"
                  :style="{ '--i': item.index }"
                >{{ item.char }}</span>
                {{ ' ' }}
                <em class="accent relative inline-block">
                  <span
                    v-for="item in heroLastName"
                    :key="item.index"
                    class="hero-char"
                    :style="{ '--i': item.index }"
                  >{{ item.char }}</span>
                  <PencilStroke :delay="950" />
                </em>
              </span>
            </h1>

            <div v-draw="500" class="rule mt-8" aria-hidden="true" />

            <p
              class="hero-fade mt-6 max-w-lg text-sm leading-relaxed text-body sm:text-[0.95rem]"
              style="--line-delay: 620ms"
            >
              {{ site.tagline }}
            </p>

            <p
              class="hero-fade mt-4 font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.12em] text-muted"
              style="--line-delay: 680ms"
            >
              Web Developer · Laravel · D-IV Teknik Informatika
            </p>

            <div
              class="hero-fade mt-9 flex flex-wrap items-center gap-3"
              style="--line-delay: 740ms"
            >
              <NuxtLink to="/#projects" class="btn-primary">
                Lihat proyek
                <Icon name="lucide:arrow-down" class="h-3.5 w-3.5" aria-hidden="true" />
              </NuxtLink>

              <a
                :href="site.cv.href"
                :download="site.cv.filename"
                :aria-label="`Unduh CV ${site.name} (PDF)`"
                class="btn-secondary bg-page/60"
              >
                {{ site.cv.label }}
                <Icon name="lucide:download" class="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <dl
            class="hero-fade order-3 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-rule pt-7 sm:grid-cols-4 lg:order-none lg:col-span-2 lg:row-start-2 lg:mt-14"
            style="--line-delay: 820ms"
          >
            <div>
              <dt class="label">Pengalaman</dt>
              <dd class="mt-1.5 font-display text-lg text-ink sm:text-xl">1,5 tahun</dd>
            </div>
            <div>
              <dt class="label">Proyek</dt>
              <dd class="mt-1.5 font-display text-lg text-ink sm:text-xl">{{ projects.length }}</dd>
            </div>
            <div>
              <dt class="label">Fokus</dt>
              <dd class="mt-1.5 font-display text-lg text-ink sm:text-xl">Laravel</dd>
            </div>
            <div>
              <dt class="label">Pendidikan</dt>
              <dd class="mt-1.5 font-display text-lg text-ink sm:text-xl">D-IV Informatika</dd>
            </div>
          </dl>

          <div
            class="hero-fade order-2 mx-auto w-full max-w-[230px] lg:order-none lg:col-start-2 lg:row-start-1 lg:mx-0"
            style="--line-delay: 420ms"
          >
            <!-- Potret setengah badan di atas plat berpetak; kepala keluar dari bingkai. -->
            <figure class="portrait mx-auto max-w-[220px] lg:max-w-none">
              <div class="portrait-frame">
                <div class="portrait-plate" aria-hidden="true" />

                <div class="portrait-photo">
                  <ProfileImage
                    :src="site.photo"
                    :alt="site.photoAlt"
                    :initials="site.initials"
                    priority
                  />
                </div>

                <RoundStamp />
              </div>

              <figcaption class="portrait-caption">
                <span>Gbr. 01</span>
                <span>{{ site.shortName }}, Malang</span>
              </figcaption>
            </figure>

            <SocialLinks class="mt-8" size="sm" />
          </div>
        </div>
      </div>
    </section>

    <StackMarquee />

    <!-- ================= ABOUT ================= -->
    <SectionShell id="about" index="01" label="Tentang">
      <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_210px] lg:gap-14">
        <div class="min-w-0">
          <SectionHeading
            v-anim
            title="Belajar cepat,"
            accent="kerja disiplin."
          />

          <ScrubText v-anim="40" :text="site.description" />

          <div v-anim="80" class="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p class="label">Keahlian</p>

            <ul
              class="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted"
            >
              <li class="inline-flex items-center gap-1.5">
                <span class="h-2 w-2 rounded-[2px] bg-ink" aria-hidden="true" />
                Mahir
              </li>
              <li class="inline-flex items-center gap-1.5">
                <span class="h-2 w-2 rounded-[2px] border border-rule" aria-hidden="true" />
                Terbiasa
              </li>
              <li class="inline-flex items-center gap-1.5">
                <span
                  class="h-2 w-2 rounded-[2px] border border-dashed border-rule"
                  aria-hidden="true"
                />
                Sedang belajar
              </li>
            </ul>
          </div>

          <div v-anim="120" class="mt-4 border-t border-rule">
            <div
              v-for="group in skillGroups"
              :key="group.id"
              class="grid gap-2 border-b border-rule py-5 sm:grid-cols-[168px_minmax(0,1fr)] sm:gap-10"
            >
              <h3 class="label">{{ group.title }}</h3>

              <div>
                <ul class="flex flex-wrap gap-2">
                  <SkillBadge
                    v-for="skill in skillsByGroup(group.id)"
                    :key="skill.name"
                    :skill="skill"
                  />
                </ul>
                <p class="mt-2.5 text-xs leading-relaxed text-muted">
                  {{ group.description }}
                </p>
              </div>
            </div>

            <div class="grid gap-2 border-b border-rule py-5 sm:grid-cols-[168px_minmax(0,1fr)] sm:gap-10">
              <h3 class="label">Bahasa</h3>
              <ul class="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <li v-for="lang in site.languages" :key="lang.name">
                  <span class="font-medium text-ink">{{ lang.name }}</span>
                  <span class="text-muted"> — {{ lang.level }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <aside v-anim="160" class="lg:pt-1">
          <dl class="border-t border-rule">
            <div
              v-for="fact in facts"
              :key="fact.label"
              class="border-b border-rule py-3.5"
            >
              <dt class="label">{{ fact.label }}</dt>
              <dd class="mt-1.5 text-sm leading-snug text-ink">{{ fact.value }}</dd>
            </div>

            <div class="border-b border-rule py-3.5">
              <dt class="label">Email</dt>
              <dd class="mt-1.5 text-sm leading-snug">
                <a
                  :href="`mailto:${site.email}`"
                  class="break-all text-ink transition hover:text-brand-600 dark:hover:text-brand-300"
                >
                  {{ site.email }}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </SectionShell>

    <!-- ================= PROJECTS ================= -->
    <SectionShell id="projects" index="02" label="Proyek">
      <SectionHeading
        v-anim
        title="Yang pernah"
        accent="saya bangun."
        description="Sebagian proyek kuliah, sebagian lagi lahir dari kebutuhan nyata di sekitar. Pilih kategori untuk menyaring."
      />

      <div v-anim="80" class="mt-8 border-t border-rule pt-4">
        <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Filter kategori proyek">
          <button
            v-for="category in projectCategories"
            :key="category"
            type="button"
            class="chip"
            :class="activeCategory === category ? 'chip-active' : ''"
            :aria-pressed="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category }}
            <span class="tabular-nums opacity-60">{{ countByCategory(category) }}</span>
          </button>
        </div>
      </div>

      <ProjectLedger :projects="filteredProjects" />

      <p v-if="!filteredProjects.length" class="mt-10 text-sm text-muted">
        Belum ada proyek pada kategori ini.
      </p>
    </SectionShell>

    <!-- ================= EXPERIENCE ================= -->
    <SectionShell id="experience" index="03" label="Perjalanan">
      <SectionHeading
        v-anim
        title="Pengalaman &"
        accent="pendidikan."
        description="Rekam jejak yang membentuk cara saya bekerja: pengalaman kerja nyata, pendidikan, dan satu penghargaan di tingkat kampus."
      />

      <div v-anim="80" class="mt-9">
        <div
          class="relative flex w-full max-w-md overflow-hidden rounded-md border border-line"
          role="group"
          aria-label="Kategori perjalanan"
        >
          <span
            class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-ink transition-transform duration-300 ease-out"
            :style="{ transform: `translateX(${activeTrackIndex * 100}%)` }"
            aria-hidden="true"
          />

          <button
            v-for="track in tracks"
            :key="track.id"
            type="button"
            class="relative z-10 flex-1 px-2 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] transition-colors duration-200"
            :class="
              activeTrack === track.id ? 'text-page' : 'text-muted hover:text-ink'
            "
            :aria-pressed="activeTrack === track.id"
            @click="activeTrack = track.id"
          >
            {{ track.label }}
          </button>
        </div>
      </div>

      <ul :key="activeTrack" class="timeline-in mt-10 border-t border-rule">
        <TimelineCard
          v-for="entry in timelineEntries"
          :key="entry.id"
          :entry="entry"
        />
      </ul>
    </SectionShell>

    <!-- ================= CONTACT ================= -->
    <SectionShell id="contact" index="04" label="Kontak">
      <div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-16">
        <div class="min-w-0">
          <SectionHeading
            v-anim
            title="Punya proyek"
            accent="atau peluang?"
            pencil="circle"
            description="Silakan kirim pesan lewat form, atau salin email saya dan hubungi langsung. Saya terbuka untuk diskusi proyek, magang, maupun kolaborasi."
          />

          <ContactForm v-anim="80" class="mt-10" />
        </div>

        <aside v-anim="140">
          <dl class="border-t border-rule">
            <div class="border-b border-rule py-4">
              <dt class="label">Email</dt>
              <dd class="mt-1.5">
                <a
                  :href="`mailto:${site.email}`"
                  class="break-all text-sm text-ink transition hover:text-brand-600 dark:hover:text-brand-300"
                >
                  {{ site.email }}
                </a>
              </dd>
            </div>

            <div class="border-b border-rule py-4">
              <dt class="label">Lokasi</dt>
              <dd class="mt-1.5 text-sm text-body">{{ site.location }}</dd>
            </div>

            <div class="border-b border-rule py-4">
              <dt class="label">Media sosial</dt>
              <dd class="mt-3">
                <SocialLinks size="sm" />
              </dd>
            </div>
          </dl>

          <CopyEmailButton class="mt-6" />
        </aside>
      </div>
    </SectionShell>
  </div>
</template>
