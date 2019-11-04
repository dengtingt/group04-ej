<template>
  <div class="customerDetails">
    <h2>员工详情</h2>
    <!-- {{messages}} -->
    <el-button size="small" type="text" @click="backHandler">返回</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info">
        <el-table :data="waiters">
          <el-table-column prop="id" label="编号" />
          <el-table-column prop="username" label="用户名" />
          <el-table-column prop="realname" label="真实姓名" />
          <el-table-column prop="password" label="密码" />
          <el-table-column prop="telephone" label="电话号码" />
          <el-table-column prop="qq" label="qq号码" />
          <el-table-column prop="wxid" label="微信" />
          <el-table-column prop="gender" label="性别" />
          <el-table-column prop="enabled" label="是否能派单" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="登录信息" name="login">
        <el-table :data="waiters">
          <el-table-column prop="registerTime" label="登录时间" />
          <el-table-column prop="lastLoginTime" label="退出时间" />
          <el-table-column prop="lastLoginIp" label="上一次登录ip" />
          <el-table-column prop="registerIp" label="注册ip" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="身份信息" name="id">
        <el-table :data="waiters">
          <el-table-column prop="idCard" label="登录时间" />
          <el-table-column prop="idcardPhotoPositive" label="退出时间" />
          <el-table-column prop="idcardPhotoNegative" label="上一次登录ip" />
          <el-table-column prop="bankCard" label="注册ip" />
          <el-table-column prop="bankCardPhoto" label="注册ip" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="地址信息" name="address">
        <el-table :data="waiters">
          <el-table-column prop="province" label="省份" />
          <el-table-column prop="city" label="城市" />
          <el-table-column prop="area" label="地区" />
          <el-table-column prop="rank" label="小区" />
        </el-table>
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
    const message = this.$route.query.id
    // 通过id查询顾客，订单，地址
  },
  computed: {
    ...mapState('waiter', ['waiters'])
  },
  methods: {
    ...mapActions('address', ['findAddressByCustomerId']),
    backHandler() {
      this.$router.go(-1)
    }
  }

}
</script>
<style lang="">

</style>
