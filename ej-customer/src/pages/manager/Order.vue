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
        <div class="allOrder" v-for="item in AllOrders" :key="item.id">
          <van-row>
            <van-col span="7"><img src="https://img.yzcdn.cn/vant/t-thirt.jpg" alt=""></van-col>
            <van-col span="15">
              <p>下单时间：{{orderTime(item.orderTime)}}</p>
              <p>总额：￥{{item.total}}</p>
              <p>进度：{{item.status}}</p>
            </van-col>
          </van-row>
        </div>
      </van-tab>
      <van-tab title="待付款">内容 2</van-tab>
      <van-tab title="待服务">内容 3</van-tab>
      <van-tab title="待确认">内容 4</van-tab>
      <van-tab title="已完成">内容 5</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from "moment";
export default {
  data(){
    return{
      active:0
    }
  },
  computed:{
    ...mapState("order",["AllOrders"]),
    ...mapState("user",["info"])
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
      line-height: 2em
    }
    img{
      width: 100px;
      height: 90px;
    }
    .allOrder p:nth-child(2){
      color: red;
    }

</style>