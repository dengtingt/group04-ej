<template>
  <div class="user">
    <!-- 标题 -->
    <div class="title">
        我的
    </div>
    <!-- 用户信息显示 -->
    <div class="photo">
        <img :src="info.avatar" alt="">
        <p>{{info.name}}</p>
    </div>
    <!-- 地址信息 -->
    <div class="address" @click.prevent="addressHandler">
      <van-row gutter="20">
        <van-col span="8"><a href="">常用地址</a></van-col>
        <van-col span="2" offset="12"><van-icon name="arrow" /></van-col>
      </van-row>
    </div>
    <!-- 退出登录 -->
    <div class="logout" @click.prevent="logoutHandler">
        <van-row gutter="20">
          <van-col span="8"><a href="">退出</a></van-col>
          <van-col span="2" offset="12"><van-icon name="arrow" /></van-col>
        </van-row>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    data(){
      return{

      }
    },
    created(){
      this.findUser(this.token)
    },
    computed:{
      // 映射，将vuex state中的状态映射为vue中的属性
      ...mapState("user",["info"]),
      ...mapState("login",["token"])
    },
    methods:{
      // 映射，将vuex action中得到的动作映射为vue中的方法
      ...mapActions("user",["findUser"]),
      ...mapActions("login",["customerlogin","logout"]),
      // 地址信息跳转
      addressHandler(){
        this.$router.push('./address');
      },
      // 退出登录
      logoutHandler(){
        this.logout()
        .then(()=>{
          this.$router.push({path:'/login'})
        })
      }
    }
}
</script>

<style scoped>
    /* 清空基础样式 */
    html {
        color: #333;
        font:normal 12px '微软雅黑','Microsoft YaHei';
    }
    body,ul,ol,p {
        margin: 0;
        padding: 0;
    }
    ul,ol {
        list-style: none;
    }
    a {
        text-decoration: none;
        color: #333;
    }

    .title{
        line-height: 3em;
        text-align: center;
        border-bottom: 1px solid #efefef;
    }
    .photo img{
      position: relative;
      left: -60px;
      width: 120px;
      height: 120px;
      margin: 20px 50% 10px;
      border: 1px solid #efefef;
      border-radius: 50%;
    }
    .photo p{
      font-size: 14px;
      text-align: center;
    }
    .address,.logout{
        line-height: 3em;
        border-bottom: 1px solid #ededed;
    }
    a{
      font-size: 12px;
      margin-left: 30px;
    }
</style>