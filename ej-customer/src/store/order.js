import {get} from '../http/axios'
export default {
    namespaced:true,
    state:{
        AllOrders:[]
    },
    getters:{
        // 根据订单状态进行过滤
        ordersStatusFilter(state){
            return (status)=>{
                return state.AllOrders.filter(AllOrders=>AllOrders.status === status)
            }
        }
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