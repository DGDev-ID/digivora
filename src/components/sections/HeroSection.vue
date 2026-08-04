<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowRight, ChevronDown } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { useDotWave } from '@/composables/useDotWave'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const canvasEl = ref<HTMLCanvasElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const { init: initThree, destroy: destroyThree } = useDotWave()

onMounted(() => {
  if (canvasEl.value) {
    initThree(canvasEl.value, {
      color: 0x00bfa6,
      cols: 120,
      rows: 40,
      dotSize: 2.2,
      amplitude: 1.5,
      speed: 0.5,
    })
  }

  const tl = gsap.timeline({ delay: 0.3 })
  tl.fromTo(
    '.hero-sub-badge',
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
  )
    .fromTo(
      '.hero-headline-1',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.5',
    )
    .fromTo(
      '.hero-headline-2',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.7',
    )
    .fromTo(
      '.hero-sub-text',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5',
    )
    .fromTo(
      '.hero-ctas',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4',
    )
    .fromTo(
      '.hero-divider',
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power3.inOut' },
      '-=0.4',
    )
    .fromTo(
      '.hero-eyebrow',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
      '-=0.4',
    )
    .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3')

  // Scroll parallax
  function onScroll() {
    if (!heroRef.value) return
    const scrollY = window.scrollY
    gsap.set('.hero-content', { y: scrollY * 0.25 })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
})

onUnmounted(() => {
  destroyThree()
})
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    style="background-color: #0b1312"
  >
    <!-- Three.js Canvas (Dot Wave) -->
    <canvas ref="canvasEl" class="absolute inset-0 w-full h-full pointer-events-none" />

    <!-- Gradient overlays -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="
        background: linear-gradient(
          to bottom,
          transparent 40%,
          rgba(11, 19, 18, 0.7) 70%,
          #0b1312 100%
        );
      "
    />
    <div
      class="absolute inset-0 pointer-events-none"
      style="
        background: radial-gradient(circle at center, transparent 30%, rgba(11, 19, 18, 0.8) 100%);
      "
    />

    <!-- Teal glow accent -->
    <div
      class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
      style="background: radial-gradient(circle, rgba(0, 191, 166, 0.08) 0%, transparent 65%)"
    ></div>

    <!-- Content (Centered) -->
    <div
      class="hero-content relative z-10 max-w-5xl mx-auto px-6 w-full pt-32 pb-20 text-center flex flex-col items-center"
    >
      <!-- Logo & Headline -->
      <div class="mb-12 flex flex-col items-center">
        <div class="hero-headline-1 opacity-0 mb-6 flex justify-center w-full relative">
          <!-- Glow effect behind the logo -->
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full blur-[60px] opacity-20 animate-pulse pointer-events-none"
            style="background: #00bfa6"
          ></div>

          <!-- The Logo Mark -->
          <img
            src="/logo-digivora.svg"
            alt="Digivora Logo"
            class="relative z-10 h-28 md:h-32 lg:h-40 w-auto drop-shadow-[0_0_20px_rgba(0,191,166,0.4)] transition-all duration-700 ease-out hover:scale-110 hover:rotate-3 hover:drop-shadow-[0_0_30px_rgba(0,191,166,0.6)]"
          />
        </div>

        <h1
          class="hero-headline-2 opacity-0 flex items-center justify-center gap-3 text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-widest text-[#E5E7EB] mt-2 font-sans"
        >
          DIGIVORA
          <span style="color: #00bfa6; font-weight: 300">ID</span>
        </h1>
      </div>

      <!-- Sub text (DIGITAL SOLUTIONS, REAL IMPACT) -->
      <h2
        class="hero-sub-text opacity-0 text-[clamp(0.8rem,2vw,1.2rem)] font-semibold tracking-[0.3em] uppercase mb-16 font-sans"
        style="color: #e5e7eb"
      >
        Digital Solutions, <span style="color: #00bfa6">Real Impact</span>
      </h2>

      <!-- CTAs -->
      <div class="hero-ctas flex flex-wrap justify-center items-center gap-4 opacity-0">
        <RouterLink
          to="/services"
          class="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-90 rounded-xl"
          style="background-color: #00bfa6; color: #0b1312"
        >
          {{ t.hero.cta1 }}
          <ArrowRight
            :size="16"
            class="transition-transform duration-300 group-hover:translate-x-1"
          />
        </RouterLink>
        <RouterLink
          to="/portfolio"
          class="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#00BFA6]/10 hover:border-[#00BFA6] rounded-xl"
          style="border: 1px solid rgba(0, 191, 166, 0.35); color: #e5e7eb"
        >
          {{ t.hero.cta2 }}
          <ArrowRight
            :size="16"
            class="transition-transform duration-300 group-hover:translate-x-1"
          />
        </RouterLink>
      </div>

      <!-- Divider + Stats -->
      <div
        class="mt-16 pt-10 flex flex-wrap justify-center gap-12 sm:gap-20 w-full max-w-3xl mx-auto hero-divider"
        style="border-top: 1px solid rgba(0, 191, 166, 0.1)"
      >
        <div
          v-for="stat in [
            { value: '20+', label: 'Projects Delivered' },
            { value: '10+', label: 'Industries' },
            { value: '99%', label: 'Satisfaction' },
          ]"
          :key="stat.label"
          class="hero-eyebrow"
        >
          <div class="text-3xl font-bold" style="color: #e5e7eb">{{ stat.value }}</div>
          <div
            class="text-[10px] tracking-widest uppercase mt-2"
            style="color: rgba(0, 191, 166, 0.6)"
          >
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      class="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-10"
    >
      <span class="text-xs tracking-[0.3em] uppercase" style="color: rgba(0, 191, 166, 0.4)"
        >Scroll</span
      >
      <ChevronDown :size="16" class="animate-bounce" style="color: rgba(0, 191, 166, 0.4)" />
    </div>
  </section>
</template>

<style scoped></style>
