<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import img from '../assets/t3.jpg'
import { resizeRendererToDisplaySize } from '@/utils'

onMounted(() => {
  const scene = new THREE.Scene()

  // 添加光源
  // const light = new THREE.DirectionalLight(0xffffff, 3)
  // light.position.set(-1, 2, 4)
  // scene.add(light)

  const fov = 75
  const aspect = 2
  const near = 0.1
  const far = 500
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(2, 2, 2)

  const cubes: Array<any> = []

  const loader = new THREE.TextureLoader()
  loader.load(img, texture => {
    const cube = new THREE.Mesh(
      new THREE.SphereGeometry(1, 36, 36),
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
    )
    cubes.push(cube)
    scene.add(cube)
  })

  const canvas = document.getElementById('cube') as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  function render(time: number) {
    time *= 0.001

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    cubes.forEach(cube => {
      const speed = 0.2
      const rot = time * speed
      // cube.rotation.y = rot
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  render(0)
})
</script>

<template>
  <canvas id="cube"></canvas>
</template>

<style scoped>
#cube {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
