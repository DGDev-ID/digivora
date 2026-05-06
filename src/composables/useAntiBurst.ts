/**
 * useAntiBurst — Google Antigravity-style white particle field
 *
 * • Particles distributed in a radial burst from center
 * • Circular orbital wave motion; phase correlates with radius → ripple rings
 * • Custom vertex shader shrinks each particle based on cursor proximity (NDC)
 * • All particles white; background colour configurable
 */
import * as THREE from 'three'
import { onUnmounted } from 'vue'

/* ── GLSL ──────────────────────────────────────────────────────────────── */
const VERT = /* glsl */ `
  attribute float aPhase;
  uniform float uTime;
  uniform vec2  uMouse;   // NDC [-1,1]
  uniform float uSize;

  void main() {
    vec3 p = position;

    // Circular orbital wave — phase correlates with radius, producing ripple rings
    float t  = uTime * 0.65 + aPhase;
    p.x += cos(t)                          * 1.50
         + sin(uTime * 0.28 + aPhase * 0.6) * 0.70;
    p.y += sin(t)                          * 1.05
         + cos(uTime * 0.22 + aPhase * 0.8) * 0.50;
    p.z += sin(uTime * 0.38 + aPhase * 1.1) * 0.40;

    vec4  clip = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    vec2  ndc  = clip.xy / clip.w;

    // Shrink near cursor
    float d = distance(ndc, uMouse);
    float s = 1.0 - smoothstep(0.0, 0.30, d) * 0.88;
    gl_PointSize = max(0.5, uSize * s);
    gl_Position  = clip;
  }
`

const FRAG = /* glsl */ `
  void main() {
    vec2  c  = gl_PointCoord - 0.5;
    float r2 = dot(c, c);
    if (r2 > 0.25) discard;
    // Soft falloff toward edge
    float a = (1.0 - smoothstep(0.12, 0.25, r2)) * 0.78;
    gl_FragColor = vec4(1.0, 1.0, 1.0, a);
  }
`
/* ──────────────────────────────────────────────────────────────────────── */

export interface AntiBurstOptions {
  /** Number of particles (default 700) */
  count?: number
  /** WebGL clear colour (default 0x000000) */
  bgColor?: number
  /** Inner ring radius — keeps centre clear (default 5) */
  innerRadius?: number
  /** Outer ring radius (default 58) */
  outerRadius?: number
  /** Base point size in CSS pixels (default 3.0) */
  baseSize?: number
  /**
   * When true the renderer uses the canvas element's own
   * offsetWidth / offsetHeight instead of window dimensions.
   * Use for sections whose canvas is smaller than the viewport.
   */
  elementSized?: boolean
}

export function useAntiBurst() {
  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let animId: number | null = null
  let mat: THREE.ShaderMaterial | null = null
  let canvasEl: HTMLCanvasElement | null = null
  let isElementSized = false
  let resizeObserver: ResizeObserver | null = null

  // Keep mouse far off-screen initially so nothing shrinks before first move
  const mouse = { x: 9, y: 9 }

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  function getSize() {
    if (isElementSized && canvasEl) {
      return {
        w: canvasEl.offsetWidth || window.innerWidth,
        h: canvasEl.offsetHeight || window.innerHeight,
      }
    }
    return { w: window.innerWidth, h: window.innerHeight }
  }

  /* ── Public API ───────────────────────────────────────────────────────── */
  function init(el: HTMLCanvasElement, opts: AntiBurstOptions = {}) {
    canvasEl = el
    const {
      count = 700,
      bgColor = 0x000000,
      innerRadius = 5,
      outerRadius = 58,
      baseSize = 3.0,
      elementSized = false,
    } = opts
    isElementSized = elementSized

    const { w, h } = getSize()

    renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h, false)
    renderer.setClearColor(bgColor, 1)

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 300)
    camera.position.z = 38

    /* ── Geometry ─────────────────────────────────────────────────────── */
    const pos = new Float32Array(count * 3)
    const phase = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = innerRadius + Math.random() * (outerRadius - innerRadius)

      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = Math.sin(angle) * r * 0.6 // vertical oval squish
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14

      // Phase correlates with radius → concentric ripple rings
      phase[i] = r * 0.16 + Math.random() * 1.2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1))

    /* ── Material ─────────────────────────────────────────────────────── */
    mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(9, 9) },
        uSize: { value: baseSize * Math.min(window.devicePixelRatio, 2) },
      },
      transparent: true,
      depthWrite: false,
    })

    scene.add(new THREE.Points(geo, mat))

    /* ── Events ───────────────────────────────────────────────────────── */
    window.addEventListener('mousemove', onMouse)

    if (elementSized) {
      resizeObserver = new ResizeObserver(onResize)
      resizeObserver.observe(el)
    } else {
      window.addEventListener('resize', onResize)
    }

    tick()
  }

  function tick() {
    animId = requestAnimationFrame(tick)
    if (mat?.uniforms['uTime']) mat.uniforms['uTime'].value = performance.now() * 0.001
    if (renderer && scene && camera) renderer.render(scene, camera)
  }

  function onMouse(e: MouseEvent) {
    if (isElementSized && canvasEl) {
      const rect = canvasEl.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    } else {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    if (mat?.uniforms['uMouse']) mat.uniforms['uMouse'].value.set(mouse.x, mouse.y)
  }

  function onResize() {
    if (!renderer || !camera) return
    const { w, h } = getSize()
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function destroy() {
    if (animId !== null) cancelAnimationFrame(animId)
    window.removeEventListener('mousemove', onMouse)
    window.removeEventListener('resize', onResize)
    resizeObserver?.disconnect()
    renderer?.dispose()
    mat?.dispose()
    renderer = scene = camera = mat = canvasEl = null
  }

  onUnmounted(destroy)
  return { init, destroy }
}
