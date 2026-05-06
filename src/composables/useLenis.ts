import Lenis from 'lenis'
import { ref } from 'vue'

let lenis: Lenis | null = null
const isReady = ref(false)

export function useLenis() {
  function init() {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    isReady.value = true
  }

  function destroy() {
    lenis?.destroy()
    lenis = null
    isReady.value = false
  }

  function getLenis() {
    return lenis
  }

  return { init, destroy, isReady, getLenis }
}
