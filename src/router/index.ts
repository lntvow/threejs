import { ref } from 'vue'
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

export const routes = ref<RouteRecordRaw[]>([])

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
  ],
})

const initRoutes = () => {
  const componentModules = import.meta.glob('../views/**/**.vue')

  Object.entries(componentModules).forEach(([key, component]) => {
    const record: RouteRecordRaw = {
      path: key.replace('../views', '').replace('.vue', '') || '/',
      name: key.replace('../views/', '').replace('.vue', '').replace(/\//g, '-'),
      component,
    }
    routes.value.push(record)
    router.addRoute(record)
  })
}

// function sortRoutes(children: RouteRecordRaw[]) {
//   children.sort((a, b) => (a.meta?.order ?? 999) - (b.meta?.order ?? 999))
//   children.forEach(item => item.children && sortRoutes(item.children))
// }

initRoutes()

// router.beforeEach(to => {
//   // NProgress.start()
// })

// router.afterEach(to => {
//   NProgress.done()
// })
