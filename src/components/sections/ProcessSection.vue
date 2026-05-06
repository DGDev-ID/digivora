<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAntiBurst } from '@/composables/useAntiBurst'
import { useI18n } from '@/composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t, lang } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const { init: initCanvas, destroy: destroyCanvas } = useAntiBurst()

const steps = computed(() => t.value.process.steps)

watch(lang, async () => {
  await nextTick()
  if (!sectionRef.value) return
  gsap.set(sectionRef.value.querySelectorAll('.process-word'), { yPercent: 0, opacity: 1 })
  gsap.set(sectionRef.value.querySelectorAll('.process-node'), { scale: 1, opacity: 1 })
  gsap.set(sectionRef.value.querySelectorAll('.process-step'), { opacity: 1, y: 0 })
})

onMounted(() => {
  if (canvasRef.value) {
    initCanvas(canvasRef.value, {
      bgColor: 0x000000,
      count: 500,
      innerRadius: 4,
      outerRadius: 55,
      baseSize: 2.8,
      elementSized: true,
    })
  }

  const ctx = gsap.context(() => {
    gsap.from('.process-label', {
      scrollTrigger: { trigger: '.process-label', start: 'top 88%' },
      opacity: 0,
      x: -20,
      duration: 0.7,
      ease: 'power3.out',
    })

    // Word-split heading reveal
    const words = gsap.utils.toArray<HTMLElement>('.process-word')
    words.forEach((w, i) => {
      gsap.fromTo(
        w,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: '.process-heading-wrap', start: 'top 82%' },
        },
      )
    })

    // Connector line draws itself
    gsap.from('.process-connector', {
      scrollTrigger: { trigger: '.process-steps', start: 'top 78%' },
      scaleX: 0,
      duration: 1.8,
      ease: 'expo.inOut',
    })

    // Node circles pop in
    gsap.fromTo(
      '.process-node',
      { scale: 0, opacity: 0 },
      {
        scrollTrigger: { trigger: '.process-steps', start: 'top 78%' },
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.15,
        delay: 0.5,
      },
    )

    // Step text stagger
    gsap.fromTo(
      '.process-step',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: { trigger: '.process-steps', start: 'top 72%' },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.8,
      },
    )
  }, sectionRef.value!)
  return () => ctx.revert()
})

onUnmounted(() => destroyCanvas())
</script>

<template>
  <section id="process" ref="sectionRef" class="relative py-32 md:py-48 bg-black overflow-hidden">
    <!-- Neural canvas background -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none opacity-50" />

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <div class="process-label flex items-center gap-4 mb-6">
            <div class="h-px w-8 bg-white/40"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase text-white/30">{{
              t.process.label
            }}</span>
          </div>
          <div class="process-heading-wrap overflow-hidden pb-2">
            <h2
              class="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.15] tracking-tight text-white flex flex-wrap gap-x-[0.3em]"
            >
              <span
                v-for="w in t.process.headlineWords"
                :key="w"
                class="process-word inline-block"
                :class="w === t.process.dimWord ? 'text-white/25' : ''"
                style="opacity: 0"
                >{{ w }}</span
              >
            </h2>
          </div>
        </div>
        <p class="max-w-xs text-sm text-white/40 leading-relaxed font-light md:text-right">
          {{ t.process.sub }}
        </p>
      </div>

      <!-- Desktop: Horizontal Steps -->
      <div class="process-steps hidden lg:block">
        <div class="relative mb-12">
          <div
            class="process-connector absolute top-1/2 left-0 right-0 h-px bg-white/15 origin-left"
            style="transform: scaleX(0)"
          ></div>
          <div class="flex justify-between relative z-10">
            <div
              v-for="step in steps"
              :key="step.num"
              class="flex flex-col items-center"
              style="width: calc(100% / 6)"
            >
              <div
                class="process-node w-10 h-10 border border-white/30 bg-black flex items-center justify-center"
                style="transform: scale(0); opacity: 0"
              >
                <span class="text-xs text-white/50 font-semibold tracking-wider">{{
                  step.num
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div
            v-for="step in steps"
            :key="step.num"
            class="process-step flex-1 px-4 border-l border-white/8 first:border-l-0"
            style="opacity: 0"
          >
            <h3 class="text-base font-semibold text-white mb-3">{{ step.title }}</h3>
            <p class="text-xs text-white/40 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Mobile: Vertical Steps -->
      <div class="process-steps lg:hidden flex flex-col gap-0 border-t border-white/10">
        <div
          v-for="step in steps"
          :key="step.num"
          class="process-step flex items-start gap-8 py-8 border-b border-white/10"
        >
          <div class="shrink-0">
            <div
              class="process-node w-10 h-10 border border-white/20 flex items-center justify-center"
            >
              <span class="text-xs text-white/40 font-semibold">{{ step.num }}</span>
            </div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-white mb-2">{{ step.title }}</h3>
            <p class="text-sm text-white/40 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
