import { ref } from 'vue'
import { type RouteRecordRaw, createRouter } from 'vue-router'

export const routes = ref<RouteRecordRaw[]>([])

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/layout',
    },
    {
      path: '/layout',
      component: () => import('../layout/index.vue'),
    },
  ],
})

const initRoutes = () => {
  const componentModules = import.meta.glob('../examples/**/**.vue')

  Object.entries(componentModules).forEach(([key, component]) => {
    const path = key.replace('../examples', '').replace('.vue', '')
    const record: RouteRecordRaw = {
      path,
      component,
    }

    const list = path.slice(1).split('_')

    if (list.length > 1) {
      record.meta = {
        sort: parseInt(list[0]),
        name: list[1].charAt(0).toUpperCase() + list[1].slice(1),
      }
    } else {
      // console.warn(`${record.path} is missing a sort number`)
      record.meta = {
        sort: 999,
        name: list[0].charAt(0).toUpperCase() + list[0].slice(1),
      }
    }

    routes.value.push(record)
    router.addRoute(record)
  })

  console.log('routes.value: ', routes.value)
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
