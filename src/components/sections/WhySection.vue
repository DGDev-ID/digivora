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
  <section id="why" ref="sectionRef" class="py-32 md:py-48 bg-white border-t border-black/8">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <!-- Left: Headline -->
        <div class="why-left">
          <div class="flex items-center gap-4 mb-8">
            <div class="h-px w-8 bg-black"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase text-black/40">{{
              t.why.label
            }}</span>
          </div>
          <h2
            class="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-black mb-10"
          >
            {{ t.why.headline1 }}<br />
            <span class="text-black/30">{{ t.why.headline2 }}</span
            ><br />
            {{ t.why.headline3 }}
          </h2>
          <p class="text-base text-black/55 leading-relaxed font-light max-w-sm">
            {{ t.why.sub }}
          </p>

          <!-- Big number accent -->
          <div class="mt-16 pt-10 border-t border-black/8">
            <div class="flex gap-12">
              <div>
                <div class="text-4xl font-bold text-black">20+</div>
                <div class="text-xs text-black/40 tracking-widest uppercase mt-1">
                  Shipped Projects
                </div>
              </div>
              <div>
                <div class="text-4xl font-bold text-black">5+</div>
                <div class="text-xs text-black/40 tracking-widest uppercase mt-1">
                  Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Pillars -->
        <div class="why-right flex flex-col gap-0 border-t border-black/10">
          <div
            v-for="(pillar, i) in pillars"
            :key="i"
            class="why-pillar group border-b border-black/10 py-8 flex items-start gap-6 hover:bg-black/2 transition-colors duration-300 cursor-default px-2"
          >
            <div class="mt-0.5 flex-shrink-0">
              <CheckCircle2
                :size="18"
                class="text-black/30 group-hover:text-black transition-colors duration-300"
              />
            </div>
            <div>
              <h3 class="text-base font-semibold text-black mb-2">{{ pillar.title }}</h3>
              <p class="text-sm text-black/50 leading-relaxed font-light">{{ pillar.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
