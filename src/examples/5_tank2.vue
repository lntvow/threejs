<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onUnmounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { resizeRendererToDisplaySize } from '@/utils'

onMounted(() => {
  const canvas = document.querySelector('#c') as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
  renderer.setClearColor(0xaaaaaa)
  // renderer.shadowMap.enabled = true

  const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000)
  camera.position.set(48, 24, 48)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  const scene = new THREE.Scene()

  const light = new THREE.DirectionalLight(0xffffff, 3)
  light.position.set(1, 2, 4)
  scene.add(light)

  const groundGeometry = new THREE.PlaneGeometry(50, 50)
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xcc8866 })
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
  groundMesh.rotation.x = Math.PI * -0.5
  // groundMesh.receiveShadow = true
  scene.add(groundMesh)

  function render(time: number) {
    // time /= 10
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  render(0)
})
</script>

<template>
  <canvas id="c"></canvas>
  <!-- <div id="info"></div> -->
</template>

<style scoped>
#c {
  width: 100%;
  height: 100%;
  display: block;
  color: #000;
}

#info {
  position: absolute;
  left: 1em;
  top: 1em;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5em;
  color: white;
  font-family: monospace;
}
</style>
