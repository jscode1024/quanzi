<template>
    <div class="userlist" v-if="(quanziData && quanziData.length>0)">
            <div class="unit" v-for="(item,index) in quanziData.slice(0,4)" :key="index" @click="goToAnotherPages(item)">
                <div class="top">
                    <img :src="item.icon_url" alt="">
                </div>
                <div class="txt">
                    {{item.name}}
                </div>
            </div>
            <div class="unit" @click="goToMoreQuanZi">
                <div class="top">
                    <i class="moreicon"></i>
                </div>
                <div class="txt">
                    {{more}}
                </div>
            </div>
    </div>
    <div class="userlist" v-else-if="(userData && userData.length>0)">
            <div class="unit" v-for="(item,index) in userData.slice(0,4)" :key="index"  @click="goToUserPage(item.id)">
                <div class="top">
                    <img :src="item.headPortrait" alt="">
                </div>
                <div class="txt">
                    {{item.nickName}}
                </div>
            </div>
            <div class="unit" @click="goToMoreDaren">
                <div class="top">
                    <i class="moreicon"></i>
                </div>
                <div class="txt">
                    {{more}}
                </div>
            </div>
    </div>
    <div class="userlist" v-else>
        <kongbai :msg="kongbaiMsg"></kongbai>
    </div>

</template>
<script>
import kongbai from '@/components/unit/KongBai'
import url from '@/serviceAPI.config.js'
export default {
    props:['more','quanziData','userData'],
    data(){
        return{
            items:this.userlistData,
            kongbaiMsg:"暂无内容"
        }
       
    },
    components:{
        kongbai
    },
    methods:{
        goToUserPage(id){
            window.location.href=url.goUserPage+'?userId='+id
        },
        goToQuanziInfo(id){
            window.location.href=url.goQuanZi+'?quanziId='+id
        },
        goToMoreQuanZi(){
            window.location.href=url.goMoreQuanzi
        },
        goToMoreDaren(){
            window.location.href=url.goMoreDaren
        },
        goToOtherPages(url){
            window.location.href=url
        },
        goToAnotherPages(item){
            if(item.code=='DEFAULT'){
                this.goToUserPage(item.id)
            }else{
                this.goToOtherPages(item.url)
            }
        }
    }
    
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin"
.userlist
    height 103px
    width 100% 
    background-color #ffffff
    display flex
    align-items: center
    justify-content: space-around
    border-bottom 1px solid #e5e5e5
    .unit
        flex 0 0 55px
        .top
            width 55px
            height 62px
            background-size 55px 62px
            background-repeat no-repeat
            &.gold
                bg-image('../../../static/images/hot_icon_gold')
            &.silver
                bg-image('../../../static/images/hot_icon_silver')
            &.copper
                bg-image('../../../static/images/hot_icon_copper')
            img 
                width 47px
                height 47px
                margin 11px 4px 4px 4px
                border-radius 50px
            .moreicon
                display inline-block
                width 47px
                height 47px
                background-size 47px 47px
                background-repeat no-repeat
                bg-image('../../../static/images/hot_icon_more')
                margin 11px 4px 4px 4px
        .txt
            width 55px
            font-size 12px
            color #454545
            text-align center
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            margin-top 10px
    .smallunit
        flex 0 0 47px
        .top
            width 47px
            height 62px
            background-size 47px 62px
            background-repeat no-repeat
            img 
                width 47px
                height 47px
                margin 11px 0px 4px 0px
                border-radius 50px
            .moreicon
                display inline-block
                width 47px
                height 47px
                background-size 47px 47px
                background-repeat no-repeat
                bg-image('../../../static/images/hot_icon_more')
                margin 11px 0px 4px 0px
        .txt
            width 47px
            font-size 12px
            color #454545
            text-align center
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            margin-top 10px


</style>


