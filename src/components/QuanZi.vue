<template>
    <div>
        <navtable @changeUserList="alterUserList"></navtable>   
        <userlist v-if="isQuanZi" :quanziData="quanziData" :more="moreContent"></userlist>
        <userlist v-else :userData="userData" :more="moreContent"></userlist>
        <titlelist title="热门推荐"></titlelist>
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
import navtable from '@/components/unit/NavTable'
import userlist from '@/components/unit/UserList'
import titlelist from '@/components/unit/TitleList'
import contentlist from '@/components/unit/ContentList'
import loadstatus from '@/components/unit/LoadStatus'
import url from '@/serviceAPI.config.js'
import axios from 'axios'
import qs from 'qs'
import { Waterfall,Toast,List } from 'vant'
import Vue from 'vue'
Vue.use(List)
import kongbai from '@/components/unit/KongBai'
export default {
    data(){
        return{
            moreContent:"更多圈子",
            pageNum:1,
            pageSize:10,
            hasNextPage:false,
            contentList:[],
            proploadmsg:"",
            isLoad:false,
            quanziData:[],
            userData:[],
            isQuanZi:true,
            index:0,
            kongbaiMsg:"暂无更多内容",
            kongbaiHeight:150,
            loading: false,
            finished: false,
            total:0,
            contentListLength:0
        }
    },
    components:{
        navtable,userlist,titlelist,contentlist,loadstatus,kongbai
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
        alterUserList(index){
            this.index=index
            if(this.index==0){
                this.isQuanZi=true
                this.moreContent="更多圈子"
            }else{
                this.isQuanZi=false
                this.moreContent="更多达人"
            }
        },
        getPost(pageNum){
            let obj={
            pageNum:pageNum,
            pageSize:this.pageSize
            }
            axios.post(url.getHotTopicList,qs.stringify(obj),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(response=>{
                console.log(response)
                if(response.data.statusCode=="SUCCESS"){
                    if(response.data.data.list.length>0){
                    }
                    this.contentList=this.contentList.concat(response.data.data.list)
                    this.contentListLength=this.contentList.length
                    this.hasNextPage=response.data.data.hasNextPage
                    // this.pageNum=response.data.data.nextPage
                    this.total=response.data.data.total
                }
                Toast.clear()
                this.loading = false;
            }).catch((error)=>{
                Toast('没有更多数据了~')
            })
        },
        getHotGroup(){
            axios.get(url.getHotList)
            .then(response=>{
                console.log(response)
                if(response.data.statusCode=="SUCCESS"){
                    this.quanziData=response.data.data
                }
            }).catch(error=>{
                Toast('网络不畅，请求数据失败，请尝试刷新~')
            })
        },
        getUserList(){
            axios.get(url.getFashionList)
            .then(response=>{
                console.log(response)
                if(response.data.statusCode=="SUCCESS"){
                    this.userData=response.data.data
                }
            }).catch(error=>{
                Toast('网络不畅，请求数据失败，请尝试刷新~')
            })
        }
    },
    created(){
        Toast.loading({
        mask: true,
        message: '加载中...'
        })
        this.getPost(this.pageNum)
        this.getHotGroup()
        this.getUserList()
    },directives: {
        WaterfallLower: Waterfall('lower')
    },
}
</script>
<style lang="stylus">

</style>


