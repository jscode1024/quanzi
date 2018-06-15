<template>
    <div class="loadstatus">
        {{proploadmsg || loadmsg}}
    </div>
</template>
<script>
export default {
    props:['proploadmsg'],
    data(){
        return{
            loadmsg:"没有更多了..."
        }
    }
}
</script>
<style lang="stylus">
.loadstatus
    height 30px
    width 100%
    line-height 30px
    text-align center
    font-size 12px
    color #999999
</style>


