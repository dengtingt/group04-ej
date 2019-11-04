import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import moment from "moment";
import './assets/iconfont/iconfont.css'

// 组件
import OrderItem from './components/OrderItem'
import FullLayout from './components/FullLayout'
Vue.component('briup-order-item',OrderItem)
Vue.component('briup-fulllayout',FullLayout)
Vue.prototype.$moment = moment;

// 全局注册过滤器
Vue.filter('datefmt',function(val){
  if(val){
    return moment(val).format('YYYY-MM-DD HH:mm:ss')
  }
  return val;
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
