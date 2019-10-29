<template>
  <div class="shopping">
    <div>
    <van-nav-bar title="商品分类" left-text="返回" left-arrow  
    @click-left="onClickLeft">
          <van-icon name="search" slot="right" />
    </van-nav-bar>
    
    </div>
    <div class="left_nav">
      <!-- 左侧 -->
      <div class="left_nav">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item :title="c.name" v-for="(c, index ) in categories" :key="c.id" @click="findProductsHandler(index,c.id)"/>
          </van-sidebar>
      </div>
      <!-- 右侧 -->
      <div class="right">
       <van-card  v-for="item in prodcut" :key="item.id"
                :price='item.price'
                :desc="item.description"  
                :title="item.name"
                :thumb="item.photo"
                style=" background-color:#ffffff;"
              >
              <div slot="num">
                 <van-stepper v-model="value" />
                </div>
                <div slot="tags" style=" border-buttom:1px soild #ededed;">
                  <van-tag plain type="danger">{{item.status}}</van-tag>
                  <van-tag plain type="danger">{{item.status}}</van-tag>
                </div>
          </van-card>
      </div>
    </div>
    <div>
      <van-submit-bar :price=0 button-text="立即下单" @submit="orderform">    
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
export default {
  created(){
    
    // this.categoryId = this.categories[index].id;
      this.findAllCategories();
      this.findAllProducts();
      this.prodcut=this.productStatusFilter(this.categories[this.activeKey].id)
  },
  data() {
    return {  
      prodcut:[],
      value: 1
    }
  },
  methods: {
    ...mapActions("product",["findAllProducts"]),
    ...mapActions("category",["findAllCategories"]),
    ...mapMutations("shopping",["categoryindex"]),
     findProductsHandler(index,id){
      this.prodcut=this.productStatusFilter(id)
      this.categoryindex(index)
    },
     orderform(){
      this.$router.push("confirmOrder")
     },
     onClickLeft(){
       this.$router.back();
     }
   },
  computed: {
    ...mapGetters("product",["productStatusFilter"]),
    ...mapState("product",["products"]),
    ...mapState("category",["categories"]),
    ...mapState("shopping",["activeKey"]),
   
    }
  
}
</script>
<style scoped>
.left_nav {
  position: fixed;
  left: 0;
}
.right{
   margin-left: 100px;
   width: 290px;
}
</style>