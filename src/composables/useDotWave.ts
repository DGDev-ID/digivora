import * as THREE from 'three'

export interface DotWaveOptions {
  /** Color of dots — default teal 0x00BFA6 */
  color?: number
  /** Number of columns in the dot grid */
  cols?: number
  /** Number of rows in the dot grid */
  rows?: number
  /** Size of each dot */
  dotSize?: number
  /** Wave amplitude in world units */
  amplitude?: number
  /** Wave speed multiplier */
  speed?: number
}

const defaults: Required<DotWaveOptions> = {
  color: 0x00bfa6,
  cols: 120,
  rows: 50,
  dotSize: 2.5,
  amplitude: 2.0,
  speed: 0.6,
}

/**
 * Creates an animated dot-wave (particle grid with sine-wave displacement)
 * rendered via Three.js on a <canvas>.
 */
export function useDotWave() {
  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let particles: THREE.Points | null = null
  let positions: Float32Array | null = null
  let baseY: Float32Array | null = null
  let animId = 0
  let startTime = 0
  let opts = { ...defaults }
  let canvas: HTMLCanvasElement | null = null

  function init(el: HTMLCanvasElement, userOpts?: DotWaveOptions) {
    canvas = el
    opts = { ...defaults, ...userOpts }

    const w = el.clientWidth
    const h = el.clientHeight

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: el,
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 0) // transparent — section bg shows through

    // Scene
    scene = new THREE.Scene()

    // Camera — look down at the wave from an angle
    camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 200)
    camera.position.set(0, 6, 14)
    camera.lookAt(0, 0, 0)

    // Build the particle grid
    const { cols, rows, color, dotSize, amplitude } = opts
    const total = cols * rows
    const geo = new THREE.BufferGeometry()
    positions = new Float32Array(total * 3)
    baseY = new Float32Array(total)

    const spacingX = 28 / cols
    const spacingZ = 14 / rows

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const idx = (i * rows + j) * 3
        const x = (i - cols / 2) * spacingX
        const z = (j - rows / 2) * spacingZ
        positions[idx] = x
        positions[idx + 1] = 0
        positions[idx + 2] = z
        baseY[i * rows + j] = 0
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Create a circular texture for the dots
    const circleCanvas = document.createElement('canvas')
    circleCanvas.width = 32
    circleCanvas.height = 32
    const circleCtx = circleCanvas.getContext('2d')
    if (circleCtx) {
      circleCtx.beginPath()
      circleCtx.arc(16, 16, 16, 0, Math.PI * 2)
      circleCtx.fillStyle = '#FFF'
      circleCtx.fill()
    }
    const texture = new THREE.CanvasTexture(circleCanvas)

    // Material — PointsMaterial with sizeAttenuation: false (pixel sizing)
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: dotSize,
      map: texture,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Subtle ambient glow plane below particles
    const glowGeo = new THREE.PlaneGeometry(40, 20)
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const glowPlane = new THREE.Mesh(glowGeo, glowMat)
    glowPlane.rotation.x = -Math.PI / 2
    glowPlane.position.y = -1.5
    scene.add(glowPlane)

    startTime = performance.now()
    window.addEventListener('resize', onResize)
    animate()
  }

  function animate() {
    animId = requestAnimationFrame(animate)
    if (!positions || !particles || !renderer || !scene || !camera) return

    const elapsed = (performance.now() - startTime) * 0.001 * opts.speed
    const { cols, rows, amplitude } = opts
    const total = cols * rows

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const idx = i * rows + j
        const x = positions[idx * 3] as number
        const z = positions[idx * 3 + 2] as number

        // Multiple sine waves for organic movement
        const wave1 = Math.sin(x * 0.4 + elapsed * 1.2) * amplitude * 0.6
        const wave2 = Math.sin(z * 0.5 + elapsed * 0.8) * amplitude * 0.4
        const wave3 = Math.sin((x + z) * 0.3 + elapsed * 0.5) * amplitude * 0.3
        const wave4 =
          Math.cos(x * 0.2 - elapsed * 0.6) * Math.sin(z * 0.3 + elapsed * 0.4) * amplitude * 0.25

        positions[idx * 3 + 1] = wave1 + wave2 + wave3 + wave4
      }
    }

    if (particles.geometry.attributes.position) {
      ;(particles.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
    }
    renderer.render(scene, camera)
  }

  function onResize() {
    if (!canvas || !renderer || !camera) return
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function destroy() {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', onResize)

    if (particles) {
      particles.geometry.dispose()
      ;(particles.material as THREE.Material).dispose()
    }
    if (renderer) {
      renderer.dispose()
    }
    scene = null
    camera = null
    particles = null
    renderer = null
    positions = null
    baseY = null
    canvas = null
  }

  return { init, destroy }
}
