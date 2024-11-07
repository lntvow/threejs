<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { resizeRendererToDisplaySize } from '@/utils'

onMounted(() => {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, 2, 0.01, 200)
  camera.position.y = 30

  // 设置光源
  scene.add(new THREE.PointLight(0xffffff, 500))
  // 旋转控制
  const axesHelperList: THREE.Object3D[] = []

  // 太阳系
  const solarSystem = new THREE.Object3D()
  scene.add(solarSystem)

  const sphereGeometry = new THREE.SphereGeometry(1, 36, 36)
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })

  // 太阳
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
  sunMesh.scale.set(5, 5, 5)
  solarSystem.add(sunMesh)
  axesHelperList.push(sunMesh)

  // 地球的轨道
  const earthTrack = new THREE.Object3D()
  solarSystem.add(earthTrack)

  // 地球的 Object3D
  const earthOrbit = new THREE.Object3D()
  earthTrack.add(earthOrbit)
  earthOrbit.position.x = 12

  // // 地球
  const earthMesh = new THREE.Mesh(sphereGeometry, new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 }))
  earthOrbit.add(earthMesh)

  axesHelperList.push(earthMesh)

  // 月球的轨道
  const moonTrack = new THREE.Object3D()
  earthOrbit.add(moonTrack)

  // 月球
  const moonMesh = new THREE.Mesh(sphereGeometry, new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 }))
  moonTrack.add(moonMesh)
  moonMesh.scale.set(0.4, 0.4, 0.4)
  moonMesh.position.x = 2
  axesHelperList.push(moonMesh)

  const canvas = document.getElementById('solarSystem') as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

  // 鼠标控制
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  // axesHelperList.forEach(node => {
  //   const axes = new THREE.AxesHelper()
  //   // @ts-ignore
  //   axes.material.depthTest = false
  //   axes.renderOrder = 1
  //   node.add(axes)
  // })

  function render(time: number) {
    // 1s 等于 一天
    time *= 0.01
    // time /= 10
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    // 太阳自转  一圈需要 25 天
    sunMesh.rotation.y = (time / 25) * Math.PI * 2
    // 地球公转  一圈需要 365 天
    earthTrack.rotation.y = (time / 365) * Math.PI * 2
    // 地球自转  一圈需要 1 天
    earthMesh.rotation.y = time * Math.PI * 2
    // 月球公转  一圈需要 27 天
    moonTrack.rotation.y = (time / 27) * Math.PI * 2
    // 月球自转  一圈需要 27 天
    moonMesh.rotation.y = (time / 27) * Math.PI * 2

    updateMoonTrajectory()

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  let moonPathPositions: number[] = []
  const moonPathGeometry = new THREE.BufferGeometry()
  const moonPathMaterial = new THREE.LineDashedMaterial({ color: 0xea750f })
  const moonPathLine = new THREE.Line(moonPathGeometry, moonPathMaterial)
  scene.add(moonPathLine)

  let i = 0

  function updateMoonTrajectory() {
    i++
    if (i % 2 !== 0) return
    const position = moonMesh.getWorldPosition(new THREE.Vector3())

    if (moonPathPositions.length >= 1600) {
      moonPathPositions = moonPathPositions.slice(3)
    }
    moonPathPositions.push(position.x, position.y, position.z)

    const vertices = new Float32Array(moonPathPositions)
    moonPathGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  }

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
