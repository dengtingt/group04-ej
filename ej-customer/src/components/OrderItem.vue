<template>
    <div class="allOrder">
        <van-row>
        <van-col span="7"><img src="https://img.yzcdn.cn/vant/t-thirt.jpg" alt=""></van-col>
            <van-col span="15">
                <p>下单时间：{{data.orderTime | datefmt}}</p>
                <p>总额：￥{{data.total}}</p>
                <p>进度：{{data.status}}</p>
            </van-col>
        </van-row>
    </div>
</template>
<script>
import moment from "moment";
export default {
  props:{
    data:{type:Object}
  }
}
</script>

<style scoped>
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