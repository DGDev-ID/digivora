<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2 } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

const pillars = computed(() => t.value.why.pillars)

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('.why-left', {
      scrollTrigger: { trigger: '.why-left', start: 'top 80%' },
      opacity: 0,
      x: -60,
      duration: 1,
      ease: 'power3.out',
    })
    gsap.from('.why-pillar', {
      scrollTrigger: { trigger: '.why-right', start: 'top 80%' },
      opacity: 0,
      x: 40,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
    })
  }, sectionRef.value!)
  return () => ctx.revert()
})
</script>

<template>
  <section id="why" ref="sectionRef" class="py-32 md:py-48" style="background-color: #0B1312; border-top: 1px solid rgba(0,191,166,0.1);">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <!-- Left: Headline -->
        <div class="why-left">
          <div class="flex items-center gap-4 mb-8">
            <div class="h-px w-8" style="background-color: #00BFA6;"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.6);">{{
              t.why.label
            }}</span>
          </div>
          <h2
            class="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight mb-10"
            style="color: #E5E7EB;"
          >
            {{ t.why.headline1 }}<br />
            <span style="color: rgba(229,231,235,0.25);">{{ t.why.headline2 }}</span
            ><br />
            {{ t.why.headline3 }}
          </h2>
          <p class="text-base leading-relaxed font-light max-w-sm" style="color: rgba(229,231,235,0.5);">
            {{ t.why.sub }}
          </p>

          <!-- Big number accent -->
          <div class="mt-16 pt-10" style="border-top: 1px solid rgba(0,191,166,0.1);">
            <div class="flex gap-12">
              <div>
                <div class="text-4xl font-bold" style="color: #00BFA6;">20+</div>
                <div class="text-xs tracking-widest uppercase mt-1" style="color: rgba(229,231,235,0.35);">
                  Shipped Projects
                </div>
              </div>
              <div>
                <div class="text-4xl font-bold" style="color: #26C6B7;">5+</div>
                <div class="text-xs tracking-widest uppercase mt-1" style="color: rgba(229,231,235,0.35);">
                  Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Pillars -->
        <div class="why-right flex flex-col gap-0" style="border-top: 1px solid rgba(0,191,166,0.12);">
          <div
            v-for="(pillar, i) in pillars"
            :key="i"
            class="why-pillar group py-8 flex items-start gap-6 cursor-default px-2 transition-colors duration-300 hover:bg-[#11201F]"
            style="border-bottom: 1px solid rgba(0,191,166,0.12);"
          >
            <div class="mt-0.5 flex-shrink-0">
              <CheckCircle2
                :size="18"
                class="transition-colors duration-300"
                style="color: rgba(0,191,166,0.35);"
                onmouseover="this.style.color='#00BFA6'"
              />
            </div>
            <div>
              <h3 class="text-base font-semibold mb-2" style="color: #E5E7EB;">{{ pillar.title }}</h3>
              <p class="text-sm leading-relaxed font-light" style="color: rgba(229,231,235,0.45);">{{ pillar.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
