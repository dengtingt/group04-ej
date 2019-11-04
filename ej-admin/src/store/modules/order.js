import { get, post, post_array } from '@/http/axios'
import { Stats } from 'fs'
// import {post,post_array} from '@/utils/request'

export default {
  namespaced: true,
  state: {
    id: '',
    orders1: [],
    waiters1: {},
    visible: false,
    title: '添加顾客信息',
    loading: false
  },
  orders: {
    orderSize(state) {
      return state.orders.length
    },
    orderOrder: (state) => {
      return function(flag) {
        state.orders.sort((a, b) => {
          if (a[flag] > b[flag]) {
            return -1
          } else {
            return 1
          }
        })
        return state.orders
      }
    }
  },
  getters: {
    ordersStatusFilter(state) {
      return (status) => {
        return state.orders1.filter(orders1 => orders1.status === status)
      }
    }
  },
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    refreshOrders(state, orders) {
      state.orders1 = orders
    },
    setTitle(state, title) {
      state.title = title
    },
    beginLoading(state) {
      state.loading = true
    },
    endLoading(state) {
      state.loading = false
    },
    findWaiters(state, waiter) {
      state.waiters1 = waiter
    }
  },
  actions: {
    async findAllOrders({ dispatch, commit }) {
      // 1. ajax查询
      commit('beginLoading')
      const response = await get('/order/query')
      // 2. 将查询结果更新到state中
      // response.data.forEach((item) => {
      //   Object.assign(item,rootState.order.waiters)
      // })
      // 先获取orders的值，然后用response.data先遍历，然后用assign复制waiters的解构数据(...waiters),然后在订单页面访问pdry
      console.log('=+=+=+==', response.data)
      //  console.log("----------",rootState.order.orders)
      commit('refreshOrders', response.data)
      setTimeout(() => {
        commit('endLoading')
      }, 1000)
    },
    async findAllwaiters(context) {
      // context.commmit("beginLoading");
      const response = await get('/waiter/findAll')
      context.commit('findWaiters', response.data)
    },
    async sendOrder({ commit }, waiterid, orderid) {
      console.log('waiterid', waiterid)
      console.log('orderid', orderid)

      // let  data:{"waiterId":waiter,"orderId":orderid};
      //  let response = await get("/order/sendOrder",data);
      //  console.log(response);
      //  context.commit("refreshOrders")
    }
  }
}
