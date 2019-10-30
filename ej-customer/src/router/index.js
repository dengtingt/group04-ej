import Vue from 'vue'
import VueRouter from 'vue-router'
import Manager from '../pages/manager/Layout.vue'
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
    children:[{
      path:"home",
      component:() => import('../pages/manager/Home.vue')
    },{
      path:"order",
      component:() => import('../pages/manager/Order.vue')
    },{
      path:"user",
      component:() => import('../pages/manager/User.vue')
// <<<<<<< HEAD
    },
    {
      path: '/Shopping',
      name: 'shopping',
      component: () => import('../pages/manager/Shopping.vue')
// =======
    },{
      path:"address",
      component:() => import('../pages/manager/Address.vue')
    }]
// >>>>>>> b492103a0a829afa4326104da6777a44d6e4f621
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
