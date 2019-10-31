<template>
<div id="confirmorder">
    <div>
        <van-nav-bar title="确认订单" left-text="返回" left-arrow  
            @click-left="onClickLeft">
                <van-icon name="search" slot="right" />
            </van-nav-bar>
    </div>
    <div>
       <!-- 地址 -->
      <van-row class="line">
        <van-col :span="6" class="line-left">
          <van-icon name="location-o" />
        </van-col>
        <van-col :span="18" class="line-right">
          <div class="label">服务地址</div>
          <div @click="addressHandler">
            {{realname}} {{address[0].telephone}}
            <br>
           {{address[0].province}}{{address[0].city}}{{address[0].area}}{{address[0].address}}
          </div>
        </van-col>
      </van-row>
      <!-- 订单项 -->
      <van-row class="line">
        <van-col :span="6" class="line-left">
          <van-icon name="balance-list-o" />
        </van-col>
        <van-col :span="18" class="line-right">
          <div class="label">订单详情</div>
          <div>
            <van-row>
              <van-col :span="8"></van-col>
              <van-col :span="4"></van-col>
              <van-col :span="4">x</van-col>
              <van-col :span="8">￥</van-col>
            </van-row>
            
            <van-row style="border-top:1px dotted #ededed">
              <van-col :span="16"></van-col>
              <van-col :span="8"></van-col>
            </van-row>
            
          </div>
        </van-col>
      </van-row>
      <!-- 服务时间 -->
      <van-row class="line">
        <van-col :span="6" class="line-left">
          <van-icon name="clock-o" />
        </van-col>
        <van-col :span="18" class="line-right">
          <div class="label">服务时间</div>
          <div>
          </div>
        </van-col>
      </van-row>
      <!-- 支付方式 -->
      <van-row class="line">
        <van-col :span="6" class="line-left">
          <van-icon name="gold-coin-o" />
        </van-col>
        <van-col :span="18" class="line-right">
          <div class="label">支付方式</div>
          <div>第三方平台（支付宝）</div>
        </van-col>
      </van-row>
      <van-popup  position="bottom">
        <van-datetime-picker type="datetime"/>
      </van-popup>
    </div>
</div>
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    data() {
        return {
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back();
        },
        addressHandler(){
        this.$router.push('./address');
      },
     ...mapActions("address",["findAddressByCustomerId","findCustomer"]),
     ...mapActions("user",["findUser"]),
    },
    computed: {
       ...mapState("user",["info","token"]),
       ...mapState("address",["address","realname"])
    },
    created() {
         this.findAddressByCustomerId(this.info.id);
         this.findUser(this.token)
         this.findCustomer(this.info.id)
         
    },
}
</script>
<style scoped>
        .line >.line-left {
            padding: 1em 0 ;
            text-align: center ;
            font-size: 24px ;
        }
        .line  .line-right {
            padding: 1em 0 ;
            border-bottom: 1px solid #ccc ;
        }
        .line  .line-right > .label {
            font-size: 12px ;
            font-weight: bold ;
            color: #999 ;
            line-height: 2em ;
        }
</style>