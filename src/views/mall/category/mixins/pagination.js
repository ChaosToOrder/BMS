/**
 * 分页器
 */
let pagination = {
    data() {
      return {
        total: 0,
      };
    },
    methods: {
      /**
       * 页码
       */
      handleCurrentChange(val) {
        this.filter.pageNum = val;
        this.getList();
      },
      /**
       * 每页条数
       */
      handleSizeChange(val) {
        this.filter.pageSize = val;
        this.getList();
      }
    }
  };
  export default pagination