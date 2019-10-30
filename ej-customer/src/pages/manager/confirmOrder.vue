<template>
<div id="confirmorder">
    <div>
        <van-nav-bar title="确认订单" left-text="返回" left-arrow  
            @click-left="onClickLeft">
                <van-icon name="search" slot="right" />
            </van-nav-bar>
    </div>
    <div>
    <!-- 居中 -->
    <br>
    <br>
        <van-row type="flex" justify="right">
            <van-col span="6"><van-icon name="location-o"  size="2em"/></van-col>
            <van-col span="18">
                <div class="label">服务地址</div>
                <div class="label">{{info.name}}</div>
                <div class="label" @click="addressHandler">
                    {{address[0].province}}{{address[0].city}}{{address[0].area}}{{address[0].address}}
                </div>
            </van-col>
        </van-row>
        <br>
        <br>
        <van-row type="flex" justify="center">
            <van-col span="6"><van-icon name="balance-list-o"  size="2em"/></van-col>
            <van-col span="18">
                <div class="label">订单详情</div>
             <div>
                    <van-row>
                    <van-col :span="8">物品名称</van-col>
                    <van-col :span="4">单价</van-col>
                    <van-col :span="4">x数量</van-col>
                    <van-col :span="8">￥该种产品总价</van-col>
                    </van-row>
                    
                    <van-row style="border-top:1px dotted #ededed">
                    <van-col :span="16"></van-col>
                    <van-col :span="8">总价</van-col>
                    </van-row> 
          </div>
            </van-col>
        </van-row>
        <br>
        <br>
        <van-row type="flex" justify="center">
            <van-col span="6"><van-icon name="underway-o" /></van-col>
            <van-col span="18">
                <div class="label">服务时间</div>
                <div>当前时间</div>
            </van-col>
        </van-row>
        <br>
        <br>
        <br>
        <van-row type="flex" justify="center">
            <van-col span="6"><van-icon name="balance-o" /></van-col>
            <van-col span="18">
                <div class="label">支付方式</div>
                <div>第三方平台(支付宝)</div>
            </van-col>
           
        </van-row>
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
        ...mapActions("user",["findUser"]),
        ...mapActions("address",["findAddressByCustomerId"]),
    },
    computed: {
      ...mapState("user",["info"]),
      ...mapState("login",["token"]),
       ...mapState("address",["address"])
    },
    created() {
        this.findUser(this.token),
        this.findAddressByCustomerId(this.info.id);
    },
}
</script>