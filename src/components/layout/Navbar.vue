<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { lang, t, toggleLang } = useI18n()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

function scrollTo(id: string) {
  isMenuOpen.value = false
  const el = document.querySelector(id)
  el?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const navItems = computed(() => [
  { label: t.value.nav.about, href: '#about' },
  { label: t.value.nav.services, href: '#services' },
  { label: t.value.nav.work, href: '#portfolio' },
  { label: t.value.nav.process, href: '#process' },
  { label: t.value.nav.contact, href: '#cta' },
])
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-black/8 py-3'
        : 'bg-transparent py-6',
    ]"
  >
    <nav class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 group" @click.prevent="scrollTo('#hero')">
        <img
          src="/logo-navbar.svg"
          alt="Digivora"
          class="h-8 w-auto"
          :class="isScrolled ? 'brightness-0' : 'brightness-100'"
        />
      </a>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex items-center gap-10">
        <li v-for="item in navItems" :key="item.label">
          <a
            :href="item.href"
            class="text-sm font-medium tracking-widest uppercase text-black/60 hover:text-black transition-colors duration-300 relative group"
            @click.prevent="scrollTo(item.href)"
          >
            {{ item.label }}
            <span
              class="absolute -bottom-0.5 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </li>
      </ul>

      <!-- CTA + Language Toggle -->
      <div class="hidden md:flex items-center gap-3">
        <!-- Language Toggle -->
        <button
          @click="toggleLang"
          class="flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase px-3 py-2 border transition-all duration-300"
          :class="
            isScrolled
              ? 'border-black/20 text-black/50 hover:border-black hover:text-black'
              : 'border-white/30 text-white/60 hover:border-white hover:text-white'
          "
          :title="lang === 'en' ? 'Switch to Bahasa Indonesia' : 'Switch to English'"
        >
          <span class="text-[10px]">{{ lang === 'en' ? '🇮🇩' : '🇺🇸' }}</span>
          <span>{{ lang === 'en' ? 'ID' : 'EN' }}</span>
        </button>

        <a
          href="#cta"
          class="text-xs font-semibold tracking-[0.2em] uppercase px-6 py-2.5 border transition-all duration-300"
          :class="
            isScrolled
              ? 'border-black text-black hover:bg-black hover:text-white'
              : 'border-white/60 text-white hover:bg-white hover:text-black'
          "
          @click.prevent="scrollTo('#cta')"
        >
          {{ t.nav.cta }}
        </a>
      </div>

      <!-- Mobile right: language + hamburger -->
      <div class="md:hidden flex items-center gap-2">
        <button
          @click="toggleLang"
          class="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5 border border-white/30 text-white/70 hover:border-white hover:text-white transition-all duration-300"
          :class="isScrolled ? 'border-black/20 text-black/50' : 'border-white/30 text-white/70'"
        >
          <span>{{ lang === 'en' ? '🇮🇩 ID' : '🇺🇸 EN' }}</span>
        </button>
        <button
          class="p-2"
          :class="isScrolled ? 'text-black' : 'text-white'"
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
        class="md:hidden absolute top-full left-0 right-0 bg-white border-b border-black/10 px-6 py-8"
      >
        <ul class="flex flex-col gap-6">
          <li v-for="item in navItems" :key="item.label">
            <a
              :href="item.href"
              class="text-2xl font-light tracking-widest uppercase text-black hover:text-black/50 transition-colors"
              @click.prevent="scrollTo(item.href)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
        <div class="mt-8 pt-8 border-t border-black/10">
          <a
            href="#cta"
            class="inline-block text-sm font-semibold tracking-[0.2em] uppercase px-8 py-3 bg-black text-white"
            @click.prevent="scrollTo('#cta')"
          >
            {{ t.nav.cta }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
