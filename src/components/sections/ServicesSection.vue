<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Smartphone, LayoutDashboard, Palette, Cpu, BarChart3, ArrowUpRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const trackerRef = ref<HTMLElement | null>(null)

const iconMap = [Globe, Smartphone, LayoutDashboard, Palette, Cpu, BarChart3]

const serviceImages = [
  'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
]

const services = [
  { num: '01', title: 'Web Development', desc: 'Custom high-performance websites and corporate platforms engineered for speed, SEO excellence, and conversion.', tags: ['Next.js', 'Vue 3', 'Laravel'] },
  { num: '02', title: 'Mobile Development', desc: 'Native and cross-platform applications for iOS and Android. Seamless UX from device to cloud.', tags: ['React Native', 'Flutter'] },
  { num: '03', title: 'SaaS Platform', desc: 'End-to-end SaaS architecture with multi-tenancy, subscription systems, and scalable infrastructure.', tags: ['Microservices', 'Cloud-native'] },
  { num: '04', title: 'UI/UX Engineering', desc: 'Design systems and interfaces that convert. From wireframe to pixel-perfect implementation.', tags: ['Figma', 'Design System'] },
  { num: '05', title: 'Automation Systems', desc: 'Business process automation that eliminates bottlenecks, reduces cost, and accelerates operations.', tags: ['Workflow', 'Integration API'] },
  { num: '06', title: 'Business Intelligence', desc: 'Data pipelines, dashboards, and analytics engines that turn raw data into strategic decisions.', tags: ['Analytics', 'Dashboard'] },
].map((item, i) => ({ ...item, icon: iconMap[i], img: serviceImages[i] }))

