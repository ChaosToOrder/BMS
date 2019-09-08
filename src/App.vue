<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { roleRouter } from "@/router/router"; // 引入要动态添加的路由
import Vue from "vue";
export default {
  data() {
    return {
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  },
  created() {
    this.$router.addRoutes(roleRouter);
    this.$store.commit("SET_MenuList", roleRouter);

    Vue.prototype.$reload = this.reload;
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
* {
  padding: 0;
  margin: 0;
}
</style>

<!-- 列表页模板 -->
<style lang="scss">
// #409EFF
.list-page {
  // 按钮组
  .btn-group {
    // padding: 5px 0
    // 提示信息
    .msg {
      color: rgb(96, 98, 102);
      display: inline-block;
      margin-right: 20px;
    }
  }

  // 列表
  .table-list {
    // margin-top: 10px;
    // .el-table tbody tr {
    //   transition: 0s !important;
    // }
    // .el-table tbody tr:hover > td {
    //   background-color: #409EFF !important;
    //   color: #fff;
    // }
  }

  // 分页器
  .page {
    text-align: left;
  }
}
</style>

<style lang="less">
/* 顶部操作区域 */
.top-area {
  position: absolute;
  top: -10px;
  right: 0;
  line-height: 2.5rem;
  background: white;
  width: 100%;
  // border: #409EFF 1px solid;
  border: rgb(204, 221, 247) 1px solid;
  margin: 10px;
  z-index: 999;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  // 按钮组
  .btn-group {
    margin-left: 40px;
  }
}
</style>

<style lang="less">
/* 底部操作区域 */
.bottom-area {
  position: absolute;
  bottom: -10px;
  right: 0;
  line-height: 2.5rem;
  background: white;
  width: 100%;
  border: rgb(204, 221, 247) 1px solid;
  margin: 10px;
  z-index: 999;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  // 按钮组
  .btn-group {
    margin-right: 20px;
  }
  // 分页器
  .pagination {
    margin-left: 40px;
    padding: 5px 0;
    .el-pagination {
      display: flex;
      align-items: center;
      .el-pager {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>


<style lang="scss">
/* elemntUI 样式修改 */
#app {
}
</style>

