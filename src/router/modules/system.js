import layout from '@/layout'
export default [
    {
      path: '/system',
      name: 'system',
      component: layout,
      icon: 'el-icon-setting',
      meta: { title: '系统管理', ptitle: '' },
      children: [
        {
          path: 'role',
          // component: layout,
          meta: { title: '角色管理', ptitle: '系统管理' },
        },
        {
          path: 'menu',
          // component: layout,
          meta: { title: '菜单管理', ptitle: '系统管理' },
        },
        {
          path: 'log',
          // component: layout,
          meta: { title: '系统日志', ptitle: '系统管理' },
        },
        {
          path: 'elasticJob',
          // component: () => import('@/views/system/elasticJob.vue'),
          // component: layout,
          meta: { title: '定时任务', ptitle: '系统管理' },
        },
      ]
    },
  ]