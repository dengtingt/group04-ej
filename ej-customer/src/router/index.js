import Vue from 'vue'
import VueRouter from 'vue-router'
import Manager from '../pages/manager/Layout.vue'
import store from '../store'
import { getToken } from '../utils/auth'
import { Toast } from 'vant'
// import Shopping from '../pages/manager/Shopping.vue'
// import confirmOrder from '../pages/manager/confirmOrder.vue'

Vue.use(VueRouter)

const routes = [
   {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/',
    name: 'manager',
    component: Manager,
    beforeEnter: (to, from, next) => {  //属于路由自己的拦截器
      let token = getToken();
      if(token){
        // 查询info
        store.dispatch('user/findUser',token)
        .then(()=>{
          // 当获取完用户信息之后才允许跳转
          next();
        })
      } else {
        Toast("token失效")
        // 跳转到登录
        next({path:'/login'})
      }
    },
    children:[{
      path:"home",
      component:() => import('../pages/manager/Home.vue')
    },{
      path:"order",
      component:() => import('../pages/manager/Order.vue')
    },{
      path:"user",
      component:() => import('../pages/manager/User.vue')
    },
    {
      path:"/address",
      name: 'address',
      component:() => import('../pages/manager/Address.vue')
    },
    {
      path:"/editAddress",
      name: 'editAddress',
      component:() => import('../pages/manager/editAddress.vue')
    },
    {
      path: '/Shopping',
      name: 'shopping',
      component: () => import('../pages/manager/Shopping.vue')
    },
    {
      path: '/Comment',
      name: 'comment',
      component: () => import('../pages/manager/Comment.vue')
    }]
  },
  
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: () => import('../pages/manager/confirmOrder.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
