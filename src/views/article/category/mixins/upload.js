import router from '@/router/router'
import { Message } from 'element-ui'
import uploadApi from "@/api/modules/upload.js";
/**
 * 文件上传
 */
let fileUpload = {
  data() {
    return {
      /** 上传配置 */
      ...{
        serverUrl:
          this.$store.state.uploadUrl + 'pic', // 服务器上传地址前缀 + 类型
        header: {
          // 设置上传的请求头部

        },
        data: {
          // 上传时附带的额外参数
        }
      },

      /** 文件1 */
      ...{
        showList: [], // 展示图片用的列表
        fileList: [], // 文件存放列表
        deletList: [] // 要删除的远程文件列表
      },

    };
  },
  methods: {
    /** 上传前钩子 */
    ...{
      beforeUpload(file) {

        // this.coverFileList.push({
        //   raw: file
        // })
        // return false
      }
    },
    /**
     * 自定义上传
     */
    http_request(f) {
      console.log(f)
      let file = f.file
      this.fileList.push(file)
    },
    /** 文件上传成功回调 */
    ...{
      /**
       * 封面图上传成功
       */
      coverFileListSuccess(response, file, fileList) {
        if (response.code === 0) {
          if (file.response && JSON.stringify(file.response.data) === "{}") {
            this.$message.error(file.response.msg);
            fileList = [];
          }
          this.coverFileList = fileList;
        } else if (response.code === -2) {
          if (response.msg) {
            setTimeout(() => {
              Message({
                message: response.msg,
                type: 'error'
              })
            }, 300)
            router.push({ name: 'login', replace: true })
          }
        }

      },
    },

    /** 文件上传错误 */
    uploadExceed() {
      this.$message({
        message: "图片数量超过限制",
        type: "error"
      });
    },

    /** 文件移除时 */
    coverFileListRemove(file, fileList) {
      // 是已经上传了的，就找展示列表， 将要删除的文件存放到待删除列表
      if (file.status == 'success') {
        this.deletList.push(file.url)
        

        this.showList = fileList.filter(val => {
          if (file.uid != val.uid) {
            return true
          }
        })
      } else {  // 不是，就找文件列表
        this.fileList = this.fileList.filter(val => {
          if (file.uid != val.uid) {
            return true
          }
        })
      }

    }

  }
}

export default fileUpload