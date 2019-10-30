<template>
  <div>
      <div class="del">
      详细信息
  </div>
   <div class="tab">
            <van-tabs v-model="active">
                <van-tab title="ID">{{info.id}}</van-tab>
                <van-tab title="类型">waiter</van-tab>
                <van-tab title="顾客名">{{info.name}}</van-tab>
                <van-tab title="描述">{{info.introduction}}</van-tab>
            </van-tabs>
      </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            active:2
        };
    },
    created(){

    },
    computed:{
        ...mapState("user",["info"])
    },
    methods:{

    }
}
</script>

<style>
.del{
    height: 40px;
    line-height: 40px;
   font-size: 20px;
   text-align: center;
   background-color: lightblue;
}
.tab{
    font-size: 18px;
}
</style>template