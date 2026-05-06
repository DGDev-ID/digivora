<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Smartphone, LayoutDashboard, Palette, Cpu, BarChart3 } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t, lang } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

const iconMap = [Globe, Smartphone, LayoutDashboard, Palette, Cpu, BarChart3]

const services = computed(() =>
  t.value.services.items.map((item, i) => ({ ...item, icon: iconMap[i] })),
)

// Reset visible state on language change
watch(lang, async () => {
  await nextTick()
  if (!sectionRef.value) return
  gsap.set(sectionRef.value.querySelectorAll('.svc-word'), { yPercent: 0, opacity: 1 })
  gsap.set(sectionRef.value.querySelectorAll('.svc-card'), {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
  })
})

onMounted(() => {
  const ctx = gsap.context(() => {
    // Label
    gsap.from('.svc-label', {
      scrollTrigger: { trigger: '.svc-label', start: 'top 88%' },
      opacity: 0,
      x: -20,
      duration: 0.7,
      ease: 'power3.out',
    })

    // Headline word-by-word clip reveal
    const words = gsap.utils.toArray<HTMLElement>('.svc-word')
    words.forEach((word, i) => {
      gsap.fromTo(
        word,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          delay: i * 0.09,
          scrollTrigger: { trigger: '.svc-heading', start: 'top 82%' },
        },
      )
    })

    // Horizontal scan line that sweeps across the section
    gsap.fromTo(
      '.svc-scanline',
      { scaleX: 0, opacity: 1 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.svc-grid', start: 'top 82%' },
      },
    )

    // Cards stagger with clip-path reveal (masked from bottom)
    gsap.utils.toArray<HTMLElement>('.svc-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 70, clipPath: 'inset(100% 0% 0% 0%)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.85,
          ease: 'power3.out',
          delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.05,
          scrollTrigger: { trigger: '.svc-grid', start: 'top 72%' },
        },
      )
    })
  }, sectionRef.value!)
  return () => ctx.revert()
})
</script>

<template>
  <section id="services" ref="sectionRef" class="py-32 md:py-48 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <div class="svc-label flex items-center gap-4 mb-6">
            <div class="h-px w-8 bg-black"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase text-black/40">{{
              t.services.label
            }}</span>
          </div>
          <h2
            class="svc-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.15] tracking-tight text-black overflow-hidden"
          >
            <span class="flex flex-wrap gap-x-[0.25em] gap-y-1">
              <span
                v-for="w in t.services.headlineWords"
                :key="w"
                class="svc-word inline-block"
                :class="w === t.services.dimWord ? 'text-black/30' : ''"
                style="opacity: 0"
                >{{ w }}</span
              >
            </span>
          </h2>
        </div>
        <p class="max-w-xs text-base text-black/50 leading-relaxed font-light md:text-right">
          {{ t.services.sub }}
        </p>
      </div>

      <!-- Scan line -->
      <div
        class="svc-scanline h-px bg-black/15 w-full mb-0 origin-left"
        style="transform: scaleX(0)"
      ></div>

      <!-- Services Grid -->
      <div
        class="svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/10"
      >
        <div
          v-for="svc in services"
          :key="svc.num"
          class="svc-card group border-r border-b border-black/10 p-10 hover:bg-black transition-colors duration-500 cursor-default"
        >
          <!-- Number + Icon -->
          <div class="flex items-start justify-between mb-8">
            <span
              class="text-xs font-semibold tracking-[0.3em] uppercase text-black/25 group-hover:text-white/25 transition-colors duration-500"
            >
              {{ svc.num }}
            </span>
            <component
              :is="svc.icon"
              :size="22"
              class="text-black/30 group-hover:text-white/50 transition-colors duration-500"
            />
          </div>

          <!-- Title -->
          <h3
            class="text-xl font-semibold text-black group-hover:text-white mb-4 transition-colors duration-500"
          >
            {{ svc.title }}
          </h3>

          <!-- Desc -->
          <p
            class="text-sm text-black/55 group-hover:text-white/55 leading-relaxed mb-8 transition-colors duration-500"
          >
            {{ svc.desc }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in svc.tags"
              :key="tag"
              class="text-xs px-3 py-1 border border-black/15 text-black/50 group-hover:border-white/20 group-hover:text-white/50 transition-colors duration-500"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
