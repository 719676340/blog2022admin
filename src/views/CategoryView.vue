<template>
  <div class='categorycontent'>
    <div class="head">
      <div class="categoryselet">
        <span>Category:</span>
        <el-select v-model="currcategory" placeholder="Select" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.value"
            @click="getarticlecategory(item.value)"
          />
        </el-select>
      </div>
      <div class="newcategory">
        <span>new:</span>
        <el-input v-model="categoryname" placeholder="new category"/>
        <el-button @click="addcategory(categoryname)">添加</el-button>
      </div>
    </div>
    <div class="maincontent">
      <div v-for="(item, index) in list" :key="index">
        <IssueTitle :title="item.title" :show="item.showsign" :uid="item.uid"></IssueTitle>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import IssueTitle from '../components/IssueTitle.vue';
import { categorylist,newcategory,getarticlebycategory} from '../api/index';// 导入我们的api接口

var options=reactive([])
function getcategorylist(){
  options.splice(0)
  categorylist().then((res)=>{
    let list=res
    for(let i=0;i<list.length;i++){
      options.push({
        value:list[i].name
      })
    }
  })
}

var categoryname=ref(null)
function addcategory(name){
  newcategory({categoryname:name}).then((res)=>{
    console.log(res)
    categoryname.value=null
    getcategorylist()
  }).catch((err)=>{
    console.log(err)
  })
}

var currcategory=ref(null)
const list=reactive([])
function getarticlecategory(name){
  list.splice(0,list.length)
  getarticlebycategory(name).then((res)=>{
    console.log(res)
    list.push(...res)
    list.sort((a,b)=>a.showsign-b.showsign)
  }).catch((err)=>{
    console.log(err)
  })
}

onMounted(()=>{
  getcategorylist()
})
</script>
<style lang="scss" scoped>
.categorycontent{
  min-width: 500px;
}
.head{
  display: flex;
  height: 100px;
  // background-color: red;
}
.categoryselet,.newcategory{
  flex: 1 1 50%;
}
</style>
