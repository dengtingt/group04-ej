import {get} from '../http/axios'
export default {
  namespaced:true,
  state:{
    address:[],
    realname:''
  },
  mutations:{
    refreshAddress(state,address){
      state.address = address;
    }
  },
  actions:{
    // 根据用户id查询用户地址信息
    async findAddressByCustomerId(context,id){
      let response = await get("/address/findByCustomerId?id="+id);
      context.commit("refreshAddress",response.data)
    },
    // 根据用户id查询用户姓名
    async findCustomer({state},id){
      let response = await get("/customer/findAll");
      await response.data.map(item=>{
        if(item.id === id){
          state.realname = item.realname;
        }
      })
    },
  }
}