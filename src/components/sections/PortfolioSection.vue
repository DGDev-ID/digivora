<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

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
      return 'linear-gradient(135deg, #0d2220, #11201F)'
    case '02':
      return 'linear-gradient(135deg, #0a1e1c, #0d2220)'
    case '03':
      return 'linear-gradient(135deg, #0B1312, #163330)'
    case '04':
      return 'linear-gradient(135deg, #11201F, #1a2e2c)'
    case '05':
      return 'linear-gradient(135deg, #0d2220, #0B1312)'
    default:
      return 'linear-gradient(135deg, #0B1312, #11201F)'
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
  <section id="portfolio" ref="sectionRef" class="py-32 md:py-48" style="background-color: #11201F;">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <div class="port-label flex items-center gap-4 mb-6">
            <div class="h-px w-8" style="background-color: #00BFA6;"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.6);">Selected Works</span>
          </div>
          <h2
            class="port-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight"
            style="color: #E5E7EB;"
          >
            Work We<br />
            Won't Stop<br />
            <span style="color: rgba(229,231,235,0.25);">Being Proud Of.</span>
          </h2>
        </div>
        <div class="flex flex-col gap-4 md:items-end">
          <p class="max-w-xs text-base leading-relaxed font-light md:text-right" style="color: rgba(229,231,235,0.45);">
            A curated look at transformative digital work across multiple industries.
          </p>
          <RouterLink to="/portfolio" class="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#26C6B7]" style="color: #00BFA6;">
            View All Portfolio <ArrowUpRight :size="14" />
          </RouterLink>
        </div>
      </div>

      <!-- Grid -->
      <div class="port-grid grid grid-cols-1 md:grid-cols-3 gap-px" style="background-color: rgba(0,191,166,0.1);">
        <div
          v-for="project in projects"
          :key="project.id"
          :class="[
            project.size === 'large' ? 'md:col-span-2' : 'md:col-span-1',
            'port-card group relative overflow-hidden',
          ]"
          style="background-color: #0B1312;"
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
                  :style="{ background: gradientFor(project.id) }"
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
                    linear-gradient(rgba(0, 191, 166, 0.2) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 191, 166, 0.2) 1px, transparent 1px);
                  background-size: 40px 40px;
                "
              ></div>

              <!-- Hover overlay — di luar zoom wrapper -->
              <div
                class="absolute inset-0 transition-all duration-500 flex items-center justify-center"
                style="background-color: transparent;"
                @mouseover="($event.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,191,166,0.15)'"
                @mouseout="($event.currentTarget as HTMLElement).style.backgroundColor = 'transparent'"
              >
                <div
                  class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center"
                >
                  <ArrowUpRight :size="40" class="mx-auto" style="color: #00BFA6;" />
                  <span class="text-xs tracking-[0.2em] uppercase mt-3 block" style="color: #E5E7EB;"
                    >View Project</span
                  >
                </div>
              </div>
            </div>

            <div class="p-6 flex items-start justify-between gap-4" style="border-top: 1px solid rgba(0,191,166,0.12);">
              <div>
                <div class="text-xs tracking-widest uppercase mb-1" style="color: rgba(0,191,166,0.5);">
                  {{ project.category }}
                </div>
                <h3
                  class="text-lg font-semibold transition-colors"
                  style="color: #E5E7EB;"
                >
                  {{ project.title }}
                </h3>
                <div class="text-xs mt-1" style="color: rgba(229,231,235,0.3);">{{ project.tech }}</div>
              </div>
              <span class="text-xs font-light pt-1" style="color: rgba(229,231,235,0.25);">{{ project.year }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
