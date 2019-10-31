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
      <van-tab title="全部订单">
        <!-- 全部订单列表 -->
        <briup-order-item v-for='order in AllOrders' :key="order.id"  :data='order'></briup-order-item>
      </van-tab>
      <van-tab title="待支付">
        <!-- 待支付订单列表 -->
        <briup-order-item v-for='order in ordersStatusFilter("待支付")' :key="order.id"  :data='order'></briup-order-item>
      </van-tab>
      <van-tab title="待服务">
        <briup-order-item v-for='order in ordersStatusFilter("待派单")' :key="order.id"  :data='order'></briup-order-item>
         <briup-order-item v-for='order in ordersStatusFilter("待接单")' :key="order.id"  :data='order'></briup-order-item>
         <briup-order-item v-for='order in ordersStatusFilter("待服务")' :key="order.id"  :data='order'></briup-order-item>
        <!-- 待确认订单列表 -->
        <briup-order-item v-for='order in ordersStatusFilter("待确认")' :key="order.id"  :data='order'></briup-order-item>
      </van-tab>
      <van-tab title="已完成">
        <!-- 已完成订单列表 -->
        <briup-order-item v-for='order in ordersStatusFilter("已完成")' :key="order.id"  :data='order'></briup-order-item>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState,mapGetters, mapActions } from 'vuex';
import moment from "moment";
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
    ...mapActions("order",["findAllOrder"]),
    // 将时间戳转换为日期
    orderTime(item){
      return moment(item).format("YYYY-MM-DD HH:mm:ss")
    },
    // 标签页切换
    onChange(event) {
      wx.showToast({
        title: `切换到标签 ${event.detail.name}`,
        icon: 'none'
      });
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
    .allOrder{
      box-sizing: border-box;
      padding: 10px;
      border-bottom: 1px solid #efefef;
      font-size: 12px;
      line-height: 2em;
      margin: 3px;
      background: #fff;
      border-radius: 8px;
    }
    img{
      width: 100px;
      height: 90px;
    }
    .allOrder p:nth-child(2){
      color: red;
    }

</style>