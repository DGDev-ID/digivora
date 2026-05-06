<script setup lang="ts">
import { computed } from 'vue'
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const year = new Date().getFullYear()

const servicesList = [
  'Web Development',
  'Mobile App Solutions',
  'SaaS Platform',
  'UI/UX Engineering',
  'Business Automation',
  'Digital Transformation',
]

const links = computed(() => [
  { label: t.value.nav.about, href: '#about' },
  { label: t.value.nav.services, href: '#services' },
  { label: t.value.nav.work, href: '#portfolio' },
  { label: t.value.nav.process, href: '#process' },
  { label: t.value.nav.contact, href: '#cta' },
])

function scrollTo(id: string) {
  const el = document.querySelector(id)
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="bg-black text-white">
    <!-- Top band -->
    <div class="border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- Brand -->
          <div class="lg:col-span-1">
            <div class="flex items-center gap-3 mb-6">
              <img src="/logo-footer.svg" alt="Digivora" class="h-10 w-auto" />
            </div>
            <p class="text-white/50 text-sm leading-relaxed max-w-xs">
              {{ t.footer.tagline }}
            </p>
            <div class="flex items-center gap-4 mt-8">
              <a href="#" class="text-white/40 hover:text-white transition-colors duration-300">
                <Github :size="18" />
              </a>
              <a href="#" class="text-white/40 hover:text-white transition-colors duration-300">
                <Linkedin :size="18" />
              </a>
              <a href="#" class="text-white/40 hover:text-white transition-colors duration-300">
                <Twitter :size="18" />
              </a>
            </div>
          </div>

          <!-- Services -->
          <div>
            <h4 class="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-6">
              {{ t.footer.servicesLabel }}
            </h4>
            <ul class="flex flex-col gap-3">
              <li v-for="s in servicesList" :key="s">
                <span
                  class="text-sm text-white/60 hover:text-white transition-colors duration-300 cursor-default"
                  >{{ s }}</span
                >
              </li>
            </ul>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-6">
              {{ t.footer.navLabel }}
            </h4>
            <ul class="flex flex-col gap-3">
              <li v-for="link in links" :key="link.label">
                <a
                  :href="link.href"
                  class="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  @click.prevent="scrollTo(link.href)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-6">
              {{ t.footer.contactLabel }}
            </h4>
            <div class="flex flex-col gap-4">
              <a
                href="mailto:hello@digivora.id"
                class="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300 group"
              >
                <Mail :size="14" />
                hello@digivora.id
                <ArrowUpRight
                  :size="12"
                  class="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
              <p class="text-sm text-white/60">Indonesia — Remote Worldwide</p>
            </div>
            <a
              href="#cta"
              class="inline-flex items-center gap-2 mt-8 text-xs font-semibold tracking-[0.2em] uppercase px-6 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
              @click.prevent="scrollTo('#cta')"
            >
              {{ t.cta.email }}
              <ArrowUpRight :size="14" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <p class="text-xs text-white/30 tracking-widest">
        © {{ year }} Digivora Solution Technology. {{ t.footer.rights }}
      </p>
      <p class="text-xs text-white/20 tracking-widest uppercase">{{ t.footer.builtWith }}</p>
    </div>
  </footer>
</template>
