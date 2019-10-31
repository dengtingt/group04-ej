<template>
    <div class="comment">
        <briup-fulllayout title="发表评价">
            <div class="content">
                <div class="rate">
                    <!-- 家政服务员信息 -->
                    <div class="waiter">
                        <img src="" alt="">{{}}
                    </div>
                    <!-- 评价 -->
                    <div class="icon">
                        <van-rate gutter="10px" v-model="value" size="40px" @change="commentHandler"/>
                    </div>
                </div>
                <div class="btn">
                    <van-button class="savebtn" plain type="info">提交订单</van-button>
                </div>
            </div>
        </briup-fulllayout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: 0
        };
    },
    methods:{
        backHandler(){
            this.$router.push('./order');
        },
        commentHandler(){

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

    .comment{
        background: #efefef;
        height: 100%;
    }
    .content{
        background: #efefef;
        box-sizing: border-box;
        padding: 10px;
    }
    .rate{
        background: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 10px;
    }
    .waiter img{
        width: 50px;
        height: 50px;
    }
    .waiter{
        margin-bottom: 20px;
    }
    .icon{
        text-align: center;
        margin: 30px 0;
    }
    .btn {
        position: fixed;
        bottom: 10px;
        width: 95%;
    }
    .savebtn{
        width: 100%;
        border-radius: 5px;
    }
</style>