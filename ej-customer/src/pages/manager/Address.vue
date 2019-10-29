<template>
    <div class="address">
        <!-- 头部 -->
        <div class="header">
            <van-row gutter="10">
                <!-- 返回 -->
                <van-col span="4"  @click.prevent="backHandler">
                    <van-icon custom-class="icon" name="arrow-left" /> 
                    <a href=""> 返回</a>
                </van-col>
                <!-- 标题 -->
                <van-col span="11" offset="3"><p>地址列表</p></van-col>
            </van-row>
        </div>
        <!-- 地址信息 -->
        <div class="content">
            <!-- 地址信息单元格 -->
            <van-checkbox-group bind:change="onChange">
                <van-cell-group >
                    <van-cell>
                        <van-row gutter="10">
                            <!-- 复选框 -->
                            <van-col span="2">
                                <van-checkbox icon-size="14px" value="checked" checked-color="#07c160" bind:change="onChange"></van-checkbox>
                            </van-col>
                            <!-- 信息列表 -->
                            <van-col span="18">
                                <p>{{realname}},{{address[0].telephone}}</p>
                                <p>{{address[0].province}}{{address[0].city}}{{address[0].area}}{{address[0].address}}</p>
                            </van-col>
                            <!-- 图标 -->
                            <van-col span="1" offset="2"><van-icon size="16px" name="edit" @click="editAddress"/></van-col>
                        </van-row>
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{

        }
    },
    created() {
        this.findAddressByCustomerId(this.info.id);
        this.findCustomer(this.info.id)
    },
    computed:{
      // 映射，将vuex state中的状态映射为vue中的属性
      ...mapState("user",["info"]),
      ...mapState("address",["address","realname"])
    },
    methods:{
        // 映射，将vuex action中得到的动作映射为vue中的方法
        ...mapActions("user",["findUser"]),
        ...mapActions("address",["findAddressByCustomerId","findCustomer"]),
        
        onChange(event) {
            this.setData({
                result: event.detail
            });
        },
        backHandler(){
            this.$router.push('./user');
        },
        editAddress(){
            alert("修改地址");
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

    .header {
        box-sizing: border-box;
        padding: 10px 20px;
        line-height: 1.5em;
        border-bottom: 1px solid #efefef;
    }
    .header a{
        color: #1E90FF;
        font-size: 14px;
    }
    .header p{
        text-align: center;
    }
</style>