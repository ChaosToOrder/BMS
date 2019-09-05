<template>
    <el-header>
        <div class="logo" style="float:left;">
            <img :src="''" alt="">
            <span>{{ $store.state.appName }}</span>
        </div>
        <div class="head" style="float:right;">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link" style="cursor:pointer">
                    {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="changePassworde">修改密码</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
</template>
<script>
export default {
    name:'headerNav',
    data(){
        return{
            user: {
                username: "深君"
            }
        }
    },
    computed:{
    },
    methods:{
        handleCommand(command){
            switch (command) {
                case 'changePassworde':
                    t
                    break;
            
                case 'logout':
                    this.logout()
                    break;
            }
        },
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style lang="less" scoped>
.el-header{
    background-color: #409EFF;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px !important;
}
.el-dropdown{
    color: #fff;
}
.logo{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img{
        margin-right: 10px;
        width: 40px;
        height: 40px;
    }
}
</style>


