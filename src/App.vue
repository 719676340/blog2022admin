<template>
  <div class="appcontent">
    <div class="nav">
      <div class="newissue" @click="gonewissue()"><span>新建</span></div>
      <div class="newissue" @click="gocategory()"><span>分类</span></div>
    </div>
    <div class="viewcontent"><router-view></router-view></div>
    <div class="outbottom">
      <el-button type="danger" @click="loginout" >登出</el-button>
    </div>
  </div>

    <!-- <IssueTitle title="title" :show="false"></IssueTitle> -->
    <!-- <CategoryView></CategoryView> -->
    <!-- <IssueView></IssueView> -->
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from '@/components/HelloWorld.vue'

import { useRouter, useRoute } from 'vue-router'
import {myStore} from './stores/index'
import { storeToRefs } from "pinia";

const router = useRouter()
// const route = useRoute()
const store = myStore();
const { token } = storeToRefs(store);
// router.push({ path: `/category/${props.categorylist[index].path}` })

function gonewissue(){
  router.push('/newissue/null')
}
function gocategory(){
  router.push('/category')
}
function loginout(){
  localStorage.removeItem('token')
  token.value=''
  router.push('/')
}
</script>
<style lang="scss">
.appcontent{
  position: relative;
  min-width: 650px;
}
.nav{
  width: 100px;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  box-shadow: 1px 0 5px rgb(205, 205, 205);
}
.newissue{
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover{
    background-color: gray;
  }
}
.viewcontent{
  position: absolute;
  top: 0;
  display: flex;
  left: 100px;
  width: calc(100%  - 100px);
  justify-content: center;
}
.outbottom{
  position: fixed;
  right: 0;
  top: 20%;
}
</style>
