<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Clock, Tag } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const featured = {
  title: 'Why Modern Businesses Are Moving to Scalable SaaS Architecture',
  excerpt: 'A deep dive into why enterprise companies are ditching monolithic systems in favor of modular, cloud-native SaaS platforms — and how to make the transition.',
  author: 'Arya Wicaksono', date: 'July 28, 2026', readTime: '8 min read',
  category: 'Engineering',
  img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
}

const posts = [
  {
    title: 'Vue 3 vs React: Choosing the Right Framework for Your Next Project',
    excerpt: 'An objective comparison of two of the most popular front-end frameworks for building modern web applications.',
    author: 'Budi Santoso', date: 'July 20, 2026', readTime: '6 min',
    category: 'Frontend',
    img: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Designing for Conversion: A UX Engineer\'s Playbook',
    excerpt: 'How we approach UI/UX design as an engineering discipline, not just a visual exercise.',
    author: 'Dewi Pratiwi', date: 'July 12, 2026', readTime: '5 min',
    category: 'Design',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'The Real Cost of Technical Debt in Business Applications',
    excerpt: 'Every shortcut in code has a business price tag. Here\'s how to quantify technical debt before it becomes a crisis.',
    author: 'Arya Wicaksono', date: 'July 5, 2026', readTime: '7 min',
    category: 'Engineering',
    img: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Laravel vs Node.js: Backend Decisions for Indonesian Startups',
    excerpt: 'Evaluating backend technology choices in the context of the local developer market and project requirements.',
    author: 'Sinta Rahayu', date: 'June 28, 2026', readTime: '9 min',
    category: 'Backend',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'GSAP & Three.js: Crafting Premium Web Experiences',
    excerpt: 'How animation libraries can transform a functional website into an immersive digital experience.',
    author: 'Budi Santoso', date: 'June 20, 2026', readTime: '10 min',
    category: 'Frontend',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Building a Multi-Tenant SaaS in 90 Days: Lessons Learned',
    excerpt: 'The real-world challenges and solutions from shipping a full SaaS platform under a tight deadline.',
    author: 'Sinta Rahayu', date: 'June 10, 2026', readTime: '12 min',
    category: 'SaaS',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
  },
]

const categories = ['All', 'Engineering', 'Design', 'Frontend', 'Backend', 'SaaS']

onMounted(() => {
  gsap.from('.blog-hero', { opacity: 0, y: 60, duration: 1, ease: 'power3.out', delay: 0.2 })
  gsap.from('.blog-featured', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: '.blog-featured', start: 'top 85%' } })
  gsap.from('.blog-post-card', {
    opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', stagger: 0.1,
    scrollTrigger: { trigger: '.blog-posts-grid', start: 'top 80%' },
  })
})
</script>

