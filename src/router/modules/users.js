import layout from '@/layout'
export default [
    {
      path: '/users',
      name: 'users',
      component: layout,
      icon: 'el-icon-user-solid',
      meta: { title: '用户管理', ptitle: '' },
      children:[
        {
            path:'admin',
            // component:() => import('@/views/users/admin.vue'),
            meta:{title:'管理员管理',ptitle:'用户管理'},
        },
        {
            path:'member',
            // component:() => import('@/views/users/member.vue'),
            meta:{title:'APP用户管理',ptitle:'用户管理'},
        },
        {
            path:'address',
            // component:() => import('@/views/users/address.vue'),
            meta:{title:'用户地址管理',ptitle:'用户管理'},
        },
        {
            path:'identityVerification',
            // component:() => import('@/views/users/identityVerification.vue'),
            meta:{title:'实名认证管理',ptitle:'用户管理'},
        },
        {
            path:'broadcast',
            // component:() => import('@/views/users/broadcast.vue'),
            meta:{title:'广播管理',ptitle:'用户管理'},
        },
    ]
    },
  ]