import layout from '@/layout'
export default [
    {
        path: '/mall',
        name: 'mall',
        component: layout,
        icon: 'el-icon-s-shop',
        meta: { title: '商城管理', ptitle: '' },
        children: [
            // 文章
            {
                path: 'goods',
                name: 'goods',
                component:() => import('@/views/mall/goods/index.vue'),
                meta: { title: '文章管理', ptitle: '商城管理' },
            },
            {
                path: 'add&edit',
                name: 'goods_add&edit',
                component:() => import('@/views/mall/goods/add&edit.vue'),
                meta: { title: '添加/编辑 文章', ptitle: '商城管理' },
                show: 0
            },
            // 文章类别
            {
                path: 'category',
                name: 'category',
                component:() => import('@/views/mall/category/index.vue'),
                meta: { title: '文章类别管理', ptitle: '商城管理' },
            },
            {
                path: 'category_add&edit',
                name: 'category_add&edit',
                component:() => import('@/views/mall/category/add&edit.vue'),
                meta: { title: '添加/编辑 文章类别', ptitle: '商城管理' },
                show: 0
            },
        ]
    },
]