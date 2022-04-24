<template>
  <div>
      <!-- inline代表的是一行可以放多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
     <el-form-item label="一级分类">
          <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handle1" :disabled="show">
             <el-option :label="item.name" :value="item.id" v-for="(item,index) in list" :key="index.id"></el-option>
          </el-select>
     </el-form-item>
     <el-form-item label="二级分类">
      <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handle2" :disabled="show"> 
        <el-option :label="item.name" :value="item.id" v-for="(item,index) in list2" :key="index.id"></el-option>
      </el-select>
     </el-form-item>
     <el-form-item label="三级分类">
      <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handle3" :disabled="show">
        <el-option :label="item.name" :value="item.id" v-for="(item,index) in list3" :key="index.id"></el-option>
      </el-select>
     </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
 name:"categorySelect",
 props:['show'],
 data() {
     return {
         list:[],
         list2:[],
         list3:[],
         cForm:{
             category1Id:'',
             category2Id:'',
             category3Id:''
         }
     }
 },
 mounted() {
     this.getCategoryList()
 },
 methods:{
    async getCategoryList() {
        let res = await this.$api.attr.reqCategory1List()
        if(res.code == 200) {
            this.list = res.data
        }
     },
     async handle1() {
       this.list1 = []
       this.list2 = []
       this.cForm.category2Id = ''
       this.cForm.category3Id = ''
       const {category1Id} = this.cForm
       this.$emit('getCateGoryId',{categoryId:category1Id,level:1})
       let res = await this.$api.attr.reqCategory2List(category1Id)
       if(res.code == 200) {
         this.list2 = res.data
       }
     },
     async handle2() {
       this.list3 = []
       this.cForm.category3Id = ''
       const {category2Id} = this.cForm
       this.$emit('getCateGoryId',{categoryId:category2Id,level:2})
       let res = await this.$api.attr.reqCategory3List(category2Id)
       if(res.code == 200) {
         this.list3 = res.data
       }
     },
     handle3() {
       const {category3Id} = this.cForm
       this.$emit('getCateGoryId',{categoryId:category3Id,level:3})
     }
 }
}
</script>

<style>

</style>