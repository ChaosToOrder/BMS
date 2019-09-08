<template>
  <div v-loading="loading">
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <!--  -->
      <el-row>
        <!-- 第一栏 基本信息 -->
        <el-col :span="8">
          <div class="area">
            <div class="title">基本信息</div>

            <!-- 管理员名 -->
            <el-form-item label="管理员名" prop="username">
              <el-input v-model="form.username" placeholder="管理员名"></el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
            </el-form-item>

            <!-- 性别 -->
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 状态 -->
            <el-form-item label="状态" prop="sex">
              <el-radio-group v-model="form.state_flag">
                <el-radio label="0">正常</el-radio>
                <el-radio label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="area">
            <div class="title">头像上传</div>

            <!-- 上传封面 -->
            <el-form-item label="头像">
              <el-upload
                :action="serverUrl"
                list-type="picture-card"
                name="file"
                :limit="1"
                :data="data"
                :file-list="showList"
                :headers="header"
                :on-success="coverFileListSuccess"
                :on-exceed="uploadExceed"
                :on-remove="coverFileListRemove"
                :before-upload="beforeUpload"
                :http-request="http_request"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <!-- 顶部操作区域 -->
    <div class="top-area">
      <!-- 按钮组 -->
      <div class="btn-group">
        <el-button type="primary" icon="el-icon-back" @click="back">返回</el-button>
      </div>
    </div>

    <!-- 底部操作区域 -->
    <div class="bottom-area">
      <div></div>
      <!-- 按钮组 -->
      <div class="btn-group" style="margin-right: 20px;">
        <el-button v-if="!editPage" type="primary" @click="submitForm('form')">添加</el-button>
        <el-button v-else type="primary" @click="submitForm('form')">确定修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// import api from "@/api/modules/mall";
import api from "@/api/modules/user";
import uploadApi from "@/api/modules/upload.js";
import rules from "@/elementUI/rules/user.js";
import upload from "./mixins/upload";
import { Form } from "element-ui";
import { Promise } from "q";

// 分类器
function classification(res) {
  let picList = res.map(val => {
    let data = val.data.data;
    return data;
  });

  let classifier = {};
  picList.forEach(val => {
    classifier[val.type] = null;
  });

  for (let key in classifier) {
    let list = picList
      .filter(val => {
        if (val.type == key) {
          return true;
        }
      })
      .map(val => {
        return val.pic_url;
      });

    classifier[key] = list;
  }

  return classifier;
}

export default {
  inject: ["reload"],
  mixins: [upload],
  data() {
    return {
      loading: false, // 组件加载用
      /** 表单 */
      form: {
        username: "",
        password: "",
        sex: 1,
        state_flag: '0'
      },
      rules
    };
  },
  created() {
    this.init();
  },
  computed: {
    // 页面为编辑页面
    editPage() {
      let data = this.$route.params.data;
      return data && data.user_id;
    }
  },
  methods: {
    /**
     * 表单初始化
     */
    init() {
      let data = this.$route.params.data;

      if (this.editPage) {
        this.form = data;
        this.showList = JSON.parse(data.hp).map((val, index) => {
          return {
            url: val,
            index: index
          };
        });
      }
    },
    /**
     * 表单提交
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.editPage) {
            this.edit(formName); // 编辑管理员
          } else {
            this.add(formName); // 添加管理员
          }
        } else {
          return false;
        }
      });
    },
    /**
     * 添加
     */
    add(formName) {
      // 头像图片
      let promises = this.fileList.map(val => {
        let formData = new FormData();
        formData.append("file", val);
        formData.append("type", "hp");
        return uploadApi.uploadPic(formData);
      });

      let allPromises = promises.concat([]); // 可在此增加要传输的文件列表

      Promise.all(allPromises).then(res => {
        let classifier = classification(res); // 将返回的图片地址 分类

        api
          .add_edit_user({
            ...this[formName],
            ...classifier
          })
          .then(res => {
            if (res.data.code === 0) {
              setTimeout(() => {
                this.$router.push({
                  name: "admin"
                });
              }, 300);
            }
          });
      });
    },
    /**
     * 编辑
     */
    edit(formName) {
      /** 上传图片 + 修改 */
      // 头像图片
      let promises = this.fileList.map(val => {
        let formData = new FormData();
        formData.append("file", val);
        formData.append("type", "hp");
        return uploadApi.uploadPic(formData);
      });

      let allPromises = promises.concat([]); // 可在此增加要传输的文件列表

      Promise.all(allPromises).then(res => {
        let classifier = classification(res); // 将返回的图片地址 分类
        let list = this.showList.map(val => {
          return val.url;
        });

        // 头像
        if (classifier.hp) {
          classifier.hp = list.concat(classifier.hp);
        } else {
          classifier.hp = list;
        }

        api
          .add_edit_user({
            ...this[formName],
            ...classifier
          })
          .then(res => {
            if (res.data.code === 0) {
              setTimeout(() => {
                this.$router.push({
                  name: "admin"
                });
              }, 300);
            }
          });
      });

      /** 删除图片 */
      let deletList = this.deletList.concat([]); // 可在此增加要删除的远程文件列表

      if (deletList.length > 0) {
        function unique(arr) {
          return Array.from(new Set(arr));
        }

        deletList = unique(deletList)

        let promises = deletList.map(val => {
          return uploadApi.deletePic({
            pic_url: val
          });
        });

        
      }
    },
    /**
     * 返回
     */
    back() {
      this.$router.back(-1);
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
/* 对话框样式 */
/deep/.el-dialog {
  width: 70%;
  max-height: 90%;
  top: 5%;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  .el-dialog__body {
    flex: 1;
    overflow-y: scroll;
  }
}

.filter {
  margin-top: 25px;
}
</style>

<style lang="less" scoped>
/* 区域划分用 */
.area {
  padding: 10px;
  & > .title {
    padding-left: 10px;
    margin-bottom: 18px;
    position: relative;
    &:before {
      content: "";
      width: 4px;
      height: 80%;
      position: absolute;
      left: 0;
      top: 10%;
      background: #409eff;
    }
  }

  .el-form-item {
    margin-right: 50px;
  }
}
</style>
