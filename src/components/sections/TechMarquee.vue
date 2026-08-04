<script setup lang="ts">
import { Icon } from '@iconify/vue'

const techStack = [
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'React', icon: 'logos:react' },
  { name: 'Next.js', icon: 'logos:nextjs-icon' },
  { name: 'Angular', icon: 'logos:angular-icon' },
  { name: 'Laravel', icon: 'logos:laravel' },
  { name: 'Node.Js', icon: 'logos:nodejs-icon' },
  { name: 'FastAPI', icon: 'logos:fastapi-icon' },
  { name: 'Django', icon: 'logos:django-icon' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'Figma', icon: 'logos:figma' },
  { name: 'Flutter', icon: 'logos:flutter' },
  { name: 'Kotlin', icon: 'logos:kotlin-icon' },
  { name: 'PostgreSQL', icon: 'logos:postgresql' },
  { name: 'Firebase', icon: 'logos:firebase-icon' },
  { name: 'Docker', icon: 'logos:docker-icon' },
  { name: 'Kubernetes', icon: 'logos:kubernetes' },
  { name: 'Cloudflare', icon: 'logos:cloudflare-icon' },
  { name: 'AWS', icon: 'logos:aws' },
]

const doubled = [...techStack, ...techStack]
</script>

<template>
  <div
    class="relative overflow-hidden py-8"
    style="
      background-color: #11201f;
      border-top: 1px solid rgba(0, 191, 166, 0.08);
      border-bottom: 1px solid rgba(0, 191, 166, 0.08);
    "
  >
    <!-- Left Fade -->
    <div
      class="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
      style="background: linear-gradient(to right, #11201f, transparent)"
    />

    <!-- Right Fade -->
    <div
      class="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
      style="background: linear-gradient(to left, #11201f, transparent)"
    />

    <!-- Label -->
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.35em] uppercase pointer-events-none"
      style="
        background: #11201f;
        color: rgba(0, 191, 166, 0.5);
        border: 1px solid rgba(0, 191, 166, 0.15);
      "
    >
      TECH STACK
    </div>

    <!-- Marquee -->
    <div class="flex items-center marquee-track">
      <div
        v-for="(tech, i) in doubled"
        :key="i"
        class="flex items-center gap-3 mx-8 flex-shrink-0 select-none"
      >
        <Icon :icon="tech.icon" class="w-7 h-7" />

        <span
          class="text-sm font-semibold tracking-wider whitespace-nowrap"
          style="color: rgba(229, 231, 235, 0.55)"
        >
          {{ tech.name }}
        </span>

        <div class="w-1 h-1 rounded-full ml-8" style="background: rgba(0, 191, 166, 0.3)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  width: max-content;
  animation: marquee 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
