import { createRouter, createWebHistory } from 'vue-router'

// https://www.csdn.net/tags/MtzakgxsNjA1MC1ibG9n.html
// 上面那个是关于VUE项目部署的

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/newissue/:uid',
      name: 'newissue',
      component: () => import('../views/IssueView.vue')
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next()
  }else{
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      next('/login');
    } else {
      next()
    }
  }
})

export default router
