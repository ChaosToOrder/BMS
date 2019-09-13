<template>
  <div class="list-page">
    <!-- 顶部操作区域 -->
    <div class="top-area">
      <!-- 按钮组 -->
      <div class="btn-group">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="$router.push({path:'/mall/add&edit'})"
        >新增商品</el-button>
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
        row-key="goods_id"
        @selection-change="handleSelectionChange"
        row-class-name="column"
      >
        <!-- ID -->
        <el-table-column prop="goods_id" label="ID" width="50"></el-table-column>
        <!-- 商品名 -->
        <el-table-column prop="goods_name" label="商品名"></el-table-column>
        <!-- 原价 -->
        <el-table-column prop="original_price" label="原价"></el-table-column>
        <!-- 类别 -->
        <el-table-column prop="category_name" label="类别"></el-table-column>
        <!-- 封面 -->
        <el-table-column label="头像" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.pic_url" style="margin-right:10px" width="50" height="50" alt />
          </template>
        </el-table-column>
        <!-- 创建时间 -->
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
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
          <!-- 商品名 -->
          <el-form-item label="商品名" prop="goods_name">
            <el-input
              v-model.trim="filter.goods_name"
              @keyup.enter.native="search"
              placeholder="要查询的商品名"
            ></el-input>
          </el-form-item>
          <!-- 商品类别 -->
          <el-form-item label="商品类别" prop="category_id">
            <el-select
              v-model="filter.categoryIdList"
              @change="search"
              clearable
              placeholder="商品类别"
              multiple
            >
              <el-option
                v-for="item in categorySelection"
                :key="item.goods_category_id"
                :label="item.category_name"
                :value="item.goods_category_id"
              ></el-option>
            </el-select>
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
import list from "./mixins/list"; // 列表
import pagination from "./mixins/pagination"; // 分页器

export default {
  mixins: [list, pagination]
};
</script>

<style lang="scss" scoped>
  
</style>