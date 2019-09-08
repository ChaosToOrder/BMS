import request from '../request'
const baseUrl = '/upload/'

export default{
    /**
     * 上传图片
     */
    uploadPic(formData) {
        return request({
            url:`${baseUrl}pic`,
            method:'post',
            data:formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    /**
     * 删除
     */
    deletePic(data) {
        return request({
            url:`${baseUrl}pic/delete`,
            method:'post',
            data:data,
        })
    },
}