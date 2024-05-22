import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/SingleRepo/:id',
      name: 'SingleRepo',
      component: () => import('../views/SingleRepo.vue'),
      props: true
    }
  ]
})

export default router
