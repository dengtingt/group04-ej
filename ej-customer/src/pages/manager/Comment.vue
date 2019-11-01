<template>
    <div class="comment">
        <briup-fulllayout title="发表评价">
            <div class="content">
                <div class="rate">
                    <!-- 家政服务员信息 -->
                    <div class="waiter">
                        <img :src="order.waiter.photo" alt="">
                        <p>订单编号：{{order.id}}</p>
                        <p>服务员工：{{order.waiter.realname}}</p>
                    </div>
                    <!-- 评价 -->
                    <div class="icon">
                        <van-rate gutter="10px" v-model="value" size="40px" @change="commentHandler(value)"/>
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
import { mapState,mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            value:0,
            order:''
        }
    },
    created() {
        this.order = this.$route.query.order;
    },
    methods:{
        ...mapActions("comment",["saveComment"]),
        backHandler(){
            this.$router.push('./order');
        },
        commentHandler(value){
            let comment = {};
            comment.id = this.order.id;
            comment.content = this.value;
            comment.commentTime = new Date();
            console.log(comment)
            this.saveComment(comment);
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
        border: 1px solid #efefef;
        margin-right: 10px;
        float: left;
    }
    .waiter{
        margin-bottom: 20px;
        font-size: 14px;
        line-height: 2em;
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