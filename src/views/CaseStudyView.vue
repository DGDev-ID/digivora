<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Clock, BarChart3, Users } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const caseStudies = [
  {
    id: '01',
    title: 'How We Built an Enterprise ERP System in 6 Months',
    client: 'Nexus Corp',
    industry: 'Manufacturing',
    duration: '6 months',
    results: ['40% ops efficiency gain', '200+ daily active users', 'Zero downtime since launch'],
    tech: ['Vue 3', 'Laravel', 'PostgreSQL', 'Redis'],
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    size: 'large',
  },
  {
    id: '02',
    title: 'Scaling a Luxury Real Estate Platform from MVP to 10K Users',
    client: 'Arletta Prime',
    industry: 'Real Estate',
    duration: '4 months',
    results: ['10K+ registered users', '3x lead conversion', 'Featured in industry press'],
    tech: ['Vue 3', 'Inertia', 'Laravel'],
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    size: 'small',
  },
  {
    id: '03',
    title: 'A Healthcare Clinic\'s Digital Transformation Journey',
    client: 'MediBook Clinic',
    industry: 'Healthcare',
    duration: '3 months',
    results: ['60% appointment reduction friction', 'Paperless patient records', 'HIPAA compliant'],
    tech: ['React', 'Node.js', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    size: 'small',
  },
  {
    id: '04',
    title: 'Rebuilding a Media Agency\'s Digital Presence from Zero',
    client: 'Aksara Media',
    industry: 'Media',
    duration: '2 months',
    results: ['400% organic traffic growth', '2.5x client inquiries', 'Industry awards finalist'],
    tech: ['Next.js', 'Framer Motion', 'Contentful'],
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    size: 'large',
  },
]

onMounted(() => {
  gsap.from('.cs-hero', { opacity: 0, y: 60, duration: 1, ease: 'power3.out', delay: 0.2 })
  gsap.from('.cs-card', {
    opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', stagger: 0.12,
    scrollTrigger: { trigger: '.cs-grid', start: 'top 78%' },
  })
})
</script>

<template>
  <div style="background-color: #0B1312; color: #E5E7EB; padding-top: 80px; min-height: 100vh;">

    <!-- Hero -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
          alt="" class="w-full h-full object-cover" loading="eager" />
        <div class="absolute inset-0" style="background: rgba(11,19,18,0.88);"></div>
      </div>
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at 80% 50%, rgba(0,191,166,0.1) 0%, transparent 50%);"></div>

      <div class="cs-hero relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="h-px w-8" style="background: #00BFA6;"></div>
          <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">Real Results</span>
          <div class="h-px w-8" style="background: #00BFA6;"></div>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight mb-6">
          Case Studies<br /><span style="color: rgba(229,231,235,0.22);">From Our</span><br /><span style="color: #00BFA6;">Portfolio</span>
        </h1>
        <p class="text-lg" style="color: rgba(229,231,235,0.55);">
          Detailed breakdowns of how we've solved complex business problems with technology.
        </p>
      </div>
    </section>

    <!-- Case Studies Grid -->
    <section class="py-24 max-w-7xl mx-auto px-6">
      <div class="cs-grid grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          v-for="cs in caseStudies" :key="cs.id"
          class="cs-card group rounded-2xl overflow-hidden cursor-pointer"
          :class="cs.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'"
          style="border: 1px solid rgba(0,191,166,0.12);"
        >
          <!-- Image -->
          <div :class="cs.size === 'large' ? 'h-72' : 'h-52'" class="relative overflow-hidden">
            <img :src="cs.img" :alt="cs.title"
              class="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" loading="lazy" />
            <div class="absolute inset-0" style="background: rgba(11,19,18,0.5);"></div>
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style="background: linear-gradient(to top, rgba(11,19,18,0.9), rgba(0,191,166,0.05));"></div>

            <!-- Industry badge -->
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-full" style="background: rgba(11,19,18,0.8); color: #00BFA6; border: 1px solid rgba(0,191,166,0.3);">
                {{ cs.industry }}
              </span>
            </div>

            <!-- Duration -->
            <div class="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px]"
              style="background: rgba(11,19,18,0.8); color: rgba(229,231,235,0.6); border: 1px solid rgba(0,191,166,0.15);">
              <Clock :size="10" /> {{ cs.duration }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-6" style="background: rgba(17,32,31,0.6);">
            <div class="text-xs mb-3 font-semibold tracking-widest uppercase" style="color: rgba(0,191,166,0.5);">{{ cs.client }}</div>
            <h3 class="text-lg font-bold leading-snug mb-5 group-hover:text-[#26C6B7] transition-colors duration-300">{{ cs.title }}</h3>

            <!-- Results -->
            <div class="flex flex-wrap gap-2 mb-5">
              <div v-for="r in cs.results" :key="r"
                class="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                style="background: rgba(0,191,166,0.08); color: rgba(0,191,166,0.8); border: 1px solid rgba(0,191,166,0.15);">
                <BarChart3 :size="10" /> {{ r }}
              </div>
            </div>

            <!-- Tech stack -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              <span v-for="t in cs.tech" :key="t" class="text-[10px] px-2 py-1 rounded"
                style="background: rgba(229,231,235,0.05); color: rgba(229,231,235,0.4); border: 1px solid rgba(229,231,235,0.08);">
                {{ t }}
              </span>
            </div>

            <div class="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="color: #00BFA6;">
              Read Case Study <ArrowUpRight :size="12" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 text-center" style="background-color: #11201F; border-top: 1px solid rgba(0,191,166,0.1);">
      <div class="max-w-2xl mx-auto px-6">
        <div class="flex items-center justify-center gap-3 mb-6">
          <Users :size="24" style="color: #00BFA6;" />
        </div>
        <h2 class="text-3xl font-bold mb-4">Want to Be Our Next <span style="color: #00BFA6;">Success Story?</span></h2>
        <p class="mb-10" style="color: rgba(229,231,235,0.5);">Let's work together to solve your most complex digital challenges.</p>
        <RouterLink to="/contact"
          class="inline-flex items-center gap-3 px-10 py-5 text-sm font-semibold tracking-[0.2em] uppercase rounded-xl hover:opacity-90 transition-opacity"
          style="background: #00BFA6; color: #0B1312;">
          Start Your Project →
        </RouterLink>
      </div>
    </section>

  </div>
</template>
