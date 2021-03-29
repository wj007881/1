// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import 'vue2-animate/dist/vue2-animate.min.css';
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuex from 'vuex'
import store from '../vuex/store'
import VueLocalStorage from 'vue-localstorage'
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);
Vue.use(VueLocalStorage);
Vue.use(VueAxios, axios);
import VueVideoPlayer from 'vue-video-player'

 
// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
 
Vue.use(VueVideoPlayer)


import router from './router'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
  })

