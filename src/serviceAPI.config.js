const BASEURL="http://192.168.0.140:6060/"
const URL={
    // 获得圈子详情接口
    getQuanZiInfo:BASEURL+'h5/topic/group/findRecommendByGroupId',
    // 获得圈子列表
    getHotList:BASEURL+'h5/topic/group/findHotList',
    // 获得达人列表
    getFashionList:BASEURL+'h5/user/findFashionList',
    // 关注圈子与取消关注
    getGroup:BASEURL+'h5/careforGroup/carefor',
    // 热门推荐帖子列表
    getHotTopicList:BASEURL+'h5/topic/group/selectHotTopicList',
    // 游客注册页面
    goVisitorPage:BASEURL+'h5/user/to_reset_user',
    // 登录页面
    goLoginPage:BASEURL+'h5/user/to_login',
    // 跳转帖子详情页面
    goTieZi:BASEURL+'h5_static/topic_group/circleArticle/index.html',
    // 跳转用户个人中心页面
    goUserPage:BASEURL+'/web/recommend/user/recommend',
    // 跳转热门圈子列表页面
    goMoreQuanzi:BASEURL+'h5_static/topic_group/quanzilist/index.html',
    // 跳转圈子详情页
    goQuanZi:BASEURL+'h5_static/topic_group/quanziinfo/index.html',
    // 跳转达人列表页
    goMoreDaren:BASEURL+'h5_static/topic_group/darenlist/index.html'
}
module.exports=URL