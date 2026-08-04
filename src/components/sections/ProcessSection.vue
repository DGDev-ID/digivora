<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAntiBurst } from '@/composables/useAntiBurst'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const connectorRef = ref<HTMLElement | null>(null)
const { init: initCanvas, destroy: destroyCanvas } = useAntiBurst()

const steps = [
  { num: '01', title: 'Discovery & Architecture', tag: 'DISCOVER' },
  { num: '02', title: 'UI/UX Prototyping', tag: 'DESIGN' },
  { num: '03', title: 'Agile Engineering', tag: 'BUILD' },
  { num: '04', title: 'QA & Deployment', tag: 'SHIP' },
]

const labelChars = 'How We Work'.split('')

let ctx: gsap.Context | null = null

onMounted(() => {
  if (canvasRef.value) {
    initCanvas(canvasRef.value, {
      bgColor: 0x0B1312, count: 500, innerRadius: 4,
      outerRadius: 55, baseSize: 2.8, elementSized: true,
    })
  }

  ctx = gsap.context(() => {

    // ── Char label ──────────────────────────────────────────────────
    gsap.fromTo('.proc-char',
      { y: 40, opacity: 0, rotateX: -90 },
      {
        y: 0, opacity: 1, rotateX: 0,
        duration: 0.55, ease: 'back.out(1.5)', stagger: 0.03,
        scrollTrigger: { trigger: '.proc-label-chars', start: 'top 88%', toggleActions: 'play reverse play reverse' },
      },
    )

    // ── Headline reveal ──────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>('.process-word').forEach((w, i) => {
      gsap.fromTo(w,
        { yPercent: 115, opacity: 0, skewY: 5 },
        { yPercent: 0, opacity: 1, skewY: 0, duration: 1, ease: 'expo.out', delay: i * 0.1,
          scrollTrigger: { trigger: '.process-heading-wrap', start: 'top 82%', toggleActions: 'play reverse play reverse' } },
      )
    })

    // ── Scrub: connector fill ────────────────────────────────────────
    if (connectorRef.value) {
      gsap.fromTo(connectorRef.value,
        { scaleX: 0 },
        {
          scaleX: 1, ease: 'none',
          scrollTrigger: {
            trigger: '.process-steps',
            start: 'top 60%',
            end: 'center 40%',
            scrub: 1,
          },
        },
      )
    }

    // ── Hex nodes pop in ─────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>('.process-hex-node').forEach((node, i) => {
      gsap.fromTo(node,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.55,
          delay: i * 0.2,
          scrollTrigger: { trigger: '.process-steps', start: 'top 65%', toggleActions: 'play reverse play reverse' },
        },
      )
    })

    // ── Hex glow pulse & EXTREME sonar pings ────────────────────────
    gsap.utils.toArray<HTMLElement>('.hex-glow').forEach((glow, i) => {
      gsap.to(glow, {
        opacity: 0.9, scale: 1.6, duration: 1.2,
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.35,
      })
    })

    gsap.utils.toArray<HTMLElement>('.hex-sonar').forEach((sonar, i) => {
      gsap.fromTo(sonar, 
        { scale: 0.5, opacity: 0.8, borderWidth: '2px' },
        { 
          scale: 2.5, opacity: 0, borderWidth: '0px',
          duration: 2, repeat: -1, ease: 'power2.out', delay: i * 0.5
        }
      )
    })

    // ── Step titles slide up ─────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>('.process-step').forEach((step, i) => {
      gsap.fromTo(step,
        { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 0.75, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: '.process-steps-content', start: 'top 78%', toggleActions: 'play reverse play reverse' },
        },
      )
    })

    // ── Floating objects ────────────────────────────────────────────
    const floats = [
      { sel: '.proc-float-1', y: -100, rotate: 35 },
      { sel: '.proc-float-2', y: -150, rotate: -45 },
      { sel: '.proc-float-3', y: -80, rotate: 25 },
      { sel: '.proc-float-4', y: -130, rotate: -20 },
      { sel: '.proc-float-5', y: -70, rotate: 60 },
    ]
    floats.forEach(({ sel, y, rotate }) => {
      gsap.to(sel, {
        scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        y, rotate, ease: 'none',
      })
    })

    // ── EXTREME: System Core background rotation ─────────────────────
    gsap.to('.system-core-outer', {
      rotate: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center'
    })
    gsap.to('.system-core-inner', {
      rotate: -360,
      duration: 20,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center'
    })

    // Core scroll parallax
    gsap.to('.system-core', {
      scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 2.5 },
      y: 150, ease: 'none',
    })

    // ── Ghost number ─────────────────────────────────────────────────
    gsap.to('.proc-big-num', {
      scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 2.5 },
      x: 80, ease: 'none',
    })

    // ── Mobile steps ─────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>('.process-step-mobile').forEach((step, i) => {
      gsap.fromTo(step,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: '.process-steps-mobile', start: 'top 78%', toggleActions: 'play reverse play reverse' } },
      )
    })

  }, sectionRef.value!)
  return () => ctx?.revert()
})

