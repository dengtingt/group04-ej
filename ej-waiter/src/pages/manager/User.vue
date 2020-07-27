<template>
  <div class="user">
    <!-- 标题 -->
    <div class="title">
        <van-nav-bar
          title="我的"
        />
    </div>
    <!-- 用户信息显示 -->
    <div class="photo">
        <img :src="info.avatar" alt="">
        <p>{{info.name}}</p>
    </div>
    <!-- 详细信息 -->
    <!-- <div class="detail" @click="detailHandler">
      <van-cell
        is-link
        title="详细信息"
      />
    </div> -->
    <!-- 地址信息 -->
    <!-- <div class="address" @click="AddressManger">
      <van-cell
        is-link
        title="我的地址"
      />
    </div> -->
    <!-- 退出登录 -->
    <div class="logout" @click="tabChangeHandler">
        <van-cell
          is-link
          title="退出"
        />
    </div>
  </div>
</template>
<script scoped>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
    }
  },
  created(){
    
  },
  methods:{
    ...mapActions("user",["logout"]),
    tabChangeHandler(){
     this.logout()
     this.$router.push("./login")
    },
    detailHandler(){
      this.$router.push("detail");
    },
    AddressManger(){
      this.$router.push("addressMan");
    }
  },
  computed:{
    ...mapState("user",["info"])
  }
}
</script>
<style >
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

    .user{
      overflow-x: hidden;
    }
    .photo{
      background-color: #ffffff;
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
        border-bottom: 1px solid #ededed;
    }
    a{
      font-size: 12px;
      margin-left: 30px;
    }
</style>