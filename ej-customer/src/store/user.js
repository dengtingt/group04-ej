import {get,post,post_json} from '../http/axios'
import {setToken,getToken,removeToken} from '../../utils/auth'
export default{
    namespaced:true,
    state:{
        token:getToken(),
        info:{}
    },
    getters:{},
    mutations:{
        // 需要接收一个参数user
        refreshInfo(state,info){ // 系统提供state
            state.info = info;
        },
        refreshToken(state,token){
          state.token = token;
        }
    },
    actions:{
        // 获取用户信息
        async findUser(context,token){
            let response = await get("/user/info",{token});
            // 将用户信息设置到info中
            context.commit("refreshInfo",response.data)
            // 2.将token缓存起来？localStorage
            setToken(token);
            // 3. 将token维护到状态机中
            context.commit("refreshToken",token);
        },
        // 退出登录
        async logout(context){
            // 1. 请求后台退出
            await post("/user/logout");
            // 2. 清理本地缓存
            removeToken();
            // 3. 清理store
            context.commit('refreshToken','');
            context.commit('refreshInfo',{})
        }
    }
}