<template>
  <div class="login">
    <div class="login_header">
      <div><i class="iconfont icon-xingzhuang"></i></div>
      <div>hy电器·员工端</div>
      <!-- <span>hy电器·员工端</span> -->
    </div>
    <!-- 图标 -->
    <!-- <div class="tb">
       <van-icon name="friends-o" />
    </div> -->
    <!-- 输入框 -->
    <div class="background">
      <van-cell-group class="form">
        <van-field
          v-model="form.username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />
        <van-field
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
        <van-button class="btn" size="large"  plain round type="primary" @click="loginHandler">登录</van-button>
        <!-- <van-button class="btn" size="large"  plain  round type="info" @click="register">马上注册</van-button> -->
      </van-cell-group>
    </div>
    <!-- <div class="dl">
      <van-cell-group>
        <van-field size="small" v-model="form.username" label="用户名：" placeholder="请输入用户名" />
      </van-cell-group>
      <van-cell-group>
        <van-field size="small" v-model="form.password" label="密码：" placeholder="请输入密码" />
      </van-cell-group>
    </div> -->
    <!-- 登录按钮 -->
    <!-- <div class="btn">
      <van-button type="info" size="large"  @click="loginHandler">登录</van-button>
    </div> -->
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      form:{
        type:'waiter'
      },
    }
  },
  methods:{
    ...mapActions("user",["login"]),
    loginHandler(){
      this.login(this.form)
      .then((response)=>{ 
        if(response.status === 200){
          // this.$notify({
          //   message:"success",
          //   color:"yellow"
          // })
           this.$router.push("/home")
        }else{
          this.$notify({
            message:"用户名或密码错误",
            color:"red"
          })
        }
       })
    }
  }
}
</script>
<style scoped>
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
  /* .title{
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    line-height: 50px;
    color:lightskyblue;
  }
  .tb{
    text-align: center;
    font-size: 120px;
    color:lightskyblue;
    margin-top: 30px;

  }
  .btn{
    text-align: center;
    margin-top: 20px;
  } */
</style>