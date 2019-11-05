<template>
  <div class="order">
    <!-- 表格 -->
    <div class="orderDatails">
      <el-tabs>
        <el-tab-pane label="所有订单" name="">
          <el-table :data="orders1" size="mini">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="waiter.realname" label="员工编号" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作" prop="orders.waiters" width="300px">
              <template #default="record">
                <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>&nbsp;
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待支付" name="">
          <el-table :data="ordersStatusFilter('待支付')">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="waiter.realname" label="员工编号" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作" prop="orders.waiters" width="300px">
              <template #default="record">
                <a href="" @click.prevent="">支付</a>&nbsp;
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
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
                <el-dropdown trigger="click" @command="waiterid">
                  <a @click.prevent="sendOrderHanlder(record.row.id)">派单</a>
                  <el-dropdown-menu slot="dropdown" width="100px">
                    <el-dropdown-item v-for="c in waiters1" :key="c.id" :command="c.id">>{{ c.realname }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
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
                <a href="" @click.prevent="cancelOrderHandler(record.row.id)">取消派单</a>&nbsp;
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待服务" name="">
          <el-table :data="ordersStatusFilter('待服务')">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="waiter.realname" label="员工编号" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作" prop="waiters" width="300px">
              <template #default="record">
                <a href="" @click.prevent="">服务</a>&nbsp;
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待确认" name="">
          <el-table :data="ordersStatusFilter('待确认')">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="waiter.realname" label="员工编号" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作" prop="waiters" width="300px">
              <template #default="record">
                <i class="el-icon-delete" href="" @click="deleteHandler(record.row.id)" /> &nbsp;
                <i class="el-icon-delete" href="" @click="deleteHandler(record.row.id)" /> &nbsp;
                <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>&nbsp;
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="">
          <el-table :data="ordersStatusFilter('已完成')">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="orderTime" label="下单时间" />
            <el-table-column prop="waiter.realname" label="员工编号" />
            <el-table-column prop="customer.realname" label="顾客编号" />
            <el-table-column prop="address.province" label="顾客地址" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作" prop="waiters" width="300px">
              <template #default="record">
                <i class="el-icon-delete" href="" @click="deleteHandler(record.row.id)" /> &nbsp;
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
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
      ids: [],
      value: '',
      daipaidan: {}

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
    toDetailsHandler(order) {
      this.$router.push({
        path: '/orders/datailsOrders',
        query: { orders: order }
      })
    },
    sendOrderHanlder(a) {
      this.changeId(a)
    },
    waiterid(command) {
      console.log(command)
      const promise = this.sendOrder(command, this.id)
      promise.then((response) => {
        this.$message({ type: 'success', message: response.statusText })
      })
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
