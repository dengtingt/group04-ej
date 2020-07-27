import { get, post, post_array } from '@/http/axios'
import { Stats } from 'fs'
import request from '@/utils/request'

export default {
  namespaced: true,
  state: {
    id: '',
    data: [],
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
        return state.orders1.filter(item=>item.status === status)
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
    },
    changeId(state, id) {
      state.id = id
    }
  },
  actions: {
    async findAllOrders({ dispatch, commit }) {
      // 1. ajax查询
      const response = await get('/order/query')
      // 2. 将查询结果更新到state中
      // response.data.forEach((item) => {
      //   Object.assign(item,rootState.order.waiters)
      // })
      // 先获取orders的值，然后用response.data先遍历，然后用assign复制waiters的解构数据(...waiters),然后在订单页面访问pdry
      commit('refreshOrders', response.data)
    },
    async findAllwaiters(context) {
      const response = await get('/waiter/findAll')
      context.commit('findWaiters', response.data)
    },
    async sendOrder({ context }, ids) {
      const response = await request.get('/order/sendOrder', { params: { waiterId: ids.waiterId, orderId: ids.orderId }})
      return response
    },
    async orderCancelHandler({ commit }, waiters) {
      const response = await request.get('/order/cancelSendOrder?orderId=' + waiters)
      return response
    }
  }
}
