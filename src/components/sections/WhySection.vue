<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const counter1Ref = ref<HTMLElement | null>(null)
const counter2Ref = ref<HTMLElement | null>(null)

const pillars = [
  { title: 'Enterprise Standards', symbol: '⬡', code: 'ENT' },
  { title: 'Performance Obsessed', symbol: '◎', code: 'PER' },
  { title: 'Transparent Process', symbol: '◈', code: 'TRN' },
  { title: 'Long-Term Partner', symbol: '◆', code: 'LTP' },
]

const labelChars = 'Why Digivora'.split('')

function animateCounter(el: HTMLElement, target: number, suffix: string) {
  const obj = { val: 0 }
  gsap.to(obj, {
    val: target,
    duration: 2.2,
    ease: 'power2.out',
    onUpdate: () => { el.textContent = Math.round(obj.val) + suffix },
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play reverse play reverse' },
  })
}

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {

    // ── Char-by-char label ────────────────────────────────────────────
    gsap.fromTo('.why-char',
      { y: 50, opacity: 0, rotateX: -90, transformOrigin: 'top center' },
      {
        y: 0, opacity: 1, rotateX: 0,
        duration: 0.55, ease: 'back.out(1.4)', stagger: 0.03,
        scrollTrigger: { trigger: '.why-label-chars', start: 'top 88%', toggleActions: 'play reverse play reverse' },
      },
    )

    // ── Headline words reveal ─────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>('.why-word').forEach((word, i) => {
      gsap.fromTo(word,
        { yPercent: 120, opacity: 0, skewY: 6 },
        {
          yPercent: 0, opacity: 1, skewY: 0,
          duration: 1.1, ease: 'expo.out', delay: i * 0.1,
          scrollTrigger: { trigger: '.why-headline-wrap', start: 'top 82%', toggleActions: 'play reverse play reverse' },
        },
      )
    })

    // ── Pillar items ──────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>('.why-pillar').forEach((pillar, i) => {
      gsap.fromTo(pillar,
        { opacity: 0, x: 70, clipPath: 'inset(0 0 0 100%)' },
        {
          opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)',
          duration: 0.8, ease: 'power3.out', delay: i * 0.11,
          scrollTrigger: { trigger: '.why-right', start: 'top 78%', toggleActions: 'play reverse play reverse' },
        },
      )

      // EXTREME: Continuous floating badges
      gsap.to(pillar, {
        y: i % 2 === 0 ? 12 : -12,
        duration: 3 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3
      })
    })

    // ── Orbital rings scroll-rotate ────────────────────────────────────
    gsap.to('.orbit-ring-1', {
      scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 2.5 },
      rotate: 110, ease: 'none',
    })
    gsap.to('.orbit-ring-2', {
      scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 4 },
      rotate: -80, ease: 'none',
    })
    gsap.to('.orbit-ring-3', {
      scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 1.8 },
      rotate: 55, ease: 'none',
    })

    // EXTREME: Orbit pulse scale
    gsap.to('.orbit-group', {
      scale: 1.05,
      opacity: 0.7,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // EXTREME: Data stream continuous animation
    gsap.to('.data-stream-light', {
      strokeDashoffset: -1000,
      duration: 'random(3, 6)',
      repeat: -1,
      ease: 'none',
      stagger: {
        each: 1.5,
        repeat: -1
      }
    })

    // ── Floating objects parallax ──────────────────────────────────────
    const floatParallax = [
      { sel: '.why-float-1', y: -130, rotate: 60 },
      { sel: '.why-float-2', y: -90, rotate: -40 },
      { sel: '.why-float-3', y: -180, rotate: 30 },
      { sel: '.why-float-4', y: -70, rotate: -25 },
      { sel: '.why-float-5', y: -110, rotate: 15 },
    ]
    floatParallax.forEach(({ sel, y, rotate }) => {
      gsap.to(sel, {
        scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 1.5 + Math.random() },
        y, rotate, ease: 'none',
      })
    })

    // ── Ghost big text scrub ──────────────────────────────────────────
    gsap.to('.why-big-num', {
      scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 3 },
      x: 60, opacity: 0.02, ease: 'none',
    })

    // ── Count-up numbers ──────────────────────────────────────────────
    if (counter1Ref.value) animateCounter(counter1Ref.value, 20, '+')
    if (counter2Ref.value) animateCounter(counter2Ref.value, 5, '+')

    gsap.from('.why-stats-block', {
      scrollTrigger: { trigger: '.why-stats-block', start: 'top 88%', toggleActions: 'play reverse play reverse' },
      opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', stagger: 0.15,
    })

    // ── Stats divider line expand ─────────────────────────────────────
    gsap.from('.why-divider', {
      scrollTrigger: { trigger: '.why-divider', start: 'top 88%', toggleActions: 'play reverse play reverse' },
      scaleX: 0, duration: 1.4, ease: 'expo.inOut',
    })

  }, sectionRef.value!)
  return () => ctx?.revert()
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="why" ref="sectionRef" class="relative py-36 md:py-56 overflow-hidden"
    style="background-color: #0B1312; border-top: 1px solid rgba(0,191,166,0.1);">

    <!-- ════════════════════════════════════
         EXTREME VISUAL OBJECTS
    ════════════════════════════════════ -->

    <!-- EXTREME: Horizontal Data Streams (Background lines that shoot across) -->
    <div class="absolute inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#00BFA6" stroke-width="0.5" opacity="0.3"/>
        <line class="data-stream-light" x1="0" y1="20%" x2="100%" y2="20%" stroke="#00BFA6" stroke-width="2" stroke-dasharray="100 900" stroke-dashoffset="0"/>
        
        <line x1="0" y1="65%" x2="100%" y2="65%" stroke="#00BFA6" stroke-width="0.5" opacity="0.3"/>
        <line class="data-stream-light" x1="0" y1="65%" x2="100%" y2="65%" stroke="#00BFA6" stroke-width="2" stroke-dasharray="150 850" stroke-dashoffset="0"/>
        
        <line x1="0" y1="85%" x2="100%" y2="85%" stroke="#00BFA6" stroke-width="0.5" opacity="0.3"/>
        <line class="data-stream-light" x1="0" y1="85%" x2="100%" y2="85%" stroke="#00BFA6" stroke-width="2" stroke-dasharray="80 920" stroke-dashoffset="0"/>
      </svg>
    </div>

    <!-- Ghost big number background -->
    <div class="why-big-num absolute -left-8 top-8 pointer-events-none select-none z-0"
      style="font-size: clamp(200px, 30vw, 380px); font-weight: 900; color: rgba(0,191,166,0.05); line-height: 1; letter-spacing: -0.05em; opacity: 0.08;">
      02
    </div>

    <!-- Object 1: Large orbital rings (left side) -> Now with Pulse group -->
    <div class="orbit-group absolute -left-40 top-1/2 -translate-y-1/2 w-[620px] h-[620px] pointer-events-none select-none z-0 transform-origin-center">
      <!-- Glow core -->
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full" style="background: radial-gradient(circle, rgba(0,191,166,0.1), transparent 70%);"></div>
      
      <svg class="orbit-ring-1 absolute inset-0 w-full h-full" viewBox="0 0 620 620" fill="none">
        <ellipse cx="310" cy="310" rx="290" ry="145" stroke="#00BFA6" stroke-width="1.5" stroke-dasharray="10 20" opacity="0.2"/>
        <circle cx="600" cy="310" r="8" fill="#00BFA6" opacity="0.5" style="filter: drop-shadow(0 0 10px #00BFA6);"/>
        <circle cx="20" cy="310" r="8" fill="#00BFA6" opacity="0.5" style="filter: drop-shadow(0 0 10px #00BFA6);"/>
      </svg>
      <svg class="orbit-ring-2 absolute inset-0 w-full h-full" viewBox="0 0 620 620" fill="none">
        <ellipse cx="310" cy="310" rx="210" ry="105" stroke="#26C6B7" stroke-width="1.5" stroke-dasharray="5 15" opacity="0.3" transform="rotate(38 310 310)"/>
        <circle cx="498" cy="225" r="6" fill="#26C6B7" opacity="0.6"/>
        <circle cx="122" cy="395" r="6" fill="#26C6B7" opacity="0.6"/>
      </svg>
      <svg class="orbit-ring-3 absolute inset-0 w-full h-full" viewBox="0 0 620 620" fill="none">
        <ellipse cx="310" cy="310" rx="130" ry="65" stroke="#00BFA6" stroke-width="2" stroke-dasharray="4 7" opacity="0.4" transform="rotate(-22 310 310)"/>
        <circle cx="310" cy="310" r="15" fill="none" stroke="#00BFA6" stroke-width="2" opacity="0.5"/>
        <circle cx="310" cy="310" r="5" fill="#00BFA6" opacity="0.8"/>
      </svg>
    </div>

    <!-- Float Object 1: Diamond (top-right) -->
    <div class="why-float-1 absolute right-[8%] top-[6%] pointer-events-none select-none opacity-[0.09] z-0">
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
        <polygon points="55,5 105,55 55,105 5,55" stroke="#00BFA6" stroke-width="1.2" stroke-dasharray="5 5"/>
        <polygon points="55,22 88,55 55,88 22,55" stroke="#00BFA6" stroke-width="0.7"/>
        <circle cx="55" cy="55" r="5" fill="#00BFA6"/>
      </svg>
    </div>

    <!-- Float Object 2: Cross (bottom-left area) -->
    <div class="why-float-2 absolute left-[30%] bottom-[10%] pointer-events-none select-none opacity-[0.09] z-0">
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
        <line x1="35" y1="0" x2="35" y2="70" stroke="#00BFA6" stroke-width="1.5"/>
        <line x1="0" y1="35" x2="70" y2="35" stroke="#00BFA6" stroke-width="1.5"/>
        <circle cx="35" cy="35" r="6" fill="none" stroke="#00BFA6" stroke-width="1.2"/>
      </svg>
    </div>

    <!-- Float Object 3: Hexagon (right, center) -->
    <div class="why-float-3 absolute right-[3%] top-[45%] pointer-events-none select-none opacity-[0.08] z-0">
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <polygon points="70,8 128,41 128,99 70,132 12,99 12,41" stroke="#00BFA6" stroke-width="1"/>
        <polygon points="70,28 108,51 108,89 70,112 32,89 32,51" stroke="#00BFA6" stroke-width="0.5"/>
        <circle cx="70" cy="70" r="8" stroke="#00BFA6" stroke-width="1" fill="none"/>
      </svg>
    </div>

    <!-- Float Object 4: Dot grid (top-center) -->
    <div class="why-float-4 absolute left-1/2 top-[3%] -translate-x-1/2 pointer-events-none select-none opacity-[0.06] z-0">
      <svg width="180" height="60" viewBox="0 0 180 60" fill="none">
        <g fill="#00BFA6">
          <circle cx="20" cy="20" r="2.5"/><circle cx="50" cy="20" r="2.5"/><circle cx="80" cy="20" r="2.5"/>
          <circle cx="110" cy="20" r="2.5"/><circle cx="140" cy="20" r="2.5"/><circle cx="170" cy="20" r="2.5"/>
          <circle cx="20" cy="50" r="2.5"/><circle cx="50" cy="50" r="2.5"/><circle cx="80" cy="50" r="2.5"/>
          <circle cx="110" cy="50" r="2.5"/><circle cx="140" cy="50" r="2.5"/><circle cx="170" cy="50" r="2.5"/>
        </g>
      </svg>
    </div>

    <!-- Float Object 5: Triangle (bottom-right) -->
    <div class="why-float-5 absolute right-[18%] bottom-[8%] pointer-events-none select-none opacity-[0.09] z-0">
      <svg width="90" height="78" viewBox="0 0 90 78" fill="none">
        <polygon points="45,4 86,74 4,74" stroke="#26C6B7" stroke-width="1.2" stroke-dasharray="4 6"/>
        <polygon points="45,20 70,64 20,64" stroke="#00BFA6" stroke-width="0.6"/>
      </svg>
    </div>

    <!-- ════════════════════════════════════
         CONTENT
    ════════════════════════════════════ -->
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        <!-- Left -->
        <div class="why-left">
          <!-- Char-by-char label -->
          <div class="why-label-chars flex items-center gap-4 mb-8 overflow-hidden" style="perspective: 600px;">
            <div class="h-px w-8 flex-shrink-0" style="background-color: #00BFA6; box-shadow: 0 0 8px #00BFA6;"></div>
            <div class="flex">
              <span
                v-for="(char, i) in labelChars"
                :key="i"
                class="why-char inline-block"
                :style="{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: char === ' ' ? '0.35em' : '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,191,166,0.8)',
                  opacity: 0,
                  whiteSpace: 'pre',
                }"
              >{{ char === ' ' ? '\u00a0' : char }}</span>
            </div>
          </div>

          <!-- Headline with overflow clip -->
          <div class="why-headline-wrap overflow-hidden pb-2">
            <h2 class="text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[1.05] tracking-tight" style="color: #E5E7EB;">
              <span class="why-word inline-block" style="transform: translateY(120%); opacity: 0;">Built</span><br/>
              <span class="why-word inline-block" style="transform: translateY(120%); opacity: 0; color: rgba(229,231,235,0.18);">Differently.</span>
            </h2>
          </div>

          <!-- Stats with count-up -->
          <div class="why-divider mt-16 h-px w-full origin-left" style="background: rgba(0,191,166,0.2); transform: scaleX(0); box-shadow: 0 0 10px rgba(0,191,166,0.3);"></div>
          <div class="mt-10 flex gap-14 flex-wrap">
            <div class="why-stats-block" style="opacity: 0;">
              <div ref="counter1Ref" class="text-5xl font-black tabular-nums tracking-tight" style="color: #00BFA6; text-shadow: 0 0 15px rgba(0,191,166,0.4);">0+</div>
              <div class="text-[10px] font-semibold tracking-[0.3em] uppercase mt-2" style="color: rgba(229,231,235,0.4);">Shipped Projects</div>
            </div>
            <div class="why-stats-block" style="opacity: 0;">
              <div ref="counter2Ref" class="text-5xl font-black tabular-nums tracking-tight" style="color: #26C6B7; text-shadow: 0 0 15px rgba(38,198,183,0.4);">0+</div>
              <div class="text-[10px] font-semibold tracking-[0.3em] uppercase mt-2" style="color: rgba(229,231,235,0.4);">Years Experience</div>
            </div>
            <div class="why-stats-block" style="opacity: 0;">
              <div class="text-5xl font-black tracking-tight" style="color: rgba(229,231,235,0.3);">∞</div>
              <div class="text-[10px] font-semibold tracking-[0.3em] uppercase mt-2" style="color: rgba(229,231,235,0.4);">Scalability</div>
            </div>
          </div>
        </div>

        <!-- Right: Floating Futuristic Badges -->
        <div class="why-right flex flex-wrap gap-4 lg:pl-10 relative">
          <!-- Connection lines behind badges -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-20" style="z-index:-1;">
             <path d="M 50 50 L 150 150 M 200 100 L 300 50" stroke="#00BFA6" stroke-width="1" stroke-dasharray="4 4" />
          </svg>

          <div
            v-for="(pillar, i) in pillars"
            :key="i"
            class="why-pillar group w-full lg:w-[calc(50%-8px)] p-6 cursor-default transition-all duration-500 relative overflow-visible rounded-2xl"
            style="background: rgba(0,191,166,0.05); border: 1px solid rgba(0,191,166,0.2); opacity: 0; box-shadow: 0 4px 30px rgba(0,0,0,0.5);"
          >
            <!-- Circuit corner decor -->
            <svg class="absolute top-0 right-0 w-8 h-8 opacity-50" viewBox="0 0 32 32">
               <polyline points="32,0 32,8 24,16" fill="none" stroke="#00BFA6" stroke-width="1"/>
            </svg>

            <!-- Hover glow -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
              style="background: radial-gradient(circle at center, rgba(0,191,166,0.15), transparent 70%); box-shadow: inset 0 0 0 1px rgba(0,191,166,0.5);"></div>

            <div class="flex flex-col gap-5 relative z-10">
              <div class="flex justify-between items-center">
                <span class="text-4xl font-mono transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" style="color: rgba(0,191,166,0.6); text-shadow: 0 0 10px rgba(0,191,166,0.3);">{{ pillar.symbol }}</span>
                <span class="text-[10px] font-mono tracking-widest font-bold px-2 py-1 rounded bg-[#00BFA6]/10" style="color: #00BFA6; border: 1px solid rgba(0,191,166,0.3);">{{ pillar.code }}</span>
              </div>
              <h3 class="text-sm font-bold tracking-widest uppercase group-hover:text-[#00BFA6] transition-colors duration-300" style="color: #E5E7EB;">{{ pillar.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
