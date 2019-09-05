<template>
  <el-scrollbar>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="collapse"
      unique-opened
      :default-active="$route.path"
      theme="dark"
    >
      <template v-for="(item,index) in $store.state.menuList">
        <el-submenu
          v-if="item.children && item.name !== 'home'"
          :index="item.path"
          :key="index"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>

          <template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(item2,index2) in item.children"
                :index=" item.path === '/'  ? `/${item2.path}` : `${item.path}/${item2.path}`"
                :key="`${index}-${index2}`"
                @click="jump(item.path,item2.path)"
                v-if="JSON.stringify(item2.meta).indexOf('isShow') == -1 || item2.meta.isShow"
              >{{item2.meta.title}}</el-menu-item>
            </el-menu-item-group>
          </template>
        </el-submenu>

        <el-menu-item
          v-else-if="item.name === 'home'"
          :index=" '/home' "
          :key="index"
          @click="jump('/home','')"
        >
          <i :class="item.icon"></i>
          <span>{{item.meta.title}}</span>
        </el-menu-item>

        <el-menu-item v-else :index="item.path" :key="index" @click="jump(item.path,'')">
          <i :class="item.icon"></i>
          <span>{{item.meta.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>
<script>
export default {
  name: "leftMenu",
  data() {
    return {
      collapse: false,
    };
  },
  computed: {},
  created() {},
  methods: {
    jump(pUrl, cUrl) {
      if (pUrl === "/") {
        this.$router.push({
          path: "/" + cUrl
        });
      } else {
        this.$router.push({
          path: pUrl + "/" + cUrl
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-menu {
  text-align: left;
}
</style>


