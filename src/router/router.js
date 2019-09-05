import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/admin/login.vue')
    }
  ]
})

/**
 * 路由拦截器
 */
import interceptors from './interceptors'
interceptors(router)

export default router


/**
 * 动态添加的路由
 * 用来和后端匹配
 */
import System from './modules/system'
import Users from './modules/users'
export const roleRouter = [
  ...[
    {
      path: '/',
      name: 'home',
      component: layout,
      icon: 'el-icon-s-home',
      meta: { title: '系统首页', ptitle: '' },
    },
  ],
  ...System,
  ...Users
]