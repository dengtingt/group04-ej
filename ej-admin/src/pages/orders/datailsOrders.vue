<template>
  <div class="orderDatails">
    <el-button type="primary" size="small" @click="backHandler">返回</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane label="所有订单" name="" />
      <el-tab-pane label="待支付" name="" />
      <el-tab-pane label="待派单" name="">
        待派单
      </el-tab-pane>
      <el-tab-pane label="待接单" name="">
        待接单
      </el-tab-pane>
      <el-tab-pane label="待服务" name="">
        待服务
      </el-tab-pane>
      <el-tab-pane label="待确认" name="">
        待确认
      </el-tab-pane>
      <el-tab-pane label="已完成" name="">
        已完成
      </el-tab-pane>
    </el-tabs>
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
    const orders = this.$route.query.orders
    this.find()
  },
  computed: {
    ...mapState('order', ['dindan'])
  },
  methods: {
    ...mapActions('order', []),
    ...mapMutations('order', []),
    backHandler() {
      this.$router.go(-1)
    }

  }
}
</script>
<style lang="">

</style>
