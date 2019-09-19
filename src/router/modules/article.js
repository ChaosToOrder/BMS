import layout from '@/layout'
export default [
    {
        path: '/article',
        name: 'article',
        component: layout,
        icon: 'el-icon-s-shop',
        meta: { title: '软文管理', ptitle: '' },
        children: [
            // 文章
            {
                path: 'article',
                name: 'article',
                component:() => import('@/views/article/article/index.vue'),
                meta: { title: '文章管理', ptitle: '软文管理' },
            },
            {
                path: 'add&edit',
                name: 'article_add&edit',
                component:() => import('@/views/article/article/add&edit.vue'),
                meta: { title: '添加/编辑 文章', ptitle: '软文管理' },
                show: 0
            },
            // 文章类别
            {
                path: 'category',
                name: 'category',
                component:() => import('@/views/article/category/index.vue'),
                meta: { title: '文章类型管理', ptitle: '软文管理' },
            },
            {
                path: 'add&edit',
                name: 'category_add&edit',
                component:() => import('@/views/article/category/add&edit.vue'),
                meta: { title: '添加/编辑 文章类型', ptitle: '软文管理' },
                show: 0
            },
        ]
    },
]