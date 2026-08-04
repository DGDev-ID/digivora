<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Smartphone, LayoutDashboard, Palette, Cpu, BarChart3, ArrowUpRight, Check } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'

gsap.registerPlugin(ScrollTrigger)
const { t } = useI18n()

const iconMap = [Globe, Smartphone, LayoutDashboard, Palette, Cpu, BarChart3]
const serviceImages = [
  'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
]

const services = computed(() =>
  t.value.services.items.map((item, i) => ({
    ...item,
    icon: iconMap[i],
    img: serviceImages[i],
    features: ['Enterprise-grade', 'Scalable architecture', 'Ongoing support'],
  }))
)

const activeService = ref(0)

onMounted(() => {
  gsap.from('.services-hero-text', {
    opacity: 0, y: 60, duration: 1, ease: 'power3.out', delay: 0.3,
  })

  gsap.from('.service-tab', {
    opacity: 0, x: -30, duration: 0.6, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger: '.services-tabs', start: 'top 82%' },
  })

  gsap.from('.service-card-page', {
    opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', stagger: 0.1,
    scrollTrigger: { trigger: '.services-grid-page', start: 'top 78%' },
  })
})
</script>

<template>
  <div style="background-color: #0B1312; color: #E5E7EB; padding-top: 80px; min-height: 100vh;">

    <!-- Hero -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1400&q=80"
          alt="" class="w-full h-full object-cover" loading="eager" />
        <div class="absolute inset-0" style="background: rgba(11,19,18,0.9);"></div>
      </div>
      <!-- Animated grid overlay -->
      <div class="absolute inset-0 pointer-events-none"
        style="background-image: linear-gradient(rgba(0,191,166,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,166,0.04) 1px, transparent 1px); background-size: 80px 80px;"></div>

      <div class="services-hero-text relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="h-px w-8" style="background: #00BFA6;"></div>
          <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">What We Do</span>
          <div class="h-px w-8" style="background: #00BFA6;"></div>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight mb-6">
          Full-Spectrum<br /><span style="color: rgba(229,231,235,0.25);">Digital</span> Services
        </h1>
        <p class="text-lg leading-relaxed max-w-2xl mx-auto" style="color: rgba(229,231,235,0.55);">
          {{ t.services.sub }}
        </p>
      </div>
    </section>

    <!-- Services Showcase — Large cards with images -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="services-grid-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(svc, i) in services" :key="svc.num"
            class="service-card-page group relative overflow-hidden rounded-2xl cursor-pointer flex flex-col"
            style="min-height: 380px;"
          >
            <!-- Background image -->
            <div class="absolute inset-0">
              <img :src="svc.img" :alt="svc.title"
                class="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" loading="lazy" />
              <div class="absolute inset-0" style="background: rgba(11,19,18,0.75);"></div>
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style="background: linear-gradient(to top, rgba(11,19,18,0.97) 0%, rgba(11,19,18,0.5) 50%, rgba(11,19,18,0.25) 100%);"></div>
            </div>

            <!-- Border -->
            <div class="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 group-hover:shadow-[inset_0_0_0_1px_rgba(0,191,166,0.5)]"
              style="border: 1px solid rgba(0,191,166,0.15);"></div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col justify-between h-full p-8">
              <div class="flex items-start justify-between">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: rgba(0,191,166,0.15);">
                  <component :is="svc.icon" :size="22" style="color: #00BFA6;" />
                </div>
                <span class="text-xs font-bold tracking-widest" style="color: rgba(0,191,166,0.4);">{{ svc.num }}</span>
              </div>

              <div>
                <h3 class="text-2xl font-semibold mb-3 transition-colors duration-500">{{ svc.title }}</h3>
                <p class="text-sm leading-relaxed mb-5" style="color: rgba(229,231,235,0.55);">{{ svc.desc }}</p>

                <!-- Features (visible on hover) -->
                <ul class="flex flex-col gap-2 mb-5 overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500">
                  <li v-for="f in svc.features" :key="f" class="flex items-center gap-2 text-xs" style="color: rgba(0,191,166,0.8);">
                    <Check :size="12" /> {{ f }}
                  </li>
                </ul>

                <div class="flex flex-wrap gap-2 mb-6">
                  <span v-for="tag in svc.tags" :key="tag"
                    class="text-[10px] px-2.5 py-1 rounded-full font-medium"
                    style="border: 1px solid rgba(0,191,166,0.3); color: rgba(0,191,166,0.7);">{{ tag }}</span>
                </div>

                <RouterLink to="/contact"
                  class="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
                  style="color: rgba(229,231,235,0.4);"
                  :class="'group-hover:text-[#00BFA6]'">
                  Get Started <ArrowUpRight :size="12" />
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process CTA -->
    <section class="py-24" style="background-color: #11201F; border-top: 1px solid rgba(0,191,166,0.1);">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <h2 class="text-[clamp(1.8rem,4vw,3rem)] font-bold mb-4">Not sure which service<br /><span style="color: rgba(229,231,235,0.25);">you need?</span></h2>
          <p style="color: rgba(229,231,235,0.5);">We'll help you figure out the right solution for your business goals.</p>
        </div>
        <RouterLink to="/contact"
          class="flex-shrink-0 inline-flex items-center gap-3 px-10 py-5 text-sm font-semibold tracking-[0.2em] uppercase rounded-xl hover:opacity-90 transition-opacity"
          style="background: #00BFA6; color: #0B1312;">
          Free Consultation →
        </RouterLink>
      </div>
    </section>

  </div>
</template>
