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
            title:"修改地址",
            areaList,
            content:{}
        }
    },
    computed:{
      // 映射，将vuex state中的状态映射为vue中的属性
      ...mapState("address",["addresses","saveAddress"])
    },
    methods:{
        ...mapActions("editAddress",["deleteAddressById"]),
        backHandler(){
            this.$router.push('./address');
        },
        onSave() {
            saveAddress(this.content);
        },
        onDelete() {
            deleteAddressById(this.address.id);
        }
    }
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