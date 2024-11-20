<script setup lang="ts">
import { ref } from 'vue'
import { routes } from '@/router'

const src = ref(location.origin + routes.value[0].path)

const handleClick = (item: any) => {
  src.value = location.origin + item.path
}
</script>

<template>
  <div class="layout">
    <div class="left">
      <div v-for="(item, index) in routes" :key="index" @click="handleClick(item)">{{ item.meta?.name }}</div>
    </div>
    <iframe :src="src" frameborder="0" class="right"></iframe>
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
