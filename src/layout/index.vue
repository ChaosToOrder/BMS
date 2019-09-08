<template>
  <el-container id="GeneralContainer" v-if="authentication">
    <headerNav></headerNav>
    <el-container>
      <el-aside width="200px">
        <leftMenu></leftMenu>
      </el-aside>
      <!-- style="height:calc(100vh - 60px);" -->
      <el-container>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$store.state.ptitle !== '' ">{{$store.state.ptitle}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$store.state.title !== '' ">{{$store.state.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
          <el-scrollbar ref="elscrollbar">
            <div class="main" :class="`${isHome ? '' : 'bg'}`">
              <transition name="move" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </el-scrollbar>
        </div>
        <el-footer>COPYRIGHT &copy; 后台管理系统</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import headerNav from "./headerNav";
import leftMenu from "./leftMenu";
import { mapGetters } from "vuex";
import api from "@/api/modules/user";
import Vue from "vue";
export default {
  inject: ["reload"],
  data() {
    return {
      isHome: false,
      authentication: false
    };
  },
  methods: {},
  created() {
    this.To_verify_identity(); // 验证身份
    
    /** 全局方法 */
    Vue.prototype.$To_verify_identity = this.To_verify_identity
    Vue.prototype.$scrollToTop = this.scrollToTop
    Vue.prototype.$scrollToBottom = this.scrollToBottom
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.path === "/home/" || to.path === "/home" || to.path === "/") {
        vm.isHome = true;
      } else {
        vm.isHome = false;
      }
      vm.$store.commit("SET_Ptitle", to.meta.ptitle || "");
      vm.$store.commit("SET_Title", to.meta.title || "");
    });
  },
  watch: {
    $route(to, from) {
      this.$store.commit("SET_Ptitle", to.meta.ptitle || "");
      this.$store.commit("SET_Title", to.meta.title || "");
    }
  },
  methods: {
    // 验证身份
    To_verify_identity() {
      api
        .authentication()
        .then(() => {
          this.authentication = true;
        })
        .catch(() => {
          this.authentication = false;
        });
    },
    // 内容区的滚动条到顶部
    scrollToTop() {
      let div = this.$refs["elscrollbar"].$refs["wrap"];
      this.$nextTick(() => {
        div.scrollTop = 0;
      });
    },
    // 内容区的滚动条到底部
    scrollToBottom() {
      let div = this.$refs["elscrollbar"].$refs["wrap"];
      this.$nextTick(() => {
        div.scrollTop = div.scrollHeight;
      });
    }
  },
  components: { headerNav, leftMenu }
};
</script>

<style lang="scss" >
#GeneralContainer {
  height: 100vh;
  flex-flow: column;
}
.el-footer {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 35px;
  height: 35px !important;
  font-size: 14px;
}

.el-aside {
  overflow: hidden !important;
}
// 内容区
.main {
  overflow: hidden;
  flex: 1;
  background-color: #f5f5f5;
  .main {
    border-top: 1px solid rgba(0,0,0,0);
    margin: 50px 10px 50px 10px;
    box-sizing: border-box;
    &.bg {
      padding: 10px;
      background-color: #fff;
    }
  }
}

.el-main {
  color: #333;
  padding: 15px;
  & > div {
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
  }
}
.el-container {
  overflow: hidden;
}
.el-breadcrumb {
  background-color: #fff;
  padding: 18px;
}
.el-scrollbar {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>