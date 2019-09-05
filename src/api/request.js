import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/store'
import router from '@/router/router'
import NProgress from 'nprogress'
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_URL,
    headers:{
        'Content-Type':'application/json'
    }
})
// 请求拦截器
service.interceptors.request.use(
    //配置
    config => {
        // config.headers.Authentication = process.env.VUE_APP_AUTHENTICATION;
        // config.headers.token = store.getters.token ? store.getters.token : sessionStorage.getItem('token');
        return config;
    },
    error => {
        //报错
        return Promise.reject(error);
    }
);
// 响应拦截器
service.interceptors.response.use(
    res => {

        if (res.status == 200) {
            if (res.data.code === 0) {
                if (res.data.msg) {
                    Message({
                        message: res.data.msg,
                        type: 'success'
                    });
                }
                //请求成功
                return Promise.resolve(res);
            } else if (res.data.code === 403 || res.data.code === 501 || res.data.code === 502) {
                Message({
                    message: res.data.msg,
                    type: 'error'
                });
                router.push({ path: '/index', replace: true })
                return Promise.reject(res);
            } else if (res.data.code === -2) {
                if (res.data.msg) {
                    Message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
                router.push({ name: 'login', replace: true })
                return Promise.reject(res);
            } else {
                if (res.data.msg) {
                    Message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
                NProgress.done()
                return Promise.reject(res);
            }

        } else {
            //报错
            Message({
                message: '出错啦~',
                type: 'error'
            });
            NProgress.done()
            return Promise.reject(err);
        }

    },
    error => {
        //报错
        Message({
            message: '出错啦~',
            type: 'error'
        });
        NProgress.done()
        return Promise.reject(error);
    }
);
export default service