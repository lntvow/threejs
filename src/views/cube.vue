<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { resizeRendererToDisplaySize } from '@/utils'

onMounted(() => {
  const scene = new THREE.Scene()

  // 添加光源
  const light = new THREE.DirectionalLight(0xffffff, 3)
  light.position.set(-1, 2, 4)
  scene.add(light)

  // 创建平行光辅助对象
  // const directionalLightHelper = new THREE.DirectionalLightHelper(light, 5)
  // scene.add(directionalLightHelper)

  const fov = 75
  const aspect = 2
  const near = 0.1
  const far = 50
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 5

  const geometry = new THREE.BoxGeometry(1, 1, 1)

  const canvas = document.getElementById('cube') as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

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
    // controls.update()
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
