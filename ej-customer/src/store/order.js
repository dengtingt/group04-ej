import {get,post,post_array_dots} from "../http/axios"
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
        },
        resetMessage(state,message){
            state.message = message;
          }
    },
    actions:{
        async findAllOrder(context,customerId){
            let response = await get("/order/query?customerId="+customerId)
            context.commit("refreshAllOrders",response.data)
        },
        async deleteOrder(context,id){
            let response = await get("/order/deleteById?id="+id)
            return response;
        },
        async confirmOrder(context,id){
            let response = await get("/order/confirmOrder?orderId="+id)
            return response;
        },
        async saveOrder({commit},order){
            let result = post_array_dots("/order/save",order)
            console.log()
            commit("resetMessage",result.statusText);
        },
    }
}