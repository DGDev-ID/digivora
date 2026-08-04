<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2, Users, Award, Globe, Zap } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '2019', title: 'Founded', desc: 'Digivora was born with a mission to deliver enterprise-grade digital solutions to businesses of all sizes.' },
  { year: '2020', title: 'First Enterprise Client', desc: 'Secured our first enterprise contract and delivered a full ERP system on schedule.' },
  { year: '2021', title: '10 Projects Milestone', desc: 'Crossed 10 successful project deliveries across healthcare, retail, and finance sectors.' },
  { year: '2022', title: 'SaaS Division', desc: 'Launched our SaaS product development division, helping clients build scalable cloud platforms.' },
  { year: '2023', title: 'Mobile Expansion', desc: 'Expanded our mobile development capabilities with React Native and Flutter expertise.' },
  { year: '2024', title: '20+ Projects & Growing', desc: 'Serving clients across Indonesia and internationally with a team of elite engineers.' },
]

const team = [
  { name: 'Arya Wicaksono', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Sinta Rahayu', role: 'Head of Engineering', img: 'https://images.unsplash.com/photo-1494790108755-2616b332c0b9?auto=format&fit=crop&w=300&q=80' },
  { name: 'Budi Santoso', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' },
  { name: 'Dewi Pratiwi', role: 'Project Manager', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80' },
]

const values = [
  { icon: CheckCircle2, title: 'Quality First', desc: 'Every line of code is reviewed, tested, and engineered to last.' },
  { icon: Users, title: 'Client Partnership', desc: 'We treat every client as a long-term partner, not a one-time transaction.' },
  { icon: Award, title: 'Excellence Standard', desc: 'We hold ourselves to enterprise-grade standards regardless of project size.' },
  { icon: Zap, title: 'Speed & Precision', desc: 'Fast delivery without compromising on quality — that is our promise.' },
]

onMounted(() => {
  gsap.from('.about-hero-content', {
    opacity: 0, y: 60, duration: 1, ease: 'power3.out', delay: 0.2,
  })
  gsap.from('.about-hero-img', {
    opacity: 0, x: 60, scale: 0.96, duration: 1.2, ease: 'power3.out', delay: 0.4,
  })

  gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' } }
    )
  })

  gsap.from('.team-card', {
    opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', stagger: 0.1,
    scrollTrigger: { trigger: '.team-grid', start: 'top 78%' },
  })

  gsap.from('.value-card', {
    opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', stagger: 0.1,
    scrollTrigger: { trigger: '.values-grid', start: 'top 78%' },
  })
})
</script>

