<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCountUp } from '@/composables/useCountUp'
import { useI18n } from '@/composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t, lang } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { run: runCountUp } = useCountUp()

const numRefs = ref<HTMLElement[]>([])
function setNumRef(el: unknown, i: number) {
  if (el) numRefs.value[i] = el as HTMLElement
}

const stats = computed(() => t.value.trust.stats)

watch(lang, async () => {
  await nextTick()
  if (!sectionRef.value) return
  gsap.set(sectionRef.value.querySelectorAll('.trust-stat'), { opacity: 1, y: 0 })
  gsap.set(sectionRef.value.querySelectorAll('.trust-ind'), { opacity: 1, y: 0 })
  const q = sectionRef.value.querySelector('.trust-quote')
  if (q) gsap.set(q, { opacity: 1, y: 0 })
})

onMounted(() => {
  const ctx = gsap.context(() => {
    // Stat cards slide up
    gsap.fromTo(
      '.trust-stat',
      { opacity: 0, y: 50 },
      {
        scrollTrigger: { trigger: '.trust-stats', start: 'top 78%' },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      },
    )

    // Industry tags stagger
    gsap.fromTo(
      '.trust-ind',
      { opacity: 0, y: 20 },
      {
        scrollTrigger: { trigger: '.trust-industries', start: 'top 80%' },
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.05,
      },
    )

    // Quote fade
    gsap.fromTo(
      '.trust-quote',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: { trigger: '.trust-quote', start: 'top 85%' },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      },
    )
  }, sectionRef.value!)

  // Count-up numbers triggered on scroll
  if (sectionRef.value) {
    const items = stats.value
      .map((s, i) => ({
        el: numRefs.value[i],
        target: s.num,
        suffix: s.suffix,
      }))
      .filter((item) => item.el != null)
    runCountUp(items as Parameters<typeof runCountUp>[0], sectionRef.value)
  }

  return () => ctx.revert()
})
</script>

<template>
  <section id="trust" ref="sectionRef" class="py-32 md:py-40 bg-white border-t border-black/8">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Label -->
      <div class="flex items-center gap-4 mb-16">
        <div class="h-px w-8 bg-black"></div>
        <span class="text-xs font-semibold tracking-[0.35em] uppercase text-black/40">{{
          t.trust.label
        }}</span>
      </div>

      <!-- Stats with count-up -->
      <div class="trust-stats grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/10">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="trust-stat bg-white p-10 flex flex-col justify-between"
          style="opacity: 0"
        >
          <div
            class="text-[clamp(2.5rem,4vw,4rem)] font-bold text-black leading-none mb-4 tabular-nums"
          >
            <span :ref="(el) => setNumRef(el, i)">{{ stat.num }}{{ stat.suffix }}</span>
          </div>
          <div>
            <div class="text-sm font-semibold text-black mb-2">{{ stat.label }}</div>
            <div class="text-xs text-black/40 leading-relaxed">{{ stat.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Industry tags -->
      <div class="trust-industries mt-20">
        <div
          class="text-xs font-semibold tracking-[0.35em] uppercase text-black/30 mb-8 text-center"
        >
          {{ t.trust.industriesLabel }}
        </div>
        <div class="flex flex-wrap justify-center gap-3">
          <span
            v-for="ind in t.trust.industries"
            :key="ind"
            class="trust-ind text-xs font-medium tracking-widest uppercase px-5 py-2.5 border border-black/15 text-black/60 hover:border-black hover:text-black transition-all duration-300 cursor-default"
            style="opacity: 0"
          >
            {{ ind }}
          </span>
        </div>
      </div>

      <!-- Quote -->
      <div class="trust-quote mt-24 border-t border-black/8 pt-16 text-center" style="opacity: 0">
        <p
          class="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-black/40 leading-relaxed max-w-4xl mx-auto italic"
        >
          <template v-for="(line, i) in t.trust.quote.split('\n')" :key="i">
            {{ line }}<br v-if="i < t.trust.quote.split('\n').length - 1" />
          </template>
        </p>
        <div class="mt-6 text-xs text-black/25 tracking-widest uppercase">
          {{ t.trust.quoteAttr }}
        </div>
      </div>
    </div>
  </section>
</template>
