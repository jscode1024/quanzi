<template>
    <div class="kongbai" :style="styleObject">
        <div class="icon-kongbai">
        </div>
        <span class="txt">{{msg}}</span>
    </div>
</template>
<script>
export default {
    props:['msg','kongbaiHeight'],
    data(){
        return{
            styleObject: {
                marginTop: this.kongbaiHeight+'px'
            }
        }
    }
}
</script>
<style lang="stylus">

</style>


