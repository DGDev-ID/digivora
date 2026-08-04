<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Mail } from 'lucide-vue-next'
import { useNeuralCanvas } from '@/composables/useNeuralCanvas'
import { useI18n } from '@/composables/useI18n'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const { t, lang } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const { init: initCanvas, destroy: destroyCanvas } = useNeuralCanvas()

const line1Words = computed(() => t.value.cta.line1)
const line2Words = computed(() => t.value.cta.line2)
const line3Words = computed(() => t.value.cta.line3)

watch(lang, async () => {
  await nextTick()
  if (!sectionRef.value) return
  gsap.set(sectionRef.value.querySelectorAll('.cta-word'), { yPercent: 0, opacity: 1 })
})

onMounted(() => {
  if (canvasRef.value) {
    initCanvas(canvasRef.value, {
      particleColor: 0x00BFA6,
      lineColor: 0x11201F,
      bgColor: 0x0B1312,
      count: 130,
      linkDist: 0.2,
    })
  }

  const ctx = gsap.context(() => {
    // Word clip-path reveal
    gsap.from('.cta-word', {
      scrollTrigger: { trigger: sectionRef.value, start: 'top 72%' },
      yPercent: 110,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.06,
    })

    gsap.from('.cta-sub', {
      scrollTrigger: { trigger: '.cta-sub', start: 'top 85%' },
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.2,
    })

    gsap.from('.cta-actions', {
      scrollTrigger: { trigger: '.cta-actions', start: 'top 90%' },
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
    })
  }, sectionRef.value!)

  return () => ctx.revert()
})

onUnmounted(() => destroyCanvas())
</script>

<template>
  <section id="cta" ref="sectionRef" class="py-40 md:py-56 overflow-hidden relative" style="background-color: #0B1312;">
    <!-- Neural canvas background -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
    ></canvas>
    <!-- Teal radial glow -->
    <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at center, rgba(0,191,166,0.07) 0%, transparent 60%);"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Label -->
      <div class="flex items-center gap-4 mb-16 justify-center">
        <div class="h-px w-8" style="background-color: rgba(0,191,166,0.35);"></div>
        <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.5);">{{
          t.cta.label
        }}</span>
        <div class="h-px w-8" style="background-color: rgba(0,191,166,0.35);"></div>
      </div>

      <!-- Headline with word-by-word reveal -->
      <div class="text-center overflow-hidden">
        <div class="flex flex-wrap justify-center gap-x-6">
          <div v-for="word in line1Words" :key="'l1-' + word" class="overflow-hidden">
            <span
              class="cta-word inline-block text-[clamp(2.5rem,7vw,7rem)] font-bold leading-[0.95] tracking-tight"
              style="color: #E5E7EB;"
              >{{ word }}</span
            >
          </div>
        </div>
        <div class="flex flex-wrap justify-center gap-x-6">
          <div v-for="word in line2Words" :key="'l2-' + word" class="overflow-hidden">
            <span
              class="cta-word inline-block text-[clamp(2.5rem,7vw,7rem)] font-bold leading-[0.95] tracking-tight"
              style="color: rgba(0,191,166,0.35);"
              >{{ word }}</span
            >
          </div>
        </div>
        <div class="flex flex-wrap justify-center gap-x-6 mb-12">
          <div v-for="word in line3Words" :key="'l3-' + word" class="overflow-hidden">
            <span
              class="cta-word inline-block text-[clamp(2.5rem,7vw,7rem)] font-bold leading-[0.95] tracking-tight"
              style="color: #E5E7EB;"
              >{{ word }}</span
            >
          </div>
        </div>

        <p
          class="cta-sub text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed mb-14"
          style="color: rgba(229,231,235,0.45);"
        >
          {{ t.cta.sub }}
        </p>

        <!-- Actions -->
        <div class="cta-actions flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink
            to="/contact"
            class="group inline-flex items-center gap-3 px-10 py-5 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
            style="background-color: #00BFA6; color: #0B1312;"
          >
            <Mail :size="16" />
            {{ t.cta.email }}
            <ArrowRight
              :size="16"
              class="transition-transform duration-300 group-hover:translate-x-1"
            />
          </RouterLink>
          <a
            href="mailto:hello@digivora.id"
            class="group inline-flex items-center gap-3 px-10 py-5 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#00BFA6]/10 hover:border-[#00BFA6]"
            style="border: 1px solid rgba(0,191,166,0.3); color: #E5E7EB;"
          >
            hello@digivora.id
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
