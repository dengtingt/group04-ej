import {get,post,post_array,post_json} from '../http/axios';
export default {
    namespaced:true,
    state:{
        token:""
    },
    getters:{

    },
    mutations:{
        refresh(state,token){
            state.token=token
            console.log(state.token)
        }
    },
    actions:{
        async customerlogin(context,user){
            let response = await post_json("/user/login",user)
            console.log(response.data)
            context.commit("refresh",response.data)
            return response 
        }
    }
}