<template>
  <div>
    <div :id="id" type="text/plain" class="qx-ue" v-loading="quillUpdateImg"></div>
    <!-- 图片上传组件辅助-->
    <el-upload
      class="avatar-uploader"
      :action="serverUrl"
      name="file"
      :data="data"
      multiple
      :headers="header"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload"
    ></el-upload>
  </div>
</template>
<script>
let config2 = {
  enterTag: "br",
  toolbars: [
    [
      "source",
      "|",
      "undo", //撤销
      "redo", //重做
      "|",
      "bold", //加粗
      "indent", //首行缩进
      "italic", //斜体
      "underline", //下划线
      "strikethrough", //删除线
      "subscript", //下标
      "fontborder", //字符边框
      "superscript", //上标
      "|",
      "formatmatch", //格式刷
      "blockquote", //引用
      "|",
      "selectall", //全选
      "horizontal", //分隔线
      "removeformat", //清除格式
      "time", //时间
      "date", //日期
      "unlink", //取消链接
      "|",
      "insertrow", //前插入行
      "insertcol", //前插入列
      "mergeright", //右合并单元格
      "mergedown", //下合并单元格
      "deleterow", //删除行
      "deletecol", //删除列
      "splittorows", //拆分成行
      "splittocols", //拆分成列
      "splittocells", //完全拆分单元格
      "deletecaption", //删除表格标题
      "inserttitle", //插入标题
      "mergecells", //合并多个单元格
      "deletetable", //删除表格
      "|",
      "cleardoc", //清空文档
      "insertparagraphbeforetable", //"表格前插入行"
      "insertcode", //代码语言
      "fontfamily", //字体
      "fontsize", //字号
      "paragraph", //段落格式
      "edittable", //表格属性
      "edittd", //单元格属性
      "|",
      "link", //超链接
      "emotion", //表情
      "spechars", //特殊字符
      "searchreplace", //查询替换
      "|",
      "justifyleft", //居左对齐
      "justifyright", //居右对齐
      "justifycenter", //居中对齐
      "justifyjustify", //两端对齐
      "|",
      "forecolor", //字体颜色
      "backcolor", //背景色
      "insertorderedlist", //有序列表
      "insertunorderedlist", //无序列表
      "|",
      "fullscreen", //全屏
      "directionalityltr", //从左向右输入
      "directionalityrtl", //从右向左输入
      "rowspacingtop", //段前距
      "rowspacingbottom", //段后距
      "|",
      "lineheight", //行间距
      "edittip ", //编辑提示
      "customstyle", //自定义标题
      "autotypeset", //自动排版
      "touppercase", //字母大写
      "tolowercase", //字母小写
      "background", //背景
      "template", //模板
      "scrawl", //涂鸦
      "inserttable", //插入表格
      "insertimage",
      "preview",
      "qxupload"
    ]
  ]
};
export default {
  name: "UE",
  data() {
    return {
      editor: null,
      /** 上传配置 */
      ...{
        serverUrl: this.$store.state.uploadUrl + "pic", // 服务器上传地址前缀 + 类型
        header: {
          // 设置上传的请求头部
        },
        data: {
          // 上传时附带的额外参数
        }
      },
      quillUpdateImg: false
    };
  },
  props: {
    defaultMsg: {
      type: String,
      default: "请输入内容"
    },
    config: {
      type: Object,
      default: function() {
        return config2;
      }
    },
    id: {
      type: String,
      default: function() {
        return `ue${Math.random(0, 100)}`;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.editor = new UE.ui.Editor(this.config);
      this.editor.render(this.id);
      this.editor.addListener("ready", () => {
        this.editor.setHeight(800);
        // this.editor.execCommand("insertHtml", this.defaultMsg);
        this.editor.setContent(this.defaultMsg);
        this.editor.focus(); // 确保UE加载完成后，放入内容。
        // this.editor.options.UPLOAD_FILE = this.GLOBAL.UPLOAD_FILE.ARTICLE
        // this.editor.options.VUE_APP_FILE_SERVER_URL = process.env.VUE_APP_FILE_SERVER_URL
        // UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;

        // UE.Editor.prototype.getActionUrl = function(action){
        //     if(action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadvideo' || action == 'catchimage'){
        //         return process.env.VUE_APP_BASE_URL + "file/file/service/UEUploadFile"
        //     }else{
        //         return this._bkGetActionUrl.call(this, action);
        //     }
        // }

        let edui219 = document.querySelector(".edui-for-insertimage");
        edui219.style.cssText = "display:none !important;";
      });
    });
  },
  methods: {
    getUEContent() {
      // 获取内容方法
      return this.editor.getContent();
    },
    clearContent() {
      // 清空编辑器内容
      return this.editor.execCommand("cleardoc");
    },
    beforeDestroy() {
      // 组件销毁的时候，要销毁 UEditor 实例
      if (this.editor !== null && this.editor.destroy) {
        this.editor.destroy();
      }
    },
    onEditorBlur(event) {
      //失去焦点事件
      console.log(event);
    },
    onEditorFocus(event) {
      //获得焦点事件
      console.log(event);
    },
    onEditorReady(event) {
      //准备就绪事件
      console.log(event);
    },
    onEditorChange(event) {
      console.log("dddd");
      //内容改变事件
      this.$emit("input", this.content);
    },
    uploadSuccess(res) {
      // res为图片服务器返回的数据
      // 如果上传成功
      if (res.code === 0) {
        this.editor.focus();
        this.editor.execCommand(
          "inserthtml",
          `<img src="${res.data.pic_url}"/>`
        );
        // this.editor.setContent('<img src="'+ process.env.VUE_APP_FILE_SERVER_URL + res.data.url + '"/>',true)
        // 获取光标所在位置
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
    }
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>
<style scoped>
.avatar-uploader {
  display: none;
}
</style>