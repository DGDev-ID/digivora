<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

const values = [
  { num: '01', label: 'Scalable Architecture', icon: '⬡' },
  { num: '02', label: 'Precision Engineering', icon: '◈' },
  { num: '03', label: 'Design Intelligence', icon: '◎' },
  { num: '04', label: 'Business First', icon: '◆' },
]
const headlineWords = ['Your', 'Technology', 'Partner', 'for', 'the', 'Digital', 'Era.']

const label1 = 'About Digivora'.split('')

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    // ── Char-by-char label reveal ────────────────────────────────────
    gsap.fromTo(
      '.about-char',
      { y: 40, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.6,
        ease: 'back.out(1.5)',
        stagger: 0.03,
        scrollTrigger: {
          trigger: '.about-label-chars',
          start: 'top 88%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )

    // ── Word-by-word headline reveal ────────────────────────────────
    const words = gsap.utils.toArray<HTMLElement>('.about-word')
    words.forEach((word, i) => {
      gsap.fromTo(
        word,
        { yPercent: 110, opacity: 0, skewY: 4 },
        {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          duration: 1,
          ease: 'expo.out',
          delay: i * 0.09,
          scrollTrigger: {
            trigger: '.about-headline-wrap',
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          },
        },
      )
    })

    // ── Big number scrub ─────────────────────────────────────────────
    gsap.to('.about-big-num', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'center center',
        scrub: 2,
      },
      x: -80,
      opacity: 0.04,
      ease: 'none',
    })

    // ── Expanding gradient line ──────────────────────────────────────
    gsap.from('.about-line', {
      scrollTrigger: {
        trigger: '.about-line',
        start: 'top 85%',
        toggleActions: 'play reverse play reverse',
      },
      scaleX: 0,
      duration: 1.6,
      ease: 'expo.inOut',
    })

    // ── Body quote — clip-path slide ───────────────────────────
    gsap.fromTo(
      '.about-quote',
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.about-quote',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )

    gsap.fromTo(
      '.about-action',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: '.about-quote',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )

    // ── Value cards entry ────────────────────────────────────────────
    gsap.fromTo(
      '.about-value',
      { opacity: 0, y: 70, rotateX: 20, transformOrigin: 'top center' },
      {
        scrollTrigger: {
          trigger: '.about-values-grid',
          start: 'top 78%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
      },
    )

    // ── EXTREME: Continuous floating for Value Cards ─────────────────
    gsap.utils.toArray<HTMLElement>('.about-value').forEach((card, i) => {
      gsap.to(card, {
        y: 'random(-10, 10)',
        rotation: 'random(-2, 2)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      })
    })

    // ── EXTREME: Continuous wireframe torus rotation ─────────────────
    gsap.to('.about-torus-inner', {
      rotate: 360,
      duration: 40,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    })
    gsap.to('.about-torus-outer', {
      rotate: -360,
      duration: 60,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    })

    // Torus scroll parallax
    gsap.to('.about-torus', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
      y: -200,
      scale: 1.1,
      ease: 'none',
    })

    // ── PARALLAX OBJECTS ─────────────────────────────────────────────
    const parallaxItems = [
      { selector: '.float-obj-1', y: -160, x: 20, rotate: 45 },
      { selector: '.float-obj-2', y: -100, x: -15, rotate: -30 },
      { selector: '.float-obj-3', y: -200, x: 30, rotate: 60 },
      { selector: '.float-obj-4', y: -80, x: -10, rotate: -20 },
      { selector: '.float-obj-5', y: -140, x: 25, rotate: 90 },
      { selector: '.float-obj-6', y: -60, x: -20, rotate: 15 },
    ]
    parallaxItems.forEach(({ selector, y, x, rotate }) => {
      gsap.to(selector, {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2 + Math.random(),
        },
        y,
        x,
        rotate,
        ease: 'none',
      })
    })

    // ── Badge parallax (opposite) ────────────────────────────────────
    gsap.to('.about-badge', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
      y: 90,
      ease: 'none',
    })
  }, sectionRef.value!)
  return () => ctx?.revert()
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="relative py-36 md:py-56 overflow-hidden"
    style="background-color: #0b1312; border-bottom: 1px solid rgba(0, 191, 166, 0.1)"
  >
    <!-- ══════════════════════════════════════════════════
         EXTREME VISUALS
    ══════════════════════════════════════════════════ -->

    <!-- Big ghost number -->
    <div
      class="about-big-num absolute right-0 top-16 pointer-events-none select-none z-0"
      style="
        font-size: clamp(180px, 28vw, 320px);
        font-weight: 900;
        color: rgba(0, 191, 166, 0.04);
        line-height: 1;
        letter-spacing: -0.05em;
        opacity: 0.08;
      "
    >
      01
    </div>

    <!-- EXTREME: Giant Wireframe Torus (Right background) -->
    <div
      class="about-torus absolute -right-[20%] top-[10%] w-[800px] h-[800px] pointer-events-none select-none z-0 opacity-[0.04]"
    >
      <svg viewBox="0 0 800 800" fill="none" class="w-full h-full">
        <g class="about-torus-outer">
          <ellipse cx="400" cy="400" rx="380" ry="150" stroke="#00BFA6" stroke-width="1.5" />
          <ellipse
            cx="400"
            cy="400"
            rx="380"
            ry="150"
            stroke="#00BFA6"
            stroke-width="1.5"
            transform="rotate(45 400 400)"
          />
          <ellipse
            cx="400"
            cy="400"
            rx="380"
            ry="150"
            stroke="#00BFA6"
            stroke-width="1.5"
            transform="rotate(90 400 400)"
          />
          <ellipse
            cx="400"
            cy="400"
            rx="380"
            ry="150"
            stroke="#00BFA6"
            stroke-width="1.5"
            transform="rotate(135 400 400)"
          />
        </g>
        <g class="about-torus-inner">
          <circle
            cx="400"
            cy="400"
            r="230"
            stroke="#26C6B7"
            stroke-width="1"
            stroke-dasharray="10 20"
          />
          <ellipse cx="400" cy="400" rx="230" ry="90" stroke="#26C6B7" stroke-width="1" />
          <ellipse
            cx="400"
            cy="400"
            rx="230"
            ry="90"
            stroke="#26C6B7"
            stroke-width="1"
            transform="rotate(60 400 400)"
          />
          <ellipse
            cx="400"
            cy="400"
            rx="230"
            ry="90"
            stroke="#26C6B7"
            stroke-width="1"
            transform="rotate(120 400 400)"
          />
        </g>
        <circle cx="400" cy="400" r="10" fill="#00BFA6" />
      </svg>
    </div>

    <!-- Object 1: Large spinning ring (top-right) -->
    <div
      class="float-obj-1 hidden lg:block absolute right-[5%] top-[8%] w-[280px] h-[280px] pointer-events-none select-none opacity-[0.08] z-0"
    >
      <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="140"
          cy="140"
          r="130"
          stroke="#00BFA6"
          stroke-width="1"
          stroke-dasharray="8 16"
        />
        <circle
          cx="140"
          cy="140"
          r="100"
          stroke="#00BFA6"
          stroke-width="0.6"
          stroke-dasharray="4 8"
        />
        <circle cx="140" cy="140" r="60" stroke="#26C6B7" stroke-width="1" stroke-dasharray="3 6" />
        <circle cx="140" cy="10" r="5" fill="#00BFA6" />
        <circle cx="270" cy="140" r="5" fill="#00BFA6" />
        <circle cx="140" cy="270" r="5" fill="#00BFA6" />
        <circle cx="10" cy="140" r="5" fill="#00BFA6" />
        <line
          x1="140"
          y1="10"
          x2="140"
          y2="270"
          stroke="#00BFA6"
          stroke-width="0.3"
          stroke-dasharray="2 10"
        />
        <line
          x1="10"
          y1="140"
          x2="270"
          y2="140"
          stroke="#00BFA6"
          stroke-width="0.3"
          stroke-dasharray="2 10"
        />
      </svg>
    </div>

    <!-- Object 2: Hexagonal grid (left, mid) -->
    <div
      class="float-obj-2 hidden lg:block absolute left-[2%] top-[35%] w-[220px] h-[220px] pointer-events-none select-none opacity-[0.06] z-0"
    >
      <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="110,10 200,60 200,160 110,210 20,160 20,60"
          stroke="#00BFA6"
          stroke-width="1"
        />
        <polygon
          points="110,35 180,73 180,148 110,185 40,148 40,73"
          stroke="#00BFA6"
          stroke-width="0.7"
        />
        <polygon
          points="110,60 160,88 160,136 110,163 60,136 60,88"
          stroke="#00BFA6"
          stroke-width="0.5"
        />
        <circle cx="110" cy="110" r="12" stroke="#00BFA6" stroke-width="1" />
        <circle cx="110" cy="110" r="4" fill="#00BFA6" />
      </svg>
    </div>

    <!-- Object 3: Floating cross/plus (top-left) -->
    <div
      class="float-obj-3 hidden lg:block absolute left-[15%] top-[5%] pointer-events-none select-none opacity-[0.08] z-0"
    >
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="30" y1="0" x2="30" y2="60" stroke="#00BFA6" stroke-width="1.5" />
        <line x1="0" y1="30" x2="60" y2="30" stroke="#00BFA6" stroke-width="1.5" />
        <circle cx="30" cy="30" r="5" fill="none" stroke="#00BFA6" stroke-width="1" />
      </svg>
    </div>

    <!-- Object 4: Diamond shape (right, bottom) -->
    <div
      class="float-obj-4 hidden lg:block absolute right-[10%] bottom-[15%] pointer-events-none select-none opacity-[0.08] z-0"
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,5 95,50 50,95 5,50"
          stroke="#26C6B7"
          stroke-width="1"
          stroke-dasharray="4 4"
        />
        <polygon points="50,20 80,50 50,80 20,50" stroke="#00BFA6" stroke-width="0.6" />
        <circle cx="50" cy="50" r="4" fill="#00BFA6" />
      </svg>
    </div>

    <!-- Object 5: Dotted grid (right, center) -->
    <div
      class="float-obj-5 hidden lg:block absolute right-[2%] top-[50%] pointer-events-none select-none opacity-[0.07] z-0"
    >
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#00BFA6">
          <circle cx="20" cy="20" r="2" />
          <circle cx="50" cy="20" r="2" />
          <circle cx="80" cy="20" r="2" />
          <circle cx="110" cy="20" r="2" />
          <circle cx="140" cy="20" r="2" />
          <circle cx="20" cy="50" r="2" />
          <circle cx="50" cy="50" r="2" />
          <circle cx="80" cy="50" r="2" />
          <circle cx="110" cy="50" r="2" />
          <circle cx="140" cy="50" r="2" />
          <circle cx="20" cy="80" r="2" />
          <circle cx="50" cy="80" r="2" />
          <circle cx="80" cy="80" r="2" />
          <circle cx="110" cy="80" r="2" />
          <circle cx="140" cy="80" r="2" />
          <circle cx="20" cy="110" r="2" />
          <circle cx="50" cy="110" r="2" />
          <circle cx="80" cy="110" r="2" />
          <circle cx="110" cy="110" r="2" />
          <circle cx="140" cy="110" r="2" />
          <circle cx="20" cy="140" r="2" />
          <circle cx="50" cy="140" r="2" />
          <circle cx="80" cy="140" r="2" />
          <circle cx="110" cy="140" r="2" />
          <circle cx="140" cy="140" r="2" />
        </g>
      </svg>
    </div>

    <!-- Object 6: Small floating triangles (scattered) -->
    <div
      class="float-obj-6 hidden lg:block absolute left-[45%] top-[10%] pointer-events-none select-none opacity-[0.09] z-0"
    >
      <svg
        width="80"
        height="70"
        viewBox="0 0 80 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="40,5 75,65 5,65"
          stroke="#00BFA6"
          stroke-width="1"
          stroke-dasharray="3 5"
        />
        <polygon points="40,18 62,55 18,55" stroke="#00BFA6" stroke-width="0.5" />
      </svg>
    </div>

    <!-- Floating badge -->
    <!-- <div class="about-badge absolute left-8 top-24 pointer-events-none select-none hidden lg:block z-10">
      <div style="border: 1px solid rgba(0,191,166,0.3); background: rgba(11,19,18,0.85); backdrop-filter: blur(12px); padding: 10px 18px; border-radius: 8px; box-shadow: 0 0 20px rgba(0,191,166,0.1);">
        <div class="flex items-center gap-2">
          <div style="width:6px; height:6px; border-radius:50%; background:#00BFA6; box-shadow: 0 0 10px #00BFA6;" class="animate-pulse"></div>
          <span style="font-size:10px; letter-spacing: 0.2em; color: rgba(0,191,166,0.9); font-family: monospace; text-shadow: 0 0 5px rgba(0,191,166,0.5);">SYS_ONLINE // v4.2.1</span>
        </div>
      </div>
    </div> -->

    <!-- ══════════════════════════════════════════════════
         CONTENT
    ══════════════════════════════════════════════════ -->
    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Char-by-char label -->
      <div class="about-label-chars flex items-center gap-4 mb-16 overflow-hidden">
        <div
          class="h-px w-8 flex-shrink-0"
          style="background-color: #00bfa6; box-shadow: 0 0 10px #00bfa6"
        ></div>
        <div class="flex" style="perspective: 400px">
          <span
            v-for="(char, i) in label1"
            :key="i"
            class="about-char inline-block"
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
            >{{ char === ' ' ? '\u00a0' : char }}</span
          >
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative z-10">
        <!-- Left: Oversized headline -->
        <div>
          <div class="about-headline-wrap pb-2 overflow-hidden">
            <h2
              class="text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[1.1] tracking-tight flex flex-wrap gap-x-[0.3em] gap-y-2"
              style="color: #e5e7eb"
            >
              <span
                v-for="word in headlineWords"
                :key="word"
                class="about-word inline-block"
                :style="
                  ['Partner', 'for', 'the'].includes(word) ? 'color: rgba(229,231,235,0.15);' : ''
                "
                style="transform: translateY(110%); opacity: 0; display: inline-block"
                >{{ word }}</span
              >
            </h2>
          </div>

          <!-- Expanding gradient line -->
          <div
            class="about-line mt-10 h-[2px] w-full origin-left"
            style="
              background: linear-gradient(to right, #00bfa6, rgba(0, 191, 166, 0));
              transform: scaleX(0);
              box-shadow: 0 0 15px rgba(0, 191, 166, 0.5);
            "
          ></div>

          <!-- Tech stack pills -->
          <!-- <div class="mt-8 flex flex-wrap gap-2">
            <span
              v-for="tech in [
                'Vue 3',
                'React',
                'Laravel',
                'Flutter',
                'Three.js',
                'GSAP',
                'Node.js',
              ]"
              :key="tech"
              class="text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-full transition-all duration-300 hover:border-[#00BFA6] hover:text-[#00BFA6] hover:shadow-[0_0_15px_rgba(0,191,166,0.3)] cursor-default"
              style="
                border: 1px solid rgba(0, 191, 166, 0.3);
                color: rgba(0, 191, 166, 0.7);
                background: rgba(0, 191, 166, 0.05);
              "
              >{{ tech }}</span
            >
          </div> -->
        </div>

        <!-- Right: SINGLE Punchy Quote + Button -->
        <div class="flex flex-col gap-10 pt-4">
          <p
            class="about-quote text-2xl md:text-3xl leading-relaxed font-light"
            style="color: rgba(229, 231, 235, 0.85); clip-path: inset(0 100% 0 0)"
          >
            We engineer
            <span
              style="color: #00bfa6; font-weight: 600; text-shadow: 0 0 20px rgba(0, 191, 166, 0.4)"
              >digital infrastructure</span
            >
            that becomes the backbone of your business growth.
          </p>

          <div class="about-action">
            <RouterLink
              to="/about"
              class="group inline-flex items-center gap-3 px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:gap-4 hover:bg-[rgba(0,191,166,0.15)] hover:shadow-[0_0_20px_rgba(0,191,166,0.2)]"
              style="
                background-color: rgba(0, 191, 166, 0.1);
                border: 1px solid rgba(0, 191, 166, 0.4);
                color: #00bfa6;
              "
            >
              Read Our Story
              <ArrowRight
                :size="14"
                class="transition-transform duration-300 group-hover:translate-x-1"
              />
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Minimal Values Grid (Continuous Floating effect) -->
      <div class="about-values-grid mt-28 grid grid-cols-2 md:grid-cols-4 gap-0 relative z-10">
        <div
          v-for="val in values"
          :key="val.num"
          class="about-value group p-8 lg:p-12 flex flex-col items-center justify-center text-center cursor-default transition-all duration-500 relative overflow-visible"
          style="opacity: 0; background-color: transparent; transform-style: preserve-3d"
        >
          <!-- Hexagon Frame Background -->
          <div
            class="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none flex items-center justify-center"
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon
                points="50,5 95,25 95,75 50,95 5,75 5,25"
                fill="none"
                stroke="#00BFA6"
                stroke-width="0.5"
              />
            </svg>
          </div>

          <!-- Center glow on hover -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style="
              background: radial-gradient(
                circle at center,
                rgba(0, 191, 166, 0.15),
                transparent 70%
              );
            "
          ></div>

          <div
            class="text-[10px] font-semibold tracking-[0.35em] uppercase mb-6 relative z-10"
            style="color: rgba(0, 191, 166, 0.5)"
          >
            {{ val.num }}
          </div>
          <div
            class="text-5xl lg:text-6xl mb-6 font-mono transition-transform duration-500 group-hover:scale-125 group-hover:rotate-[15deg] relative z-10"
            style="color: rgba(0, 191, 166, 0.4); text-shadow: 0 0 20px rgba(0, 191, 166, 0.2)"
          >
            {{ val.icon }}
          </div>
          <h3
            class="text-xs lg:text-sm font-bold uppercase tracking-widest group-hover:text-[#00BFA6] transition-colors duration-300 relative z-10"
            style="color: #e5e7eb"
          >
            {{ val.label }}
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>
