<template>
    <div>
        <toptitle :isFocused="isFocus" @changeAdd="changeAddDelete" :title="pageTitle"></toptitle>
            <signtitle></signtitle>
            <darenlist :darenData="darenData"></darenlist>
            <titlelist title="最新发表"></titlelist>
        <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="1"
        v-if="contentList && contentList.length>0"
        >
            <contentlist v-for="(item,index) in contentList" :key="index" :item="item"></contentlist>
        </van-list>
         <div v-else>
            <kongbai :msg="kongbaiMsg" :kongbaiHeight="kongbaiHeight"></kongbai>
         </div>
        <loadstatus v-show="isLoad" :proploadmsg="proploadmsg"></loadstatus>
    </div>
</template>
<script>
import toptitle from '@/components/unit/TopTitle'
import signtitle from '@/components/unit/SignTitle'
import titlelist from '@/components/unit/TitleList'
import contentlist from '@/components/unit/ContentList'
import loadstatus from '@/components/unit/LoadStatus'
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import qs from 'qs'
import { Waterfall,Toast,Dialog,List  } from 'vant'
import Vue from 'vue'
import kongbai from '@/components/unit/KongBai'
import darenlist from '@/components/unit/DaRenList'
Vue.use(List)
export default {
    data(){
        return{
            contentList:[],
            proploadmsg:"",
            isLoad:false,
            group_id:0,
            pageNum:1,
            pageSize:10,
            hasNextPage:false,
            type:"",
            careforGroupCount:0,
            isFocus:false,
            userData:[],
            moreContent:"更多达人",
            kongbaiMsg:"暂无更多内容",
            kongbaiHeight:150,
            pageTitle:"",
            loading: false,
            finished: false,
            total:0,
            contentListLength:0,
            darenData:[]
        }
    },
    components:{
        toptitle,signtitle,titlelist,contentlist,loadstatus,kongbai,darenlist
    },
    created(){
        Toast.loading({
        mask: true,
        message: '加载中...'
        })
        this.getGroupId()
        this.getPost(this.pageNum)
        this.getDarenList()
    },
    methods:{
        onLoad() {
            if(this.contentListLength >= this.total) {
                    this.isLoad = true; //顯示底部已經到底了
                    this.proploadmsg="没有更多了..."
					this.finished = true; //加载已全部完成
                    this.loading = false; //隐藏底部加载中提示
					return;
                }
            this.pageNum++
            this.getPost(this.pageNum)
        },
        getPost(pageNum){
            let obj={
            group_id:this.group_id,
            pageNum:pageNum,
            pageSize:this.pageSize
            }
            axios.post(url.getQuanZiInfo,qs.stringify(obj),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(response=>{
                if(response.data.statusCode=="SUCCESS"){
                    if(response.data.data.list.length>0){
                        
                    }
                    this.contentList=this.contentList.concat(response.data.data.list)
                    this.contentListLength=this.contentList.length
                    this.total=response.data.data.total
                    this.hasNextPage=response.data.data.hasNextPage
                    this.careforGroupCount=response.data.data.list[0].careforGroupCount
                    // this.pageNum=response.data.data.nextPage
                    this.pageTitle=response.data.data.list[0].topicGroupName
                    this.getType()
                }
                Toast.clear()
                this.loading = false
            }).catch((error)=>{
                Toast('没有更多数据了~')
            })
        },
        getGroup(){
            this.getType()
            let obj={
            topicGroupId:this.group_id,
            type:this.type,
            }
            axios.post(url.getGroup,qs.stringify(obj),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(response=>{
                if(response.data.statusCode=="SUCCESS"){
                    if(this.type=="add"){
                        this.type="delete"
                        this.isFocus=true
                        this.careforGroupCount=1
                        Toast.success('关注成功')
                    }else{
                        this.type="add"
                        this.isFocus=false
                        this.careforGroupCount=0
                        Toast.success('取消成功')
                    }
                }else if(response.data.statusCode=="UNAUTHORIZED"){
                    window.browserController && window.browserController.viewLoginPage && window.browserController.viewLoginPage(null);
							window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.myMobile.postMessage({
								"method": "viewLoginPage",
								"args": {
                                    url:""
                                }
                            });
                    Toast('请先登录~')
                }else if(response.data.statusCode=="IS_GUEST"){
                    window.location.href=url.goVisitorPage
                }
            }).catch((error)=>{
                try{
                if(error.response.data.statusCode=="UNAUTHORIZED"){
                    window.browserController && window.browserController.viewLoginPage && window.browserController.viewLoginPage(null);
							window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.myMobile.postMessage({
								"method": "viewLoginPage",
								"args": {
                                    url:""
                                }
                            });
                    Toast('请先登录~')
                }else if(error.response.data.statusCode=="IS_GUEST"){
                    window.location.href=url.goVisitorPage
                }else{
                    window.location.href=url.goVisitorPage
                }
                }catch(err){
                    window.location.href=url.goVisitorPage
                }
               
            })
        },
        getType(){
            if(this.careforGroupCount==0){
                this.type="add"
                this.isFocus=false
            }else{
                this.type="delete"
                this.isFocus=true
            }
        },
        changeAddDelete(){
            this.getGroup()
        },
        getGroupId(){
            this.group_id=parseInt(window.location.href.split('?')[1].split('=')[1])
        },
        getDarenList(){
            let obj={
            groupId:this.group_id,
            }
            axios.post(url.getDaRenBangDan,qs.stringify(obj),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(response=>{
                console.log(response)
                if(response.data.statusCode=="SUCCESS"){
                        this.darenData=response.data.data
                }
                Toast.clear()
                this.loading = false
            }).catch((error)=>{
                Toast('没有更多数据了~')
            })
        }
    },directives: {
        WaterfallLower: Waterfall('lower')
    },
}
</script>
<style lang="stylus">

</style>


