
import api from "@/api/modules/user.js";
import router from '@/router/router'
import { reject } from "q";
export default {
    state: {
        loginPageName: '个人博客内容管理系统',
        appName: '后台管理系统',
        menuList: [],
        ptitle: '',
        title: ''
    },
    getters: {

    },
    mutations: {
        SET_MenuList: (state, data) => {
            state.menuList = data
        },
        SET_Ptitle: (state, data) => {
            state.ptitle = data
        },
        SET_Title: (state, data) => {
            state.title = data
        }
    },
    actions: {
        /**
         * 登陆
         */
        login(context, data) {
            return new Promise((reslove, reject) => {
                api
                .login(data)
                .then(res => {
                    reslove(res)
                })
                .catch(res => {
                    reject(res)
                })
            })
        },
        /**
         * 注销
         */
        logout(context, data) {
            return new Promise((reslove, reject) => {
                api
                .logout(data)
                .then(res => {
                    reslove(res)
                })
                .catch(res => {
                    reject(res)
                })
            })
        },

    }
}