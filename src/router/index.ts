import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/layers/mainViewLayer/views/index.vue'
import { useAuthStore } from '@/store/useAuthStore'
import { storeToRefs } from 'pinia'
const views = ['login', 'news', 'categories', 'gallery']

const routes: RouteRecordRaw[] = views.map((v) => {
  return {
    path: `/${v}`,
    name: v,
    component: () => import(`@/layers/${v}ViewLayer/views/index.vue`),
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...routes,
    {
      path: '/news/create-article',
      name: 'article-create',
      component: () =>
        import(
          `@/layers/newsItemCreateViewLayer/views/newsItemCreateView/index.vue`
        ),
    },
    {
      path: '/news/:id',
      name: 'article-id',
      component: () =>
        import(`@/layers/newsItemViewLayer/views/newsItemView/index.vue`),
    },
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

export default router
