import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import box from '../components/box.vue'
import boxs from '../components/boxs.vue'

import video from '../components/video.vue'
import funs from '../components/funs.vue'
import saves from '../components/saves.vue'
import shop from "../components/shop.vue"
import find from "../components/find.vue"
import finds from "../components/finds.vue"
import news from "../components/news.vue"
import qbar from "../components/qbar.vue"
import myzoom from "../components/myzoom.vue"
import sign from "../components/sign.vue"
import login from "../components/login.vue"
import pls from "../components/pls.vue"
import tie from "../components/tie.vue"
Vue.use(Router)

export default new Router({
  
 
  routes: [
    {
      path: '/',
      name:"/",
      component:index
    },
    {
      path: '/pls',
      name:"pls",
      component:pls
    },
    {
      path: '/index',
      name:"index",
      component:index,qbar
    },
    {
      path: '/box',
      name: 'box',
      component: box,
    },
    {
      path: '/boxs',
      name: 'boxs',
      component: boxs,
    },
    {
      path: '/tie',
      name: 'tie',
      component: tie,
    },
    
    {
      path: '/shop',
      name: 'shop',
      component: shop,
    },
    {
      path: '/find',
      name: 'find',
      component: find,
    },
    {
      path: '/myzoom',
      name: 'myzoom',
      component: myzoom,
    },
    {
      path: '/news',
      name: 'news',
      component: news,
    },
    {
      path: '/video',
      name: 'video',
      component: video,
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/funs',
      name: 'funs',
      component: funs,
    },
    {
      path: '/saves',
      name: 'saves',
      component: saves,
    },
    {
      path: '/finds',
      name: 'finds',
      component: finds,
    }
  ]
})
