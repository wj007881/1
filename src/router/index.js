import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import box from '@/components/box.vue'
import videobox from '@/components/videobox.vue'
import video from '@/components/video.vue'
import shop from "@/components/shop.vue"
import find from "@/components/find.vue"
import news from "@/components/news.vue"
import qbar from "@/components/qbar.vue"
import myzoom from "@/components/myzoom.vue"
import sign from "@/components/sign.vue"
import login from "@/components/login.vue"
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component:index
    },
    {
      path: '/index',
      components:{index:index,qbar:qbar}
    },
    {
      path: '/box',
      name: 'box',
      component: box,
    },
    {
      path: '/videobox',
      name: 'videobox',
      component: videobox,
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
  ]
})
