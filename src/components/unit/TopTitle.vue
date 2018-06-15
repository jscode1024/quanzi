<template>
    <div class="toptitle">
        <div class="left" @click="goBack">
            <i class="arrowleft"></i>
        </div>
        <div class="title">
            {{title}}
        </div>
        <div class="right">
            <i  :class="[isFocus ? 'focus' : 'addfocus']"  @click="changeFocus"></i>
        </div>
    </div>
</template>
<script>
export default {
    props:['isFocused','title'],
    data(){
        return{
            isFocus:false
        }
    },
    methods:{
        changeFocus(){
            this.$emit('changeAdd')
        },
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);

            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        goBack(){
            var isApp = this.GetQueryString("isApp");
            if(isApp && isApp=='Y'){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid){
                    window.browserController && window.browserController.goBackLastPage && window.browserController.goBackLastPage("");
                    history.go(-1);
                }else if(isiOS){
                    window.webkit && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.myMobile.postMessage({
                        "method" : "goBackLastPage",
                        "args" : { "url" : null }
                    });
                    history.go(-1);
                }else{
                    history.go(-1);
                }

            }else{
                history.go(-1);
            }
        }
    },
    watch:{
        isFocused:function(val){
            this.isFocus=this.isFocused
        }
    }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin"
.toptitle
    width 100%
    height 44px
    background-color #fe5722
    display flex
    align-items center
    padding 0 12px 0 12px
    box-sizing border-box
    position fixed
    top 0px
    left 0px
    z-index: 100;
    .left
        flex 0 0 60px
        text-align left
        .arrowleft
            display inline-block
            width 21px
            height 18px
            background-size 21px 18px
            background-repeat no-repeat
            bg-image('../../../static/images/title_arrow_left')
    .title
        flex 1
        text-align center
        color #ffffff
        font-size 18px
        line-height 44px
    .right
        flex 0 0 60px
        .focus
            display inline-block
            width 60px
            height 30px
            background-size 60px 30px
            background-repeat no-repeat
            bg-image('../../../static/images/title_button_add_dis')
        .addfocus
            display inline-block
            width 60px
            height 30px
            background-size 60px 30px
            background-repeat no-repeat
            bg-image('../../../static/images/title_button_add_nor')

</style>


