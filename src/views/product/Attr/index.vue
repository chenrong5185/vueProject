<template>
  <div>
      <el-card style="margin:20px 0;">
        <category-select @getCateGoryId="getCateGoryId" :show="!isShowTable"></category-select>
      </el-card>
      <el-card>
       <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" style="marign: 10px 0" :disabled="!category3Id" @click="handleAddAttr">添加属性</el-button>
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="attrValueList" label="属性值列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag v-for="(item,index) in row.attrValueList" :key="item.id" type="success" style="margin-right: 20px">{{item.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="180">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="handleUpdateAttr(row)">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
          </el-table-column>
       </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form label-width="80px" :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button>取消</el-button>
          <el-table style="width: 100%;margin:20px 0;" border :data="attrInfo.attrValueList">
            <el-table-column align="center" label="序号" width="80" type="index">
            </el-table-column>
            <el-table-column prop="name" label="属性值名称" width="width">
              <template slot-scope="{row,$index}">
                <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)"></el-input>
                <span v-else @click="row.flag=true" style="display:block;">{{row.valueName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作" width="120">
              <template slot-scope="{row,$index}">
                <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                   <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="handleAddOrUpdate" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
          <el-button @click="isShowTable=true">取消</el-button>
      </div>
      </el-card>
  </div>
</template>

<script>
// 按需引入lodash当中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name:'attr',
  data() {
    return {
       category1Id:'',
       category2Id:'',
       category3Id:'',
       attrList:[],
       isShowTable:true,
       flag:false,
       attrInfo:{
        attrName: "", // 属性名
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3
      }
    }
  },
  methods:{
    getCateGoryId({categoryId,level}) {
      if(level == 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      }
      else if(level == 2) {
         this.category2Id = categoryId
         this.category3Id = ''
      }
      else {
        this.category3Id = categoryId
        this.getAttrList()
      }
    },
    async getAttrList() {
      const {category1Id,category2Id,category3Id} = this 
      let res = await this.$api.attr.reqAttrList(category1Id,category2Id,category3Id)
      if(res.code == 200) {
        this.attrList = res.data
      }
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId:this.attrInfo.id,
        valueName:'',
        flag:true
      })
    },
    handleAddAttr() {
      this.isShowTable = false
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    handleUpdateAttr(row) {
      this.isShowTable = false
      this.attrInfo = cloneDeep(row)
    },
    toLook(row) {
      if(row.valueName.trim() == '') {
        this.$message('请输入一个正常的属性值')
        return
      }
      let isRepat = this.attrInfo.attrValueList.some(item=>{
        if(row!==item) {
          return row.valueName == item.valueName
        }
      })
      if(isRepat) return
      row.flag = false
    },
    deleteAttrValue(index) {
      console.log(index)
      this.attrInfo.attrValueList.splice(index,1)
    },
   async handleAddOrUpdate() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName!='') {
          delete item.flag;
          return true
        }
      })
      try {
        await this.$api.attr.reqAddAttr(this.attrInfo)
        this.isShowTable = true
        this.$message({type:'success',message:'保存成功'})
        this.getAttrList()
      } catch (error) {
        this.$message({type:'',message:'保存失败'})
      }
    }
  }
}
</script>

<style>

</style>