<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Smartphone, LayoutDashboard, Palette, Cpu, BarChart3, ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const { t, lang } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

const iconMap = [Globe, Smartphone, LayoutDashboard, Palette, Cpu, BarChart3]

// Unsplash images per service
const serviceImages = [
  'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
]

const services = computed(() =>
  t.value.services.items.map((item, i) => ({ ...item, icon: iconMap[i], img: serviceImages[i] })),
)

watch(lang, async () => {
  await nextTick()
  if (!sectionRef.value) return
  gsap.set(sectionRef.value.querySelectorAll('.svc-word'), { yPercent: 0, opacity: 1 })
  gsap.set(sectionRef.value.querySelectorAll('.svc-card'), { opacity: 1, y: 0 })
})

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('.svc-label', {
      scrollTrigger: { trigger: '.svc-label', start: 'top 88%' },
      opacity: 0, x: -20, duration: 0.7, ease: 'power3.out',
    })

    const words = gsap.utils.toArray<HTMLElement>('.svc-word')
    words.forEach((word, i) => {
      gsap.fromTo(word,
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: i * 0.09,
          scrollTrigger: { trigger: '.svc-heading', start: 'top 82%' } },
      )
    })

    gsap.utils.toArray<HTMLElement>('.svc-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          delay: (i % 3) * 0.1,
          scrollTrigger: { trigger: '.svc-grid', start: 'top 75%' } },
      )
    })
  }, sectionRef.value!)
  return () => ctx.revert()
})
</script>

<template>
  <section id="services" ref="sectionRef" class="py-32 md:py-48" style="background-color: #0B1312;">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div class="svc-label flex items-center gap-4 mb-6">
            <div class="h-px w-8" style="background-color: #00BFA6;"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">{{ t.services.label }}</span>
          </div>
          <h2 class="svc-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight overflow-hidden" style="color: #E5E7EB;">
            <span class="flex flex-wrap gap-x-[0.25em] gap-y-1">
              <span
                v-for="w in t.services.headlineWords" :key="w"
                class="svc-word inline-block"
                :style="w === t.services.dimWord ? 'color: rgba(229,231,235,0.2);' : ''"
                style="opacity: 0"
              >{{ w }}</span>
            </span>
          </h2>
        </div>
        <div class="flex flex-col gap-4 md:items-end">
          <p class="max-w-xs text-base leading-relaxed font-light md:text-right" style="color: rgba(229,231,235,0.45);">
            {{ t.services.sub }}
          </p>
          <RouterLink to="/services" class="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#26C6B7]" style="color: #00BFA6;">
            View All Services <ArrowUpRight :size="14" />
          </RouterLink>
        </div>
      </div>

      <!-- Service Cards Grid — Violetindo Style with Images -->
      <div class="svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RouterLink
          v-for="svc in services"
          :key="svc.num"
          to="/services"
          class="svc-card group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer"
          style="min-height: 280px; background-color: #11201F;"
        >
          <!-- Background image (hidden, revealed on hover) -->
          <div class="absolute inset-0 z-0 overflow-hidden">
            <img
              :src="svc.img"
              :alt="svc.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] scale-100 group-hover:scale-110"
              loading="lazy"
            />
            <!-- Dark overlay on default -->
            <div class="absolute inset-0 transition-all duration-700"
              style="background: rgba(11,19,18,0.88);"
              :class="'group-hover:opacity-0'"
            ></div>
            <!-- Gradient overlay on hover -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style="background: linear-gradient(to top, rgba(11,19,18,0.95) 0%, rgba(11,19,18,0.4) 50%, rgba(11,19,18,0.2) 100%);"
            ></div>
            <!-- Teal-colored overlay layer on default -->
            <div class="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
              style="background: rgba(0,191,166,0.04);"
            ></div>
          </div>

          <!-- Teal border glow on hover -->
          <div class="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none z-10"
            style="border: 1px solid rgba(0,191,166,0.15);"
          ></div>
          <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-10"
            style="box-shadow: inset 0 0 0 1px rgba(0,191,166,0.5), 0 0 30px rgba(0,191,166,0.15);"
          ></div>

          <!-- Content -->
          <div class="relative z-20 flex flex-col justify-between h-full p-8">
            <!-- Top: icon + number -->
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-[rgba(0,191,166,0.2)]"
                style="background: rgba(0,191,166,0.1);">
                <component :is="svc.icon" :size="22" style="color: #00BFA6;" />
              </div>
              <span class="text-xs font-bold tracking-[0.3em]" style="color: rgba(0,191,166,0.4);">{{ svc.num }}</span>
            </div>

            <!-- Bottom: title + desc + tags -->
            <div>
              <h3 class="text-xl font-semibold mb-3 transition-colors duration-500" style="color: #E5E7EB;">
                {{ svc.title }}
              </h3>
              <p class="text-sm leading-relaxed mb-5 transition-all duration-500 line-clamp-2" style="color: rgba(229,231,235,0.5);">
                {{ svc.desc }}
              </p>
              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in svc.tags" :key="tag"
                  class="text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wider transition-all duration-500"
                  style="border: 1px solid rgba(0,191,166,0.25); color: rgba(0,191,166,0.7);"
                >{{ tag }}</span>
              </div>
              <!-- Learn more -->
              <div class="flex items-center gap-2 mt-5 transition-all duration-500">
                <div class="h-px transition-all duration-500 group-hover:w-8" style="width: 18px; background: rgba(0,191,166,0.5);"></div>
                <span class="text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors duration-500 group-hover:text-[#00BFA6]" style="color: rgba(229,231,235,0.35);">Learn More</span>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
