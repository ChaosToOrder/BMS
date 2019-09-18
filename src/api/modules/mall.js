import request from '../request'
const baseUrl = '/article/'

export default{
    /** --- 商品 --- */
    /**
     * 获取商品列表
     */
    getGoodsList(data) {
        return request({
            url:`${baseUrl}/article/list/page`,
            method:'post',
            data:data
        })
    },
    /**
     * 根据ID删除商品
     */
    delArticleById(article_id) {
        return request({
            url:`${baseUrl}article/delete`,
            method:'post',
            data:{
                article_id: article_id
            }
        })
    },
    /**
     * 批量删除商品
     */
    delArticleMultiple(data) {
        return request({
            url:`${baseUrl}article/delete/multiple`,
            method:'post',
            data:data
        })
    },
    /**
     * 添加\编辑 商品
     */
    add_edit_goods(data) {
        return request({
            url:`${baseUrl}article/add&edit`,
            method:'post',
            data:data
        })
    },
    /** --- 商品类别 --- */
    /**
     * 获取 商品类别 列表
     */
    getCategoryList(data) {
        return request({
            url:`${baseUrl}type/list/page`,
            method:'get',
            params:data
        })
    },
    /**
     * 根据ID删除 商品类别
     */
    delCategoryById(goods_category_id) {
        return request({
            url:`${baseUrl}type/delete`,
            method:'post',
            data:{
                goods_category_id: goods_category_id
            }
        })
    },
    /**
     * 批量删除 商品类别
     */
    delCategoryMultiple(data) {
        return request({
            url:`${baseUrl}type/delete/multiple`,
            method:'post',
            data:data
        })
    },
    /**
     * 添加\编辑 商品类别
     */
    add_edit_category(data) {
        return request({
            url:`${baseUrl}type/add&edit`,
            method:'post',
            data:data
        })
    },
}