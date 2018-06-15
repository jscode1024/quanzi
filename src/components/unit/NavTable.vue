<template>
    <div class="navtable">
        <div v-for="(item,index) in names" :key="index" class="remen" :class="{cur:currentIndex==index}" @click="changeCur(index)"><span>{{item.name}}</span></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            names:[{name:'热门圈子'},{name:'达人榜单'}],
            currentIndex:0,
        }
    },
    methods:{
        changeCur(index){
            this.currentIndex=index
            this.$emit('changeUserList',index)
            
        }
    }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin"
.navtable
    width: 100%
    height: 35px
    background-color: #ffffff
    display: flex
    font-size: 15px
    color: #454545
    line-height: 35px
    text-align: center
    border-1px(#e5e5e5)
    .remen,.daren
        flex: 1
        position: relative
        height 35px
        width 50%
        span 
            display: inline-block
            height 35px
        color: #000000
        &.cur
            span 
            &:after
                display: block
                position: absolute
                left: 40%
                bottom: 0
                border-bottom: 4px solid #ff5722
                content: ' '
                width: 20%

</style>