onUnmounted(() => {
  destroyCanvas()
  ctx?.revert()
})
</script>

<template>
  <section id="process" ref="sectionRef" class="relative py-36 md:py-56 overflow-hidden"
    style="background-color: #0B1312; border-top: 1px solid rgba(0,191,166,0.06);">

    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" />

    <!-- ════════════════════════════════════
         EXTREME VISUAL OBJECTS
    ════════════════════════════════════ -->

    <!-- EXTREME: System Core Illustration (Center background) -->
    <div class="system-core absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none select-none z-0 opacity-[0.06]">
      <svg viewBox="0 0 900 900" fill="none" class="w-full h-full">
        <!-- Outer ring -->
        <g class="system-core-outer">
          <circle cx="450" cy="450" r="400" stroke="#00BFA6" stroke-width="2" stroke-dasharray="10 30 50 30"/>
          <circle cx="450" cy="450" r="380" stroke="#00BFA6" stroke-width="1" stroke-dasharray="5 15"/>
          <path d="M 450 10 L 450 50 M 450 850 L 450 890 M 10 450 L 50 450 M 850 450 L 890 450" stroke="#26C6B7" stroke-width="4"/>
          <!-- Outer nodes -->
          <circle cx="450" cy="50" r="8" fill="#00BFA6"/>
          <circle cx="450" cy="850" r="8" fill="#00BFA6"/>
          <circle cx="50" cy="450" r="8" fill="#00BFA6"/>
          <circle cx="850" cy="450" r="8" fill="#00BFA6"/>
        </g>
        <!-- Inner ring -->
        <g class="system-core-inner">
          <circle cx="450" cy="450" r="280" stroke="#26C6B7" stroke-width="3" stroke-dasharray="100 50"/>
          <circle cx="450" cy="450" r="260" stroke="#00BFA6" stroke-width="0.5" stroke-dasharray="2 6"/>
          <rect x="440" y="160" width="20" height="20" fill="#00BFA6" transform="rotate(45 450 170)"/>
          <rect x="440" y="720" width="20" height="20" fill="#00BFA6" transform="rotate(45 450 730)"/>
          <rect x="160" y="440" width="20" height="20" fill="#00BFA6" transform="rotate(45 170 450)"/>
          <rect x="720" y="440" width="20" height="20" fill="#00BFA6" transform="rotate(45 730 450)"/>
        </g>
        <!-- Center core (static) -->
        <circle cx="450" cy="450" r="150" stroke="#00BFA6" stroke-width="1" stroke-dasharray="4 8"/>
        <circle cx="450" cy="450" r="80" stroke="#26C6B7" stroke-width="2"/>
        <circle cx="450" cy="450" r="30" fill="#00BFA6" opacity="0.8"/>
        <circle cx="450" cy="450" r="100" fill="none" stroke="#00BFA6" stroke-width="30" opacity="0.1"/>
      </svg>
    </div>

    <!-- Ghost big number -->
    <div class="proc-big-num absolute right-0 bottom-0 pointer-events-none select-none z-0"
      style="font-size: clamp(200px, 32vw, 400px); font-weight: 900; color: rgba(0,191,166,0.04); line-height: 0.9; letter-spacing: -0.06em;">
      04
    </div>

    <!-- Ambient glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0"
      style="background: radial-gradient(circle, rgba(0,191,166,0.08) 0%, transparent 65%);"></div>

    <!-- Float 1: Large hexagon (top-left) -->
    <div class="proc-float-1 absolute left-[2%] top-[5%] pointer-events-none select-none opacity-[0.08] z-0">
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
        <polygon points="110,10 200,60 200,160 110,210 20,160 20,60" stroke="#00BFA6" stroke-width="1.5"/>
        <polygon points="110,40 175,78 175,142 110,180 45,142 45,78" stroke="#00BFA6" stroke-width="0.7"/>
        <polygon points="110,70 150,93 150,127 110,150 70,127 70,93" stroke="#00BFA6" stroke-width="0.4"/>
        <circle cx="110" cy="110" r="14" stroke="#00BFA6" stroke-width="1.2" fill="none"/>
        <circle cx="110" cy="110" r="5" fill="#00BFA6"/>
      </svg>
    </div>

    <!-- Float 2: Circuit cross (top-right) -->
    <div class="proc-float-2 absolute right-[5%] top-[8%] pointer-events-none select-none opacity-[0.08] z-0">
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <line x1="70" y1="0" x2="70" y2="140" stroke="#00BFA6" stroke-width="2"/>
        <line x1="0" y1="70" x2="140" y2="70" stroke="#00BFA6" stroke-width="2"/>
        <circle cx="70" cy="70" r="18" stroke="#00BFA6" stroke-width="1.5" fill="none"/>
        <circle cx="70" cy="70" r="6" fill="#00BFA6"/>
        <circle cx="70" cy="10" r="4" fill="none" stroke="#00BFA6" stroke-width="1"/>
        <circle cx="130" cy="70" r="4" fill="none" stroke="#00BFA6" stroke-width="1"/>
        <circle cx="70" cy="130" r="4" fill="none" stroke="#00BFA6" stroke-width="1"/>
        <circle cx="10" cy="70" r="4" fill="none" stroke="#00BFA6" stroke-width="1"/>
      </svg>
    </div>

    <!-- Float 3: Dot grid (right, lower) -->
    <div class="proc-float-3 absolute right-[3%] bottom-[15%] pointer-events-none select-none opacity-[0.06] z-0">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <g fill="#00BFA6">
          <circle cx="15" cy="15" r="2.5"/><circle cx="45" cy="15" r="2.5"/><circle cx="75" cy="15" r="2.5"/><circle cx="105" cy="15" r="2.5"/>
          <circle cx="15" cy="45" r="2.5"/><circle cx="45" cy="45" r="2.5"/><circle cx="75" cy="45" r="2.5"/><circle cx="105" cy="45" r="2.5"/>
          <circle cx="15" cy="75" r="2.5"/><circle cx="45" cy="75" r="2.5"/><circle cx="75" cy="75" r="2.5"/><circle cx="105" cy="75" r="2.5"/>
          <circle cx="15" cy="105" r="2.5"/><circle cx="45" cy="105" r="2.5"/><circle cx="75" cy="105" r="2.5"/><circle cx="105" cy="105" r="2.5"/>
        </g>
      </svg>
    </div>

    <!-- Float 4: Diamond (left, lower) -->
    <div class="proc-float-4 absolute left-[5%] bottom-[10%] pointer-events-none select-none opacity-[0.08] z-0">
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <polygon points="50,5 95,50 50,95 5,50" stroke="#26C6B7" stroke-width="1.5" stroke-dasharray="5 5"/>
        <polygon points="50,22 78,50 50,78 22,50" stroke="#00BFA6" stroke-width="0.7"/>
        <circle cx="50" cy="50" r="6" fill="#00BFA6" opacity="0.8"/>
      </svg>
    </div>

    <!-- Float 5: Triangle top-center -->
    <div class="proc-float-5 absolute left-[45%] top-[2%] pointer-events-none select-none opacity-[0.08] z-0">
      <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
        <polygon points="40,4 76,68 4,68" stroke="#00BFA6" stroke-width="1.5" stroke-dasharray="4 6"/>
        <polygon points="40,20 62,58 18,58" stroke="#00BFA6" stroke-width="0.8"/>
      </svg>
    </div>

    <!-- ════════════════════════════════════
         CONTENT
    ════════════════════════════════════ -->
    <div class="relative z-10 max-w-7xl mx-auto px-6">

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <!-- Char label -->
          <div class="proc-label-chars flex items-center gap-4 mb-6 overflow-hidden" style="perspective: 500px;">
            <div class="h-px w-8 flex-shrink-0" style="background-color: rgba(0,191,166,0.5); box-shadow: 0 0 10px #00BFA6;"></div>
            <div class="flex">
              <span v-for="(char, i) in labelChars" :key="i"
                class="proc-char inline-block"
                :style="{
                  fontFamily: 'monospace', fontSize: '11px', fontWeight: '600',
                  letterSpacing: char === ' ' ? '0.35em' : '0.08em',
                  textTransform: 'uppercase', color: 'rgba(0,191,166,0.8)',
                  opacity: 0, whiteSpace: 'pre',
                }"
              >{{ char === ' ' ? '\u00a0' : char }}</span>
            </div>
          </div>

          <!-- Headline -->
          <div class="process-heading-wrap overflow-hidden pb-2">
            <h2 class="text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[1.1] tracking-tight flex flex-wrap gap-x-[0.3em]"
              style="color: #E5E7EB;">
              <span v-for="w in ['Engineering', 'Process']" :key="w"
                class="process-word inline-block"
                :style="w === 'Process' ? 'color: rgba(229,231,235,0.18);' : ''"
                style="opacity: 0;"
              >{{ w }}</span>
            </h2>
          </div>
        </div>
      </div>

      <!-- Desktop: Timeline (Enlarged Nodes & Titles Only) -->
      <div class="process-steps hidden lg:block relative z-20">
        <div class="relative mb-8">
          <!-- BG track -->
          <div class="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" style="background: rgba(0,191,166,0.15);"></div>
          <!-- Scrub fill line -->
          <div ref="connectorRef" class="process-connector absolute top-1/2 left-0 right-0 h-[4px] -translate-y-1/2 origin-left"
            style="background: linear-gradient(to right, #00BFA6, #26C6B7, rgba(0,191,166,0.8)); box-shadow: 0 0 20px rgba(0,191,166,0.8); transform: scaleX(0);"></div>

          <!-- Hexagon nodes -->
          <div class="flex justify-between relative z-10">
            <div v-for="step in steps" :key="step.num"
              class="flex flex-col items-center"
              style="width: calc(100% / 4)">
              <div class="process-hex-node relative flex items-center justify-center cursor-default group" style="transform: scale(0); opacity: 0;">
                
                <!-- EXTREME: Sonar ping rings -->
                <div class="hex-sonar absolute w-24 h-24 rounded-full border border-[#00BFA6] pointer-events-none"></div>

                <!-- Pulse glow -->
                <div class="hex-glow absolute w-24 h-24 rounded-full pointer-events-none"
                  style="background: radial-gradient(circle, rgba(0,191,166,0.4), transparent 70%); opacity: 0; transform: scale(1);"></div>
                
                <!-- Hexagon (Enlarged) -->
                <svg width="90" height="100" viewBox="0 0 48 54" fill="none" class="transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(0,191,166,0.3)]">
                  <path d="M24 2 L45 14 L45 40 L24 52 L3 40 L3 14 Z" stroke="#00BFA6" stroke-width="2" fill="#0B1312"/>
                  <path d="M24 9 L40 18 L40 36 L24 45 L8 36 L8 18 Z" fill="rgba(0,191,166,0.15)"/>
                </svg>
                <span class="absolute text-[18px] font-black font-mono transition-colors duration-300 group-hover:text-white" style="color: #00BFA6; text-shadow: 0 0 10px rgba(0,191,166,0.5);">{{ step.num }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step content (Titles Only) -->
        <div class="process-steps-content flex justify-between relative z-20">
          <div v-for="step in steps" :key="step.num"
            class="process-step group flex flex-col items-center text-center cursor-default transition-all duration-300"
            style="width: calc(100% / 4); opacity: 0; clip-path: inset(0 0 100% 0);">
            <div class="text-[11px] font-mono tracking-[0.3em] font-bold mb-3 px-3 py-1 rounded bg-[#00BFA6]/10 border border-[#00BFA6]/20" style="color: rgba(0,191,166,0.7);">{{ step.tag }}</div>
            <h3 class="text-2xl font-bold tracking-wide group-hover:text-[#00BFA6] transition-colors duration-300 drop-shadow-md" style="color: #E5E7EB;">{{ step.title }}</h3>
          </div>
        </div>
      </div>

      <!-- Mobile: Vertical (Titles Only) -->
      <div class="process-steps-mobile lg:hidden flex flex-col gap-0 relative z-20" style="border-top: 1px solid rgba(0,191,166,0.2);">
        <div v-for="step in steps" :key="step.num"
          class="process-step-mobile flex items-center gap-6 py-8 group"
          style="border-bottom: 1px solid rgba(0,191,166,0.2); opacity: 0;">
          <div class="shrink-0 relative flex items-center justify-center">
            <div class="hex-sonar absolute w-16 h-16 rounded-full border border-[#00BFA6] pointer-events-none"></div>
            <svg width="64" height="72" viewBox="0 0 48 54" fill="none">
              <path d="M24 2 L45 14 L45 40 L24 52 L3 40 L3 14 Z" stroke="#00BFA6" stroke-width="2" fill="#0B1312"/>
            </svg>
            <span class="absolute text-[14px] font-black font-mono" style="color: #00BFA6; text-shadow: 0 0 5px rgba(0,191,166,0.5);">{{ step.num }}</span>
          </div>
          <div>
            <div class="text-[10px] font-mono tracking-widest mb-2 font-bold px-2 py-0.5 rounded bg-[#00BFA6]/10 inline-block border border-[#00BFA6]/20" style="color: rgba(0,191,166,0.6);">{{ step.tag }}</div>
            <h3 class="text-xl font-bold group-hover:text-[#00BFA6] transition-colors duration-300" style="color: #E5E7EB;">{{ step.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
