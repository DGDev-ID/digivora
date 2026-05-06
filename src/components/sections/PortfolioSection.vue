<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

/**
 * Microlink screenshot API — free, no key required.
 * viewport 1440×900 + waitFor 1500ms agar hero sempat render sebelum di-capture.
 */
function screenshotUrl(siteUrl: string) {
  const encoded = encodeURIComponent(siteUrl)
  return (
    `https://api.microlink.io/?url=${encoded}` +
    `&screenshot=true&meta=false&embed=screenshot.url` +
    `&viewport.width=1440&viewport.height=900` +
    `&waitFor=2500`
  )
}

// Curated project list for Arletta and related builds
const projects = computed(() => [
  {
    id: '01',
    title: 'Arletta Prime Luxury',
    category: 'Parent Platform',
    tech: 'Vue 3',
    year: '2026',
    size: 'large',
    url: 'https://arlettaluxury.com/',
    imgPosition: '50% 30%', // tunjukkan bagian hero tengah
  },
  {
    id: '02',
    title: 'Arletta Gym',
    category: 'Fitness',
    tech: 'Vue 3 · Inertia · Laravel Monolith',
    year: '2026',
    size: 'small',
    url: 'https://gym.arlettaluxury.com/',
    imgPosition: '50% 25%', // hero gym sering gelap karena full-screen video/bg
  },
  {
    id: '03',
    title: 'Arletta Cafe',
    category: 'F&B',
    tech: 'Vue 3 · Inertia · Laravel Monolith',
    year: '2026',
    size: 'small',
    url: 'https://cafe.arlettaluxury.com/',
    imgPosition: '50% 30%',
  },
  {
    id: '04',
    title: 'Arletta Cozy',
    category: 'Kost Platform',
    tech: 'Vue 3 · Inertia · Laravel Monolith',
    year: '2026',
    size: 'large',
    url: 'https://kost.arlettaluxury.com/',
    imgPosition: '0% 60%', // hero sedikit ke bawah agar tidak terpotong navbar
  },
  {
    id: '05',
    title: 'Aksara Media Promosi',
    category: 'Media & Promotions',
    tech: 'Vue 3 · Inertia · Laravel Monolith',
    year: '2026',
    size: 'large',
    url: 'https://aksaramediapromosi.vercel.app/',
    imgPosition: '50% 25%', // tunjukkan hero, hindari footer floating
  },
  {
    id: '06',
    title: 'Joyze Digital Agency',
    category: 'Agency',
    tech: 'Nuxt · Laravel',
    year: '2025',
    size: 'small',
    url: 'https://joyze.my.id/',
    imgPosition: '0% 25%', // hero joyze
  },
])

function gradientFor(id: string) {
  switch (id) {
    case '01':
      return 'from-zinc-200 to-zinc-400'
    case '02':
      return 'from-neutral-100 to-stone-300'
    case '03':
      return 'from-gray-200 to-slate-400'
    case '04':
      return 'from-zinc-300 to-neutral-500'
    case '05':
      return 'from-stone-200 to-zinc-400'
    default:
      return 'from-neutral-200 to-gray-400'
  }
}

function onImgLoad(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.opacity = '1'
}

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('.port-label', {
      scrollTrigger: { trigger: '.port-label', start: 'top 85%' },
      opacity: 0,
      x: -20,
      duration: 0.7,
      ease: 'power3.out',
    })
    gsap.from('.port-heading', {
      scrollTrigger: { trigger: '.port-heading', start: 'top 85%' },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    })
    gsap.from('.port-card', {
      scrollTrigger: { trigger: '.port-grid', start: 'top 75%' },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
    })
  }, sectionRef.value!)
  return () => ctx.revert()
})
</script>

<template>
  <section id="portfolio" ref="sectionRef" class="py-32 md:py-48 bg-subtle">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <div class="port-label flex items-center gap-4 mb-6">
            <div class="h-px w-8 bg-black"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase text-black/40">{{
              t.portfolio.label
            }}</span>
          </div>
          <h2
            class="port-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-black"
          >
            {{ t.portfolio.headlineDim }}<br />
            {{ t.portfolio.headline }}<br />
            <span class="text-black/30">{{ t.portfolio.headline2 }}</span>
          </h2>
        </div>
        <p class="max-w-xs text-base text-black/50 leading-relaxed font-light md:text-right">
          A curated look at transformative digital work across multiple industries.
        </p>
      </div>

      <!-- Grid -->
      <div class="port-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
        <div
          v-for="project in projects"
          :key="project.id"
          :class="[
            project.size === 'large' ? 'md:col-span-2' : 'md:col-span-1',
            'port-card group relative bg-white overflow-hidden',
          ]"
        >
          <a :href="project.url" target="_blank" rel="noopener noreferrer" class="block">
            <!-- Image area -->
            <div
              :class="
                project.size === 'large'
                  ? 'aspect-video relative overflow-hidden'
                  : 'aspect-square relative overflow-hidden'
              "
            >
              <!-- Single zoom wrapper — semua konten visual di dalam sini -->
              <div
                class="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
              >
                <!-- Gradient skeleton -->
                <div
                  class="absolute inset-0"
                  :class="['bg-gradient-to-br', gradientFor(project.id)]"
                ></div>

                <!-- Screenshot -->
                <img
                  :src="screenshotUrl(project.url)"
                  :alt="project.title"
                  class="absolute inset-0 w-full h-full object-cover opacity-0"
                  loading="lazy"
                  @load="onImgLoad"
                  :style="{
                    objectPosition: project.imgPosition ?? '50% 30%',
                    transition: 'opacity 0.5s ease',
                  }"
                />
              </div>

              <!-- Grid lines overlay — di luar zoom wrapper agar tidak ikut scale -->
              <div
                class="absolute inset-0 opacity-10 pointer-events-none"
                style="
                  background-image:
                    linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px);
                  background-size: 40px 40px;
                "
              ></div>

              <!-- Hover overlay — di luar zoom wrapper -->
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-500 flex items-center justify-center"
              >
                <div
                  class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center"
                >
                  <ArrowUpRight :size="40" class="text-white mx-auto" />
                  <span class="text-white text-xs tracking-[0.2em] uppercase mt-3 block"
                    >View Project</span
                  >
                </div>
              </div>
            </div>

            <div class="p-6 flex items-start justify-between gap-4 border-t border-black/8">
              <div>
                <div class="text-xs text-black/40 tracking-widest uppercase mb-1">
                  {{ project.category }}
                </div>
                <h3
                  class="text-lg font-semibold text-black group-hover:text-black/70 transition-colors"
                >
                  {{ project.title }}
                </h3>
                <div class="text-xs text-black/30 mt-1">{{ project.tech }}</div>
              </div>
              <span class="text-xs text-black/25 font-light pt-1">{{ project.year }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
