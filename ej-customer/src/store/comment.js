import {get,post,post_array_dots} from "../http/axios"
export default {
    namespaced:true,
    state:{},
    getters:{},
    mutations:{},
    actions:{
        async saveComment({commit},comment){
            let result = post("/comment/saveOrUpdate",comment)
            commit("resetMessage",result.statusText);
        }
    }
}