<template>
  <div class='issuecontent'>
      <div class="issuehead">
          <div class="issuetitle">
                <span>Titlename:</span>
                <el-input v-model="titlename" placeholder="new category"/>
          </div>
          <div class="issuecategory">
                <el-select v-model="listcategoryvalue" placeholder="category">
                  <el-option
                    v-for="item in categoryoptions"
                    :key="item.value"
                    :value="item.value"
                  />
                </el-select>
                <el-input v-model="textcategoryvalue" placeholder="new category"/>
          </div>
          <div class="issuetag">
                <el-select v-model="listtagvalue" placeholder="tag">
                  <el-option
                    v-for="item in tagoptions"
                    :key="item.value"
                    :value="item.value"
                  />
                </el-select>
                <el-input v-model="texttagvalue" placeholder="new tag"/>
          </div>
      </div>
      <div class="issuemain">
        <div style="border: 1px solid #ccc; margin-top: 10px">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode='default'
          />
          <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            mode='default'
            @onCreated="handleCreated"
          />
        </div>
      </div>
      <div class="piclink"><a href="https://imgtu.com/ppwq1" target="_blank">图床连接</a></div>
      <div class="savebotton">
        <el-button type="danger" @click="submit" v-if="!modifysign">保存</el-button>
        <el-button type="danger" @click="modify" v-else>修改</el-button>
      </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, reactive,shallowRef} from 'vue';
// import * as dayjs from 'dayjs'
import dayjs from "dayjs"
import { ElMessage } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css' 
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { categorylist,newcategory,newtag,getarticlebycategory,taglist,newarticle,getarticle,modifyarticle} from '../api/index';// 导入我们的api接口
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

var categoryoptions=reactive([])
function getcategorylist(){
  categoryoptions.splice(0)
  categorylist().then((res)=>{
    let list=res
    for(let i=0;i<list.length;i++){
      categoryoptions.push({
        value:list[i].name
      })
    }
    categoryoptions.push({
      value:''
    })
  })
}
var tagoptions=reactive([])
function gettaglist(){
  tagoptions.splice(0)
  taglist().then((res)=>{
    let list=res
    for(let i=0;i<list.length;i++){
      tagoptions.push({
        value:list[i].name
      })
    }
    tagoptions.push({
      value:''
    })
  })
}

const titlename=ref('')
const listcategoryvalue=ref('')
const textcategoryvalue=ref('')

const listtagvalue=ref('')
const texttagvalue=ref('')

const uid=ref(null)
const time=ref(null)
const modifysign=ref(false)

const editorRef = shallowRef()
const valueHtml = ref('')
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

function submit(){  
  if(titlename.value==''||(listcategoryvalue.value==''&&textcategoryvalue.value=='')||(listtagvalue.value==''&&texttagvalue.value=='')){
    ElMessage.error('关键信息要填完')
  }
  let uid=dayjs().valueOf()
  let currcategory=listcategoryvalue.value!=''?listcategoryvalue.value:textcategoryvalue.value
  let currtag=listtagvalue.value!=''?listtagvalue.value:texttagvalue.value

  let show=0
  let time=dayjs().format('YYYY/MM/DD/HH/mm/ss')
  console.log(uid,time,valueHtml.value)
  console.log(time.value)
  newarticle({uid:uid,title:titlename.value,category:currcategory,tag:currtag,date:time,show:show,content:valueHtml.value}).then((res)=>{
    ElMessage({
      message: '提交成功',
      type: 'success',
    })
    titlename.value=''
    listcategoryvalue.value=''
    textcategoryvalue.value=''

    listtagvalue.value=''
    texttagvalue.value=''
    valueHtml.value=''
    console.log(res)
    return true
  }).then(()=>{
    let [a,b]=[false,false]
    for(let i=0;i<categoryoptions.length;i++){
      if(categoryoptions[i].value==currcategory){
        a=true
      }
    }
    for(let i=0;i<tagoptions.length;i++){
      if(tagoptions[i].value==currtag){
        b=true
      }
    }
    if(!a){
      addcategory(currcategory)
    }
    if(!b){
      addtag(currtag)
    }
  }).catch((err)=>{
    ElMessage.error('出问题了')
    console.log(err)
  })
}


function addcategory(name){
  newcategory({categoryname:name}).then((res)=>{
    console.log(res)
    getcategorylist()
  }).catch((err)=>{
    console.log(err)
  })
}
function addtag(name){
  newtag({tagname:name}).then((res)=>{
    console.log(res)
    gettaglist()
  }).catch((err)=>{
    console.log(err)
  })
}
function initarticle(){
  if(route.params.uid!='null'){
    modifysign.value=true
    getarticle(route.params.uid).then((res)=>{
      console.log(res[0])
      uid.value=res[0].uid
      titlename.value=res[0].title
      time.value=res[0].date
      listcategoryvalue.value=res[0].category
      listtagvalue.value=res[0].tag
      valueHtml.value=res[0].content
    })
  }
}
function modify(){
  let currcategory=listcategoryvalue.value!=''?listcategoryvalue.value:textcategoryvalue.value
  let currtag=listtagvalue.value!=''?listtagvalue.value:texttagvalue.value
  modifyarticle(uid.value,titlename.value,currcategory,currtag,valueHtml.value).then((res)=>{
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
    titlename.value=''
    listcategoryvalue.value=''
    textcategoryvalue.value=''

    listtagvalue.value=''
    texttagvalue.value=''
    valueHtml.value=''
    console.log(res)
    return true
  }).then(()=>{
    let [a,b]=[false,false]
    for(let i=0;i<categoryoptions.length;i++){
      if(categoryoptions[i].value==currcategory){
        a=true
      }
    }
    for(let i=0;i<tagoptions.length;i++){
      if(tagoptions[i].value==currtag){
        b=true
      }
    }
    if(!a){
      addcategory(currcategory)
    }
    if(!b){
      addtag(currtag)
    }
  }).catch((err)=>{
    ElMessage.error('出问题了')
    console.log(err)
  })
}
onMounted(() => {
  getcategorylist()
  gettaglist()
  initarticle()
})
</script>
<style lang="scss" scoped>
.issuecontent{
    min-width: 500px;
    position: relative;
}
.issuehead{
    display: flex;
    height: 100px;
}
.issuetitle{
    flex: 1 1 50%;
    display: flex;
    align-items: center;
}
.issuecategory{
    flex: 1 1 25%;
    display: flex;
    align-items: center;
}
.issuetag{
    flex: 1 1 25%;
    display: flex;
    align-items: center;
}
.savebotton{
  position: fixed;
  right: 0;
  top: 50%;
}
.piclink{
  margin: 10px;
  color: black;
  text-decoration: underline;
}
</style>
