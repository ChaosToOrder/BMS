<template>
  <div class="list-page">
    <!-- 顶部操作区域 -->
    <div class="top-area">
      <!-- 按钮组 -->
      <div class="btn-group">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="$router.push({path:'/users/add&edit'})"
        >新增管理员</el-button>
      </div>
      <!-- 按钮组 -->
      <div class="btn-group" style>
        <el-button type="primary" icon="el-icon-search" @click="show_filter_dialog">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
        <el-button
          :type="isChecking? '': 'primary'"
          icon="el-icon-delete"
          @click="check_toggle"
        >批量删除</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="table-list" v-loading="loading">
      <el-table
        :data="list"
        border
        style="width: 100%;"
        row-key="user_id"
        @selection-change="handleSelectionChange"
        row-class-name="column"
      >
        <!-- ID -->
        <el-table-column prop="user_id" label="ID" width="50"></el-table-column>
        <!-- 用户名称 -->
        <el-table-column prop="username" label="管理员名"></el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像" width="80">
          <template slot-scope="scope" >
            <img
              :src="item"
              style="margin-right:10px"
              width="50"
              height="50"
              alt
              v-if="JSON.parse(scope.row.hp).length > 0"
              v-for="(item,index) in JSON.parse(scope.row.hp)"
            />
          </template>
        </el-table-column>
        <!-- 性别 -->
        <el-table-column label="性别" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column prop="state_flag" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state_flag == 0">正常</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <!-- 注册时间 -->
        <el-table-column prop="register_time" label="注册时间"></el-table-column>
        <!-- 操作栏 -->
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="del(scope.row)"
              v-show="isChecking == false"
            >删除</el-button>
          </template>
        </el-table-column>
        <!-- 选框 -->
        <el-table-column fixed="right" type="selection" width="55" v-if="isChecking"></el-table-column>
      </el-table>
    </div>

    <!-- 底部操作区域 -->
    <div class="bottom-area">
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="filter.pageNum"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="filter.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <transition name="el-zoom-in-bottom">
        <!-- 按钮组 -->
        <div class="btn-group" style="margin-right: 20px;" v-if="isChecking">
          <div class="msg">
            已选择
            <span style="color:#409EFF">{{ checkList.length }}</span> 项
          </div>
          <el-button type="warning" @click="isChecking = false">取消</el-button>
          <el-button type="primary" @click="batch_delet">确定</el-button>
        </div>
      </transition>
    </div>

    <!-- 对话框 -->
    <div>
      <!-- 查询对话框 -->
      <el-dialog
        title="查询栏"
        :visible.sync="filter_dialog.show"
        width="20%"
        :before-close="filter_dialog_close"
        :modal="filter_dialog.modal"
        :center="false"
      >
        <el-form :model="filter" ref="filterForm" label-width="auto" :hide-required-asterisk="true">
          <el-form-item label="管理员名" prop="username">
            <el-input
              v-model.trim="filter.username"
              @keyup.enter.native="getList"
              placeholder="要查询的管理员名"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="filter_dialog_close">取 消</el-button>
          <el-button @click="clear_filter">重 置</el-button>
          <el-button type="primary" @click="search" :loading="filter_dialog.loading">查 询</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from "@/api/modules/user";

import list from "./mixins/list"; // 列表
import pagination from "./mixins/pagination"; // 分页器

export default {
  mixins: [list, pagination]
};
</script>

<style lang="scss" scoped>
</style>