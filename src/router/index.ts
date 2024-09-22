import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/layers/mainViewLayer/views/index.vue'
const views = ['login', 'news']
const routes = views.map((v) => {
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
  ],
})

export default router
