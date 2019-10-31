import {get,post} from '../http/axios'
export default {
  namespaced:true,
  state:{
    title:"修改地址"
  },
  mutations:{
    
  },
  actions:{
    // 删除
    async deleteAddressById({dispatch},id){
      // 1. 删除地址信息
      let response = await get("/address/deleteById?id="+id);
      // 3. 提示成功
      return response;
    },
    // 修改
    async saveAddress({dispatch,commit},address){
        // 1. 提交请求
        let response = await post('/address/saveOrUpdate',address);
        // 4. 提示成功
        return response;
    }
  }
}