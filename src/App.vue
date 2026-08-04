<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useLenis } from '@/composables/useLenis'

const { init, destroy } = useLenis()

onMounted(() => {
  init()
})
onUnmounted(() => {
  destroy()
})
</script>

<template>
  <div class="site-wrapper">
    <Navbar />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<style>
@import './style.css';

.site-wrapper {
  min-height: 100vh;
  background: #0B1312;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
