// import request from '@/utils/request'
import { get, post, post_array } from '@/http/axios'

export default {
  namespaced: true,
  state: {
    products: [],
    visible: false,
    title: '添加产品信息',
    category: []
  },
  getters: {
    productSize(state) {
      return state.products.length
    },
    orderProduct: (state) => {
      return function(flag) {
        state.products.sort((a, b) => {
          if (a[flag] > b[flag]) {
            return -1
          } else {
            return 1
          }
        })
        return state.products
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
    refreshProducts(state, products) {
      state.products = products
    },
    refreshProducts(state, products) {
      state.products = products
    },
    setTitle(state, title) {
      state.title = title
    },
    findCategoryName(state, category) {
      state.category = category
    },
    idFindName(state, category) {
      for (var i = 0; i < state.products.length; i++) {
        for (var j = 0; j < category.length; j++) {
          if (state.products[i].categoryId === state.category[j].id) {
            state.products[i].idname = state.category[j].name
            console.log(state.products[i].idname)
          }
        }
        // console.log(state.category[i].name);
        // console.log(state.products);
      }
    }
  },
  actions: {
    async batchDeleteProduct(context, ids) {
    //  console.log(ids);
      // 1. 批量删除
      const response = await post_array('/product/batchDelete', { ids })
      // console.log(response);
      // 2. 分发
      context.dispatch('findAllProducts')
      // 3. 返回结果
      return response
    },
    async deleteProductById(context, id) {
      const response = await get('/product/deleteById?id=' + id)
      context.dispatch('findAllProducts')
      return response
    },
    async findAllProducts(context) {
      // 1. ajax查询
      const response = await get('/product/findAll')
      // console.log(response.data)
      // 2. 将查询结果更新到state中
      context.commit('refreshProducts', response.data)
    },
    async findProductByid({ commit }, id) {
      // 1. ajax查询
      const response = await get('/product/findById', { id })
      // 2. 将查询结果更新到state中
      commit('refreshProducts', response.data)
    },
    // payload 顾客信息
    async saveOrUpdateProduct({ commit, dispatch }, product) {
      // 1. 保存或更新
      const response = await post('/product/saveOrUpdate', product)
      // 2. 刷新页面
      dispatch('findAllProducts')
      // 3. 关闭模态框
      commit('closeModal')
      // 4. 提示
      return response
    },
    async findCategory(context) {
      // 1.ajax查询
      const response = await get('/category/findAll')
      // console.log(response.data)
      context.commit('findCategoryName', response.data)
      context.commit('idFindName', response.data)
    }
  }
}
