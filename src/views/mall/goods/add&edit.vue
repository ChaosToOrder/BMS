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

            <!-- 商品名 -->
            <el-form-item label="商品名" prop="goods_name">
              <el-input v-model="form.goods_name" placeholder="商品名"></el-input>
            </el-form-item>

            <!-- 原价 -->
            <el-form-item label="原价" prop="original_price">
              <el-input type="number" v-model="form.original_price" placeholder="原价"></el-input>
            </el-form-item>

            <!-- 邮费 -->
            <el-form-item label="邮费" prop="postage">
              <el-input type="number" :min="0" v-model="form.postage" placeholder="邮费"></el-input>
            </el-form-item>

            <!-- 商品类别 -->
            <el-form-item label="商品类别" prop="category_id">
              <el-select v-model="form.category_id" placeholder="商品类别">
                <el-option
                  v-for="item in categorySelection"
                  :key="item.goods_category_id"
                  :label="item.category_name"
                  :value="item.goods_category_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="area">
            <div class="title">图片上传</div>

            <!-- 上传封面 -->
            <el-form-item label="封面">
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
        <el-button type="button" @click="back">取消</el-button>
        <el-button v-if="!editPage" type="primary" @click="submitForm('form')">添加</el-button>
        <el-button v-else type="primary" @click="submitForm('form')">确定修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// import api from "@/api/modules/mall";
import api from "@/api/modules/mall";
import uploadApi from "@/api/modules/upload.js";
import rules from "@/elementUI/rules/mall/goods.js";
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
        goods_name: "",
        original_price: "",
        postage: "",
        category_id: null
      },
      /** 商品类型选择器 */
      categorySelection: [],
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
      return data && data.goods_id;
    }
  },
  methods: {
    /**
     * 表单初始化
     */
    init() {
      if (this.editPage) {
        let data = this.$route.params.data;
        this.form = data;
        //+ 封面
        let pic_url = data.pic_url;
        if (Array.isArray(pic_url)) {
          this.showList = JSON.parse(pic_url).map((val, index) => {
            return {
              url: val,
              index: index
            };
          });
        } else if (typeof pic_url == "string") {
          this.showList = [
            {
              url: pic_url,
              index: 0
            }
          ];
        }
      }

      // 商品类别列表
      this.getCategoryList().then(res => {
        if (res.data.code === 0) {
          this.categorySelection = res.data.data.list;
          let id = this.form.category_id;
          if (!id && id != "") {
            this.form.category_id = this.categorySelection[0].goods_category_id;
          }
        }
      });
    },
    /**
     * 获取 商品类别 列表
     */
    getCategoryList() {
      return api.getCategoryList({
        pageSize: 99999
      });
    },
    /**
     * 表单提交
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.editPage) {
            this.edit(formName); // 编辑
          } else {
            this.add(formName); // 添加
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
      // 封面图片
      let promises = this.fileList.map(val => {
        let formData = new FormData();
        formData.append("file", val);
        formData.append("type", "pic_url");
        return uploadApi.uploadPic(formData);
      });

      let allPromises = promises.concat([]); // 可在此增加要传输的文件列表

      Promise.all(allPromises).then(res => {
        let classifier = classification(res); // 将返回的图片地址 分类

        api
          .add_edit_goods({
            ...this[formName],
            ...classifier
          })
          .then(res => {
            if (res.data.code === 0) {
              setTimeout(() => {
                this.$router.push({
                  name: "goods"
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
        formData.append("type", "pic_url");
        return uploadApi.uploadPic(formData);
      });

      let allPromises = promises.concat([]); //+ 可在此增加要传输的文件列表

      Promise.all(allPromises).then(res => {
        let classifier = classification(res); // 将返回的图片地址 分类
        let list = this.showList.map(val => {
          return val.url;
        });

        //+ 头像
        if (classifier.pic_url) {
          classifier.pic_url = list.concat(classifier.pic_url);
        } else {
          classifier.pic_url = list;
        }

        api
          .add_edit_goods({
            ...this[formName],
            ...classifier
          })
          .then(res => {
            if (res.data.code === 0) {
              setTimeout(() => {
                this.$router.push({
                  name: "goods"
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

        deletList = unique(deletList);

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
      background: #409EFF;
    }
  }

  .el-form-item {
    margin-right: 50px;
  }
}
</style>
