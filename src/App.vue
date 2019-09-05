<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import {roleRouter} from '@/router/router' // 引入要动态添加的路由
export default {
  data() {
    return {
      isRouterAlive: true
    }
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
      })
    }
  },
  created() {
    this.$router.addRoutes(roleRouter)
    this.$store.commit('SET_MenuList',roleRouter)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  margin: 0
}
</style>
