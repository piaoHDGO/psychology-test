/**
 * 管理后台权限验证
 */

import router from './index.js'

// 白名单路由
const whiteList = ['/admin/login']

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAdminRoute = to.path.startsWith('/admin')

  if (!isAdminRoute) {
    next()
    return
  }

  // 登录页直接通过
  if (to.path === '/admin/login') {
    next()
    return
  }

  // 检查登录状态
  const token = localStorage.getItem('admin_token')

  if (!token) {
    // 未登录，跳转到登录页
    next('/admin/login')
    return
  }

  // 已登录，继续
  next()
})

export default router
