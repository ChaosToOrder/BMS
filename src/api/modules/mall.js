import request from '../request'
const baseUrl = '/mall/'

export default{
    /** --- 商品 --- */
    /**
     * 获取商品列表
     */
    getGoodsList(data) {
        return request({
            url:`${baseUrl}goods/list/page`,
            method:'post',
            data:data
        })
    },
    /**
     * 根据ID删除商品
     */
    delGoodsById(goods_id) {
        return request({
            url:`${baseUrl}goods/delete`,
            method:'post',
            data:{
                goods_id: goods_id
            }
        })
    },
    /**
     * 批量删除商品
     */
    delGoodsMultiple(data) {
        return request({
            url:`${baseUrl}goods/delete/multiple`,
            method:'post',
            data:data
        })
    },
    /**
     * 添加\编辑 商品
     */
    add_edit_goods(data) {
        return request({
            url:`${baseUrl}goods/add&edit`,
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
            url:`${baseUrl}category/list/page`,
            method:'get',
            params:data
        })
    },
    /**
     * 根据ID删除 商品类别
     */
    delCategoryById(goods_category_id) {
        return request({
            url:`${baseUrl}category/delete`,
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
            url:`${baseUrl}category/delete/multiple`,
            method:'post',
            data:data
        })
    },
    /**
     * 添加\编辑 商品类别
     */
    add_edit_category(data) {
        return request({
            url:`${baseUrl}category/add&edit`,
            method:'post',
            data:data
        })
    },
}