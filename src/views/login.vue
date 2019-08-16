<template>
  <div>
    <div class="container">
      <div class="center_box">
        <header>个人博客内容管理系统</header>
        <div class="divider"></div>
        <div class="form">
          <el-form :model="form" ref="ruleForm" :rules="form.rules" label-width="auto" hide-required-asterisk="true">
            <el-form-item label="账号" prop="logName">
              <el-input v-model.trim="form.logName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="logPwd">
              <el-input type="password" v-model.trim="form.logPwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button>忘记密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rules from "@/elementUI/rules.js"
export default {
  name: "login",
  data() {
    return {
      form: {
        userID: "",
        logPwd: "",
        rules
      }
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      // 验证 正确回调 错误回调
      this.validate(formName, 
      () => {
        this.axios.get('/getData/hello', (res) => {
          console.log("res",res)
        })
      }, 
      () => {
        alert("错误")
      })
    },
    // 验证
    validate(formName, callback, fail_callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          callback()
        } else {
          fail_callback()
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;

  .center_box {
    width: auto;
    height: auto;
    min-width: 30rem;
    header {
      font-size: 3rem;
      font-weight: 400;
      color: rgb(255, 255, 255);
    }
    .form {
      background: rgba(255, 255, 255, 0.6);
      padding:2.5rem 1.25rem ;
      margin: auto;
      width: 50%;
    }
  }
}

// 分割线
.divider {
  height: 3.125rem;
}
</style>
