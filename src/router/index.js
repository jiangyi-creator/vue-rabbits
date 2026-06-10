// createRouter:创建router实例对象
// createWebHistory:创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path 和 component 的对应关系
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: 'category/:id',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: 'category/sub/:id',
          component: () => import('@/views/SubCategory/index.vue')
        },
        {
          path: 'detail/:id',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: 'cartlist',
          component: () => import('@/views/CartList/index.vue')
        },
        {
          path: 'checkout',
          meta: { requiresAuth: true },
          component: () => import('@/views/Checkout/index.vue')
        },
        {
          path: 'pay',
          meta: { requiresAuth: true },
          component: () => import('@/views/Pay/index.vue')
        },
        {
          path: 'paycallback',
          meta: { requiresAuth: true },
          component: () => import('@/views/Pay/PayBack.vue')
        },
        {
          path: 'member',
          meta: { requiresAuth: true },
          component: () => import('@/views/Member/index.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/Member/components/UserInfo.vue')
            },
            {
              path: 'order',
              component: () => import('@/views/Member/components/UserOrder.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ],
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

// 路由守卫：在跳转页面前检查登录状态
router.beforeEach((to, _from) => {
  const userStore = useUserStore()

  // 1. 访问需要登录的页面，但没登录 → 跳转登录页
  if (to.meta.requiresAuth && !userStore.userInfo.token) {
    return '/login'
  }

  // 2. 已登录用户访问登录页 → 跳转首页
  if (to.path === '/login' && userStore.userInfo.token) {
    return '/'
  }

  // 3. 其他情况一律放行
  return true
})

export default router
