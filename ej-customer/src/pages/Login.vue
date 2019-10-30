<template>
  <div id="login">
    <h2>用户登录页面</h2>
    <br>
    <br>
    <br>
    <br>
    <br>
    <van-cell-group>
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
  <van-button class="login" size="large" type="primary" @click="loginyz">登录</van-button>
</van-cell-group>
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
      .then(()=>{
          this.$router.push("home")
      })
    }
  },
  computed: {
    
  },
}
</script>
<style>
  h2{
    text-align: center;
    color: blue;
  }
  .login{
    margin-top:20px ;
  }
</style>