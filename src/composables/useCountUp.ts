import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export interface CountUpItem {
  el: HTMLElement
  target: number
  suffix?: string
  prefix?: string
  decimals?: number
}

export function useCountUp() {
  function run(items: CountUpItem[], triggerEl: HTMLElement) {
    items.forEach((item) => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: item.target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: triggerEl, start: "top 75%", once: true },
        onUpdate() {
          const v = item.decimals
            ? obj.val.toFixed(item.decimals)
            : Math.round(obj.val).toString()
          item.el.textContent = (item.prefix ?? "") + v + (item.suffix ?? "")
        },
        onComplete() {
          const v = item.decimals
            ? item.target.toFixed(item.decimals)
            : item.target.toString()
          item.el.textContent = (item.prefix ?? "") + v + (item.suffix ?? "")
        },
      })
    })
  }
  return { run }
}
