<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="marign: 10px 0">添加</el-button>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width:100px;height:100px;">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="{row}">
         <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
         <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination 
       :current-page="page" 
       :page-size="limit" 
       :page-count="7" 
       :page-sizes="[3,5,7]" 
       :total="total"
       @current-page="getPageList"
       @size-page="handleSizeChange"
       style="marign-top:20px;textAlgin:center;"
       >
    </el-pagination> -->
    <el-pagination
      style="margin-top:20px;textAlign:center"
      :current-page="page" 
      @size-change="handleSizeChange"
      @current-change="getPageList"
      :page-size="limit"
      :page-count="7"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[3, 5,7]">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      page:1,
      limit:3,
      total:0,
      list:[]
    };
  },
  mounted() {
    this.getPageList()
  },
  methods:{
    async getPageList(pager = 1) {
      this.page = pager
      const {page,limit}  = this;
      let res = await this.$api.tradeMark.reqTradeMatk(page,limit)
      if(res.code == 200) {
        this.total = res.data.total
        console.log(this.total)
        this.list = res.data.records
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    handleDelTradeMark(row) {
      console.log(row)
    this.$confirm(`此操作将永久删除${row.tmName}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await this.$api.tradeMark.reqDelTradeMark(row.id)
        if(res.code == 200) {
          this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getPageList(this.list.length>1?this.page : this.page-1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
};
</script>

<style></style>
