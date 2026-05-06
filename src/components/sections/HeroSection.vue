<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowRight, ChevronDown } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { useAntiBurst } from '@/composables/useAntiBurst'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const canvasEl = ref<HTMLCanvasElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const { init: initThree, destroy: destroyThree } = useAntiBurst()

function scrollTo(id: string) {
  const el = document.querySelector(id)
  el?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  if (canvasEl.value) {
    initThree(canvasEl.value)
  }

  // GSAP entrance animation
  const tl = gsap.timeline({ delay: 0.3 })
  tl.fromTo(
    '.hero-headline-1',
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
  )
    .fromTo(
      '.hero-headline-2',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.7',
    )
    .fromTo(
      '.hero-sub',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4',
    )
    .fromTo(
      '.hero-ctas',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3',
    )
    .fromTo(
      '.hero-divider',
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power3.inOut' },
      '-=0.2',
    )
    .fromTo(
      '.hero-eyebrow',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
      '-=0.4',
    )
    .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3')

  // Scroll parallax — only content, not canvas (canvas stays full-bleed)
  function onScroll() {
    if (!heroRef.value) return
    const scrollY = window.scrollY
    gsap.set('.hero-content', { y: scrollY * 0.25 })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

onUnmounted(() => {
  destroyThree()
})
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative w-full h-screen min-h-[700px] overflow-hidden bg-black flex items-center"
  >
    <!-- Three.js Canvas -->
    <canvas ref="canvasEl" class="absolute inset-0 w-full h-full" />

    <!-- Gradient overlay — bottom fade to black -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60 pointer-events-none"
    />
    <!-- Left vignette -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none"
    />

    <!-- Content -->
    <div class="hero-content relative z-10 max-w-7xl mx-auto px-6 w-full pt-10">
      <!-- Main Headline -->
      <h1 class="text-white">
        <span
          class="hero-headline-1 block text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.9] tracking-tight opacity-0"
        >
          {{ t.hero.line1 }}
        </span>
        <span
          class="hero-headline-2 block text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.9] tracking-tight opacity-0"
        >
          <em class="not-italic text-white/30">{{ t.hero.line2word1 }}</em> {{ t.hero.line2word2 }}
        </span>
      </h1>

      <!-- Divider -->
      <div
        class="hero-divider mt-10 mb-8 h-px w-32 bg-white/30 origin-left"
        style="transform: scaleX(0)"
      ></div>

      <!-- Subheadline -->
      <p
        class="hero-sub max-w-lg text-white/60 text-base md:text-lg leading-relaxed font-light opacity-0"
      >
        {{ t.hero.sub.split('\n')[0] }}<br />{{ t.hero.sub.split('\n')[1] }}
      </p>

      <!-- CTAs -->
      <div class="hero-ctas flex flex-wrap items-center gap-4 mt-10 opacity-0">
        <a
          href="#services"
          class="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-all duration-300"
          @click.prevent="scrollTo('#services')"
        >
          {{ t.hero.cta1 }}
          <ArrowRight
            :size="16"
            class="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
        <a
          href="#portfolio"
          class="group inline-flex items-center gap-3 px-8 py-4 border border-white/40 text-white text-sm font-semibold tracking-[0.15em] uppercase hover:border-white hover:bg-white/5 transition-all duration-300"
          @click.prevent="scrollTo('#portfolio')"
        >
          {{ t.hero.cta2 }}
          <ArrowRight
            :size="16"
            class="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>

      <!-- Stats row + Eyebrow -->
      <div
        class="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-10"
      >
        <!-- Stats -->
        <div class="flex flex-wrap gap-10">
          <div
            v-for="stat in [
              { value: '20+', label: 'Projects Delivered' },
              { value: '10+', label: 'Industries Served' },
              { value: '99%', label: 'Client Satisfaction' },
            ]"
            :key="stat.label"
            class="hero-eyebrow"
          >
            <div class="text-2xl font-bold text-white">{{ stat.value }}</div>
            <div class="text-xs text-white/40 tracking-widest uppercase mt-1">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Eyebrow — pojok kanan bawah -->
        <div class="hero-eyebrow hidden md:flex items-center gap-3 opacity-0">
          <div class="h-px w-8 bg-white/30"></div>
          <span class="text-xs font-medium tracking-[0.3em] uppercase text-white/40">
            Digivora Solution Technology
          </span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      class="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
    >
      <span class="text-xs text-white/30 tracking-[0.3em] uppercase">Scroll</span>
      <ChevronDown :size="16" class="text-white/30 animate-bounce" />
    </div>
  </section>
</template>
