<template>
  <div class="home">
    首页
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