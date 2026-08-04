<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ExternalLink } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const activeFilter = ref('All')
const filters = ['All', 'Web', 'Mobile', 'SaaS', 'Branding']

// Rich project data with Unsplash images
const projects = [
  {
    id: '01',
    title: 'Arletta Prime Luxury',
    category: 'Web',
    tag: 'Corporate Platform',
    year: '2026',
    tech: 'Vue 3 · Laravel',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    url: 'https://arlettaluxury.com/',
    size: 'large',
  },
  {
    id: '02',
    title: 'Arletta Gym',
    category: 'Web',
    tag: 'Fitness Platform',
    year: '2026',
    tech: 'Vue 3 · Inertia · Laravel',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    url: 'https://gym.arlettaluxury.com/',
    size: 'small',
  },
  {
    id: '03',
    title: 'Arletta Cafe',
    category: 'Web',
    tag: 'F&B',
    year: '2026',
    tech: 'Vue 3 · Inertia · Laravel',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    url: 'https://cafe.arlettaluxury.com/',
    size: 'small',
  },
  {
    id: '04',
    title: 'Arletta Cozy',
    category: 'Web',
    tag: 'Kost Platform',
    year: '2026',
    tech: 'Vue 3 · Inertia · Laravel',
    img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    url: 'https://kost.arlettaluxury.com/',
    size: 'large',
  },
  {
    id: '05',
    title: 'Aksara Media',
    category: 'Web',
    tag: 'Media & Promotions',
    year: '2026',
    tech: 'Vue 3 · Inertia · Laravel',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    url: 'https://aksaramediapromosi.vercel.app/',
    size: 'large',
  },
  {
    id: '06',
    title: 'Joyze Digital',
    category: 'Web',
    tag: 'Agency',
    year: '2025',
    tech: 'Nuxt · Laravel',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    url: 'https://joyze.my.id/',
    size: 'small',
  },
  {
    id: '07',
    title: 'MediBook Clinic',
    category: 'SaaS',
    tag: 'Healthcare',
    year: '2023',
    tech: 'React · Node.js',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    url: '#',
    size: 'small',
  },
  {
    id: '08',
    title: 'BaristaFlow POS',
    category: 'SaaS',
    tag: 'F&B Management',
    year: '2024',
    tech: 'Vue 3 · Laravel',
    img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    url: '#',
    size: 'large',
  },
]

const filtered = ref(projects)

function setFilter(f: string) {
  activeFilter.value = f
  filtered.value = f === 'All' ? projects : projects.filter((p) => p.category === f)
}

onMounted(() => {
  gsap.from('.portfolio-hero', {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    delay: 0.3,
  })

  gsap.from('.port-filter', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.06,
    scrollTrigger: { trigger: '.filters-row', start: 'top 85%' },
  })
})
</script>

