import * as THREE from 'three'

export function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
  const pixelRatio = window.devicePixelRatio
  const canvas = renderer.domElement
  const width = Math.floor(canvas.clientWidth * pixelRatio)
  const height = Math.floor(canvas.clientHeight * pixelRatio)
  const needResize = canvas.width !== width || canvas.height !== height

  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}
