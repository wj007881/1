<template>
  <div >
    <div class="clear"></div>
    <mt-tab-container class="page-tabbar-container" v-model="selected1">  
        <mt-tab-container-item id="首页">  
        </mt-tab-container-item>  


        <mt-tab-container-item id="发现">    
        </mt-tab-container-item>  

        <mt-tab-container-item id="空间">  
        </mt-tab-container-item>  
      </mt-tab-container> 
  
      <mt-tabbar  v-model="selected1" fixed >
      <mt-tab-item id="首页" >
        <div @click="shou()" >
         
        <img slot="icon" src="../assets/index.png">
        </div> 
        <a class="pfont">首页</a>
      </mt-tab-item>  
     

       <mt-tab-item id="消息" > 
        <div @click="box()" > 
       
            <img slot="icon" src="../assets/box.png" >
        </div>   
        <a class="pfont">消息</a>
      </mt-tab-item>    
      
       
      <mt-tab-item id="空间" >
        <div @click="myzoom()"  >  
         <img slot="icon" src="../assets/myzoom.png" >
        </div> 
        <a class="pfont">空间</a>
      </mt-tab-item>   
    </mt-tabbar>   
  </div>
</template>

<script>

export default {
   name: 'app',
  data () {
    return {
      selected1: '' ,
    }
  },
   methods: {
            shop: function(){
                this.selected1="商城"
                
		       
                },
            find: function(){
                this.selected1="发现"
               
 
                },
            shou: function(){
                this.selected1="首页"
                
 
                },
            myzoom: function(){
              this.selected1="空间"
                
 
                },
            
            box: function(){
              this.selected1="论坛"
                
 
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
}
#body{
  font-family: 'Avenir', Hmtvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.clear{
  clear: both;
}
.pfont{
  font-size: 25px
}
</style>
