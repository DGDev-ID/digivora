<script setup lang="ts">
// TechMarquee — infinite horizontal scroll strip of tech/partner logos
const techStack = [
  { name: 'Vue.js', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Laravel', icon: '🔴' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Flutter', icon: '💙' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
]
// Duplicate for seamless loop
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
    <!-- Left fade -->
    <div
      class="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
      style="background: linear-gradient(to right, #11201f, transparent)"
    ></div>
    <!-- Right fade -->
    <div
      class="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
      style="background: linear-gradient(to left, #11201f, transparent)"
    ></div>

    <!-- Label -->
    <div
      class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.35em] uppercase pointer-events-none"
      style="
        background: #11201f;
        color: rgba(0, 191, 166, 0.5);
        border: 1px solid rgba(0, 191, 166, 0.15);
      "
    >
      TECH STACK
    </div>

    <!-- Marquee track -->
    <div class="flex items-center marquee-track">
      <div
        v-for="(tech, i) in doubled"
        :key="i"
        class="flex items-center gap-2.5 mx-8 flex-shrink-0 select-none"
      >
        <span class="text-lg">{{ tech.icon }}</span>
        <span
          class="text-sm font-semibold tracking-wider whitespace-nowrap"
          style="color: rgba(229, 231, 235, 0.4)"
          >{{ tech.name }}</span
        >
        <div class="w-1 h-1 rounded-full ml-8" style="background: rgba(0, 191, 166, 0.3)"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  animation: marquee 30s linear infinite;
  width: max-content;
}
.marquee-track:hover {
  animation-play-state: paused;
}
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
