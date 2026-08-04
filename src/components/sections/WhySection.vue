<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const counter1Ref = ref<HTMLElement | null>(null)
const counter2Ref = ref<HTMLElement | null>(null)

const pillars = [
  { title: 'Enterprise Standards', desc: "We don't cut corners. Clean architecture, robust security, and scalable infrastructure are default.", symbol: '⬡', code: 'ENT' },
  { title: 'Performance Obsessed', desc: 'Milliseconds matter. Our systems are optimized for blazing fast load times and optimal SEO.', symbol: '◎', code: 'PER' },
  { title: 'Transparent Process', desc: 'No black boxes. You get full visibility into our codebase, sprints, and engineering decisions.', symbol: '◈', code: 'TRN' },
  { title: 'Long-Term Partner', desc: 'We build ecosystems, not just apps. We provide ongoing maintenance, scaling, and tech consultation.', symbol: '◆', code: 'LTP' },
]

const labelChars = 'Why Digivora'.split('')

function animateCounter(el: HTMLElement, target: number, suffix: string) {
  const obj = { val: 0 }
  gsap.to(obj, {
    val: target,
    duration: 2.2,
    ease: 'power2.out',
    onUpdate: () => { el.textContent = Math.round(obj.val) + suffix },
    scrollTrigger: { trigger: el, start: 'top 85%' , toggleActions: 'play reverse play reverse'},
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
        scrollTrigger: { trigger: '.why-label-chars', start: 'top 88%' , toggleActions: 'play reverse play reverse'},
      },
    )

    // ── Headline words reveal (dramatic skew + clip) ──────────────────
    gsap.utils.toArray<HTMLElement>('.why-word').forEach((word, i) => {
      gsap.fromTo(word,
        { yPercent: 120, opacity: 0, skewY: 6 },
        {
          yPercent: 0, opacity: 1, skewY: 0,
          duration: 1.1, ease: 'expo.out', delay: i * 0.1,
          scrollTrigger: { trigger: '.why-headline-wrap', start: 'top 82%' , toggleActions: 'play reverse play reverse'},
        },
      )
    })

    // ── Sub paragraph clip-path reveal ───────────────────────────────
    gsap.fromTo('.why-sub',
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)', opacity: 1,
        duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.why-sub', start: 'top 85%' , toggleActions: 'play reverse play reverse'},
      },
    )

    // ── Pillar items — scan from left stagger ─────────────────────────
    gsap.utils.toArray<HTMLElement>('.why-pillar').forEach((pillar, i) => {
      gsap.fromTo(pillar,
        { opacity: 0, x: 70, clipPath: 'inset(0 0 0 100%)' },
        {
          opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)',
          duration: 0.8, ease: 'power3.out', delay: i * 0.11,
          scrollTrigger: { trigger: '.why-right', start: 'top 78%' , toggleActions: 'play reverse play reverse'},
        },
      )
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
      scrollTrigger: { trigger: '.why-stats-block', start: 'top 88%' , toggleActions: 'play reverse play reverse'},
      opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', stagger: 0.15,
    })

    // ── Stats divider line expand ─────────────────────────────────────
    gsap.from('.why-divider', {
      scrollTrigger: { trigger: '.why-divider', start: 'top 88%' , toggleActions: 'play reverse play reverse'},
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
         VISUAL OBJECTS
    ════════════════════════════════════ -->

    <!-- Ghost big number background -->
    <div class="why-big-num absolute -left-8 top-8 pointer-events-none select-none"
      style="font-size: clamp(200px, 30vw, 380px); font-weight: 900; color: rgba(0,191,166,0.05); line-height: 1; letter-spacing: -0.05em; opacity: 0.06;">
      02
    </div>

    <!-- Object 1: Large orbital rings (left side) -->
    <div class="absolute -left-40 top-1/2 -translate-y-1/2 w-[620px] h-[620px] pointer-events-none select-none" style="z-index:0;">
      <svg class="orbit-ring-1 absolute inset-0 w-full h-full" viewBox="0 0 620 620" fill="none">
        <ellipse cx="310" cy="310" rx="290" ry="145" stroke="#00BFA6" stroke-width="0.7" stroke-dasharray="7 14" opacity="0.12"/>
        <circle cx="600" cy="310" r="6" fill="#00BFA6" opacity="0.35"/>
        <circle cx="20" cy="310" r="6" fill="#00BFA6" opacity="0.35"/>
      </svg>
      <svg class="orbit-ring-2 absolute inset-0 w-full h-full" viewBox="0 0 620 620" fill="none">
        <ellipse cx="310" cy="310" rx="210" ry="105" stroke="#26C6B7" stroke-width="0.9" stroke-dasharray="5 9" opacity="0.1" transform="rotate(38 310 310)"/>
        <circle cx="498" cy="225" r="5" fill="#26C6B7" opacity="0.3"/>
        <circle cx="122" cy="395" r="5" fill="#26C6B7" opacity="0.3"/>
      </svg>
      <svg class="orbit-ring-3 absolute inset-0 w-full h-full" viewBox="0 0 620 620" fill="none">
        <ellipse cx="310" cy="310" rx="130" ry="65" stroke="#00BFA6" stroke-width="1.2" stroke-dasharray="4 7" opacity="0.18" transform="rotate(-22 310 310)"/>
        <circle cx="310" cy="310" r="10" fill="none" stroke="#00BFA6" stroke-width="1.2" opacity="0.35"/>
        <circle cx="310" cy="310" r="4" fill="#00BFA6" opacity="0.5"/>
      </svg>
    </div>

    <!-- Float Object 1: Diamond (top-right) -->
    <div class="why-float-1 absolute right-[8%] top-[6%] pointer-events-none select-none opacity-[0.07]">
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
        <polygon points="55,5 105,55 55,105 5,55" stroke="#00BFA6" stroke-width="1.2" stroke-dasharray="5 5"/>
        <polygon points="55,22 88,55 55,88 22,55" stroke="#00BFA6" stroke-width="0.7"/>
        <circle cx="55" cy="55" r="5" fill="#00BFA6"/>
      </svg>
    </div>

    <!-- Float Object 2: Cross (bottom-left area) -->
    <div class="why-float-2 absolute left-[30%] bottom-[10%] pointer-events-none select-none opacity-[0.07]">
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
        <line x1="35" y1="0" x2="35" y2="70" stroke="#00BFA6" stroke-width="1.5"/>
        <line x1="0" y1="35" x2="70" y2="35" stroke="#00BFA6" stroke-width="1.5"/>
        <circle cx="35" cy="35" r="6" fill="none" stroke="#00BFA6" stroke-width="1.2"/>
      </svg>
    </div>

    <!-- Float Object 3: Hexagon (right, center) -->
    <div class="why-float-3 absolute right-[3%] top-[45%] pointer-events-none select-none opacity-[0.06]">
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <polygon points="70,8 128,41 128,99 70,132 12,99 12,41" stroke="#00BFA6" stroke-width="1"/>
        <polygon points="70,28 108,51 108,89 70,112 32,89 32,51" stroke="#00BFA6" stroke-width="0.5"/>
        <circle cx="70" cy="70" r="8" stroke="#00BFA6" stroke-width="1" fill="none"/>
      </svg>
    </div>

    <!-- Float Object 4: Dot grid (top-center) -->
    <div class="why-float-4 absolute left-1/2 top-[3%] -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
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
    <div class="why-float-5 absolute right-[18%] bottom-[8%] pointer-events-none select-none opacity-[0.07]">
      <svg width="90" height="78" viewBox="0 0 90 78" fill="none">
        <polygon points="45,4 86,74 4,74" stroke="#26C6B7" stroke-width="1.2" stroke-dasharray="4 6"/>
        <polygon points="45,20 70,64 20,64" stroke="#00BFA6" stroke-width="0.6"/>
      </svg>
    </div>

    <!-- ════════════════════════════════════
         CONTENT
    ════════════════════════════════════ -->
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        <!-- Left -->
        <div class="why-left">
          <!-- Char-by-char label -->
          <div class="why-label-chars flex items-center gap-4 mb-8 overflow-hidden" style="perspective: 600px;">
            <div class="h-px w-8 flex-shrink-0" style="background-color: #00BFA6;"></div>
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
                  color: 'rgba(0,191,166,0.6)',
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

          <p class="why-sub text-base leading-relaxed font-light max-w-sm mt-6" style="color: rgba(229,231,235,0.5); clip-path: inset(0 100% 0 0);">
            We are an engineering powerhouse focused on quality, speed, and long-term business value.
          </p>

          <!-- Stats with count-up -->
          <div class="why-divider mt-16 h-px w-full origin-left" style="background: rgba(0,191,166,0.1); transform: scaleX(0);"></div>
          <div class="mt-10 flex gap-14 flex-wrap">
            <div class="why-stats-block" style="opacity: 0;">
              <div ref="counter1Ref" class="text-5xl font-black tabular-nums tracking-tight" style="color: #00BFA6;">0+</div>
              <div class="text-[10px] font-semibold tracking-[0.3em] uppercase mt-2" style="color: rgba(229,231,235,0.3);">Shipped Projects</div>
            </div>
            <div class="why-stats-block" style="opacity: 0;">
              <div ref="counter2Ref" class="text-5xl font-black tabular-nums tracking-tight" style="color: #26C6B7;">0+</div>
              <div class="text-[10px] font-semibold tracking-[0.3em] uppercase mt-2" style="color: rgba(229,231,235,0.3);">Years Experience</div>
            </div>
            <div class="why-stats-block" style="opacity: 0;">
              <div class="text-5xl font-black tracking-tight" style="color: rgba(229,231,235,0.2);">∞</div>
              <div class="text-[10px] font-semibold tracking-[0.3em] uppercase mt-2" style="color: rgba(229,231,235,0.3);">Scalability</div>
            </div>
          </div>
        </div>

        <!-- Right: Pillars -->
        <div class="why-right flex flex-col gap-0" style="border-top: 1px solid rgba(0,191,166,0.12);">
          <div
            v-for="(pillar, i) in pillars"
            :key="i"
            class="why-pillar group py-7 flex items-start gap-5 cursor-default px-3 transition-colors duration-300 hover:bg-[#11201F] relative overflow-hidden"
            style="border-bottom: 1px solid rgba(0,191,166,0.12); opacity: 0;"
          >
            <!-- Hover scan-line -->
            <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
              style="background: linear-gradient(to right, transparent, rgba(0,191,166,0.05), transparent);"></div>

            <!-- Left: code badge -->
            <div class="flex-shrink-0 flex flex-col items-center gap-2">
              <span class="text-lg font-mono" style="color: rgba(0,191,166,0.3);">{{ pillar.symbol }}</span>
              <span class="text-[9px] font-mono tracking-widest" style="color: rgba(0,191,166,0.2);">{{ pillar.code }}</span>
            </div>

            <div class="flex-1">
              <h3 class="text-base font-bold mb-2 group-hover:text-[#00BFA6] transition-colors duration-300 tracking-wide" style="color: #E5E7EB;">{{ pillar.title }}</h3>
              <p class="text-sm leading-relaxed font-light" style="color: rgba(229,231,235,0.42);">{{ pillar.desc }}</p>
            </div>
            <div class="ml-auto flex-shrink-0 text-[10px] font-mono pt-1" style="color: rgba(0,191,166,0.2);">0{{ i + 1 }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
