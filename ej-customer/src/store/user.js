import {get,post,post_json} from '../http/axios'
export default{
    namespaced:true,
    state:{
        info:{}
    },
    getters:{},
    mutations:{
        // 需要接收一个参数user
        refreshInfo(state,info){ // 系统提供state
            state.info = info;
      console.log("user.info",state.info)

        },
    },
    actions:{
        // 获取用户信息
        async findUser(context,token){
            let response = await get("/user/info",{token});
            // 将用户信息设置到info中
            context.commit("refreshInfo",response.data)
            // 2. 通过token获取用户信息
        },
        // 查找用户地址信息
        // async info(context,token){
           
        // }
        // 退出登录
        logout(){
            post("/user/logout");
        }
    }
}