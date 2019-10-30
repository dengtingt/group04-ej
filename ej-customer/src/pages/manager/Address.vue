<template>
    <div class="address">
        <!-- 头部 -->
        <div class="header">
            <van-nav-bar
                title="地址列表"
                left-text="返回"
                left-arrow
                @click-left="backHandler"
            />
        </div>
        <!-- 地址信息 -->
        <div class="content">
            <van-address-list
                v-model="chosenAddressId"
                :list="addresses"
                @add="onAdd"
                @edit="onEdit"
            />
        </div>
        <!-- 确认按钮 -->
        <div class="btn" @click="saveHandler">
            <div>确认</div>
        </div>

    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{
            chosenAddressId: '0',
        }
    },
    created() {
        this.findAddressByCustomerId(this.info.id);
        // this.findCustomer(this.info.id)
    },
    computed:{
      // 映射，将vuex state中的状态映射为vue中的属性
      ...mapState("user",["info"]),
      ...mapState("address",["addresses"])
    },
    methods:{
        // 映射，将vuex action中得到的动作映射为vue中的方法
        ...mapActions("user",["findUser"]),
        ...mapActions("address",["findAddressByCustomerId","findCustomer"]),
        onAdd() {
            this.$router.push('./editAddress');
        },
        onEdit(item, index) {
            this.$router.push('./editAddress');
        },
        backHandler(){
            this.$router.push('./user');
        },

        saveHandler(){
            this.$router.push('./user');
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

    .check{
        margin-top: 15px;
    }
    .edit {
        margin-top: 15px;
    }

    .btn{
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #EE2C2C;
        color: #fff;
    }
    .btn div {
        line-height: 3em;
        text-align: center;
    }
</style>