const labelChars = 'What We Do'.split('')

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {

    // ── Char label ──────────────────────────────────────────────────
    gsap.fromTo('.svc-char',
      { y: 40, opacity: 0, rotateX: -90 },
      {
        y: 0, opacity: 1, rotateX: 0,
        duration: 0.55, ease: 'back.out(1.5)', stagger: 0.03,
        scrollTrigger: { trigger: '.svc-label-chars', start: 'top 88%' , toggleActions: 'play reverse play reverse'},
      },
    )

    // ── Headline word reveal ─────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>('.svc-word').forEach((word, i) => {
      gsap.fromTo(word,
        { yPercent: 115, opacity: 0, skewY: 5 },
        { yPercent: 0, opacity: 1, skewY: 0, duration: 1, ease: 'expo.out', delay: i * 0.09,
          scrollTrigger: { trigger: '.svc-heading', start: 'top 82%' , toggleActions: 'play reverse play reverse'} },
      )
    })

    // ── Sub text clip-path reveal ─────────────────────────────────────
    gsap.fromTo('.svc-sub-text',
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.svc-sub-text', start: 'top 86%' , toggleActions: 'play reverse play reverse'} },
    )

    // ── Cards alternating slide + scale ────────────────────────────
    gsap.utils.toArray<HTMLElement>('.svc-card').forEach((card, i) => {
      const fromX = i % 2 === 0 ? -50 : 50
      gsap.fromTo(card,
        { opacity: 0, y: 60, x: fromX, scale: 0.95 },
        { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.8, ease: 'power3.out',
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: '.svc-grid', start: 'top 75%' , toggleActions: 'play reverse play reverse'} },
      )
    })

    // ── Neon tracker line scrub ────────────────────────────────────
    if (trackerRef.value) {
      gsap.to(trackerRef.value, {
        scrollTrigger: { trigger: '.svc-grid', start: 'top 60%', end: 'bottom 40%', scrub: 1 },
        top: '100%',
        ease: 'none',
        onUpdate: function() {
          const progress = (this as any).scrollTrigger?.progress ?? 0
          const cards = gsap.utils.toArray<HTMLElement>('.svc-card')
          cards.forEach((card, i) => {
            const threshold = (i + 1) / cards.length
            const prev = i / cards.length
            const glow = card.querySelector('.svc-card-glow') as HTMLElement
            if (glow) glow.style.opacity = progress >= prev ? '1' : '0'
          })
        }
      })
    }

    // ── Floating objects parallax ────────────────────────────────────
    const floats = [
      { sel: '.svc-float-1', y: -120, rotate: 40 },
      { sel: '.svc-float-2', y: -80, rotate: -30 },
      { sel: '.svc-float-3', y: -160, rotate: 20 },
      { sel: '.svc-float-4', y: -60, rotate: -50 },
    ]
    floats.forEach(({ sel, y, rotate }) => {
      gsap.to(sel, {
        scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        y, rotate, ease: 'none',
      })
    })

    // ── Big ghost text ────────────────────────────────────────────────
    gsap.to('.svc-big-num', {
      scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 2 },
      x: -100, ease: 'none',
    })

    // ── Grid bg line expand ───────────────────────────────────────────
    gsap.from('.svc-divider', {
      scrollTrigger: { trigger: '.svc-divider', start: 'top 85%' , toggleActions: 'play reverse play reverse'},
      scaleX: 0, duration: 1.5, ease: 'expo.inOut',
    })

  }, sectionRef.value!)
  return () => ctx?.revert()
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="services" ref="sectionRef" class="relative py-36 md:py-56 overflow-hidden"
    style="background-color: #0B1312;">

    <!-- ════════════════════════════════════
         VISUAL OBJECTS
    ════════════════════════════════════ -->

    <!-- Ghost big number -->
    <div class="svc-big-num absolute left-0 bottom-8 pointer-events-none select-none"
      style="font-size: clamp(180px, 26vw, 340px); font-weight: 900; color: rgba(0,191,166,0.04); line-height: 1; letter-spacing: -0.05em;">
      03
    </div>

    <!-- Grid pattern bg -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.025]"
      style="background-image: linear-gradient(rgba(0,191,166,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,166,1) 1px, transparent 1px); background-size: 60px 60px;"></div>

    <!-- Neon tracker line -->
    <div class="absolute left-0 top-0 w-[2px] h-full overflow-hidden pointer-events-none" style="z-index:5;">
      <div ref="trackerRef" class="absolute left-0 top-0 w-full"
        style="height: 140px; background: linear-gradient(to bottom, transparent, #00BFA6, #26C6B7, transparent); filter: blur(1px); box-shadow: 0 0 16px rgba(0,191,166,0.8); top: -140px;"></div>
    </div>

    <!-- Float 1: Circle rings (top right) -->
    <div class="svc-float-1 absolute right-[4%] top-[5%] pointer-events-none select-none opacity-[0.06]">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="#00BFA6" stroke-width="0.8" stroke-dasharray="6 12"/>
        <circle cx="100" cy="100" r="65" stroke="#00BFA6" stroke-width="0.5" stroke-dasharray="4 8"/>
        <circle cx="100" cy="100" r="35" stroke="#26C6B7" stroke-width="1"/>
        <circle cx="100" cy="10" r="4" fill="#00BFA6"/>
        <circle cx="190" cy="100" r="4" fill="#00BFA6"/>
        <circle cx="100" cy="190" r="4" fill="#00BFA6"/>
        <line x1="100" y1="10" x2="100" y2="190" stroke="#00BFA6" stroke-width="0.3" stroke-dasharray="2 8"/>
        <line x1="10" y1="100" x2="190" y2="100" stroke="#00BFA6" stroke-width="0.3" stroke-dasharray="2 8"/>
      </svg>
    </div>

    <!-- Float 2: Hexagon (left, mid) -->
    <div class="svc-float-2 absolute left-[1%] top-[40%] pointer-events-none select-none opacity-[0.05]">
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <polygon points="80,8 148,44 148,116 80,152 12,116 12,44" stroke="#00BFA6" stroke-width="1"/>
        <polygon points="80,28 128,56 128,104 80,132 32,104 32,56" stroke="#00BFA6" stroke-width="0.5"/>
        <circle cx="80" cy="80" r="10" stroke="#00BFA6" stroke-width="1" fill="none"/>
        <circle cx="80" cy="80" r="3" fill="#00BFA6"/>
      </svg>
    </div>

    <!-- Float 3: Dot matrix (bottom-right) -->
    <div class="svc-float-3 absolute right-[2%] bottom-[10%] pointer-events-none select-none opacity-[0.04]">
      <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
        <g fill="#00BFA6">
          <circle cx="15" cy="15" r="2"/><circle cx="45" cy="15" r="2"/><circle cx="75" cy="15" r="2"/><circle cx="105" cy="15" r="2"/><circle cx="135" cy="15" r="2"/>
          <circle cx="15" cy="45" r="2"/><circle cx="45" cy="45" r="2"/><circle cx="75" cy="45" r="2"/><circle cx="105" cy="45" r="2"/><circle cx="135" cy="45" r="2"/>
          <circle cx="15" cy="75" r="2"/><circle cx="45" cy="75" r="2"/><circle cx="75" cy="75" r="2"/><circle cx="105" cy="75" r="2"/><circle cx="135" cy="75" r="2"/>
          <circle cx="15" cy="105" r="2"/><circle cx="45" cy="105" r="2"/><circle cx="75" cy="105" r="2"/><circle cx="105" cy="105" r="2"/><circle cx="135" cy="105" r="2"/>
          <circle cx="15" cy="135" r="2"/><circle cx="45" cy="135" r="2"/><circle cx="75" cy="135" r="2"/><circle cx="105" cy="135" r="2"/><circle cx="135" cy="135" r="2"/>
        </g>
      </svg>
    </div>

    <!-- Float 4: Triangle (top-left area) -->
    <div class="svc-float-4 absolute left-[20%] top-[3%] pointer-events-none select-none opacity-[0.06]">
      <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
        <polygon points="40,4 76,68 4,68" stroke="#00BFA6" stroke-width="1.2" stroke-dasharray="4 6"/>
        <polygon points="40,18 62,58 18,58" stroke="#00BFA6" stroke-width="0.5"/>
        <circle cx="40" cy="40" r="4" fill="none" stroke="#00BFA6" stroke-width="1"/>
      </svg>
    </div>

    <!-- ════════════════════════════════════
         CONTENT
    ════════════════════════════════════ -->
    <div class="max-w-7xl mx-auto px-6 relative z-10">

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <!-- Char label -->
          <div class="svc-label-chars flex items-center gap-4 mb-6 overflow-hidden" style="perspective: 500px;">
            <div class="h-px w-8 flex-shrink-0" style="background-color: #00BFA6;"></div>
            <div class="flex">
              <span v-for="(char, i) in labelChars" :key="i"
                class="svc-char inline-block"
                :style="{
                  fontFamily: 'monospace', fontSize: '11px', fontWeight: '600',
                  letterSpacing: char === ' ' ? '0.35em' : '0.08em',
                  textTransform: 'uppercase', color: 'rgba(0,191,166,0.7)',
                  opacity: 0, whiteSpace: 'pre',
                }"
              >{{ char === ' ' ? '\u00a0' : char }}</span>
            </div>
          </div>

          <!-- Headline -->
          <h2 class="svc-heading text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[1.05] tracking-tight overflow-hidden" style="color: #E5E7EB;">
            <span class="flex flex-wrap gap-x-[0.25em] gap-y-2">
              <span v-for="w in ['Full-Spectrum', 'Digital', 'Services.']" :key="w"
                class="svc-word inline-block"
                :style="w === 'Digital' ? 'color: rgba(229,231,235,0.18);' : ''"
                style="opacity: 0;"
              >{{ w }}</span>
            </span>
          </h2>

          <!-- Divider -->
          <div class="svc-divider mt-6 h-px w-full origin-left" style="background: linear-gradient(to right, #00BFA6, transparent); transform: scaleX(0);"></div>
        </div>

        <div class="flex flex-col gap-4 md:items-end">
          <p class="svc-sub-text max-w-xs text-base leading-relaxed font-light md:text-right" style="color: rgba(229,231,235,0.45); clip-path: inset(0 100% 0 0);">
            Every solution we build is crafted with enterprise-grade standards, regardless of your company size.
          </p>
          <RouterLink to="/services" class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:gap-3" style="color: #00BFA6;">
            View All Services <ArrowUpRight :size="14" />
          </RouterLink>
        </div>
      </div>

      <!-- Service Cards Grid -->
      <div class="svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RouterLink v-for="(svc, i) in services" :key="svc.num"
          to="/services"
          class="svc-card group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer"
          style="min-height: 310px; background-color: #11201F; opacity: 0;"
        >
          <!-- Image bg -->
          <div class="absolute inset-0 z-0 overflow-hidden">
            <img :src="svc.img" :alt="svc.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.25,1,0.5,1)] scale-100 group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 transition-all duration-700" style="background: rgba(11,19,18,0.88);" :class="'group-hover:opacity-0'"></div>
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style="background: linear-gradient(to top, rgba(11,19,18,0.97) 0%, rgba(11,19,18,0.3) 100%);"></div>
          </div>

          <!-- Scroll-glow -->
          <div class="svc-card-glow absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none z-10"
            style="box-shadow: inset 0 0 0 1px rgba(0,191,166,0.5), 0 0 40px rgba(0,191,166,0.08); opacity: 0;"></div>
          <!-- Hover border -->
          <div class="absolute inset-0 rounded-2xl pointer-events-none z-10" style="border: 1px solid rgba(0,191,166,0.12);"></div>
          <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-10"
            style="box-shadow: inset 0 0 0 1px rgba(0,191,166,0.5);"></div>

          <!-- Content -->
          <div class="relative z-20 flex flex-col justify-between h-full p-8">
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style="background: rgba(0,191,166,0.1);">
                <component :is="svc.icon" :size="22" style="color: #00BFA6;" />
              </div>
              <span class="text-xs font-black tracking-[0.3em] font-mono" style="color: rgba(0,191,166,0.4);">{{ svc.num }}</span>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-3 tracking-tight transition-colors duration-500 group-hover:text-[#26C6B7]" style="color: #E5E7EB;">{{ svc.title }}</h3>
              <p class="text-sm leading-relaxed mb-5 line-clamp-2" style="color: rgba(229,231,235,0.48);">{{ svc.desc }}</p>
              <div class="flex flex-wrap gap-2 mb-5">
                <span v-for="tag in svc.tags" :key="tag"
                  class="text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wider"
                  style="border: 1px solid rgba(0,191,166,0.25); color: rgba(0,191,166,0.7);"
                >{{ tag }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-px transition-all duration-500 group-hover:w-10" style="width: 16px; background: rgba(0,191,166,0.6);"></div>
                <span class="text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-500 group-hover:text-[#00BFA6]" style="color: rgba(229,231,235,0.3);">Learn More</span>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
