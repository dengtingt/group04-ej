<template>
  <div class="order">
    <!-- <div class="dingd">订单管理</div> -->
    <!-- 标题 -->
    <div class="title">
        <van-nav-bar
          title="我的订单"
        />
    </div>
 
    <!-- 标签页 -->
    <van-tabs :active="active" bind:change="onChange">
      <van-tab title="全部">
        <!-- 全部订单列表 -->
        <briup-order-item v-for='order in form' :key="order.id"  :data='order'></briup-order-item>
      </van-tab>
      <van-tab title="待接单">
        <!-- <briup-order-item v-for='order in ordersStatusFilter("待派单")' :key="order.id"  :data='order'></briup-order-item> -->
        <briup-order-item v-for='order in ddHandler("待接单")' :key="order.id"  :data='order'>
          <van-button class="btn" round plain type="warning" size="mini" @click="acceptorder(order.id)">接单</van-button>
          <van-button class="btn" round plain type="info" size="mini" @click="rejectorder(order.id)">拒单</van-button>
        </briup-order-item>
         <!-- <briup-order-item v-for='order in ordersStatusFilter("待服务")' :key="order.id"  :data='order'></briup-order-item> -->
      </van-tab>
      <van-tab title="待服务">
        <!-- 待确认订单列表 -->
        <briup-order-item v-for='order in ddHandler("待服务")' :key="order.id"  :data='order'>
          <van-button class="btn" round plain type="warning" size="mini" @click="serviceCompleteOrder(order.id)">结束服务</van-button>
        </briup-order-item>
      </van-tab>
      <van-tab title="待确认">
        <!-- 待确认订单列表 -->
        <briup-order-item v-for='order in ddHandler("待确认")' :key="order.id"  :data='order'>
          <!-- <van-button class="btn" round plain type="warning" size="mini" @click="serviceCompleteOrder(order.id)">结束服务</van-button> -->
        </briup-order-item>
      </van-tab>
      <van-tab title="已完成">
        <!-- 已完成订单列表 -->
        <briup-order-item v-for='order in ddHandler("已完成")' :key="order.id"  :data='order'>
          <!-- <van-button class="btn" round plain type="info" size="mini" @click="deleteHandler(order.id)">删除订单</van-button> -->
          <!-- <van-button class="btn" round plain type="warning" size="mini" @click="comment(order)">评价</van-button> -->
        </briup-order-item>
      </van-tab>
    </van-tabs>
    <!-- <div class="head">
      <van-tabs v-model="active" class="style"   >
        <van-tab title="所有订单">
           <div v-for=" a in form"  :key="a.id" >
               <div class="van-cell van-panel__header">
                  <div class="van-cell__title">
                    <span>{{"订单id:"+a.id}}</span>
                  </div>
                  <div class="van-cell__value van-panel__header-value">
                     <span>{{a.status}}</span>
                  </div>
              </div>
              <div class="van-panel__content">
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                       <i class="van-icon van-icon-gem-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"总价:"+a.total}}</div>
                  </div>
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                        <i class="van-icon van-icon-clock-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"订单时间:"+a.orderTime}}</div>
                  </div>
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                        <i class="van-icon van-icon-clock-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"员工Id："+a.waiterId}}</div>
                  </div>
                  <div class="van-row">
                    <div class="van-col van-col--4" style="text-align: center;">
                      <i class="van-icon van-icon-location-o"></i>
                    </div>
                    <div class="van-col van-col--20">{{"地址："+a.addressId}}</div>
                    </div>
                  </div>
                  <div class="van-panel__footer van-hairline--top">
                    <div style="text-align: right;"></div></div>
             </div>
            
          </van-tab>
          <van-tab title="未接订单">
                <div  v-for=" a in ddHandler('待接单')" :key="a.id" >
                  <div class="van-cell van-panel__header">
                  <div class="van-cell__title">
                    <span>{{"订单id："+a.id}}</span>
                  </div>
                  <div class="van-cell__value van-panel__header-value">
                     <span>{{a.status}}</span>
                  </div>
              </div>
              <div class="van-panel__content">
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                       <i class="van-icon van-icon-gem-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"总价:"+a.total}}</div>
                  </div>
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                        <i class="van-icon van-icon-clock-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"订单时间:"+a.orderTime}}</div>
                  </div>
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                        <i class="van-icon van-icon-clock-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"员工Id："+a.waiterId}}</div>
                  </div>
                  <div class="van-row">
                    <div class="van-col van-col--4" style="text-align: center;">
                      <i class="van-icon van-icon-location-o"></i>
                    </div>
                    <div class="van-col van-col--20">{{"地址："+a.addressId}}</div>
                    </div>
                  </div>
                  <div class="van-panel__footer van-hairline--top">
                      <div style="text-align: right;">
                        <van-button size="small" plain hairline type="danger"
                         @click="rejectorder(a.id)" >拒绝</van-button>
                        &nbsp;
                        <van-button size="small" plain hairline type="info" 
                         @click="acceptorder(a.id)" >接受</van-button>
                      </div>
                  </div>
                </div>
          </van-tab>
          <van-tab title="已接订单">
            <div  v-for=" a in ddHandler('待服务')" :key="a.id" >
              
              <div class="van-cell van-panel__header">
                  <div class="van-cell__title">
                    <span>{{"订单id："+a.id}}</span>
                  </div>
                  <div class="van-cell__value van-panel__header-value">
                     <span>{{a.status}}</span>
                  </div>
              </div>
              <div class="van-panel__content">
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                       <i class="van-icon van-icon-gem-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"总价:"+a.total}}</div>
                  </div>
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                        <i class="van-icon van-icon-clock-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"订单时间:"+a.orderTime}}</div>
                  </div>
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                        <i class="van-icon van-icon-clock-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"员工Id："+a.waiterId}}</div>
                  </div>
                  <div class="van-row">
                    <div class="van-col van-col--4" style="text-align: center;">
                      <i class="van-icon van-icon-location-o"></i>
                    </div>
                    <div class="van-col van-col--20">{{"地址："+a.addressId}}</div>
                    </div>
                  </div>
                  <div class="van-panel__footer van-hairline--top">
                      <div style="text-align: right;">
                        <van-button size="small" plain hairline type="primary"
                         @click="serviceCompleteOrder(a.id)" >结束服务</van-button>  
                      </div>
                  </div>
            </div>
          </van-tab>
          <van-tab title="待确认">
             <div  v-for=" a in ddHandler('待确认')" :key="a.id" >
              
              <div class="van-cell van-panel__header">
                  <div class="van-cell__title">
                    <span>{{"订单id："+a.id}}</span>
                  </div>
                  <div class="van-cell__value van-panel__header-value">
                     <span>{{a.status}}</span>
                  </div>
              </div>
              <div class="van-panel__content">
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                       <i class="van-icon van-icon-gem-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"总价:"+a.total}}</div>
                  </div>
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                        <i class="van-icon van-icon-clock-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"订单时间:"+a.orderTime}}</div>
                  </div>
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                        <i class="van-icon van-icon-clock-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"员工Id："+a.waiterId}}</div>
                  </div>
                  <div class="van-row">
                    <div class="van-col van-col--4" style="text-align: center;">
                      <i class="van-icon van-icon-location-o"></i>
                    </div>
                    <div class="van-col van-col--20">{{"地址："+a.addressId}}</div>
                    </div>
                  </div>
                  <div class="van-panel__footer van-hairline--top">
                      <div style="text-align: right;">
                      </div>
                  </div>
            </div>
          </van-tab>
          <van-tab title="完成订单" >
            <div   v-for=" a in ddHandler('已完成')" :key="a.id" >
              
               <div class="van-cell van-panel__header">
                  <div class="van-cell__title">
                    <span>{{"订单id："+a.id}}</span>
                  </div>
                  <div class="van-cell__value van-panel__header-value">
                     <span>{{a.status}}</span>
                  </div>
              </div>
              <div class="van-panel__content">
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                       <i class="van-icon van-icon-gem-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"总价:"+a.total}}</div>
                  </div>
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                        <i class="van-icon van-icon-clock-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"订单时间:"+a.orderTime}}</div>
                  </div>
                  <div class="van-row">
                      <div class="van-col van-col--4" style="text-align: center;">
                        <i class="van-icon van-icon-clock-o"></i>
                      </div>
                      <div class="van-col van-col--20">{{"员工Id："+a.waiterId}}</div>
                  </div>
                  <div class="van-row">
                    <div class="van-col van-col--4" style="text-align: center;">
                      <i class="van-icon van-icon-location-o"></i>
                    </div>
                    <div class="van-col van-col--20">{{"地址："+a.addressId}}</div>
                    </div>
                  </div>
                  <div class="van-panel__footer van-hairline--top">
                      <div style="text-align: right;">
                        <van-button size="small" plain hairline type="primary"
                         @click="deleteorder(a.id)" >删除订单</van-button>  
                      </div>
                  </div>
            </div>
          </van-tab>
      </van-tabs> 
    </div> -->
    
    
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
// import { reject } from 'q';
export default {
    data(){
      return{
        active:0,
        // order:[]
      }
    },
    created(){
      this.loadDate(this.info.id);
    },
    computed:{
      ...mapState("order",["form"]),
      ...mapState("user",["info"]),
      ...mapGetters("order",["ddHandler"])
    },
    methods:{
      ...mapActions("order",["loadDate","findAll","reject","accept","service","delete"]),
      // 标签页切换  
      onChange(event) {
        wx.showToast({
          title: `切换到标签 ${event.detail.name}`,
          icon: 'none'
        });
      },
      // 拒单
      rejectorder(id){
        this.reject(id).then(()=>{
        //  alert(res.statusText)
         this.loadDate(this.info.id);
        })
      },
      // 接单
      acceptorder(id){
        this.accept(id).then(()=>{
        //  alert(res.statusText)
         this.loadDate(this.info.id);
        })
      },
      // 结束服务
      serviceCompleteOrder(id){
        this.service(id).then(()=>{
        //  alert(res.statusText)
         this.loadDate(this.info.id);
        })
      },
      // deleteorder(id){
      //   this.delete(id).then((res)=>{
      //    alert(res.statusText)
      //    this.loadDate();
      //   })
      // }

    }
}
</script>
<style scoped>
  /* .order{
    background-color: #ccc;
  } */
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

    .order{
      margin-bottom: 50px;
      background: #f1f1f1;
    }
    .title{
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .btn{
      width: 70px;
      height: 25px;
      margin-top: 10px;
    }
  
</style>