<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onUnmounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { resizeRendererToDisplaySize } from '@/utils'

onMounted(() => {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, 2, 0.01, 200)
  camera.position.z = 10

  const rgbeLoader = new RGBELoader()
  rgbeLoader.load('/blue_photo_studio_2k.hdr', texture => {
    // 设置纹理的编码格式
    texture.mapping = THREE.EquirectangularReflectionMapping
    texture.encoding = THREE.sRGBEncoding

    // 设置场景的背景和环境贴图
    scene.background = texture
    scene.environment = texture
  })

  // 设置光源
  // scene.add(new THREE.AmbientLight(0xffffff, 1))

  const earthGeometry = new THREE.SphereGeometry(5, 256, 256)
  const textureLoader = new THREE.TextureLoader()
  const baseTexture = textureLoader.load('/world.topo.bathy.200401.jpg')

  const heightTexture = textureLoader.load('/bathymetry_bw_composite_4k.jpg')

  const canvas = document.getElementById('solarSystem') as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

  // const backgroundTexture = textureLoader.load('/starfield.jpg')
  // scene.background = backgroundTexture

  // 创建材质
  const earthMaterial = new THREE.MeshStandardMaterial({
    // map: baseTexture, // 地球表面的颜色贴图
    // displacementMap: heightTexture, // 地形高度贴图
    // displacementScale: 0.5, // 等同于 ECharts 的 displacementScale
    roughness: 0.01, // roughness 材质属性
    metalness: 0.5, // metalness 材质属性
    color: 'pink',
  })

  const gui = new GUI()
  onUnmounted(() => gui.destroy())
  gui.add(earthMaterial, 'displacementScale', 0, 1, 0.01)
  gui.add(earthMaterial, 'roughness', 0, 1, 0.01)
  gui.add(earthMaterial, 'metalness', 0, 1, 0.01)

  // 创建地球 Mesh
  const earth = new THREE.Mesh(earthGeometry, earthMaterial)
  earth.rotation.set(THREE.MathUtils.degToRad(35), THREE.MathUtils.degToRad(165), 0)
  scene.add(earth)

  // // 添加光照
  // const mainLight = new THREE.DirectionalLight(0xffffff, 5) //
  // mainLight.position.set(5, 3, 5)
  // mainLight.castShadow = true
  // scene.add(mainLight)

  // // 环境光
  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // 调整环境光强度
  // scene.add(ambientLight)

  // 鼠标控制
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

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

  const first = true

  render(0)
})
</script>

<template>
  <canvas id="solarSystem"></canvas>
</template>

<style scoped>
#solarSystem {
  width: 100%;
  height: 100%;
  display: block;
  color: #000;
}
</style>
