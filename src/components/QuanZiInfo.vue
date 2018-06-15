<template>
    <div>
        <toptitle :isFocused="isFocus" @changeAdd="changeAddDelete" :title="pageTitle"></toptitle>
            <signtitle></signtitle>
            <userlist :userData="userData" :more="moreContent"></userlist>
            <titlelist title="最新发表"></titlelist>
        <div  v-waterfall-lower="loadMore"
         waterfall-disabled="disabled"
        waterfall-offset="400" v-if="contentList && contentList.length>0">
            <contentlist v-for="(item,index) in contentList" :key="index" :item="item"></contentlist>
         </div>
         <div v-else>
            <kongbai :msg="kongbaiMsg" :kongbaiHeight="kongbaiHeight"></kongbai>
         </div>
        <loadstatus v-show="isLoad" :proploadmsg="proploadmsg"></loadstatus>
    </div>
</template>
<script>
import toptitle from '@/components/unit/TopTitle'
import signtitle from '@/components/unit/SignTitle'
import userlist from '@/components/unit/UserList'
import titlelist from '@/components/unit/TitleList'
import contentlist from '@/components/unit/ContentList'
import loadstatus from '@/components/unit/LoadStatus'
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import qs from 'qs'
import { Waterfall,Toast,Dialog  } from 'vant';
import kongbai from '@/components/unit/KongBai'
export default {
    data(){
        return{
            contentList:[],
            proploadmsg:"正在加载更多...",
            isLoad:false,
            disabled: false,
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
            pageTitle:""
        }
    },
    components:{
        toptitle,signtitle,userlist,titlelist,contentlist,loadstatus,kongbai
    },
    created(){
        Toast.loading({
        mask: true,
        message: '加载中...'
        })
        this.getGroupId()
        this.getPost()
    },
    methods:{
        loadMore() {
            this.disabled = true
            setTimeout(() => {
                if(this.hasNextPage){
                    this.getPost()
                }else{
                    this.proploadmsg="没有更多了..."
                }
                this.disabled = false
            }, 200)
        },
        getPost(){
            let obj={
            group_id:this.group_id,
            pageNum:this.pageNum,
            pageSize:this.pageSize
            }
            axios.post(url.getQuanZiInfo,qs.stringify(obj),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(response=>{
                if(response.data.statusCode=="SUCCESS"){
                    if(response.data.data.list.length>0){
                        this.isLoad=true
                    }
                    this.contentList=this.contentList.concat(response.data.data.list)
                    this.hasNextPage=response.data.data.hasNextPage
                    this.careforGroupCount=response.data.data.list[0].careforGroupCount
                    this.pageNum=response.data.data.nextPage
                    this.pageTitle=response.data.data.list[0].topicGroupName
                    this.getType()
                }
                Toast.clear()
            }).catch((error)=>{
                Toast('网络不畅，请求数据失败，请尝试刷新~')
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
                    window.location.href=url.goLoginPage
                }else if(response.data.statusCode=="IS_GUEST"){
                    window.location.href=url.goVisitorPage
                }
            }).catch((error)=>{
                try{
                if(error.response.data.statusCode=="UNAUTHORIZED"){
                    window.location.href=url.goLoginPage
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
        }
    },directives: {
        WaterfallLower: Waterfall('lower')
    },
}
</script>
<style lang="stylus">

</style>


