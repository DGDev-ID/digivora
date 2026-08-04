<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { lang, t, toggleLang } = useI18n()
const route = useRoute()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const navItems = computed(() => [
  { label: 'Home', to: '/' },
  { label: t.value.nav.about, to: '/about' },
  { label: t.value.nav.services, to: '/services' },
  { label: t.value.nav.work, to: '/portfolio' },
  { label: t.value.nav.caseStudy, to: '/case-study' },
  { label: t.value.nav.blog, to: '/blog' },
  { label: t.value.nav.faq, to: '/faq' },
])
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled ? 'py-3' : 'bg-transparent py-5',
    ]"
    :style="isScrolled ? 'background-color: rgba(11,19,18,0.97); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(0,191,166,0.12);' : ''"
  >
    <nav class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3 group">
        <img
          src="/logo-digivora.svg"
          alt="Digivora"
          class="h-8 w-auto transition-all duration-300"
          :style="isScrolled ? 'filter: brightness(0) saturate(100%) invert(62%) sepia(98%) saturate(399%) hue-rotate(127deg) brightness(97%) contrast(101%)' : ''"
        />
      </RouterLink>

      <!-- Desktop Nav -->
      <ul class="hidden lg:flex items-center gap-1">
        <li v-for="item in navItems" :key="item.label">
          <RouterLink
            :to="item.to"
            class="text-xs font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-lg transition-all duration-300 relative group"
            :class="[
              route.path === item.to
                ? 'text-[#00BFA6]'
                : 'text-[rgba(229,231,235,0.6)] hover:text-[#00BFA6] hover:bg-[rgba(0,191,166,0.08)]'
            ]"
          >
            {{ item.label }}
            <span
              v-if="route.path === item.to"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#00BFA6] rounded-full"
            ></span>
          </RouterLink>
        </li>
      </ul>

      <!-- CTA + Language Toggle -->
      <div class="hidden lg:flex items-center gap-3">
        <button
          @click="toggleLang"
          class="flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase px-3 py-2 border transition-all duration-300 border-[#E5E7EB]/20 text-[#E5E7EB]/50 hover:border-[#00BFA6] hover:text-[#00BFA6]"
          :title="lang === 'en' ? 'Switch to Bahasa Indonesia' : 'Switch to English'"
        >
          <span class="text-[10px]">{{ lang === 'en' ? '🇮🇩' : '🇺🇸' }}</span>
          <span>{{ lang === 'en' ? 'ID' : 'EN' }}</span>
        </button>

        <RouterLink
          to="/contact"
          class="text-xs font-semibold tracking-[0.2em] uppercase px-6 py-2.5 transition-all duration-300 hover:opacity-90"
          style="background-color: #00BFA6; color: #0B1312;"
        >
          {{ t.nav.cta }}
        </RouterLink>
      </div>

      <!-- Mobile right -->
      <div class="lg:hidden flex items-center gap-2">
        <button
          @click="toggleLang"
          class="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5 border transition-all duration-300 border-[#E5E7EB]/20 text-[#E5E7EB]/50"
        >
          <span>{{ lang === 'en' ? '🇮🇩 ID' : '🇺🇸 EN' }}</span>
        </button>
        <button
          class="p-2 text-[#E5E7EB]"
          @click="toggleMenu"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <X v-if="isMenuOpen" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden absolute top-full left-0 right-0 px-6 py-8 max-h-[80vh] overflow-y-auto"
        style="background-color: #0B1312; border-bottom: 1px solid rgba(0,191,166,0.15);"
      >
        <ul class="flex flex-col gap-2">
          <li v-for="item in navItems" :key="item.label">
            <RouterLink
              :to="item.to"
              class="block text-xl font-light tracking-widest uppercase py-3 transition-colors"
              :class="route.path === item.to ? 'text-[#00BFA6]' : 'text-[#E5E7EB] hover:text-[#00BFA6]'"
              @click="isMenuOpen = false"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
        <div class="mt-8 pt-8" style="border-top: 1px solid rgba(0,191,166,0.15);">
          <RouterLink
            to="/contact"
            class="inline-block text-sm font-semibold tracking-[0.2em] uppercase px-8 py-3 hover:opacity-90 transition-opacity"
            style="background-color: #00BFA6; color: #0B1312;"
            @click="isMenuOpen = false"
          >
            {{ t.nav.cta }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