<template>
  <div style="background-color: #0B1312; color: #E5E7EB; padding-top: 80px; min-height: 100vh;">

    <!-- Hero -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80"
          alt="" class="w-full h-full object-cover" loading="eager" />
        <div class="absolute inset-0" style="background: rgba(11,19,18,0.9);"></div>
      </div>
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at 50% 50%, rgba(0,191,166,0.08) 0%, transparent 60%);"></div>

      <div class="blog-hero relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="h-px w-8" style="background: #00BFA6;"></div>
          <span class="text-xs font-semibold tracking-[0.35em] uppercase" style="color: rgba(0,191,166,0.7);">Insights & Ideas</span>
          <div class="h-px w-8" style="background: #00BFA6;"></div>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight mb-6">
          The Digivora<br /><span style="color: rgba(229,231,235,0.25);">Engineering</span><br /><span style="color: #00BFA6;">Blog</span>
        </h1>
        <p class="text-lg" style="color: rgba(229,231,235,0.55);">
          Practical insights on software engineering, design systems, and digital strategy from the Digivora team.
        </p>
      </div>
    </section>

    <!-- Category Filter -->
    <div class="sticky top-[72px] z-40 py-4" style="background: rgba(11,19,18,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,191,166,0.1);">
      <div class="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto">
        <span v-for="cat in categories" :key="cat"
          class="flex-shrink-0 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase rounded-full cursor-pointer transition-all duration-300 hover:text-[#00BFA6]"
          style="border: 1px solid rgba(0,191,166,0.15); color: rgba(229,231,235,0.5);">
          {{ cat }}
        </span>
      </div>
    </div>

    <!-- Featured Post -->
    <section class="py-16 max-w-7xl mx-auto px-6">
      <div class="blog-featured group relative rounded-2xl overflow-hidden cursor-pointer" style="border: 1px solid rgba(0,191,166,0.15);">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Image -->
          <div class="relative overflow-hidden" style="min-height: 350px;">
            <img :src="featured.img" :alt="featured.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" loading="lazy" />
            <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(11,19,18,0) 50%, rgba(11,19,18,0.95));"></div>
            <!-- Category badge -->
            <div class="absolute top-6 left-6">
              <span class="px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full" style="background: #00BFA6; color: #0B1312;">
                Featured · {{ featured.category }}
              </span>
            </div>
          </div>
          <!-- Content -->
          <div class="p-10 flex flex-col justify-center" style="background: rgba(17,32,31,0.6);">
            <div class="flex items-center gap-3 mb-4">
              <Clock :size="12" style="color: rgba(0,191,166,0.6);" />
              <span class="text-xs" style="color: rgba(0,191,166,0.6);">{{ featured.readTime }}</span>
              <span class="text-xs" style="color: rgba(229,231,235,0.25);">· {{ featured.date }}</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold leading-tight mb-4 group-hover:text-[#26C6B7] transition-colors duration-300">{{ featured.title }}</h2>
            <p class="text-sm leading-relaxed mb-6" style="color: rgba(229,231,235,0.5);">{{ featured.excerpt }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full" style="background: rgba(0,191,166,0.2); border: 1px solid rgba(0,191,166,0.3);"></div>
                <span class="text-sm font-medium">{{ featured.author }}</span>
              </div>
              <div class="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase group-hover:text-[#00BFA6] transition-colors duration-300" style="color: rgba(229,231,235,0.4);">
                Read More <ArrowUpRight :size="14" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Posts Grid -->
    <section class="py-8 pb-24 max-w-7xl mx-auto px-6">
      <div class="blog-posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="post in posts" :key="post.title"
          class="blog-post-card group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
          style="border: 1px solid rgba(0,191,166,0.12); background: rgba(17,32,31,0.4);">
          <!-- Image -->
          <div class="relative overflow-hidden" style="height: 200px;">
            <img :src="post.img" :alt="post.title"
              class="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" loading="lazy" />
            <div class="absolute inset-0" style="background: rgba(11,19,18,0.4);"></div>
            <!-- Category -->
            <div class="absolute top-4 left-4">
              <span class="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full" style="background: rgba(11,19,18,0.8); color: #00BFA6; border: 1px solid rgba(0,191,166,0.3);">
                <Tag :size="9" /> {{ post.category }}
              </span>
            </div>
          </div>
          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3">
              <Clock :size="11" style="color: rgba(0,191,166,0.5);" />
              <span class="text-xs" style="color: rgba(0,191,166,0.5);">{{ post.readTime }}</span>
              <span class="text-xs" style="color: rgba(229,231,235,0.2);">· {{ post.date }}</span>
            </div>
            <h3 class="text-base font-semibold leading-snug mb-3 group-hover:text-[#26C6B7] transition-colors duration-300">{{ post.title }}</h3>
            <p class="text-sm leading-relaxed mb-4 line-clamp-2" style="color: rgba(229,231,235,0.45);">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs" style="color: rgba(229,231,235,0.35);">{{ post.author }}</span>
              <ArrowUpRight :size="14" class="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="color: #00BFA6;" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="py-20 text-center" style="background-color: #11201F; border-top: 1px solid rgba(0,191,166,0.1);">
      <div class="max-w-xl mx-auto px-6">
        <h2 class="text-2xl font-bold mb-3">Stay in the Loop</h2>
        <p class="mb-8" style="color: rgba(229,231,235,0.5);">Get our latest engineering insights delivered to your inbox.</p>
        <div class="flex gap-3">
          <input type="email" placeholder="you@company.com"
            class="flex-1 px-5 py-3.5 text-sm rounded-xl outline-none"
            style="background: rgba(11,19,18,0.8); border: 1px solid rgba(0,191,166,0.2); color: #E5E7EB;" />
          <button class="px-6 py-3.5 text-sm font-semibold tracking-wider uppercase rounded-xl hover:opacity-90 transition-opacity flex-shrink-0"
            style="background: #00BFA6; color: #0B1312;">
            Subscribe
          </button>
        </div>
      </div>
    </section>

  </div>
</template>
