<template>
  <div class="productDetails">
    <h2>产品详情</h2>
    <el-button size="small" type="text" @click="backHandler">返回</el-button>
    <p><strong>产品单价：</strong>{{ products.price }}</p>
    <p><strong>产品介绍：</strong>{{ products.description }}</p>
    <p><strong>产品状态：</strong>{{ products.status }}</p>
    <p><strong>产品栏目名称：</strong>{{ products.category.name }}</p>
    <p><strong>产品介绍：</strong></p>
    <p><strong>产品主图：</strong>
      <img :src="products.photo" alt="">
    </p>
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
<style lang="">

</style>
