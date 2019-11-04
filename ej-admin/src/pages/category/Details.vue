<template>
  <div class="customerDetails">
    <h2>栏目详情</h2>
    <el-button size="small" @click="backHandler">返回</el-button>
    <el-tabs v-model="activeName">
      <el-table :data="categories.list" size="small">
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="name" label="栏目名称" />
        <el-table-column prop="num" label="序号" />
        <el-table-column label="图标">
          <template v-slot:default="record">
            <img :src="record.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="parentId" label="父栏目" />
      </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeName: 'info'
    }
  },
  created() {
    console.log(this.$route)
    const id = this.$route.query.id
    // 通过id查询顾客，订单，地址
    this.findAllCategories(this.params)
  },
  computed: {
    ...mapState('category', ['categories'])
  },
  methods: {
    ...mapActions('category', ['findAllCategories']),
    backHandler() {
      // this.$router.push("/customer")
      this.$router.go(-1)
    }
  }

}
</script>
<style scoped>

</style>
