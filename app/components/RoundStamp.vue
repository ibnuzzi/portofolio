<script setup lang="ts">
/**
 * Stempel bundar berisi status ketersediaan. Berputar mengikuti gulir,
 * dan tepinya sedikit kasar seperti cap tinta sungguhan.
 */
const root = ref<SVGSVGElement | null>(null)

useScrollFrame(() => {
  root.value?.style.setProperty('--turn', `${window.scrollY * 0.14}deg`)
})
</script>

<template>
  <div class="stamp" aria-hidden="true">
    <svg ref="root" viewBox="0 0 120 120">
      <defs>
        <path id="stamp-circle" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
        <filter id="stamp-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="1.5" />
        </filter>
      </defs>

      <g filter="url(#stamp-rough)" fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="57" stroke-width="1.6" />
        <circle cx="60" cy="60" r="34" stroke-width="0.8" />

        <g class="stamp-text">
          <text fill="currentColor" stroke="none" font-size="9" font-weight="500">
            <textPath href="#stamp-circle" textLength="277" lengthAdjust="spacing">
              TERBUKA UNTUK MAGANG · PROYEK · KOLABORASI ·
            </textPath>
          </text>
        </g>

        <text
          x="60"
          y="72"
          text-anchor="middle"
          fill="currentColor"
          stroke="none"
          font-size="36"
          class="stamp-mark"
        >
          Z.
        </text>
      </g>
    </svg>
  </div>
</template>
