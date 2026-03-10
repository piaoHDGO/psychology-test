import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/test/:code',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  },
  {
    path: '/result/:id',
    name: 'Result',
    component: () => import('@/views/Result.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue')
  },
  // 管理后台登录页
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/AdminLogin.vue')
  },
  // 管理后台（需要登录）
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/AdminDashboard.vue')
      },
      {
        path: 'quizzes',
        name: 'QuizzesManage',
        component: () => import('@/views/admin/QuizzesManage.vue')
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('@/views/admin/AdminSettings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAdminRoute = to.path.startsWith('/admin')

  if (!isAdminRoute) {
    next()
    return
  }

  // 登录页处理
  if (to.path === '/admin/login') {
    const token = localStorage.getItem('admin_token')
    // 如果已登录，跳转到后台
    if (token) {
      next('/admin')
      return
    }
    next()
    return
  }

  // 检查是否需要登录
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('admin_token')

    if (!token) {
      next('/admin/login')
      return
    }
  }

  next()
})

export default router
