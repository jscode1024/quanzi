import Vue from 'vue'
import Router from 'vue-router'
import quanzi from '@/components/QuanZi'
import quanziinfo from '@/components/QuanZiInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: quanzi
    },
    {
      path:'/quanziinfo',
      component:quanziinfo
    }
  ]
})
