<template>
  <div class="order">
    <!-- 标题 -->
    <div class="title">
        <van-nav-bar
          title="我的订单"
        />
    </div>
    <!-- 标签页 -->
    <van-tabs :active="active" bind:change="onChange">
      <van-tab title="全部">
        <!-- 全部订单列表 -->
        <briup-order-item v-for='order in AllOrders' :key="order.id"  :data='order'></briup-order-item>
      </van-tab>
      <van-tab title="待支付">
        <!-- 待支付订单列表 -->
        <briup-order-item v-for='order in ordersStatusFilter("待支付")' :key="order.id"  :data='order'>
          <van-button class="btn" round plain type="warning" size="mini" @click="comment">支付</van-button>
        </briup-order-item>
      </van-tab>
      <van-tab title="待服务">
        <briup-order-item v-for='order in ordersStatusFilter("待派单")' :key="order.id"  :data='order'></briup-order-item>
         <briup-order-item v-for='order in ordersStatusFilter("待接单")' :key="order.id"  :data='order'></briup-order-item>
         <briup-order-item v-for='order in ordersStatusFilter("待服务")' :key="order.id"  :data='order'></briup-order-item>
      </van-tab>
      <van-tab title="待确认">
        <!-- 待确认订单列表 -->
        <briup-order-item v-for='order in ordersStatusFilter("待确认")' :key="order.id"  :data='order'>
          <van-button class="btn" round plain type="warning" size="mini" @click="confirmHandler(order.id)">确认订单</van-button>
        </briup-order-item>
      </van-tab>
      <van-tab title="已完成">
        <!-- 已完成订单列表 -->
        <briup-order-item v-for='order in ordersStatusFilter("已完成")' :key="order.id"  :data='order'>
          <van-button class="btn" round plain type="info" size="mini" @click="deleteHandler(order.id)">删除订单</van-button>
          <van-button class="btn" round plain type="warning" size="mini" @click="comment(order)">评价</van-button>
        </briup-order-item>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState,mapGetters, mapActions } from 'vuex';
export default {
  data(){
    return{
      active:0
    }
  },
  computed:{
    ...mapState("order",["AllOrders"]),
    ...mapState("user",["info"]),
    ...mapGetters('order',['ordersStatusFilter'])
  },
  created() {
    this.findAllOrder(this.info.id)
  },
  methods:{
    ...mapActions("order",["findAllOrder","deleteOrder","confirmOrder"]),
    // 标签页切换
    onChange(event) {
      wx.showToast({
        title: `切换到标签 ${event.detail.name}`,
        icon: 'none'
      });
    },
    // 评价
    comment(order){
      this.$router.push({
        path:'./comment',
        query:{order}
      })
    },
    // 删除订单
    deleteHandler(id){
      this.deleteOrder(id)
      .then(()=>{
        this.findAllOrder(this.info.id)
      })
      
    },
    // 确认订单
    confirmHandler(id){
      this.confirmOrder(id)
      .then(()=>{
        this.findAllOrder(this.info.id)
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

    .order{
      margin-bottom: 50px;
      background: #f1f1f1;
    }
    .title{
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .btn{
      width: 70px;
      height: 25px;
      margin-top: 10px;
    }

</style>