<script setup lang="ts">
import { computed } from 'vue'
import { routes } from '../router'

const routerList = computed(() =>
  routes.value
    .filter(item => item.name !== 'home')
    .map(item => {
      const record = { to: item.path, name: item.name as string }
      record.name = record.name.charAt(0).toUpperCase() + record.name.slice(1)
      return record
    })
)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <h1 class="title">ThreeJs !</h1>
      <nav>
        <RouterLink v-for="item in routerList" :key="item.to" :to="item.to">{{ item.name }}</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  padding-top: 20px;
  height: 100%;
}

.title {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
  text-align: center;
  color: #333;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  text-align: center;
  margin-top: 2rem;
}

nav a {
  color: #333;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid #e0e0e0;
}

nav a:first-of-type {
  border: 0;
}
</style>
