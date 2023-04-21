import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/DashboardPage.vue'),
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import('../views/SetupPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active-exact',
})

export default router
