import request from '../request'
const baseUrl = '/user/'

export default{
    /**
     * 管理员登录
     */
    login(data){
        return request({
            url:`${baseUrl}login`,
            method:'post',
            data:data
        })
    },
    /**
     * 管理员注销
     */
    logout(data){
        return request({
            url:`${baseUrl}logout`,
            method:'post',
            data:data
        })
    },
    /**
     * 身份验证
     */
    authentication(){
        return request({
            url:`${baseUrl}authentication`,
            method:'get',
        })
    },
}