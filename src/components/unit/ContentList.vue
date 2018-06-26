<template>
    <div class="contentlist">
        <div class="top">
            <div class="userphoto" @click="goToUserPage(item.userId)">
                <img :src="item.headPortrait || userimg" alt="">
            </div>
            <div class="userinfo">
                <div class="userinfotop">
                    <span class="name"  @click="goToUserPage(item.userId)">{{item.nickName}}</span><i v-show="isExpert" class="experticon"></i>
                </div>
                <div class="bottom"  @click="goToUserPage(item.userId)">
                    <span class="time">{{item.timeString}}</span>
                </div>
            </div>
            <div class="readnum" v-show="item.popular_degree>1000">
                <i class="hoticon"></i><span class="num">{{item.popular_degree | formatPopularDegree}}</span>
            </div>
        </div>
        <div class="title" @click="goToTieZi(item.id)">
            {{item.title}}
        </div>
        <div v-if="imgcounts>=3" @click="goToTieZi(item.id)">
            <div class="content" v-html="newContent">
            </div>
            <div class="imglist">
                <div class="imgunit" v-for="(img,index) in imgUrl.slice(0,3)" :key="index" v-html="img">
                </div>
            </div>
        </div>
        <div v-else-if="imgcounts===1 || imgcounts===2"  @click="goToTieZi(item.id)">
            <div class="oneimg">
                <div class="contentone"  v-html="newContent">
                </div>
                <div class="imglistone" v-html="imgUrl[0]">
                </div>
            </div>
        </div>
        <div v-else  @click="goToTieZi(item.id)">
            <div class="content" v-html="newContent">
            </div>
        </div>
        
    </div>
</template>
<script>
import url from '@/serviceAPI.config.js'
export default {
    props:['item'],
    data(){
        return{
            imgUrl:[],
            userimg:require('../../../static/images/userphoto.jpg'),
            imgcounts:0,
            content:this.item.content,
            isExpert:false,
            userRole:this.item.userRole
        }
    },
    computed:{
        newContent(){
            return this.content.replace(/<img[^>]*>/gi,"")
        }
    },
    methods:{
        getUrlArr(){
            this.imgUrl=this.content.match(/<img[^>]*>/gi)
            if(this.imgUrl && this.imgUrl.length>0){
                this.imgUrl=this.imgUrl.map(function(item,index){
                    return item.replace(/\\/g,'')
                })
            }
        },
        getimgcounts(){
            if(this.imgUrl){
                this.imgcounts=this.imgUrl.length
            }
            
        },
        getExpert(){
            if(this.userRole==="EXPERT"){
                this.isExpert=true
            }else{
                this.isExpert=false
            }
        },
        goToTieZi(id){
            window.location.href=url.goTieZi+'?tieziId='+id
        },
        goToUserPage(id){
            window.location.href=url.goUserPage+'?userId='+id
        }
    },
    created(){
        this.getUrlArr()
        this.getimgcounts()
        this.getExpert()
    },
    filters:{
        formatPopularDegree(degree){
            if(degree>=10000){
                return (degree/10000).toFixed(1)+'W'
            }else{
                return (degree/1000).toFixed(1)+'K'
            }
        }
    }
    
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin"
.contentlist
    width 100%
    padding 10px 12px
    background-color #ffffff
    box-sizing border-box
    border-1px(#e5e5e5)
    .top
        width 100% 
        display flex
        .userphoto
            flex 0 0 40px
            img 
                width 40px
                height 40px
                border-radius 40px
        .userinfo
            flex 1
            display flex
            align-items center
            flex-direction column
            justify-content center
            padding-left 10px
            box-sizing border-box
            overflow hidden
            .userinfotop
                width 100%
                text-align left
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                .name
                    font-size 15px
                    color #454545
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    max-width 70%
                    display inline-block
                .experticon
                    display inline-block
                    width 31px
                    height 12px
                    background-size 31px 12px
                    background-repeat no-repeat
                    bg-image('../../../static/images/me_icon_zhuanjia')
                    margin-left 6px
            .bottom
                width 100%
                text-align left
                .time
                    font-size 12px
                    color #999999
        .readnum
            width 100px
            text-align right 
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            .hoticon
                width 14px
                height 19px
                display inline-block
                background-size 14px 19px
                background-repeat no-repeat
                bg-image('../../../static/images/recommend_icon_hot')
                vertical-align: bottom
            .num
                font-size 12px
                color #454545
                margin-left 5px
    .title
        width 100%
        font-size 16px
        color #454545
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-weight bold
        margin-top 12px
        text-align left 
    .content
        width 100%
        font-size 15px
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden
        line-height 22px
        margin-top 13px
        text-align left 
    .imglist
        display flex
        margin-top 10px
        align-items center
        justify-content center
        .imgunit
            flex 0 0 33.3%
            padding: 0 5px;
            box-sizing: border-box;
            img 
                width 90% 
                height 70px
    .oneimg
        display flex
        margin-top 13px
        .contentone
            flex 1
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 3
            overflow hidden
            line-height 25px
            font-size 15px
            text-align left
        .imglistone
            flex 0 0 33.3%
            align-self center
            img 
                width 90% 
                height 70px




        
</style>


