<template>
<div class="wrap">

    <div class="darenlist" v-if="(darenData && darenData.length>=5)">
            <div class="unit" v-for="(item,index) in darenData.slice(0,10)" :key="index"  @click="goToUserPage(item.id)">
                <div class="top">
                    <img :src="item.headPortrait" alt="">
                </div>
                <div class="txt">
                    {{item.nickName}}
                </div>
            </div>
    </div>
    <div class="darenlist" v-else>
        <kongbai :msg="kongbaiMsg"></kongbai>
    </div>

</div>
</template>
<script>
import kongbai from '@/components/unit/KongBai'
import url from '@/serviceAPI.config.js'
export default {
    props:['darenData'],
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
    }
    
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin"
.wrap
    overflow hidden
    height 98px
    .darenlist
        height 103px
        width 100% 
        background-color #ffffff
        display flex
        align-items: center
        justify-content: flex-start
        border-bottom 1px solid #e5e5e5
        overflow-x scroll
        overflow-y hidden
        -webkit-overflow-scrolling touch
        .unit
            flex 0 0 20%
            text-align center
            text-align -webkit-center
            text-align -moz-center
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


