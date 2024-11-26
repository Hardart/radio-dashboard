import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/layers/mainViewLayer/views/mainView/index.vue'
import { useAuthStore } from '@/store/useAuthStore'
import { storeToRefs } from 'pinia'
import { isString } from '@/shared/helpers/utils'

type CustomView = {
  name: string
  children: string[]
}
const views: (string | CustomView)[] = [
  'login',
  'categories',
  'gallery',
  { name: 'news', children: ['', 'create', ':id'] },
]

const routes: RouteRecordRaw[] = views.map(initRoute)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...routes,
    // {
    //   path: '/news/create-article',
    //   name: 'article-create',
    //   component: () =>
    //     import(
    //       `@/layers/newsItemCreateViewLayer/views/newsItemCreateView/index.vue`
    //     ),
    // },
  ],
})

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()
  const { isAuth } = storeToRefs(store)
  await store.isReady

  if (isAuth.value && to.path == '/login') return next({ name: 'home' })
  if (!isAuth.value && to.path !== '/login') return next({ name: 'login' })

  next()
})

function initRoute(route: string | CustomView): RouteRecordRaw {
  if (isString(route)) {
    return {
      path: `/${route}`,
      name: route,
      component: () =>
        import(`@/layers/${route}ViewLayer/views/${route}View/index.vue`),
    }
  } else {
    return {
      path: `/${route.name}`,
      component: () =>
        import(
          `@/layers/${route.name}ViewLayer/views/${route.name}View/index.vue`
        ),
      children: route.children.map(initChild(route)),
    }
  }
}

function initChild(
  route: Record<string, any>
): (child: string) => RouteRecordRaw {
  return function (child: string) {
    return {
      path: child,
      component: () =>
        import(
          `@/layers/${route.name}ViewLayer/views/${
            child || 'index'
          }View/index.vue`
        ),
    }
  }
}

export default router
