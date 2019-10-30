<template>
    <div class="editAddress">
        <!-- 头部 -->
        <div class="header">
            <van-row gutter="10">
                <!-- 返回 -->
                <van-col span="4"  @click.prevent="backHandler">
                    <van-icon custom-class="icon" name="arrow-left" class="back"/> 
                    <a href=""> 返回</a>
                </van-col>
                <!-- 标题 -->
                <van-col span="11" offset="3"><p>修改地址</p></van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        backHandler(){
            this.$router.push('./address');
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
        position: relative;
        box-sizing: border-box;
        padding: 10px 20px;
        line-height: 1.5em;
        border-bottom: 1px solid #efefef;
    }
    .header a{
        color: #1E90FF;
        font-size: 14px;
        position: absolute;
        left: 40px;
    }
    .header p{
        text-align: center;
    }
</style>