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
            <van-sidebar-item :title="c.name" v-for="c in categories" :key="c.id" @click="findProductsHandler(c.id)"/>
          </van-sidebar>
      </div>
      <!-- 右侧 -->
        
      <div class="right">
       <van-card  v-for="item in productStatusFilter(categoryId) " :key="item.id" 
                :price='item.price'
                :desc="item.description"  
                :title="item.name"
                :thumb="item.photo"
                style=" background-color:#ffffff;"
              >
              <div slot="num">
                 <van-stepper v-model="item.number" :min="0" @change="ChangerHandler(item)"/>
                </div>
                <div slot="tags" style=" border-buttom:1px soild #ededed;">
                  <van-tag plain type="danger">{{item.status}}</van-tag>
                  <van-tag plain type="danger">{{item.status}}</van-tag>
                </div>
          </van-card>
      </div>
    </div>
    <div>
      <van-submit-bar  :price="shopprice" button-text="立即下单" @submit="orderform">    
      </van-submit-bar>
    </div>
     
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
export default {
  created(){
      this.findAllCategories();
      this.findAllProducts()
    let index = this.$route.query.index;
    this.activeKey = index;
    this.categoryId = this.$route.query.id
    console.log(this.productStatusFilter(this.categoryId))
  },
  data() {
    return {  
      activeKey:0,
      categoryId:0
    }
  },
  methods: {
    ...mapActions("product",["findAllProducts"]),
    ...mapActions("category",["findAllCategories"]),
    ...mapMutations("product",["shopcard"]),
     findProductsHandler(id){
     this.categoryId = id;
    },
     orderform(){
      this.$router.push("confirmOrder")
     },
     onClickLeft(){
       this.$router.go(-1);
     },
     ChangerHandler(item){
       let line = {
        productId:item.id,
        productName:item.name,
        price:item.price,
        number:item.number
      }
      this.shopcard(line);
     }
    //  bianli(){
    //    this.product.forEach(function(item){
    //     console.log(item)
    //    })
    //  }
   },
  computed: {
    ...mapGetters("product",["productStatusFilter","shopprice"]),
    ...mapState("product",["products"]),
    ...mapState("category",["categories"]),
    ...mapState("shopping",["activeKeys"]),
   
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