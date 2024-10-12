<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

class MinMaxGUIHelper {
  obj: any
  minProp: any
  maxProp: any
  minDif: any
  constructor(obj: THREE.PerspectiveCamera, minProp: string, maxProp: string, minDif: number) {
    this.obj = obj
    this.minProp = minProp
    this.maxProp = maxProp
    this.minDif = minDif
  }
  get min() {
    return this.obj[this.minProp]
  }
  set min(v) {
    this.obj[this.minProp] = v
    this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif)
  }
  get max() {
    return this.obj[this.maxProp]
  }
  set max(v) {
    this.obj[this.maxProp] = v
    // eslint-disable-next-line no-self-assign
    this.min = this.min
  }
}

onMounted(() => {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

  const fov = 45
  const aspect = 2 // the canvas default
  const near = 5
  const far = 100
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 10, 40)

  // const gui = new GUI()
  // gui.add(camera, 'fov', 1, 180)
  // const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1)
  // gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near')
  // gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far')

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 5, 0)
  controls.update()

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('white')

  function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement
    const width = Math.floor(canvas.clientWidth)
    const height = Math.floor(canvas.clientHeight)
    const needResize = canvas.width !== width || canvas.height !== height

    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  const loader = new THREE.TextureLoader()

  {
    // 地板
    const planeSize = 40

    const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.magFilter = THREE.NearestFilter
    texture.colorSpace = THREE.SRGBColorSpace
    const repeats = planeSize / 2
    texture.repeat.set(repeats, repeats)

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    })
    planeMat.color.setRGB(1.5, 1.5, 1.5)
    const mesh = new THREE.Mesh(planeGeo, planeMat)
    mesh.rotation.x = Math.PI * 0.5
    scene.add(mesh)
  }

  {
    // 球体
    const sphereRadius = 2
    const sphereWidthDivisions = 32
    const sphereHeightDivisions = 16
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions)
    const sphereMat = new THREE.MeshBasicMaterial({ color: '#CA8' })
    const mesh = new THREE.Mesh(sphereGeo, sphereMat)
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0)
    scene.add(mesh)
  }

  const shadowTexture = loader.load('https://threejs.org/manual/examples/resources/images/roundshadow.png')
  const sphereShadowBases = []

  function render(time = 0) {
    time *= 0.001

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  render()
})
</script>

<template>
  <canvas id="canvas"></canvas>
</template>

<style scoped>
#canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
