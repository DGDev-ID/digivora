<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCountUp } from '@/composables/useCountUp'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const { run: runCountUp } = useCountUp()

const numRefs = ref<HTMLElement[]>([])
function setNumRef(el: unknown, i: number) {
  if (el) numRefs.value[i] = el as HTMLElement
}

const stats = [
  {num:20,suffix:'+',label:'Projects Delivered',desc:'Across multiple industries'},
  {num:10,suffix:'+',label:'Global Clients',desc:'Trusting our engineering'},
  {num:99,suffix:'%',label:'Satisfaction Rate',desc:'Based on client feedback'}
]


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
    const items = stats
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
  <section id="trust" ref="sectionRef" class="py-32 md:py-40" style="background-color: #11201F; border-top: 1px solid rgba(0,191,166,0.1);">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Label -->
      <div class="flex items-center gap-4 mb-16">
        <div class="h-px w-8" style="background-color: #00BFA6;"></div>
        <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.6);">Trusted By</span>
      </div>

      <!-- Stats with count-up -->
      <div class="trust-stats grid grid-cols-2 lg:grid-cols-4 gap-px" style="background-color: rgba(0,191,166,0.1);">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="trust-stat p-10 flex flex-col justify-between"
          style="background-color: #11201F; opacity: 0;"
        >
          <div
            class="text-[clamp(2.5rem,4vw,4rem)] font-bold leading-none mb-4 tabular-nums"
            style="color: #00BFA6;"
          >
            <span :ref="(el) => setNumRef(el, i)">{{ stat.num }}{{ stat.suffix }}</span>
          </div>
          <div>
            <div class="text-sm font-semibold mb-2" style="color: #E5E7EB;">{{ stat.label }}</div>
            <div class="text-xs leading-relaxed" style="color: rgba(229,231,235,0.38);">{{ stat.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Industry tags -->
      <div class="trust-industries mt-20">
        <div
          class="text-xs font-semibold tracking-[0.35em] uppercase mb-8 text-center"
          style="color: rgba(0,191,166,0.4);"
        >
          Industries We Serve
        </div>
        <div class="flex flex-wrap justify-center gap-3">
          <span
            v-for="ind in ['Finance', 'Healthcare', 'E-Commerce', 'SaaS', 'Education', 'Logistics']"
            :key="ind"
            class="trust-ind text-xs font-medium tracking-widest uppercase px-5 py-2.5 cursor-default transition-all duration-300 hover:text-[#00BFA6] hover:border-[#00BFA6]"
            style="border: 1px solid rgba(0,191,166,0.2); color: rgba(229,231,235,0.55); opacity: 0;"
          >
            {{ ind }}
          </span>
        </div>
      </div>

      <!-- Quote -->
      <div class="trust-quote mt-24 pt-16 text-center" style="border-top: 1px solid rgba(0,191,166,0.1); opacity: 0;">
        <p
          class="text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-relaxed max-w-4xl mx-auto italic"
          style="color: rgba(229,231,235,0.35);"
        >
          Technology is only as good<br />as the business value it creates.
        </p>
        <div class="mt-6 text-xs tracking-widest uppercase" style="color: rgba(0,191,166,0.3);">
          - Digivora Engineering Standard
        </div>
      </div>
    </div>
  </section>
</template>
