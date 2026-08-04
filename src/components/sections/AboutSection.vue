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
  // Neural canvas background (dark teal theme)
  if (canvasRef.value) {
    initCanvas(canvasRef.value, {
      particleColor: 0x00BFA6,
      lineColor: 0x00BFA6,
      bgColor: 0x0B1312,
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
    class="relative py-32 md:py-48 overflow-hidden"
    style="background-color: #0B1312; border-bottom: 1px solid rgba(0,191,166,0.1);"
  >
    <!-- Neural canvas background — very subtle -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
    />

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Label -->
      <div class="about-label flex items-center gap-4 mb-16">
        <div class="h-px w-8" style="background-color: #00BFA6;"></div>
        <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.6);">{{
          t.about.label
        }}</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <!-- Left: Headline (clip-path word reveal) -->
        <div>
          <div class="about-headline-wrap pb-2">
            <h2
              class="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.15] tracking-tight flex flex-wrap gap-x-[0.3em] gap-y-1"
              style="color: #E5E7EB;"
            >
              <span
                v-for="word in headlineWords"
                :key="word"
                class="about-word inline-block overflow-hidden"
                :style="t.about.dimWords.includes(word) ? 'color: rgba(229,231,235,0.25);' : ''"
                style="transform: translateY(110%); opacity: 0"
                >{{ word }}</span
              >
            </h2>
          </div>
          <!-- Animated expanding line -->
          <div
            class="about-line mt-10 h-px w-full origin-left"
            style="background-color: rgba(0,191,166,0.3); transform: scaleX(0);"
          ></div>
        </div>

        <!-- Right: Body copy -->
        <div class="flex flex-col gap-6 pt-4">
          <p class="about-body text-lg leading-relaxed font-light" style="color: rgba(229,231,235,0.7);">
            {{ t.about.p1 }}
          </p>
          <p class="about-body text-base leading-relaxed font-light" style="color: rgba(229,231,235,0.5);">
            {{ t.about.p2 }}
          </p>
          <p class="about-body text-base leading-relaxed font-light" style="color: rgba(229,231,235,0.5);">
            {{ t.about.p3 }}
          </p>
        </div>
      </div>

      <!-- Values Grid -->
      <div
        class="about-values-grid mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
        style="border-top: 1px solid rgba(0,191,166,0.1); border-left: 1px solid rgba(0,191,166,0.1);"
      >
        <div
          v-for="val in values"
          :key="val.num"
          class="about-value p-8 cursor-default transition-colors duration-500"
          style="border-right: 1px solid rgba(0,191,166,0.1); border-bottom: 1px solid rgba(0,191,166,0.1); opacity: 0; background-color: transparent;"
          @mouseover="($event.currentTarget as HTMLElement).style.backgroundColor = '#11201F'"
          @mouseout="($event.currentTarget as HTMLElement).style.backgroundColor = 'transparent'"
        >
          <div
            class="text-xs font-semibold tracking-[0.3em] uppercase mb-6 transition-colors duration-500"
            style="color: rgba(0,191,166,0.4);"
          >
            {{ val.num }}
          </div>
          <h3
            class="text-base font-semibold mb-3 transition-colors duration-500"
            style="color: #E5E7EB;"
          >
            {{ val.label }}
          </h3>
          <p
            class="text-sm leading-relaxed transition-colors duration-500"
            style="color: rgba(229,231,235,0.45);"
          >
            {{ val.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
