import * as THREE from 'three'

export function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
  const pixelRatio = 2
  const canvas = renderer.domElement
  const width = Math.floor(canvas.clientWidth * pixelRatio)
  const height = Math.floor(canvas.clientHeight * pixelRatio)
  const needResize = canvas.width !== width || canvas.height !== height

  if (needResize) {
    console.log('needResize: ', needResize, width, height)
    renderer.setSize(width, height, false)
  }
  return needResize
}
