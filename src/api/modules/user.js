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
    /**
     * 获取管理员列表
     */
    getUsersList(data) {
        return request({
            url:`${baseUrl}usersList/page`,
            method:'get',
            params:data
        })
    },
    /**
     * 根据ID删除管理员
     */
    delUserById(user_id) {
        return request({
            url:`${baseUrl}delete`,
            method:'post',
            data:{
                user_id: user_id
            }
        })
    },
    /**
     * 批量删除管理员
     */
    delUserMultiple(data) {
        return request({
            url:`${baseUrl}delete/multiple`,
            method:'post',
            data:data
        })
    },
    /**
     * 添加\编辑 管理员
     */
    add_edit_user(data) {
        return request({
            url:`${baseUrl}add&edit`,
            method:'post',
            data:data
        })
    },
}