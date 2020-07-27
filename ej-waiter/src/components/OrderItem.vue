<template>
    <div class="allOrder">
        <van-row type="flex" justify="space-between">
            <van-col span="21">
                <div class="orderId">订单编号：{{data.id}}</div>
            </van-col>
            <van-col span="3">
                <div class="status">{{data.status}}</div>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="7"><img src="../assets/images/goods.jpg" alt=""></van-col>
            <van-col span="15">
                <p>下单时间：{{data.orderTime | datefmt}}</p>
                <p>联系方式：{{data.customer.telephone}}</p>
                <p>地址：{{data.address.province}}{{data.address.city}}{{data.address.area}}{{data.address.address}}</p>
            </van-col>
        </van-row>
        <van-row type="flex" justify="end">
            <van-col>
                <div class="total">总额：￥{{data.total}}</div>
            </van-col>
        </van-row>
        <van-row type="flex" justify="end">
            <van-col>
                <slot></slot>
            </van-col>
        </van-row>
    </div>
</template>
<script>
export default {
  props:{
    data:{type:Object}
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
.orderId{
    font-size: 14px;
    margin-bottom: 10px;
}
.status {
    color: red;
}

.allOrder{
      box-sizing: border-box;
      padding: 8px 10px;
      border-bottom: 1px solid #efefef;
      font-size: 12px;
      line-height: 2em;
      margin: 5px;
      background: #fff;
      border-radius: 8px;
    }
    img{
      width: 100px;
      height: 90px;
    }    

</style>