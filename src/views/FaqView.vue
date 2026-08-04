<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const openIndex = ref<number | null>(null)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

const categories = [
  {
    label: 'General',
    icon: '💬',
    items: [
      { q: 'What does Digivora do?', a: 'Digivora is a full-service digital engineering studio based in Indonesia. We build scalable web applications, mobile apps, SaaS platforms, and automated business systems for companies ranging from startups to enterprise.' },
      { q: 'Where is Digivora based?', a: 'Our team is based in Indonesia and we work remotely with clients worldwide. We have successfully delivered projects for clients across Southeast Asia, Australia, and the Middle East.' },
      { q: 'How can I start working with Digivora?', a: 'Simply reach out via our Contact page or email us at hello@digivora.id. We\'ll schedule a discovery call to understand your project and provide a proposal within 48 hours.' },
    ],
  },
  {
    label: 'Services',
    icon: '⚙️',
    items: [
      { q: 'What technologies does Digivora specialize in?', a: 'Our primary stack includes Vue 3, React, Next.js, Laravel, Node.js, PostgreSQL, and Flutter. For animations and 3D, we use GSAP and Three.js. We select the best tools for each project\'s specific requirements.' },
      { q: 'Do you work on both design and development?', a: 'Yes. We are a full-service studio covering UI/UX design (Figma), frontend development, backend engineering, database architecture, and cloud deployment. You won\'t need to coordinate with multiple vendors.' },
      { q: 'Can Digivora help with an existing project or only new builds?', a: 'Both! We frequently take on code audits, performance optimizations, feature additions, and full rewrites of existing applications. We\'ll assess the current state and recommend the best path forward.' },
    ],
  },
  {
    label: 'Pricing & Timeline',
    icon: '💰',
    items: [
      { q: 'How does Digivora price projects?', a: 'We offer both fixed-price project contracts and time-and-materials engagements. Project pricing depends on scope, complexity, and timeline. Contact us for a detailed estimate — discovery calls are always free.' },
      { q: 'How long does a typical project take?', a: 'A landing page or small website takes 2–4 weeks. A full-featured web app or mobile app typically runs 2–4 months. Enterprise platforms with custom integrations can take 6–12 months. We always provide a detailed timeline estimate before starting.' },
      { q: 'Do you offer payment in installments?', a: 'Yes. For most projects we structure payments in 3 milestones: 30% upfront, 40% at mid-project delivery, and 30% on final delivery. We are flexible with payment terms for long-term partnerships.' },
    ],
  },
  {
    label: 'Support',
    icon: '🛡️',
    items: [
      { q: 'What happens after the project is delivered?', a: 'All projects include a 30-day post-launch bug-fix period. We also offer ongoing maintenance retainers for monitoring, updates, feature development, and strategic technology consultation.' },
      { q: 'Will I own the source code?', a: 'Absolutely. Upon final payment, full intellectual property and source code ownership transfers to you. We also provide complete documentation and handover support.' },
      { q: 'What is your communication process during a project?', a: 'We work in 1-2 week sprints with scheduled check-ins, a shared project management board (Notion or Linear), and a dedicated Slack/WhatsApp channel for day-to-day communication.' },
    ],
  },
]

onMounted(() => {
  gsap.from('.faq-hero', { opacity: 0, y: 60, duration: 1, ease: 'power3.out', delay: 0.2 })
  gsap.from('.faq-cat', {
    opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', stagger: 0.1,
    scrollTrigger: { trigger: '.faq-list', start: 'top 80%' },
  })
})
</script>

<template>
  <div style="background-color: #0B1312; color: #E5E7EB; padding-top: 80px; min-height: 100vh;">

    <!-- Hero -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80"
          alt="" class="w-full h-full object-cover" loading="eager" />
        <div class="absolute inset-0" style="background: rgba(11,19,18,0.91);"></div>
      </div>
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at 50% 60%, rgba(0,191,166,0.08) 0%, transparent 60%);"></div>

      <div class="faq-hero relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="h-px w-8" style="background: #00BFA6;"></div>
          <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">FAQ</span>
          <div class="h-px w-8" style="background: #00BFA6;"></div>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight mb-6">
          Got Questions?<br /><span style="color: #00BFA6;">We Have</span><br /><span style="color: rgba(229,231,235,0.25);">Answers.</span>
        </h1>
        <p class="text-lg" style="color: rgba(229,231,235,0.55);">
          Everything you need to know about working with Digivora. Can't find your answer? Just ask us directly.
        </p>
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="py-24 max-w-4xl mx-auto px-6">
      <div class="faq-list flex flex-col gap-16">
        <div v-for="cat in categories" :key="cat.label" class="faq-cat">
          <!-- Category Header -->
          <div class="flex items-center gap-3 mb-8">
            <span class="text-2xl">{{ cat.icon }}</span>
            <h2 class="text-lg font-bold tracking-wide">{{ cat.label }}</h2>
            <div class="flex-1 h-px ml-4" style="background: rgba(0,191,166,0.1);"></div>
          </div>

          <!-- Questions -->
          <div class="flex flex-col gap-3">
            <div
              v-for="(item, i) in cat.items" :key="i"
              class="rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
              :style="openIndex === (categories.indexOf(cat) * 10 + i)
                ? 'border: 1px solid rgba(0,191,166,0.4); background: rgba(0,191,166,0.04);'
                : 'border: 1px solid rgba(0,191,166,0.12); background: rgba(17,32,31,0.4);'"
              @click="toggle(categories.indexOf(cat) * 10 + i)"
            >
              <!-- Question Row -->
              <div class="flex items-center justify-between p-5 gap-4">
                <h3 class="text-sm font-semibold leading-snug" :style="openIndex === (categories.indexOf(cat) * 10 + i) ? 'color: #E5E7EB;' : 'color: rgba(229,231,235,0.8);'">
                  {{ item.q }}
                </h3>
                <div class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                  :style="openIndex === (categories.indexOf(cat) * 10 + i)
                    ? 'background: #00BFA6;'
                    : 'background: rgba(0,191,166,0.1); border: 1px solid rgba(0,191,166,0.2);'">
                  <ChevronUp v-if="openIndex === (categories.indexOf(cat) * 10 + i)" :size="14" style="color: #0B1312;" />
                  <ChevronDown v-else :size="14" style="color: rgba(0,191,166,0.7);" />
                </div>
              </div>

              <!-- Answer (animated) -->
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="openIndex === (categories.indexOf(cat) * 10 + i)" class="px-5 pb-5">
                  <div class="pt-2 pb-1 border-t" style="border-color: rgba(0,191,166,0.1);">
                    <p class="text-sm leading-relaxed pt-4" style="color: rgba(229,231,235,0.55);">{{ item.a }}</p>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <!-- Still have questions -->
      <div class="mt-20 rounded-2xl p-10 text-center" style="background: rgba(17,32,31,0.6); border: 1px solid rgba(0,191,166,0.15);">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style="background: rgba(0,191,166,0.1);">
          <MessageCircle :size="24" style="color: #00BFA6;" />
        </div>
        <h3 class="text-xl font-bold mb-3">Still Have Questions?</h3>
        <p class="mb-8" style="color: rgba(229,231,235,0.5);">Our team is always happy to hop on a quick call to answer any questions you have.</p>
        <RouterLink to="/contact"
          class="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-[0.2em] uppercase rounded-xl hover:opacity-90 transition-opacity"
          style="background: #00BFA6; color: #0B1312;">
          Talk to Us →
        </RouterLink>
      </div>
    </section>

  </div>
</template>
