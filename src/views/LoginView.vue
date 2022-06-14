<template>
  <div class='logincontent'>
     <el-input v-model="id" placeholder="账号"/>
     <el-input v-model="password" placeholder="密码"/>
     <el-button @click="submit()">登录</el-button>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import {login} from '../api/index'
import { ElMessage } from 'element-plus'
import {myStore} from '../stores/index'
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = myStore();
const { token } = storeToRefs(store);

const id=ref('')
const password=ref('')
function submit(){
  // console.log(id.value,password.value)
  login(id.value,password.value).then((res)=>{
    token.value=res.data
    localStorage.setItem('token',res.data)
    router.push('/category')
    ElMessage({
      message: '登陆成功',
      type: 'success',
    })
  }).catch((err)=>{
    console.log('err:',err)
  })
}
</script>
<style lang="scss" scoped>
</style>
