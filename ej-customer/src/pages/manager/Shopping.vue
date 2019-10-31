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
       <van-card  v-for="item in product" :key="item.id" 
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
    this.activeKey = this.activeKeys
    // this.categoryId = this.categories[index].id;
      this.findAllCategories();
      this.findAllProducts().then(()=>{
         this.product=this.productStatusFilter(this.categories[this.activeKey].id)
      })
     
  },
  data() {
    return {  
      product:[],
      activeKey:0,
    }
  },
  methods: {
    ...mapActions("product",["findAllProducts"]),
    ...mapActions("category",["findAllCategories"]),
    ...mapMutations("shopping",["categoryindex"]),
    ...mapMutations("product",["shopcard"]),
     findProductsHandler(index,id){
      this.product=this.productStatusFilter(id)
      this.categoryindex(index)
    },
     orderform(){
      this.$router.push("confirmOrder")
     },
     onClickLeft(){
       this.$router.back();
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