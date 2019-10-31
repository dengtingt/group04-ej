<template>
    <div class="editAddress">
        <!-- 头部 -->
        <div class="header">
            <div class="header">
                <van-nav-bar
                    :title="title"
                    left-text="返回"
                    left-arrow
                    @click-left="backHandler"
                />
            </div>
        </div>
        <!-- 内容 -->
        <div class="content">
            <van-address-edit
                :model="content"
                :area-list="areaList"
                show-delete
                show-set-default
                @save="onSave"
                @delete="onDelete"
            />
        </div>
    </div>
</template>

<script>
import { mapActions,mapState } from 'vuex';
import areaList from '../../utils/areaList.js'
export default {
    data(){
        return{
            areaList
        }
    },
    computed:{
      
      // 映射，将vuex state中的状态映射为vue中的属性
      ...mapState("address",["addresses"]),
      ...mapState("user",["info"]),
      ...mapState("editAddress",["title","content"])
    },
    methods:{
        ...mapActions("editAddress",["deleteAddressById","saveAddress"]),
        backHandler(){
            this.$router.push('./address');
        },
        onSave(e) {
            let data = {};
            data.tel = e.tel;
            data.province = e.province;
            data.city = e.city;
            data.area = e.county;
            data.address = e.addressDetail;
            data.customerId = this.info.id;
            console.log(data)
            this.saveAddress(data)
            .then((response)=>{
                // this.$message({type:"success",message:response.statusText});
                this.$router.push('./address');
            })
        },
        onDelete() {
            this.deleteAddressById(this.addresses.id)
            .then((response)=>{
                // this.$message({type:"success",message:response.statusText});
                this.$router.push('./address');
            })
        }
    },
    created() {
          let address = this.$route.params.item;
          console.log(address)
    },
}
</script>

<style scoped>
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

</style>