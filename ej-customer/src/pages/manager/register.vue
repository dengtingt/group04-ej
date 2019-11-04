<template>
  <div class="register">
      <div>
          <van-nav-bar
                title="标题"
                left-text="返回"
                right-text=""
                left-arrow
                @click-left="onClickLeft"
               
        />
      </div>
      <div>
          <van-cell-group>
                <van-field
                    v-model="form.username"
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                />

                 <van-field
                        v-model="form.realname"
                         clearable
                        label="姓名"
                        placeholder="请输入姓名"
                      
                    />
                <van-field
                    v-model="form.password"
                    type="password"
                    label="密码"
                     clearable
                    placeholder="请输入密码"
                   
                />
                    <van-field
                        v-model="form.telephone"
                        label="手机号"
                         clearable
                        placeholder="请输入手机号"
                    />
         </van-cell-group>
         <van-button class="btn" size="large"  plain round type="primary" @click="submit">提交</van-button>
      </div>
  </div>
</template>

<script>
import { post } from '../../http/axios'
export default {
    data() {
        return {
        form:{
            realname:"",
            password:""
        }
        }
    },
    created() {
        
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
       async  submit(){
            
          let response = await  post('/customer/saveOrUpdate',this.form);
            this.form = {};
             this.$router.push("login");
        }
    },
    computed: {
        
    },
}
</script>

<style>

</style>