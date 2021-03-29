<template>
<div class="page-navbar"> 
    <!-- navbar -->  
    <mt-navbar class="page-part" v-model="selected2">  
      <mt-tab-item id="最新商品"><p class="pfont2">最新商品</p></mt-tab-item>  
      <mt-tab-item id="攒机配件"><p class="pfont2">攒机配件</p></mt-tab-item>  
      <mt-tab-item id="活动商品"><p class="pfont2">活动商品</p></mt-tab-item>  
    </mt-navbar>  
  
    <div>  
      <mt-cell v-show="this.show2">请检查网络连接</mt-cell>  
    </div>  
   
    <!-- tabcontainer -->  
    <mt-tab-container v-model="selected2">  
      <mt-tab-container-item id="最新商品"> 
      <div class="switcher1">
						<!-- switcher mask of the page -->
						<div >
             
								<div  v-for="(newes) in shops1" :key="newes.id" @click="toShops(newes)">
								<div  v-for="(stories) in newes.stories" :key="stories.id">
								<div class="img-holder2" v-for="(images) in stories.images" :key="images.id">
										<img :src='images' alt="图片">	
                <div class="ahold">
									<h3>{{stories.title}}</h3>
                 
                  </div> 
                  <a :href="newes.tbpath" id="test" target="showHere" @click="showIframe($event);" >去淘宝购买</a>
								  <a :href="newes.jdpath" id="test" target="showHere" @click="showIframe($event);" >去京东购买</a>
                </div>
                </div>
								</div>	
								</div>
							  </div>

      </mt-tab-container-item>  
      <mt-tab-container-item id="攒机配件">  
        <div class="switcher1">
						<!-- switcher mask of the page -->
					<div  v-for="(newes) in shops2" :key="newes.id" @click="toShops(newes)">
								<div  v-for="(stories) in newes.stories" :key="stories.id">
								<div class="img-holder2" v-for="(images) in stories.images" :key="images.id">
										<img :src='images' alt="图片">	
                <div class="ahold">
									<h3>{{stories.title}}</h3>
                  
                  </div> 
                  <a :href="newes.tbpath" id="test" target="showHere" @click="showIframe($event);" >去淘宝购买</a>
								  <a :href="newes.jdpath" id="test" target="showHere" @click="showIframe($event);" >去京东购买</a>
                </div>
                </div>
								</div>	
								</div>
							  

      </mt-tab-container-item>  
      <mt-tab-container-item id="活动商品">  
        <div class="switcher1">
						<!-- switcher mask of the page -->
						
             <div  v-for="(newes) in shops3" :key="newes.id" @click="toShops(newes)">
								<div  v-for="(stories) in newes.stories" :key="stories.id">
								<div class="img-holder2" v-for="(images) in stories.images" :key="images.id">
										<img :src='images' alt="图片">	
                <div class="ahold">
									<h3>{{stories.title}}</h3>
                  
                  </div> 
                  <a :href="newes.tbpath" id="test" target="showHere" @click="showIframe($event);" >去淘宝购买</a>
								  <a :href="newes.jdpath" id="test" target="showHere" @click="showIframe($event);" >去京东购买</a>
                </div>
                </div>
								</div>	
								</div>
							

      </mt-tab-container-item>  
    </mt-tab-container> 
<div v-show="this.shop"><mt-button  type="primary" @click.stop='nobuy()'>不买了</mt-button>
</div>
<iframe v-show="iframeState" id="show-iframe"  frameborder=0 name="showHere" scrolling=auto src=''></iframe>

<qbar></qbar>
  </div>
 
</template>
<script>
import { mapState } from 'vuex';
import { Indicator } from 'mint-ui';
import qbar from "./qbar.vue"
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
      shops1:[],
      shops2:[],
      shops3:[],
      selected2: '最新商品' ,
      selected1: '商城' ,
      show2:false,
      iframeState:false,
      goBackState:true,
      shop:false,
    }
},
components:{qbar},
computed: mapState({
      index: state => state.index,
      stories: state => state.stories,
      show:state => state.show,
      newes:state => state.newes,
      

  }),
  methods:{
    toShops:function(newes,index){
      this.$store.commit({
        type: 'changeState',
        show:false,
        newes:newes,
      })
     
    },
    
    buy:function(newes,index){
      this.$store.commit({
        type: 'changeState',
        show:false,
        newes:newes,
      })
     this.shop=true;
 
    },
    showIframe:function(event){
      
         
       Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
      }, 300);
      
      this.iframeState = true;
      this.shop=true;
     
     
    },
    nobuy(){
     this.shop=false;
     
     this.iframeState = false;
    },
},

  mounted() { 
    const oIframe = document.getElementById('show-iframe');
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + 'px';
    oIframe.style.height = deviceHeight + 'px';
    var test = document.getElementById('test'); 
    this.axios.get('http://111.230.88.27:3000/api/v1/shops')
                .then((response) => {
                  let data=response.data;
                  for(var index in data)
                  if(data[index].shopsid==1) {
                      this.shops1.push(data[index])
                      console.log(this.shops1) 
                      } 
                  else if(data[index].shopsid==2 ){
                      this.shops2.push(data[index])
                      console.log(this.shops2) 
                  } 
                  else{ 
                     this.shops3.push(data[index])
                      console.log(this.shops3) 
                  }                   
                })
                .catch((error) => {
                  this.show2=true;
                });

  }
  }
</script>
<style scoped>
#body{
  font-family: 'Avenir', Hmtvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
a {
cursor:pointor;
}
.pfont2{
  font-size: 50px;
  
}
h3 {
  font-size: 40px; 
  font-weight: normal; 
  margin: 10px 0 0; 
  text-transform: uppercase;
  color:rgb(30, 163, 240)
}

h4 {
  font-size: 30px; 
  font-weight: normal; 
  margin: 10px 0 0; 
  text-transform: uppercase; 
}
a {font-size: 25px; 
  font-weight: normal; 
  margin-bottom: 10px;
}
.iframe{
  margin:0;
  padding:0;
  width: 100%;
  height:80%
}
.switcher1 {
	position:relative;
  background: #ffffff;
  font-size: 25px
}

.switcher1 .switcher-mask {
	width: 100%;
	margin: 0 auto;
	position: relative;
  
}

.switcher1 .switcher1-slide {
	width: 100px;
	vertical-align:middle;
	padding: 0 15px;
	position: relative;
  
  
}
.switcher1 .slide-holder {
	background: #c7dffa;
	float: left;
	padding: 0px 10px 0px;
	vertical-align:middle;
	-webkit-transition: background .25s linear;
  transition: background .25s linear;
  
}


.switcher1 .img-holder2 {
	float: left;
	background:  #c7dffa;
	padding: 16.07px;
  margin: 0 0 0px;
  max-height: 400px;
  width: 29%;
  margin-top:10px;
  
}

.switcher1 .img-holder2 img {
	max-width: 500px;
  margin-right:10px;
  width: 70%;
}
.ahold{
  height: 150px;
}

</style>
