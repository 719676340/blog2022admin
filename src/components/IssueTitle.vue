<template>
  <div class='issuetitle'>
      <div class="title" :class="{titlehide:showsign}"><span>{{title}}</span></div>
      <div class="control">
          <div class="editor" @click="modifyissue"><span>编辑</span></div>
          <div class="hide" @click="changeshow"><span v-if="!showsign">隐藏</span><span v-else>恢复</span></div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {changehide} from '../api/index';// 导入我们的api接口
import { useRouter, useRoute } from 'vue-router'
const props=defineProps(['title','show','uid'])
const events=defineEmits(['editor','hide'])

const router = useRouter()
const route = useRoute()

const showsign=ref(props.show)
const title=ref(props.title)
function changeshow(){
    showsign.value=showsign.value?0:1
    changehide({uid:props.uid,showsign:showsign.value}).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}
function modifyissue(){
    router.push('/newissue/'+props.uid+'')
}
</script>
<style lang="scss" scoped>
.issuetitle{
    display: flex;
    min-width: 200px;
    height: 30px;
    padding: 0 20px 0;
    border-bottom: 1px solid gray;
    justify-content: space-between;
}
.title{
    display: flex;
    align-items: center;
}
.titlehide{
    color: gray;
    text-decoration:line-through
}
.control{
    width:100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.editor,.hide{
    display: flex;
    height: 20px;
    width: 40px;
    font-size: 14px;
    line-height: 20px;
    justify-content: center;
    background-color: gray;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    :hover{
        color: rgb(199, 199, 199);
    }
}
</style>
