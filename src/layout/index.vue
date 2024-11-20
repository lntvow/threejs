<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { routes } from '@/router'

const src = ref(`${location.origin}/threejs/#${routes.value[0].path}`)
console.log('src: ', src)

const show = ref(true)
const handleClick = (item: any) => {
  show.value = false
  src.value = `${location.origin}/threejs/#${item.path}`
  nextTick(() => {
    show.value = true
  })
}
</script>

<template>
  <div class="layout">
    <div class="left">
      <div v-for="(item, index) in routes" :key="index" @click="handleClick(item)">{{ item.meta?.name }}</div>
    </div>
    <iframe v-if="show" :src="src" frameborder="0" class="right"></iframe>
  </div>
</template>

<!-- eslint-disable vue/enforce-style-attribute -->
<style lang="scss">
.layout {
  height: 100%;
  display: flex;
  .left {
    width: 300px;
    height: 100%;
    background: pink;
  }
  .right {
    flex: 1;
  }
}
</style>
