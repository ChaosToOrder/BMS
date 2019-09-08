<template>
  <div>
    <div class="container" :class="box.position">
      <div class="box">
        <!-- <header>{{ $store.state.loginPageName }}</header> -->
        <!-- <div class="divider"></div> -->
        
        <div class="form">
          <img src="../../assets/images/element2.svg" alt="">
          <div class="divider"></div>
          <el-form
            :model="form"
            ref="ruleForm"
            :rules="rules"
            label-width="auto"
            :hide-required-asterisk="true"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model.trim="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model.trim="form.password"
                @keyup.enter.native="submitForm('ruleForm')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
              <el-button>忘记密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rules from "@/elementUI/rules/user.js";
import { Promise } from "q";
import { setTimeout } from 'timers';
export default {
  name: "login",
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules,
      box: {
        position: 'center'
      },
      loading: false
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      // 验证 正确回调 错误回调
      this.validate(formName)
        .then(() => {
          this.loading = true
          this.$store.dispatch('login', this.form)
          .then((res) => {
            setTimeout(() => {
              this.loading = false
              this.$router.push({ name: 'home' })
            }, 400)
          })
          .catch((res) => {
            
          })
        })
        .catch(() => {
          this.$message.error("请输入正确格式");
        });
    },
    // 验证
    validate(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #b4cee9;
  display: flex;
  align-items: center;
  

  .box {
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
      padding: 2.5rem 1.25rem;
      margin: auto;
      width: 50%;
      text-align: center;
    }
  }
}

.right {
  justify-content: flex-end;
}

.center {
  justify-content: center;
}

.left {
  justify-content: flex-start;
}

// 分割线
.divider {
  height: 3.125rem;
}
</style>
