<template>
  <div >
    <mt-tab-container class="page-tabbar-container" v-model="selected">  
        <mt-tab-container-item id="首页">  
          
        </mt-tab-container-item>  
        <mt-tab-container-item id="商城">  
           <shop></shop>   
        </mt-tab-container-item>  
        <mt-tab-container-item id="发现">  
          <find></find> 
        </mt-tab-container-item>  
        <mt-tab-container-item id="收藏">  
          <div class="page-part">  
           <!-- cell -->  
            <myzoom></myzoom>   
          </div>  
          <router-link to="/">  
           <!-- button -->  
            <mt-button type="danger" size="large">退出</mt-button>  
          </router-link>  
        </mt-tab-container-item>  
      </mt-tab-container> 
  
      <mt-tabbar v-model="selected" fixed >  
      <mt-tab-item id="首页" >  
        <img slot="icon" src="../assets/logo.png">  
        首页  
      </mt-tab-item>  
      <mt-tab-item id="商城">  
        <img slot="icon" src="../assets/logo.png">  
        商城  
      </mt-tab-item>  
      <mt-tab-item id="发现">  
        <img slot="icon" src="../assets/logo.png">  
        发现  
      </mt-tab-item>  
      <mt-tab-item id="收藏">  
        <img slot="icon" src="../assets/logo.png">  
        我的收藏
      </mt-tab-item>  
    </mt-tabbar>   
  </div>
</template>

<script>

import shop from "./shop.vue"
import find from "./find.vue"
import myzoom from "./myzoom.vue"
import { mapState } from 'vuex'
export default {
   name: 'app',
  data () {
    return {
      selected: '首页' 
    }
  },
   methods: {
            makeActive: function(item, index){
                
		    
                      
                }
            },
          
    components:{
    shop,find,myzoom
  },
  computed: mapState({
      index: state => state.index,
      stories: state => state.stories,
      show:state => state.show,
  }),
        }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#body{
  font-family: 'Avenir', Hmtvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
