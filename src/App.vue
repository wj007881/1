<template>
  <div id="app">
         <router-view ></router-view>
    <div class="clear"></div>      
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
   name: 'app',
  data () {
    return {
      selected: '首页' ,
      userName: sessionStorage.userName,    
    }
  }, 
        }
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0px;
  position: relative;
  margin: 0 auto;
  
}
.clear{
  height: 150px;
}
</style>
