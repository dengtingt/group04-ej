<template>
  <div class="order">
    <h2>订单管理</h2>
    <!-- 表格 -->
    <div class="orderDatails">
      <el-tabs>
        <!-- 所有订单 -->
        <el-tab-pane label="所有订单" name="">
          <el-table :data="orders1" size="mini">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="waiter.realname" label="员工编号" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
            <!-- <el-table-column label="操作" prop="orders.waiters" width="300px">
              <template #default="record">
                <el-button size="mini" type="success" icon="el-icon-view" circle @click="toDetailsHandler(record.row)" />
              </template>
            </el-table-column> -->
          </el-table>
        </el-tab-pane>
        <!-- /所有订单 -->
        <!-- 待派单 -->
        <el-tab-pane label="待派单" name="">
          <el-table :data="ordersStatusFilter('待派单')">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作" width="300px">
              <template #default="record">
                  <el-button type="primary" plain size="small" @click.prevent="sendOrderHanlder(record.row.id)">派单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- /待派单 -->
        <!-- 模态框 -->
        <el-dialog title="派单" :visible.sync="visible" width="30%" :before-close="closeModal">
          <el-radio-group v-model="waiterId">
            <el-radio v-for="c in waiters1" :key="c.id" :label="c.id">{{c.username}}</el-radio>
          </el-radio-group>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeModal()" size="small">取 消</el-button>
            <el-button type="primary" @click="ToSend" size="small">确 定</el-button>
          </span>
        </el-dialog>
        <!-- /模态框 -->
        <!-- 待接单 -->
        <el-tab-pane label="待接单" name="">
          <el-table :data="ordersStatusFilter('待接单')">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="waiter.realname" label="员工编号" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作" prop="waiters" width="300px">
              <template #default="record">
                <el-button type="primary" plain size="small" @click.prevent="cancelOrderHandler(record.row.id)">取消派单</el-button>
                <!-- <a href="" @click.prevent="cancelOrderHandler(record.row.id)">取消派单</a>&nbsp; -->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- /待接单 -->
        <!-- 待服务 -->
        <el-tab-pane label="待服务" name="">
          <el-table :data="ordersStatusFilter('待服务')">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="waiter.realname" label="员工编号" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
          </el-table>
        </el-tab-pane>
        <!-- /待服务 -->
        <!-- 待确认 -->
        <el-tab-pane label="待确认" name="">
          <el-table :data="ordersStatusFilter('待确认')">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="waiter.realname" label="员工编号" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
          </el-table>
        </el-tab-pane>
        <!-- /待确认 -->
        <!-- 已完成 -->
        <el-tab-pane label="已完成" name="">
          <el-table :data="ordersStatusFilter('已完成')">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="waiter.realname" label="员工编号" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
          </el-table>
        </el-tab-pane>
        <!-- /已完成 -->
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      order: {},
      ids: {},
      orderId: '',
      waiterId: '',
      value: ''
    }
  },
  computed: {
    ...mapState('order', ['orders1', 'visible', 'title', 'loading', 'waiters1', 'id']),
    ...mapGetters('order', ['orderOrder', 'orderSize', 'ordersStatusFilter'])
  },
  created() {
    this.findAllOrders()
    this.findAllwaiters()
  },
  methods: {
    ...mapMutations('order', ['changeId', 'showModal', 'closeModal', 'setTitle', 'findWaiters']),
    ...mapActions('order', ['findAllOrders', 'saveOrUpdateOrder', 'deleteOrderById', 'batchDeleteOrder', 'findAllwaiters', 'sendOrder', 'orderCancelHandler']),
    // 普通方法
    // toDetailsHandler(order) {
    //   this.$router.push({
    //     path: '/orders/datailsOrders',
    //     query: { orders: order }
    //   })
    // },
    sendOrderHanlder(id) {
      this.ids.orderId = id
      this.showModal()
      // this.changeId(a)
    },
    ToSend() {
      this.ids.waiterId = this.waiterId
      const promise = this.sendOrder(this.ids)
      promise.then((response) => {
        this.$message({ type: 'success', message: response.statusText })
      })
      this.closeModal()
      this.findAllOrders()
    },
    cancelOrderHandler(id) {
      // console.log(id);
      const promise = this.orderCancelHandler(id)
      promise.then((response) => {
        this.$message({ type: 'success', message: response.statusText })
      })
      this.findAllOrders()
    }
  }
}

</script>
<style scoped>

</style>
