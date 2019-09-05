// 引入 element-ui 消息框
import {Message} from 'element-ui'

//导入进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//白名单（不用登录）
const whiteList = ['login']

// 引入user的api接口
// import api from '@/api/modules/user'

export default function (router) {
    router.beforeEach((to, from, next) => {
        NProgress.start()
        if (whiteList.includes(to.name)) { // 白名单
            next()
        } else { 
            next()
        }
        
    })

    router.afterEach(() => {
        NProgress.done()
    })
}