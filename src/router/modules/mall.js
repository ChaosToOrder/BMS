import layout from '@/layout'
export default [
    {
        path: '/mall',
        name: 'mall',
        component: layout,
        icon: 'el-icon-s-shop',
        meta: { title: '商城管理', ptitle: '' },
        children: [
            // 商品
            {
                path: 'goods',
                name: 'goods',
                component:() => import('@/views/mall/goods/index.vue'),
                meta: { title: '商品管理', ptitle: '商城管理' },
            },
            {
                path: 'add&edit',
                name: 'goods_add&edit',
                component:() => import('@/views/mall/goods/add&edit.vue'),
                meta: { title: '添加/编辑 商品', ptitle: '商城管理' },
                show: 0
            },
            // 商品类别
            {
                path: 'category',
                name: 'category',
                component:() => import('@/views/mall/category/index.vue'),
                meta: { title: '商品类别管理', ptitle: '商城管理' },
            },
            {
                path: 'category_add&edit',
                name: 'category_add&edit',
                component:() => import('@/views/mall/category/add&edit.vue'),
                meta: { title: '添加/编辑 商品类别', ptitle: '商城管理' },
                show: 0
            },
        ]
    },
]