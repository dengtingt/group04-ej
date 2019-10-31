import {get} from '../http/axios'
export default {
    namespaced:true,
    state:{
        AllOrders:[]
    },
    mutations:{
        refreshAllOrders(state,AllOrders){
            state.AllOrders = AllOrders;
        }
    },
    actions:{
        async findAllOrder(context,customerId){
            let response = await get("/order/query?customerId="+customerId)
            context.commit("refreshAllOrders",response.data)
        }
    }
}