import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './assets/iconfont/iconfont.css'

// 组件
import OrderItem from './components/OrderItem'
Vue.component('briup-order-item',OrderItem)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
