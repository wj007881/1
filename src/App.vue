<template>
  <div id="app">
         <router-view ></router-view>
	       
        
  </div>
</template>

<script>
import index from './components/index.vue'
import shop from "./components/shop.vue"
import find from "./components/find.vue"
import myzoom from "./components/myzoom.vue"
import { mapState } from 'vuex'
export default {
   name: 'app',
  data () {
    return {
      selected: '首页' ,
      
    }
  }, 
  computed: mapState({
      index: state => state.index,
      stories: state => state.stories,
      show: state => state.show
  }),
   methods: {
            makeActive: function(item, index){
                
		     this.$router.push('/');
                      
                }
            },
          
    components:{
    index,shop,find,myzoom
  },
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
</style>
