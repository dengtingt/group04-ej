<template>
  <div class="waiter">
    <!-- 按钮 -->
    <div>
      <el-button size="small" type="danger">批量审核</el-button>
    </div>
    <!-- 表格 -->
    <div v-loading="loading">
      <el-table :data="waiters" size="mini">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="realname" label="姓名" />
        <el-table-column prop="telephone" label="手机号" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="record">
            <el-button size="mini" type="success" icon="el-icon-view" circle @click="toDetailsHandler(record.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- /表格 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      waiter: {},
      ids: {}
    }
  },
  computed: {
    ...mapState('waiter', ['waiters', 'visible', 'title', 'loading']),
    ...mapGetters('waiter', ['orderWaiter', 'waiterSize'])
  },
  created() {
    this.findAllWaiters()
  },
  methods: {
    ...mapMutations('waiter', ['showModal', 'closeModal', 'setTitle']),
    ...mapActions('waiter', ['findAllWaiters']),
    // 普通方法
    toDetailsHandler(id) {
      // 跳转到详情页面
      // console.log("id::::::::",id);
      this.$router.push({
        path: '/waiter/detailsWaiter',
        query: { id }
      })
    },
    submitHandler() {
      // 校验
      this.$refs.waiterForm.validate((valid) => {
        // 如果校验通过
        if (valid) {
          const promise = this.saveOrUpdateWaiter(this.waiter)
          promise.then((response) => {
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
            this.$message({ type: 'success', message: response.statusText })
          })
        } else {
          return false
        }
      })
    }
  }

}
</script>
<style scoped>

</style>