<template>
  <div style="background-color: #0B1312; color: #E5E7EB; padding-top: 80px;">

    <!-- Hero Banner -->
    <section class="relative min-h-[60vh] flex items-center overflow-hidden py-24">
      <!-- Background image -->
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
          alt="" class="w-full h-full object-cover" loading="eager" />
        <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(11,19,18,0.95) 0%, rgba(11,19,18,0.75) 60%, rgba(11,19,18,0.85) 100%);"></div>
      </div>
      <!-- Teal glow -->
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at 20% 50%, rgba(0,191,166,0.12) 0%, transparent 50%);"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div class="about-hero-content">
          <div class="flex items-center gap-4 mb-6">
            <div class="h-px w-8" style="background: #00BFA6;"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">About Digivora</span>
          </div>
          <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight mb-6">
            {{ ['Your', 'Technology', 'Partner', 'for', 'the', 'Digital', 'Era.'].join(' ') }}
          </h1>
          <p class="text-lg leading-relaxed font-light mb-8" style="color: rgba(229,231,235,0.6);">Digivora is a modern technology company that helps businesses transform digitally through scalable software architecture, premium user experiences, and long-term technology ecosystems.</p>
          <RouterLink to="/contact"
            class="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase rounded-xl hover:opacity-90 transition-opacity"
            style="background: #00BFA6; color: #0B1312;">
            Work With Us →
          </RouterLink>
        </div>
        <div class="about-hero-img hidden lg:block">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl" style="border: 1px solid rgba(0,191,166,0.2);">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80"
              alt="Team at work" class="w-full h-80 object-cover" loading="eager" />
            <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(11,19,18,0.4), transparent);"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Band -->
    <section class="py-16" style="background-color: #11201F; border-top: 1px solid rgba(0,191,166,0.1); border-bottom: 1px solid rgba(0,191,166,0.1);">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="stat in [{ v: '20+', l: 'Projects' }, { v: '10+', l: 'Industries' }, { v: '99%', l: 'Satisfaction' }, { v: '5+', l: 'Years' }]" :key="stat.l" class="text-center">
          <div class="text-4xl font-bold mb-1" style="color: #00BFA6;">{{ stat.v }}</div>
          <div class="text-sm tracking-widest uppercase" style="color: rgba(229,231,235,0.4);">{{ stat.l }}</div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="py-24 max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div class="flex items-center gap-4 mb-8">
            <div class="h-px w-8" style="background: #00BFA6;"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">Our Story</span>
          </div>
          <h2 class="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight mb-6">Building Digital<br /><span style="color: rgba(229,231,235,0.25);">Excellence</span><br />Since 2019</h2>
          <p class="text-base leading-relaxed mb-4" style="color: rgba(229,231,235,0.55);">We don\'t build websites. We engineer digital infrastructure that becomes the backbone of your business growth — from enterprise web applications to automated systems, designed to scale from day one.</p>
          <p class="text-base leading-relaxed" style="color: rgba(229,231,235,0.55);">From startups to enterprise, we operate at the intersection of design precision, engineering excellence, and business intelligence.</p>
        </div>
        <div class="relative">
          <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&q=80"
            alt="Our office" class="w-full rounded-2xl object-cover" style="height: 420px; border: 1px solid rgba(0,191,166,0.15);" loading="lazy" />
          <div class="absolute inset-0 rounded-2xl" style="background: linear-gradient(to bottom, transparent 50%, rgba(11,19,18,0.4));"></div>
          <!-- Floating badge -->
          <div class="absolute bottom-6 left-6 rounded-xl p-4 flex items-center gap-3"
            style="background: rgba(11,19,18,0.92); border: 1px solid rgba(0,191,166,0.2); backdrop-filter: blur(12px);">
            <Globe :size="20" style="color: #00BFA6;" />
            <div>
              <div class="text-sm font-semibold">Remote Worldwide</div>
              <div class="text-xs" style="color: rgba(0,191,166,0.6);">Indonesia-based · Global reach</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-24" style="background-color: #11201F;">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <div class="flex items-center justify-center gap-4 mb-4">
            <div class="h-px w-8" style="background: #00BFA6;"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">Our Values</span>
            <div class="h-px w-8" style="background: #00BFA6;"></div>
          </div>
          <h2 class="text-[clamp(2rem,4vw,3.5rem)] font-bold">What Drives Us</h2>
        </div>
        <div class="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="val in values" :key="val.title"
            class="value-card p-8 rounded-2xl group hover:scale-105 transition-transform duration-300 cursor-default"
            style="background: rgba(0,191,166,0.04); border: 1px solid rgba(0,191,166,0.12);">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style="background: rgba(0,191,166,0.1);">
              <component :is="val.icon" :size="22" style="color: #00BFA6;" />
            </div>
            <h3 class="text-lg font-semibold mb-3">{{ val.title }}</h3>
            <p class="text-sm leading-relaxed" style="color: rgba(229,231,235,0.5);">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="py-24 max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="h-px w-8" style="background: #00BFA6;"></div>
          <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">Journey</span>
          <div class="h-px w-8" style="background: #00BFA6;"></div>
        </div>
        <h2 class="text-[clamp(2rem,4vw,3.5rem)] font-bold">Our Timeline</h2>
      </div>

      <div class="relative">
        <!-- Center line -->
        <div class="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style="background: linear-gradient(to bottom, transparent, rgba(0,191,166,0.3), transparent);"></div>

        <div class="flex flex-col gap-12">
          <div v-for="(item, i) in timeline" :key="item.year"
            class="timeline-item grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            :class="i % 2 === 0 ? '' : 'md:direction-rtl'"
          >
            <!-- Content -->
            <div :class="i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'">
              <div class="inline-flex items-center gap-3 mb-3">
                <span class="text-sm font-bold tracking-widest" style="color: #00BFA6;">{{ item.year }}</span>
                <div class="w-6 h-px" style="background: rgba(0,191,166,0.4);"></div>
              </div>
              <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
              <p class="text-sm leading-relaxed" style="color: rgba(229,231,235,0.5);">{{ item.desc }}</p>
            </div>
            <!-- Node -->
            <div :class="i % 2 === 0 ? 'md:order-2' : ''" class="hidden md:flex justify-center">
              <div class="w-4 h-4 rounded-full ring-4 ring-[#00BFA6]/20" style="background: #00BFA6;"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="py-24" style="background-color: #11201F;">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <div class="flex items-center justify-center gap-4 mb-4">
            <div class="h-px w-8" style="background: #00BFA6;"></div>
            <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">The Team</span>
            <div class="h-px w-8" style="background: #00BFA6;"></div>
          </div>
          <h2 class="text-[clamp(2rem,4vw,3.5rem)] font-bold">Meet the People<br /><span style="color: rgba(229,231,235,0.25);">Behind the Work</span></h2>
        </div>
        <div class="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="member in team" :key="member.name" class="team-card group cursor-default">
            <div class="relative rounded-2xl overflow-hidden mb-4" style="border: 1px solid rgba(0,191,166,0.15);">
              <img :src="member.img" :alt="member.name" class="w-full object-cover transition-transform duration-700 group-hover:scale-105" style="height: 280px;" loading="lazy" />
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: linear-gradient(to top, rgba(0,191,166,0.2), transparent);"></div>
            </div>
            <h3 class="text-base font-semibold mb-1">{{ member.name }}</h3>
            <p class="text-sm" style="color: rgba(0,191,166,0.7);">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 text-center">
      <div class="max-w-3xl mx-auto px-6">
        <h2 class="text-[clamp(2rem,4vw,3.5rem)] font-bold mb-6">Ready to Build<br /><span style="color: #00BFA6;">Something Great?</span></h2>
        <p class="text-lg mb-10" style="color: rgba(229,231,235,0.5);">Join 20+ businesses that trusted Digivora to engineer their digital future.</p>
        <RouterLink to="/contact"
          class="inline-flex items-center gap-3 px-10 py-5 text-sm font-semibold tracking-[0.2em] uppercase rounded-xl hover:opacity-90 transition-opacity"
          style="background: #00BFA6; color: #0B1312;">
          Start Your Project →
        </RouterLink>
      </div>
    </section>

  </div>
</template>
