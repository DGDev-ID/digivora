<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Mail } from 'lucide-vue-next'
import { useNeuralCanvas } from '@/composables/useNeuralCanvas'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const { init: initCanvas, destroy: destroyCanvas } = useNeuralCanvas()

const line1Words = ["Let's", 'Engineer', 'Your']
const line2Words = ['Next', 'Digital']
const line3Words = ['Leap.']

const labelChars = 'Ready to Scale?'.split('')

let ctx: gsap.Context | null = null

onMounted(() => {
  if (canvasRef.value) {
    initCanvas(canvasRef.value, {
      particleColor: 0x00bfa6,
      lineColor: 0x11201f,
      bgColor: 0x0b1312,
      count: 130,
      linkDist: 0.2,
    })
  }

  ctx = gsap.context(() => {
    // ── Char label ──────────────────────────────────────────────────
    gsap.fromTo(
      '.cta-char',
      { y: 40, opacity: 0, rotateX: -90, transformOrigin: 'top center' },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.5,
        ease: 'back.out(1.5)',
        stagger: 0.025,
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )

    // ── Oversized headline ───────────────────────────────────────────
    gsap.fromTo(
      '.cta-word',
      { yPercent: 115, opacity: 0, skewY: 4 },
      {
        yPercent: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 72%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )

    // ── Sub clip-path ────────────────────────────────────────────────
    gsap.fromTo(
      '.cta-sub',
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.cta-sub',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )

    // ── Action buttons scale in ──────────────────────────────────────
    gsap.fromTo(
      '.cta-actions',
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.cta-actions',
          start: 'top 90%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )

    // ── Floating objects parallax ─────────────────────────────────
    const floats = [
      { sel: '.cta-float-1', y: -80, rotate: 40 },
      { sel: '.cta-float-2', y: -120, rotate: -30 },
      { sel: '.cta-float-3', y: -60, rotate: 25 },
      { sel: '.cta-float-4', y: -140, rotate: -50 },
      { sel: '.cta-float-5', y: -90, rotate: 15 },
      { sel: '.cta-float-6', y: -70, rotate: -35 },
    ]
    floats.forEach(({ sel, y, rotate }) => {
      gsap.to(sel, {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
        y,
        rotate,
        ease: 'none',
      })
    })

    // ── EXTREME: Glitch/Flicker for big text ───────────────────────
    gsap.to('.cta-ghost-text', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
      y: -80,
      ease: 'none',
    })

    // Continuous random opacity to simulate flicker
    gsap.to('.cta-ghost-text', {
      opacity: () => gsap.utils.random(0.01, 0.08),
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'steps(1)',
      repeatDelay: 0.5,
      repeatRefresh: true,
    })

    // ── EXTREME: Elastic bouncing arrow ──────────────────────────────
    gsap.to('.cta-bounce-arrow', {
      y: 15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
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
  <section
    id="cta"
    ref="sectionRef"
    class="relative py-48 md:py-64 overflow-hidden"
    style="background-color: #0b1312"
  >
    <!-- Neural canvas background -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full opacity-25 pointer-events-none z-0"
    ></canvas>

    <!-- Radial glow -->
    <div
      class="absolute inset-0 pointer-events-none z-0"
      style="
        background: radial-gradient(ellipse at center, rgba(0, 191, 166, 0.1) 0%, transparent 70%);
      "
    ></div>

    <!-- ════════════════════════════════════
         EXTREME VISUAL OBJECTS
    ════════════════════════════════════ -->

    <!-- Ghost big text (Glitching) — tetap tampil di semua ukuran layar -->
    <div
      class="cta-ghost-text absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none select-none overflow-hidden z-0"
      style="
        font-size: clamp(100px, 20vw, 240px);
        font-weight: 900;
        color: rgba(0, 191, 166, 1);
        line-height: 1;
        letter-spacing: -0.04em;
        white-space: nowrap;
        filter: drop-shadow(0 0 30px rgba(0, 191, 166, 0.5));
        opacity: 0.04;
      "
    >
      DIGIVORA
    </div>

    <!-- Float 1: Large ring (top-left) — hanya desktop -->
    <div
      class="cta-float-1 hidden lg:block absolute left-[3%] top-[5%] pointer-events-none select-none opacity-[0.09] z-0"
    >
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
        <circle
          cx="110"
          cy="110"
          r="100"
          stroke="#00BFA6"
          stroke-width="1.5"
          stroke-dasharray="8 16"
        />
        <circle
          cx="110"
          cy="110"
          r="72"
          stroke="#00BFA6"
          stroke-width="0.8"
          stroke-dasharray="4 8"
        />
        <circle cx="110" cy="110" r="40" stroke="#26C6B7" stroke-width="1.5" />
        <circle cx="110" cy="10" r="5" fill="#00BFA6" />
        <circle cx="210" cy="110" r="5" fill="#00BFA6" />
        <circle cx="110" cy="210" r="5" fill="#00BFA6" />
        <line
          x1="110"
          y1="10"
          x2="110"
          y2="210"
          stroke="#00BFA6"
          stroke-width="0.5"
          stroke-dasharray="2 10"
        />
        <line
          x1="10"
          y1="110"
          x2="210"
          y2="110"
          stroke="#00BFA6"
          stroke-width="0.5"
          stroke-dasharray="2 10"
        />
      </svg>
    </div>

    <!-- Float 2: Hexagon (right, top) — hanya desktop -->
    <div
      class="cta-float-2 hidden lg:block absolute right-[4%] top-[8%] pointer-events-none select-none opacity-[0.08] z-0"
    >
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        <polygon
          points="90,8 168,50 168,130 90,172 12,130 12,50"
          stroke="#00BFA6"
          stroke-width="1.5"
        />
        <polygon
          points="90,35 145,67 145,113 90,145 35,113 35,67"
          stroke="#00BFA6"
          stroke-width="0.8"
        />
        <circle cx="90" cy="90" r="14" stroke="#00BFA6" stroke-width="1.5" fill="none" />
        <circle cx="90" cy="90" r="5" fill="#00BFA6" />
      </svg>
    </div>

    <!-- Float 3: Cross (bottom-left) — hanya desktop -->
    <div
      class="cta-float-3 hidden lg:block absolute left-[8%] bottom-[8%] pointer-events-none select-none opacity-[0.09] z-0"
    >
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <line x1="40" y1="0" x2="40" y2="80" stroke="#00BFA6" stroke-width="2" />
        <line x1="0" y1="40" x2="80" y2="40" stroke="#00BFA6" stroke-width="2" />
        <circle cx="40" cy="40" r="8" stroke="#00BFA6" stroke-width="1.5" fill="none" />
        <circle cx="40" cy="40" r="3" fill="#00BFA6" />
      </svg>
    </div>

    <!-- Float 4: Diamond (right, bottom) — hanya desktop -->
    <div
      class="cta-float-4 hidden lg:block absolute right-[6%] bottom-[10%] pointer-events-none select-none opacity-[0.09] z-0"
    >
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <polygon
          points="50,5 95,50 50,95 5,50"
          stroke="#26C6B7"
          stroke-width="1.5"
          stroke-dasharray="5 5"
        />
        <polygon points="50,22 78,50 50,78 22,50" stroke="#00BFA6" stroke-width="1" />
        <circle cx="50" cy="50" r="5" fill="#00BFA6" opacity="0.8" />
      </svg>
    </div>

    <!-- Float 5: Dot matrix (left, center) — hanya desktop -->
    <div
      class="cta-float-5 hidden lg:block absolute left-[1%] top-[40%] pointer-events-none select-none opacity-[0.06] z-0"
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <g fill="#00BFA6">
          <circle cx="15" cy="15" r="2.5" />
          <circle cx="45" cy="15" r="2.5" />
          <circle cx="75" cy="15" r="2.5" />
          <circle cx="105" cy="15" r="2.5" />
          <circle cx="15" cy="45" r="2.5" />
          <circle cx="45" cy="45" r="2.5" />
          <circle cx="75" cy="45" r="2.5" />
          <circle cx="105" cy="45" r="2.5" />
          <circle cx="15" cy="75" r="2.5" />
          <circle cx="45" cy="75" r="2.5" />
          <circle cx="75" cy="75" r="2.5" />
          <circle cx="105" cy="75" r="2.5" />
          <circle cx="15" cy="105" r="2.5" />
          <circle cx="45" cy="105" r="2.5" />
          <circle cx="75" cy="105" r="2.5" />
          <circle cx="105" cy="105" r="2.5" />
        </g>
      </svg>
    </div>

    <!-- Float 6: Triangle (right, center) — hanya desktop -->
    <div
      class="cta-float-6 hidden lg:block absolute right-[2%] top-[42%] pointer-events-none select-none opacity-[0.08] z-0"
    >
      <svg width="90" height="78" viewBox="0 0 90 78" fill="none">
        <polygon
          points="45,4 86,74 4,74"
          stroke="#00BFA6"
          stroke-width="1.5"
          stroke-dasharray="4 6"
        />
        <polygon points="45,20 70,64 20,64" stroke="#00BFA6" stroke-width="0.8" />
      </svg>
    </div>

    <!-- EXTREME: Abstract Down Arrow bouncing over headline -->
    <div class="absolute top-[15%] left-1/2 -translate-x-1/2 z-10 pointer-events-none">
      <svg
        class="cta-bounce-arrow opacity-30"
        width="40"
        height="80"
        viewBox="0 0 40 80"
        fill="none"
      >
        <line x1="20" y1="0" x2="20" y2="70" stroke="#00BFA6" stroke-width="2" />
        <polyline points="5,55 20,70 35,55" stroke="#00BFA6" stroke-width="2" fill="none" />
      </svg>
    </div>

    <!-- ════════════════════════════════════
         CONTENT
    ════════════════════════════════════ -->
    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Char label centered -->
      <div
        class="flex items-center gap-4 mb-16 justify-center overflow-hidden"
        style="perspective: 500px"
      >
        <div
          class="h-px w-8 flex-shrink-0"
          style="background-color: rgba(0, 191, 166, 0.6); box-shadow: 0 0 10px #00bfa6"
        ></div>
        <div class="flex">
          <span
            v-for="(char, i) in labelChars"
            :key="i"
            class="cta-char inline-block"
            :style="{
              fontFamily: 'monospace',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: char === ' ' ? '0.35em' : '0.06em',
              textTransform: 'uppercase',
              color: 'rgba(0,191,166,0.8)',
              opacity: 0,
              whiteSpace: 'pre',
            }"
            >{{ char === ' ' ? '\u00a0' : char }}</span
          >
        </div>
        <div
          class="h-px w-8 flex-shrink-0"
          style="background-color: rgba(0, 191, 166, 0.6); box-shadow: 0 0 10px #00bfa6"
        ></div>
      </div>

      <!-- Oversized Headline -->
      <div class="text-center">
        <!-- Line 1 -->
        <div class="flex flex-wrap justify-center gap-x-6 overflow-hidden">
          <div v-for="word in line1Words" :key="'l1-' + word" class="overflow-hidden">
            <span
              class="cta-word inline-block text-[clamp(3rem,8vw,8rem)] font-black leading-[0.92] tracking-tight"
              style="color: #e5e7eb; display: inline-block"
              >{{ word }}</span
            >
          </div>
        </div>
        <!-- Line 2 -->
        <div class="flex flex-wrap justify-center gap-x-6 overflow-hidden">
          <div v-for="word in line2Words" :key="'l2-' + word" class="overflow-hidden">
            <span
              class="cta-word inline-block text-[clamp(3rem,8vw,8rem)] font-black leading-[0.92] tracking-tight drop-shadow-[0_0_20px_rgba(0,191,166,0.4)]"
              style="color: rgba(0, 191, 166, 0.8); display: inline-block"
              >{{ word }}</span
            >
          </div>
        </div>
        <!-- Line 3 -->
        <div class="flex flex-wrap justify-center gap-x-6 overflow-hidden mb-14">
          <div v-for="word in line3Words" :key="'l3-' + word" class="overflow-hidden">
            <span
              class="cta-word inline-block text-[clamp(3rem,8vw,8rem)] font-black leading-[0.92] tracking-tight"
              style="color: #e5e7eb; display: inline-block"
              >{{ word }}</span
            >
          </div>
        </div>

        <!-- Sub -->
        <p
          class="cta-sub text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed mb-14"
          style="color: rgba(229, 231, 235, 0.42); clip-path: inset(0 100% 0 0)"
        >
          From conceptualization to enterprise deployment, we are ready to be your technology
          partner.
        </p>

        <!-- Actions -->
        <div
          class="cta-actions flex flex-col sm:flex-row items-center justify-center gap-6"
          style="opacity: 0"
        >
          <RouterLink
            to="/contact"
            class="group inline-flex items-center gap-3 px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:gap-5 hover:scale-[1.05]"
            style="
              background-color: #00bfa6;
              color: #0b1312;
              box-shadow: 0 10px 30px rgba(0, 191, 166, 0.3);
            "
          >
            <Mail :size="16" />
            Start a Project
            <ArrowRight
              :size="16"
              class="transition-transform duration-300 group-hover:translate-x-2"
            />
          </RouterLink>
          <a
            href="mailto:hello@digivora.id"
            class="group inline-flex items-center gap-3 px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[rgba(0,191,166,0.1)] hover:border-[#00BFA6] hover:gap-5 backdrop-blur-sm"
            style="border: 1px solid rgba(0,191,166,0.4); color: #E5E7EB; box-shadow: inset 0 0 0 0 rgba(0,191,166,0); hover:box-shadow: inset 0 0 20px rgba(0,191,166,0.2);"
          >
            hello@digivora.id
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
