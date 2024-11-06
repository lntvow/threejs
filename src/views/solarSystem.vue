<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { resizeRendererToDisplaySize } from '@/utils'

onMounted(() => {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 200)
  camera.position.y = 30

  // 设置光源
  scene.add(new THREE.PointLight(0xffffff, 500))
  // 旋转控制
  const axesHelperList: THREE.Object3D[] = []

  // 太阳系
  const solarSystem = new THREE.Object3D()
  scene.add(solarSystem)

  const sphereGeometry = new THREE.SphereGeometry(1, 12, 12)
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })

  // 太阳
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
  sunMesh.scale.set(5, 5, 5)
  solarSystem.add(sunMesh)
  axesHelperList.push(sunMesh)

  // 地球的 Object3D
  const earthOrbit = new THREE.Object3D()
  // earthOrbit.position.x = 12
  solarSystem.add(earthOrbit)

  // // 地球
  const earthMesh = new THREE.Mesh(sphereGeometry, new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 }))
  earthOrbit.add(earthMesh)
  earthMesh.position.x = 12

  axesHelperList.push(earthMesh)
  // objects.push(earthMesh)

  // 月球的 Object3D
  // const moonOrbit = new THREE.Object3D()
  // moonOrbit.position.x = 2
  // earthOrbit.add(moonOrbit)
  // objects.push(moonOrbit)

  // // 月球
  // const moonMesh = new THREE.Mesh(sphereGeometry, new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 }))
  // moonMesh.scale.set(0.4, 0.4, 0.4)
  // moonOrbit.add(moonMesh)

  // // 创建月球轨迹（BufferGeometry 和 Line）
  // const maxPoints = 180 // 轨迹线段的最大点数
  // const positions = new Float32Array(maxPoints * 3) // 存储位置的 Float32Array
  // const geometry = new THREE.BufferGeometry()
  // geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  // // 创建材质并创建轨迹线段
  // const line = new THREE.Line(geometry, new THREE.LineDashedMaterial({ dashSize: 1, gapSize: 0.5 }))
  // scene.add(line)

  const canvas = document.getElementById('solarSystem') as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

  // 鼠标控制
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  axesHelperList.forEach(node => {
    const axes = new THREE.AxesHelper()
    // @ts-ignore
    axes.material.depthTest = false
    axes.renderOrder = 1
    node.add(axes)
  })

  function render(time: number) {
    // 1s 等于 一天
    time *= 0.001
    time /= 5

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    // 太阳自转  一圈需要 25 天
    // sunMesh.rotation.y = (time / 25) * Math.PI * 2

    // 地球公转  一圈需要 365 天
    // earthOrbit.rotation.y = (time / 365) * Math.PI * 2
    // 地球自转  一圈需要 1 天
    earthMesh.rotation.y = time * Math.PI * 2

    // updateMoonTrajectory()

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  let pointIndex = 0 // 当前轨迹的点索引
  let totalPoints = 0 // 当前已有的总点数

  function updateMoonTrajectory() {
    // 获取月球在世界坐标中的位置
    const position = moonOrbit.getWorldPosition(new THREE.Vector3())

    // 更新 positions 数组中的值
    positions[pointIndex * 3] = position.x // X 轴
    positions[pointIndex * 3 + 1] = position.y // Y 轴
    positions[pointIndex * 3 + 2] = position.z // Z 轴

    // 循环使用点数，如果达到最大点数则覆盖最早的点
    pointIndex = (pointIndex + 1) % maxPoints

    // 计算总点数，确保不会超过 maxPoints
    if (totalPoints < maxPoints) {
      totalPoints++
    } else {
      // positions.length = 0
    }

    // 使用 drawRange 属性控制渲染的点范围，避免首尾相连
    // line.geometry.setDrawRange(0, totalPoints)

    // 更新 BufferGeometry，通知 Three.js 需要重新渲染轨迹
    line.geometry.attributes.position.needsUpdate = true
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
}
</style>
