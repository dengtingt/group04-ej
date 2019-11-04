import request from '@/utils/request'
import { get, post, post_array } from '@/http/axios'

export default {
  namespaced: true,
  state: {
    waiters: [],
    visible: false,
    title: '添加员工信息',
    loading: false
  },
  getters: {
    waitersSize(state) {
      return state.waiters.length
    },
    orderWaiter: (state) => {
      return function(flag) {
        state.waiters.sort((a, b) => {
          if (a[flag] > b[flag]) {
            return -1
          } else {
            return 1
          }
        })
        return state.waiters
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
    refreshWaiters(state, waiters) {
      state.waiters = waiters
    },
    setTitle(state, title) {
      state.title = title
    },
    beginLoading(state) {
      state.loading = true
    },
    endLoading(state) {
      state.loading = false
    }
  },
  actions: {
    async batchDeleteWaiters(context, ids) {
      // 1. 批量删除
      const response = await post_array('/waiter/batchDelete', { ids })
      // 2. 分发
      context.dispatch('findAllWaiter')
      // 3. 返回结果
      return response
    },
    // 通过id删除
    /* async deleteCustomerById(context,id){
      let response = await request.get("/customer/deleteById?id="+id);
      context.dispatch("findAllCustomers");
      return response;
    },*/
    async findAllWaiters({ dispatch, commit }) {
      // 1. ajax查询
      commit('beginLoading')
      const response = await get('/waiter/findAll')
      // 2. 将查询结果更新到state中
      commit('refreshWaiters', response.data)
      setTimeout(() => {
        commit('endLoading')
      }, 1000)
    },
    // payload 顾客信息
    async saveOrUpdateWaiter({ commit, dispatch }, payload) {
      // 1. 保存或更新
      const response = await post('/waiter/saveOrUpdate', payload)
      // 2. 刷新页面
      dispatch('findAllWaiters')
      // 3. 关闭模态框
      commit('closeModal')
      // 4. 提示
      return response
    }
  }
}
