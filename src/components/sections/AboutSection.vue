<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNeuralCanvas } from '@/composables/useNeuralCanvas'
import { useI18n } from '@/composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t, lang } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const { init: initCanvas, destroy: destroyCanvas } = useNeuralCanvas()

onMounted(() => {
  // Subtle neural canvas background (light theme — dark dots on white)
  if (canvasRef.value) {
    initCanvas(canvasRef.value, {
      particleColor: 0x000000,
      lineColor: 0x000000,
      bgColor: 0xffffff,
      count: 80,
      linkDist: 0.22,
    })
  }

  const ctx = gsap.context(() => {
    // Label slide in
    gsap.from('.about-label', {
      scrollTrigger: { trigger: '.about-label', start: 'top 88%' },
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Headline — clip-path word-by-word reveal (antigravity style)
    const words = gsap.utils.toArray<HTMLElement>('.about-word')
    words.forEach((word, i) => {
      gsap.fromTo(
        word,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: '.about-headline-wrap', start: 'top 82%' },
        },
      )
    })

    // Expanding divider line
    gsap.from('.about-line', {
      scrollTrigger: { trigger: '.about-line', start: 'top 85%' },
      scaleX: 0,
      duration: 1.4,
      ease: 'expo.inOut',
    })

    // Body paragraphs — stagger fade up
    gsap.from('.about-body', {
      scrollTrigger: { trigger: '.about-body', start: 'top 82%' },
      opacity: 0,
      y: 35,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
    })

    // Value cards — stagger lift with slight rotation
    gsap.fromTo(
      '.about-value',
      { opacity: 0, y: 50, rotateX: 8 },
      {
        scrollTrigger: { trigger: '.about-values-grid', start: 'top 78%' },
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        transformOrigin: 'top center',
      },
    )
  }, sectionRef.value!)

  return () => ctx.revert()
})

onUnmounted(() => destroyCanvas())

// When language switches, force all animated elements to their final visible state
// (GSAP ScrollTrigger won't re-run, so we must manually reveal them)
watch(lang, async () => {
  await nextTick()
  if (!sectionRef.value) return
  gsap.set(sectionRef.value.querySelectorAll('.about-word'), { yPercent: 0, opacity: 1 })
  gsap.set(sectionRef.value.querySelectorAll('.about-value'), { opacity: 1, y: 0, rotateX: 0 })
})

const values = computed(() => t.value.about.values)
const headlineWords = computed(() => t.value.about.headlineWords)
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="relative py-32 md:py-48 bg-white border-b border-black/8 overflow-hidden"
  >
    <!-- Neural canvas background — very subtle -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
    />

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Label -->
      <div class="about-label flex items-center gap-4 mb-16">
        <div class="h-px w-8 bg-black"></div>
        <span class="text-xs font-semibold tracking-[0.35em] uppercase text-black/40">{{
          t.about.label
        }}</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <!-- Left: Headline (clip-path word reveal) -->
        <div>
          <div class="about-headline-wrap pb-2">
            <h2
              class="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.15] tracking-tight text-black flex flex-wrap gap-x-[0.3em] gap-y-1"
            >
              <span
                v-for="word in headlineWords"
                :key="word"
                class="about-word inline-block overflow-hidden"
                :class="t.about.dimWords.includes(word) ? 'text-black/30' : ''"
                style="transform: translateY(110%); opacity: 0"
                >{{ word }}</span
              >
            </h2>
          </div>
          <!-- Animated expanding line -->
          <div
            class="about-line mt-10 h-px w-full bg-black origin-left"
            style="transform: scaleX(0)"
          ></div>
        </div>

        <!-- Right: Body copy -->
        <div class="flex flex-col gap-6 pt-4">
          <p class="about-body text-lg text-black/70 leading-relaxed font-light">
            {{ t.about.p1 }}
          </p>
          <p class="about-body text-base text-black/50 leading-relaxed font-light">
            {{ t.about.p2 }}
          </p>
          <p class="about-body text-base text-black/50 leading-relaxed font-light">
            {{ t.about.p3 }}
          </p>
        </div>
      </div>

      <!-- Values Grid -->
      <div
        class="about-values-grid mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-black/8"
      >
        <div
          v-for="val in values"
          :key="val.num"
          class="about-value border-r border-b border-black/8 p-8 group hover:bg-black hover:text-white transition-colors duration-500 cursor-default"
          style="opacity: 0"
        >
          <div
            class="text-xs font-semibold tracking-[0.3em] uppercase text-black/30 group-hover:text-white/30 mb-6 transition-colors duration-500"
          >
            {{ val.num }}
          </div>
          <h3
            class="text-base font-semibold text-black group-hover:text-white mb-3 transition-colors duration-500"
          >
            {{ val.label }}
          </h3>
          <p
            class="text-sm text-black/50 group-hover:text-white/50 leading-relaxed transition-colors duration-500"
          >
            {{ val.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
