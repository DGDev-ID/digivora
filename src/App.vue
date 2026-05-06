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
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style>
@import './style.css';

.site-wrapper {
  min-height: 100vh;
  background: #ffffff;
}
</style>
