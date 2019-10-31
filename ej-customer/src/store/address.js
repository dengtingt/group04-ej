import {get} from '../http/axios'
export default {
  namespaced:true,
  state:{
    address:[],
    addresses:[],
    realname:""
  },
  mutations:{
    refreshAddress(state,addresses){
      state.addresses = addresses;
    },
    refreshAddre(state,address){
      state.address = address;
    }
  },
  actions:{
    // 根据用户id查询用户地址信息
    async findAddressByCustomerId(context,id){
      let response = await get("/address/findByCustomerId?id="+id)
      .then((response)=>{
        context.commit("refreshAddre",response.data[0])
        let addresses = [];
        response.data.forEach(item=>{
          let address = {
            id: item.id,
            name: '张三',
            tel: item.telephone,
            address: item.province+""+item.city+""+item.area+""+item.address
          }
          addresses.push(address);
        })
        context.commit("refreshAddress",addresses)
      })
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