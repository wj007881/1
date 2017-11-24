<template>
<div class="page-navbar" v-show="this.show"> 
    <!-- navbar -->  
    <mt-navbar class="page-part" v-model="selected">  
      <mt-tab-item id="最新">最新</mt-tab-item>  
      <mt-tab-item id="视频">视频</mt-tab-item>  
      <mt-tab-item id="活动">活动</mt-tab-item>  
    </mt-navbar>  
  
    <div>  
      <mt-cell class="page-part" v-show="this.show2">请检查网络连接</mt-cell>  
    </div>  
  
    <!-- tabcontainer -->  
    <mt-tab-container v-model="selected">  
      <mt-tab-container-item id="最新">  
        
  <div v-for="(newes,index) in news" :key="newes.id" >
    <div   v-for="(stories,index) in newes.stories" :key="stories.id">
          <div id="oDiv" @click="toNew(stories)" >
          <li  v-for="(images,index) in stories.images" :key="images.id"  >
          <h1>{{stories.title}}</h1>
          <h4>{{stories.litletitle}}</h4>
          <img :src='images' ></img>
          </li>
          </div>
    </div>
  </div>


      </mt-tab-container-item>  
      <mt-tab-container-item id="视频">  
        <videobox></videobox>

      </mt-tab-container-item>  
      <mt-tab-container-item id="活动">  
       

      </mt-tab-container-item>  
    </mt-tab-container> 

<qbar></qbar>
  </div>

 


</template>

<script>
import { mapState } from 'vuex'
import videobox from "./videobox.vue"
import qbar from "./qbar.vue"
export default {
  name: 'HelloWorld',
  data () {
    return {
      selected: '最新' ,
      news:[],
      show2:false
    }
  },
  methods:{
    toNew:function(stories,index){
      this.$store.commit({
        type: 'changeState',
        stories: stories,
        show:false,
      })
      this.$router.push('/news');
    }
        /* this.$alert(stories.title, stories.title, {
          confirmButtonText: '确定',
          width:1500,
          height:300,
          callback: action => {
          }
        }); */
  },
  components:{
    qbar,videobox 
  },
  computed: mapState({
      index: state => state.index,
      stories: state => state.stories,
      show:state => state.show,
  }),
/*   computed: mapState({
      index: state => state.index,
      stories: state => state.stories,
  }), */
  mounted() { 
    this.axios.get('http://localhost:3000/news')
                .then((response) => {  
                      this.news.push(response.data);  
                         console.log(this.news)              
                })
                .catch((error) => {
                  this.show2=true;
                  console.log();
                });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
