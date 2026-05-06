import * as THREE from 'three'

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
}

export interface NeuralCanvasOptions {
  particleColor?: number
  lineColor?: number
  bgColor?: number
  count?: number
  spread?: number
  linkDist?: number
  depth?: number
}

export function useNeuralCanvas() {
  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.OrthographicCamera | null = null
  let animId: number | null = null
  let canvasEl: HTMLCanvasElement | null = null
  let geoPoints: THREE.BufferGeometry | null = null
  let geoLines: THREE.BufferGeometry | null = null
  const dots: Dot[] = []
  const mouse = { x: 0, y: 0 }

  function init(el: HTMLCanvasElement, opts: NeuralCanvasOptions = {}) {
    canvasEl = el
    const {
      particleColor = 0xffffff,
      lineColor = 0x333333,
      bgColor = 0x000000,
      count = 120,
      spread = 1,
      linkDist = 0.18,
    } = opts

    const w = el.offsetWidth,
      h = el.offsetHeight
    renderer = new THREE.WebGLRenderer({ canvas: el, antialias: false, alpha: false })
    renderer.setPixelRatio(1)
    renderer.setSize(w, h)
    renderer.setClearColor(bgColor, 1)

    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(-1, 1, h / w, -h / w, 0, 1)
    camera.position.z = 1

    for (let i = 0; i < count; i++) {
      dots.push({
        x: (Math.random() - 0.5) * 2 * spread,
        y: (Math.random() - 0.5) * 2 * (h / w) * spread,
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0004,
      })
    }

    geoPoints = new THREE.BufferGeometry()
    geoPoints.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    scene.add(
      new THREE.Points(
        geoPoints,
        new THREE.PointsMaterial({
          color: particleColor,
          size: 0.006,
          transparent: true,
          opacity: 0.5,
        }),
      ),
    )

    geoLines = new THREE.BufferGeometry()
    geoLines.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(count * count * 6), 3),
    )
    scene.add(
      new THREE.LineSegments(
        geoLines,
        new THREE.LineBasicMaterial({
          color: lineColor,
          transparent: true,
          opacity: 0.25,
        }),
      ),
    )

    el.addEventListener('mousemove', onMouse)
    window.addEventListener('resize', () => onResize(h / w))
    tick(linkDist, count, h / w)
  }

  function tick(linkDist: number, count: number, aspect: number) {
    animId = requestAnimationFrame(() => tick(linkDist, count, aspect))
    if (!geoPoints || !geoLines || !scene || !camera || !renderer) return

    const posAttr = geoPoints.attributes['position']
    const lineAttr = geoLines.attributes['position']
    if (!posAttr || !lineAttr) return

    const pp = posAttr.array as Float32Array
    const lp = lineAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      const d = dots[i]
      if (!d) continue
      d.x += d.vx + (mouse.x - d.x) * 0.00005
      d.y += d.vy + (mouse.y - d.y) * 0.00005
      if (Math.abs(d.x) > 1.05) d.vx *= -1
      if (Math.abs(d.y) > aspect * 1.05) d.vy *= -1
      pp[i * 3] = d.x
      pp[i * 3 + 1] = d.y
      pp[i * 3 + 2] = 0
    }
    posAttr.needsUpdate = true

    let li = 0
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const di = dots[i]
        const dj = dots[j]
        if (!di || !dj) continue
        const dx = di.x - dj.x
        const dy = di.y - dj.y
        if (dx * dx + dy * dy < linkDist * linkDist) {
          lp[li++] = di.x
          lp[li++] = di.y
          lp[li++] = 0
          lp[li++] = dj.x
          lp[li++] = dj.y
          lp[li++] = 0
        }
      }
    }
    for (let i = li; i < lp.length; i++) lp[i] = 0
    lineAttr.needsUpdate = true
    geoLines.setDrawRange(0, li / 3)

    renderer.render(scene, camera)
  }

  function onMouse(e: MouseEvent) {
    if (!canvasEl) return
    const rect = canvasEl.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1) * (rect.height / rect.width)
  }

  function onResize(aspect: number) {
    if (!canvasEl || !renderer || !camera) return
    const w = canvasEl.offsetWidth,
      h = canvasEl.offsetHeight
    renderer.setSize(w, h)
    camera.top = h / w
    camera.bottom = -h / w
    camera.updateProjectionMatrix()
    aspect = h / w
  }

  function destroy() {
    if (animId) cancelAnimationFrame(animId)
    canvasEl?.removeEventListener('mousemove', onMouse)
    renderer?.dispose()
    dots.length = 0
  }

  return { init, destroy }
}
