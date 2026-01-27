import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useLoading } from '@/composables/useLoading'

const routes: RouteRecordRaw[] = [
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const { startLoading, stopLoading } = useLoading()

router.beforeEach((to, from, next) => {
  startLoading()
  next()
})

router.afterEach(() => {
  stopLoading(2000) 
})

export default router
