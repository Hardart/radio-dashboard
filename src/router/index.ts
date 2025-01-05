import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/layers/mainViewLayer/views/mainView/index.vue'
import LoginView from '@/layers/loginViewLayer/views/loginView/index.vue'
import { useAuthStore } from '@/store/useAuthStore'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () =>
        import(`@/layers/galleryViewLayer/views/galleryView/index.vue`),
    },
    {
      path: '/tracks',
      component: () =>
        import(`@/layers/tracksViewLayer/views/tracksView/index.vue`),
    },
    {
      path: '/news',
      component: () =>
        import(`@/layers/newsViewLayer/views/newsView/index.vue`),
      children: [
        {
          path: '',
          component: () =>
            import(`@/layers/newsViewLayer/views/ListView/index.vue`),
        },
        {
          path: 'create',
          component: () =>
            import(`@/layers/newsViewLayer/views/createView/index.vue`),
        },
        {
          path: ':id',
          component: () =>
            import(`@/layers/newsViewLayer/views/idView/index.vue`),
        },
      ],
    },
    {
      path: '/categories',
      name: 'categories',
      component: () =>
        import(`@/layers/categoriesViewLayer/views/categoriesView/index.vue`),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/programs',
      component: () => import(`@/layers/programsViewLayer/views/index.vue`),
      children: [
        {
          path: '',
          component: () =>
            import(`@/layers/programsViewLayer/views/listView/index.vue`),
        },
        {
          path: 'create',
          component: () =>
            import(`@/layers/programsViewLayer/views/createView/index.vue`),
        },
        {
          path: ':id',
          component: () =>
            import(`@/layers/programsViewLayer/views/idView/index.vue`),
        },
      ],
    },
    {
      path: '/settings',
      component: () =>
        import(`@/layers/settingsViewLayer/views/settingsView/index.vue`),
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
