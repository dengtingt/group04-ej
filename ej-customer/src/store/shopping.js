import {get} from '../http/axios'
export default {
  namespaced:true,
  state:{
    activeKey:0
  },
  mutations:{
    categoryindex(state,index){
       state.activeKey=index
   }
  },
  actions:{
   
  }
}