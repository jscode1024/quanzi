<template>
    <div class="titlelist">
        {{title}}
    </div>
</template>
<script>
export default {
    props:['title'],
    data(){
        return{
        }
    }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin"
.titlelist
    height 35px
    margin-top 10px
    width 100%
    background-color #ffffff
    border-1px(#e5e5e5)
    text-align center
    line-height 35px
    font-size 16px
    color #454545
    font-weight bold
    border-top 1px solid #e5e5e5
</style>


