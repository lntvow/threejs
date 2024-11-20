<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onUnmounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'lil-gui'
import Stats from 'stats.js'
import { resizeRendererToDisplaySize } from '@/utils'

onMounted(() => {
  const gui = new GUI()
  const stats = new Stats()
  stats.showPanel(2)
  document.body.appendChild(stats.dom)
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

  const scene = new THREE.Scene()

  // 添加光源
  const light = new THREE.DirectionalLight(0xffffff, 3)
  light.position.set(-1, 2, 4)
  scene.add(light)

  scene.add(new THREE.AmbientLight(0xffffff, 0.2))

  const fov = 75
  const aspect = 2
  const near = 0.1
  const far = 50
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 5

  const geometry = new THREE.BoxGeometry(1, 1, 1)

  const cubeSize = { width: 1, height: 1, depth: 1 }

  gui.add(cubeSize, 'width', 0.5, 1, 0.1).onChange((value: number) => {
    cubes.forEach(cube => (cube.scale.x = value))
  })
  gui.add(cubeSize, 'height', 0.5, 1, 0.1).onChange((value: number) => {
    cubes.forEach(cube => (cube.scale.y = value))
  })
  gui.add(cubeSize, 'depth', 0.5, 1, 0.1).onChange((value: number) => {
    cubes.forEach(cube => (cube.scale.z = value))
  })

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  const cubes = [
    makeInstance(geometry, 0xffffff, -2),
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0xaa8844, 2),
  ]

  function makeInstance(geometry: THREE.BoxGeometry, color: THREE.ColorRepresentation, x: number) {
    const material = new THREE.MeshPhongMaterial({ color })

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    cube.position.x = x

    return cube
  }

  function render(time: number) {
    time *= 0.001

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1
      const rot = time * speed
      cube.rotation.x = rot
      cube.rotation.y = rot
    })
    stats.begin()
    renderer.render(scene, camera)
    stats.end()
    requestAnimationFrame(render)
  }
  render(0)

  onUnmounted(() => {
    gui.destroy()
    stats.dom.remove()
  })
})
</script>

<template>
  <canvas id="canvas"></canvas>
</template>
