<script setup lang="ts">
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const services = [
  'Web Development',
  'Mobile App Solutions',
  'SaaS Platform',
  'UI/UX Engineering',
  'Business Automation',
  'Digital Transformation',
]

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Case Study', to: '/case-study' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <footer style="background-color: #0A1110; border-top: 1px solid rgba(0,191,166,0.1);">
    <!-- Main footer content -->
    <div class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

        <!-- Brand -->
        <div class="lg:col-span-1">
          <RouterLink to="/" class="inline-block mb-6">
            <img src="/logo-digivora.svg" alt="Digivora" class="h-8 w-auto" />
          </RouterLink>
          <p class="text-sm leading-relaxed mb-8 max-w-xs" style="color: rgba(229,231,235,0.4);">
            {{ t.footer.tagline }}
          </p>
          <div class="flex gap-3">
            <a href="#" class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[rgba(0,191,166,0.15)] hover:border-[#00BFA6]"
              style="border: 1px solid rgba(0,191,166,0.15);">
              <Github :size="15" style="color: rgba(229,231,235,0.5);" />
            </a>
            <a href="#" class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[rgba(0,191,166,0.15)] hover:border-[#00BFA6]"
              style="border: 1px solid rgba(0,191,166,0.15);">
              <Linkedin :size="15" style="color: rgba(229,231,235,0.5);" />
            </a>
            <a href="#" class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[rgba(0,191,166,0.15)] hover:border-[#00BFA6]"
              style="border: 1px solid rgba(0,191,166,0.15);">
              <Twitter :size="15" style="color: rgba(229,231,235,0.5);" />
            </a>
          </div>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-xs font-bold tracking-[0.3em] uppercase mb-6" style="color: rgba(0,191,166,0.6);">{{ t.footer.servicesLabel }}</h4>
          <ul class="flex flex-col gap-3">
            <li v-for="svc in services" :key="svc">
              <RouterLink to="/services" class="text-sm transition-colors duration-200 hover:text-[#00BFA6]" style="color: rgba(229,231,235,0.45);">
                {{ svc }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="text-xs font-bold tracking-[0.3em] uppercase mb-6" style="color: rgba(0,191,166,0.6);">{{ t.footer.navLabel }}</h4>
          <ul class="flex flex-col gap-3">
            <li v-for="link in navLinks" :key="link.label">
              <RouterLink :to="link.to" class="text-sm transition-colors duration-200 hover:text-[#00BFA6]" style="color: rgba(229,231,235,0.45);">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-xs font-bold tracking-[0.3em] uppercase mb-6" style="color: rgba(0,191,166,0.6);">{{ t.footer.contactLabel }}</h4>
          <div class="flex flex-col gap-4">
            <a href="mailto:hello@digivora.id"
              class="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[#00BFA6]"
              style="color: rgba(229,231,235,0.45);">
              <Mail :size="14" style="color: rgba(0,191,166,0.4);" />
              hello@digivora.id
            </a>
            <p class="text-sm" style="color: rgba(229,231,235,0.45);">Indonesia — Remote Worldwide</p>
          </div>

          <RouterLink
            to="/contact"
            class="mt-8 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#00BFA6] hover:text-[#0B1312]"
            style="border: 1px solid rgba(0,191,166,0.3); color: rgba(229,231,235,0.7);"
          >
            START A PROJECT
            <ArrowUpRight :size="12" />
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="px-6 py-6" style="border-top: 1px solid rgba(0,191,166,0.06);">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p class="text-xs" style="color: rgba(229,231,235,0.2);">
          © 2026 Digivora Solution Technology. {{ t.footer.rights }}
        </p>
        <p class="text-xs font-semibold tracking-[0.2em] uppercase" style="color: rgba(0,191,166,0.25);">
          {{ t.footer.builtWith }}
        </p>
      </div>
    </div>
  </footer>
</template>