<template>
  <div style="background-color: #0b1312; color: #e5e7eb; padding-top: 80px; min-height: 100vh">
    <!-- Hero -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"
          alt=""
          class="w-full h-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0" style="background: rgba(11, 19, 18, 0.88)"></div>
      </div>
      <div
        class="absolute inset-0 pointer-events-none"
        style="
          background: radial-gradient(
            ellipse at 70% 50%,
            rgba(0, 191, 166, 0.1) 0%,
            transparent 50%
          );
        "
      ></div>

      <div class="portfolio-hero relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="h-px w-8" style="background: #00bfa6"></div>
          <span
            class="text-xs font-semibold tracking-[0.35em] uppercase"
            style="color: rgba(0, 191, 166, 0.7)"
            >Selected Works</span
          >
          <div class="h-px w-8" style="background: #00bfa6"></div>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight mb-6">
          Work We<br /><span style="color: rgba(229, 231, 235, 0.22)">Won't Stop</span><br />Being
          Proud Of.
        </h1>
        <p class="text-lg leading-relaxed" style="color: rgba(229, 231, 235, 0.55)">
          A curated look at transformative digital work across multiple industries.
        </p>
      </div>
    </section>

    <!-- Filter Tabs -->
    <div
      class="filters-row sticky top-[72px] z-40 py-4"
      style="
        background: rgba(11, 19, 18, 0.95);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(0, 191, 166, 0.1);
      "
    >
      <div class="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto">
        <button
          v-for="f in filters"
          :key="f"
          @click="setFilter(f)"
          class="port-filter flex-shrink-0 px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300"
          :style="
            activeFilter === f
              ? 'background: #00BFA6; color: #0B1312;'
              : 'border: 1px solid rgba(0,191,166,0.2); color: rgba(229,231,235,0.5); background: transparent;'
          "
        >
          {{ f }}
        </button>
      </div>
    </div>

    <!-- Portfolio Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <template v-for="project in filtered" :key="project.id">
            <a
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              :class="[
                'group relative overflow-hidden rounded-2xl block',
                project.size === 'large' ? 'md:col-span-2' : 'md:col-span-1',
              ]"
              style="border: 1px solid rgba(0, 191, 166, 0.1)"
            >
              <!-- Image -->
              <div
                :class="project.size === 'large' ? 'aspect-video' : 'aspect-square'"
                class="relative overflow-hidden"
              >
                <img
                  :src="project.img"
                  :alt="project.title"
                  class="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                  loading="lazy"
                />
                <!-- Default overlay -->
                <div
                  class="absolute inset-0 transition-opacity duration-700"
                  style="background: rgba(11, 19, 18, 0.35)"
                ></div>
                <!-- Hover overlay -->
                <div
                  class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style="
                    background: linear-gradient(
                      to top,
                      rgba(11, 19, 18, 0.9) 0%,
                      rgba(0, 191, 166, 0.1) 100%
                    );
                  "
                ></div>
                <!-- Grid pattern -->
                <div
                  class="absolute inset-0 opacity-[0.06]"
                  style="
                    background-image:
                      linear-gradient(rgba(0, 191, 166, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 191, 166, 0.3) 1px, transparent 1px);
                    background-size: 40px 40px;
                  "
                ></div>

                <!-- Hover arrow -->
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div
                    class="w-16 h-16 rounded-full flex items-center justify-center"
                    style="
                      background: rgba(0, 191, 166, 0.2);
                      border: 1px solid rgba(0, 191, 166, 0.5);
                      backdrop-filter: blur(8px);
                    "
                  >
                    <ExternalLink :size="22" style="color: #00bfa6" />
                  </div>
                </div>
              </div>

              <!-- Info bar -->
              <div
                class="p-5 flex items-start justify-between gap-4"
                style="background: rgba(11, 19, 18, 0.8); backdrop-filter: blur(8px)"
              >
                <div>
                  <div
                    class="text-xs mb-1.5 font-medium tracking-wider"
                    style="color: rgba(0, 191, 166, 0.6)"
                  >
                    {{ project.tag }}
                  </div>
                  <h3
                    class="text-base font-semibold mb-1 transition-colors duration-300 group-hover:text-[#26C6B7]"
                  >
                    {{ project.title }}
                  </h3>
                  <div class="text-xs" style="color: rgba(229, 231, 235, 0.3)">
                    {{ project.tech }}
                  </div>
                </div>
                <div class="flex flex-col items-end gap-2 flex-shrink-0">
                  <span class="text-xs font-light" style="color: rgba(229, 231, 235, 0.25)">{{
                    project.year
                  }}</span>
                  <ArrowUpRight
                    :size="16"
                    class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style="color: #00bfa6"
                  />
                </div>
              </div>
            </a>
          </template>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="py-24 text-center"
      style="background-color: #11201f; border-top: 1px solid rgba(0, 191, 166, 0.1)"
    >
      <div class="max-w-2xl mx-auto px-6">
        <h2 class="text-[clamp(2rem,4vw,3rem)] font-bold mb-6">
          Want Your Project<br /><span style="color: #00bfa6">Featured Here?</span>
        </h2>
        <RouterLink
          to="/contact"
          class="inline-flex items-center gap-3 px-10 py-5 text-sm font-semibold tracking-[0.2em] uppercase rounded-xl hover:opacity-90 transition-opacity"
          style="background: #00bfa6; color: #0b1312"
        >
          Start a Project →
        </RouterLink>
      </div>
    </section>
  </div>
</template>
