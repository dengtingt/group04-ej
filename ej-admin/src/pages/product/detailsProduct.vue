<template>
  <div class="productDetails">
    <el-button size="small" type="primary" @click="backHandler">返回</el-button>
    <div class="img">
      <img :src="products.photo" alt="">
    </div>
    <div class="cotainer">
      <p><strong>产品单价：</strong>{{ products.price }}</p>
      <p><strong>产品介绍：</strong>{{ products.description }}</p>
      <p><strong>产品状态：</strong>{{ products.status }}</p>
      <p><strong>产品栏目名称：</strong>{{ products.category.name }}</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeName: 'info'
    }
  },
  created() {
    const id = this.$route.query.id
    this.findProductByid(id)
  },
  computed: {
    ...mapState('product', ['products'])
  },
  methods: {
    ...mapActions('product', ['findAllProducts', 'findProductByid']),
    backHandler() {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
   .productDetails > .img{
     width:500px;
     height: 300px;
     overflow: hidden;
   }

   .productDetails > .biaoti{
     font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
     background-color:rgb(132, 204, 223);
     font: "Hiragino Sans GB";
     line-height: 1.7;
     font-size: 40px;
     height: 80px;
     width: 100%;
     margin: 0%;
     color:aliceblue;
   }

   .productDetails > button{
     float: left;
   }

   .productDetails .img{
     margin-left: 300px;
   }

   .cotainer{
      width: 500px;
      margin: auto;
   }

    .fill {
      object-fit: fill;
    }

    .contain {
      object-fit: contain;
    }

    .cover {
      object-fit: cover;
    }

    .none {
      object-fit: none;
    }

    .scale-down {
      object-fit: scale-down;
    }

</style>
