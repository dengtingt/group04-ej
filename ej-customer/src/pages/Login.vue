<template>
  <div id="login">
    <div class="login_header">
      <div><i class="iconfont icon-xingzhuang"></i></div>
      <div>hy电器·顾客端</div>
    </div>
    <div class="background">
      <van-cell-group class="form">
        <van-field
          v-model="user.username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />
        <van-field
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
        <van-button class="btn" size="large"  plain round type="primary" @click="loginyz">登录</van-button>
        <van-button class="btn" size="large"  plain  round type="info" @click="register">马上注册</van-button>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      user:{
        type:"customer"
      }
    }
  },
  created() {

  },
  methods: {
    ...mapActions("user",["login"]),
    loginyz(){
      this.login(this.user)
      .then((response)=>{
        if(response.status === 200){
          // this.$notify({
          //   message:"success",
          //   color:"yellow"
          // })
           this.$router.push("home")
        }else{
          this.$notify({
            message:"用户名或密码错误",
            color:"red"
          })
        }
      })
    },
    register(){
      this.$router.push("register")
    }
  },
  computed: {
    
  },
}
</script>
<style>
  .iconfont{
    font-size: 40px;
  }
  .login_header{
    background: #48D1CC;
    color: #fff;
    font-size: 26px;
    text-align: center;
    padding: 60px;
  }
  #login{
    position: relative;
  }
  .background{
    position: absolute;
    top: 200px;
    width: 100%;
    padding: 50px 0;
    background: #fff;
  }
  .btn{
    margin-top: 10px;
    cursor: pointer;
  }
</style>