import {get,post} from'./ajax'
// 获取category列表
export const categorylist=()=>get('/categorylist');
// 获取tag列表
export const taglist=()=>get('/taglist');
// 新建category分类
export const newcategory=({categoryname})=>post('/newcategory',{categoryname});
// 新建tag分类
export const newtag=({tagname})=>post('/newtag',{tagname});
// 获取category的文章列表
export const getarticlebycategory=(name)=>get('/getarticlebycategory',{category:name})
// 更改文章的隐藏状态 0显1隐藏
export const changehide=({uid,showsign})=>post('/changehide',{uid,showsign});
// 保存文章
export const newarticle=({uid,title,category,tag,date,show,content})=>post('/newarticle',{uid,title,category,tag,date,show,content});
// 拿文章信息
export const getarticle=(uid)=>get('/getarticle',{uid:uid})
// 更新文章的信息
export const modifyarticle=(uid,title,category,tag,content)=>post('/modifyarticle',{uid:uid,title:title,category:category,tag:tag,content:content});
// 登入账号和密码的内容
export const login=(id,password)=>post('/login',{username:id,password:password});