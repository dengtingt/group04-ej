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
            {{realname}} {{address.telephone}}
            <br>
           {{address.province}}{{address.city}}{{address.area}}{{address.address}}
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
            <van-row v-for="line in shopcar" :key="line.productId">
              <van-col :span="8">{{line.productName}}</van-col>
              <van-col :span="4">￥{{line.price}}</van-col>
              <van-col :span="4">x{{line.number}}</van-col>
              <van-col :span="8">￥{{line.number*line.price}}</van-col>
            </van-row>
            
            <van-row style="border-top:1px dotted #ededed">
              <van-col :span="16"></van-col>
              <van-col :span="8">￥{{shopprice/100}}</van-col>
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
          <div @click="()=>{this.show = true}">
            {{currentDate}}
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
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker v-model="currentDate" type="datetime"/>
      </van-popup>
      <!-- 确认订单 -->
      <div style="position:fixed;bottom:0;width:100%" >
        <van-button  type="info" size="large" @click="confirmOrderHandler">确认订单</van-button>
      </div>
    </div>
</div>
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    data() {
        return {
          currentDate:new Date(),
          show:false
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1);
        },
        addressHandler(){
            this.$router.push('./address');
         },
       confirmOrderHandler(){
            // 保存订单
            let order = {
              customerId:this.info.id,
              addressId:this.address.id,
              orderLines:this.shopcar
            }
            this.saveOrder(order)
            .then(()=>{
              alert("恭喜你,提交成功")
              this.$router.push("order")
            });   
    },
         ...mapActions("address",["findAddressByCustomerId","findCustomer"]),
         ...mapActions("user",["findUser"]),
         ...mapActions("order",["saveOrder"])
    },
    
    computed: {
      ...mapState("product",["shopcar"]),
      ...mapGetters("product",["shopprice"]),
       ...mapState("user",["info","token"]),
       ...mapState("address",["realname","address"]),
       ...mapState("order",["message"])
    },
    created() {
       this.findUser(this.token).then(()=>{
         this.findAddressByCustomerId(this.info.id);
          this.findCustomer(this.info.id);
       })
        
        
         
         
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