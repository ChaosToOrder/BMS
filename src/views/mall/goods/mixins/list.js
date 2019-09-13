import api from "@/api/modules/mall";
/**
 * 列表
 */
let list = {
    data() {
        return {
            loading: false,
            list: [],

            isChecking: false,
            checkList: [],

            /** 查询过滤 */
            filter: {
                goods_name: '',
                categoryIdList: [], // 类别
                pageSize: 10, // 页数
                pageNum: 1, // 当前页
            },
            /** 类别列表 */
            categorySelection: [],
            /**查询抽屉配置参数 */
            filter_dialog: {
                show: false,
                direction: 'rtl',
                modal: false,
                loading: false
            },
        };
    },
    methods: {




        /** 查询用 */
        ...{
            /**
            * 查询列表
            */
            getList() {
                this.loading = true;
                return new Promise((reslove, reject) => {
                    api.getGoodsList(this.filter).then(res => {
                        setTimeout(() => {
                            this.loading = false;
                            if (res.data.code === 0) {
                                this.total = res.data.data.total;
                                this.list = res.data.data.list;
                                this.$scrollToTop(); // 内容区的滚动条到顶部
                                reslove()
                            }
                        }, 100);
                    });
                })
            },
            /**
             * 获取 商品类别 列表
            */
            getCategoryList() {
                return api.getCategoryList({
                    pageSize: 99999
                });
            },
            /**
             * 打开抽屉
             */
            show_filter_dialog() {
                this.filter_dialog.show = true;
            },
            /**
             * 对话框关闭触发事件
             */
            filter_dialog_close() {
                this.filter_dialog.show = false;
            },
            /**
             * 查询
             */
            search() {
                this.filter_dialog.loading = true
                this.getList()
                    .then(() => {
                        this.filter.pageNum = 1
                        this.filter_dialog.loading = false
                        // this.filter_dialog_close()
                    })


            },
            /**
             * 刷新
             */
            refresh() {
                this.clear_filter()
                this.filter.pageSize = 10
                this.filter.pageNum = 1
                this.getList()
            },
            /**
             * 清空查询栏
             */
            clear_filter() {
                let pageOption = {
                    pageSize: this.filter.pageSize,
                    pageNum: this.filter.pageNum,
                }
                this.filter = {
                    goods_name: '', // 商品名
                    categoryIdList: [], // 类别
                    ...pageOption
                }
            }
        },

        /** 删除用 */
        ...{
            /**
            * 删除
            */
            del(item) {
                this.$confirm("确定删除吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.loading = true;
                        api.delGoodsById(item.goods_id).then(res => {
                            if (res.data.code === 0) {
                                setTimeout(() => {
                                    this.getList();
                                }, 1000);
                            }
                        });
                    })
                    .catch(err => { });
            },
            /**
             * 切换列表选择状态
             */
            check_toggle() {
                this.isChecking = !this.isChecking;
            },
            /**
             * 选择触发事件
             */
            handleSelectionChange(val) {
                this.checkList = val;
            },
            /**
             * 批量删除
             */
            batch_delet() {
                this.$confirm(`确定删除选中的 ${this.checkList.length} 项吗？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        let id_list = this.checkList.map((val) => {
                            return val.goods_id
                        })
                        this.loading = true
                        api.delGoodsMultiple({
                            id_list: id_list
                        })
                            .then((res) => {
                                if (res.data.code === 0) {
                                    setTimeout(() => {
                                        this.isChecking = false;
                                        this.getList();
                                    }, 1000);
                                }
                            })
                    })

            },
        },

        /**
         * 编辑
         */
        edit(item) {
            this.$router.push({
                // 一定要写name,params必须用name来识别路径
                // path: '/mall/addGiftCardType',
                name: "goods_add&edit",
                params: {
                    data: item,
                }
            });
        },
    },
    created() {
        this.getList(); // 获取列表
        this.getCategoryList() // 获取 类别列表
        .then(res => {
            if (res.data.code === 0) {
                this.categorySelection = res.data.data.list;
            }
        })
    }
};
export default list