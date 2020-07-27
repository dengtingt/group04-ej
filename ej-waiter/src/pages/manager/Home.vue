<template>
  <div class="home">
    <van-row>
      <img style="width:100%" src="../../assets/images/home_02.jpg" alt="">
    </van-row>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState("user",["info"])
  }
}
</script>
<style scoped>
.tp{
  height: 200px;
  width: 200px;
}
img{
 height: 100%;
 width: 100%;
}
</style>