<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { routes } from '@/router'

const current = ref(0)
// eslint-disable-next-line vue/no-ref-object-reactivity-loss
const src = ref(`${location.origin}/threejs/#${routes.value[current.value].path}`)

const show = ref(true)
const handleClick = (item: any, index: number) => {
  current.value = index
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
      <div
        v-for="(item, index) in routes"
        :key="index"
        class="item"
        :class="{ shadow: index === current }"
        @click="handleClick(item, index)"
      >
        <img src="" alt="" class="img" />
        <div class="name">{{ item.meta?.name }}</div>
      </div>
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
    background: #fff;
    padding: 16px 16px;
    height: 100vh;
    overflow-y: scroll;
    .shadow {
      box-shadow: 0 0 0 3px #049ef4;
    }
    .item {
      margin-bottom: 16px;
      border-radius: 3px;
      background: #f7f7f7;
      .img {
        width: 100%;
        height: 150px;
      }
      .name {
        padding: 8px 12px;
      }
    }
  }
  .right {
    flex: 1;
  }
}
</style>
