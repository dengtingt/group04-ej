<template>
  <div class="order">
    <!-- 标题 -->
    <div class="title">
        我的订单
    </div>
    <!-- 标签页 -->
    <van-tabs :active="active" bind:change="onChange">
      <van-tab title="全部订单">
        <!-- 全部订单列表 -->
        <van-card
          num="2" 
          tag="标签"
          price="10.00"
          desc="描述信息"
          title="商品标题"
          thumb="imageURL"
        >
        </van-card>
      </van-tab>
      <van-tab title="未付款">内容 2</van-tab>
      <van-tab title="未服务">内容 3</van-tab>
      <van-tab title="待确认">内容 4</van-tab>
      <van-tab title="已完成">内容 5</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active:0
    }
  },
  methods:{
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

    .title{
        line-height: 3em;
        text-align: center;
        border-bottom: 1px solid #efefef;
    }
</style>