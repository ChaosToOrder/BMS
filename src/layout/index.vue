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
          <el-scrollbar>
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
import { mapGetters } from 'vuex'
import api from '@/api/modules/user'
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
    api.authentication()
    .then(() => {
      this.authentication = true
    })
    .catch(() => {
      this.authentication = false
    })
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
.main {
  overflow: hidden;
  flex: 1;
  background-color: #f5f5f5;
  .main {
    margin: 10px;
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