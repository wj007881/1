<template><div>
<div v-for="(videoes,index) in videos" :key="videoes.id" >
    <div   v-for="(stories,index) in videoes.stories" :key="stories.id">
          <div id="oDiv" @click="toNew(stories)" >
          <li  v-for="(images,index) in stories.images" :key="images.id"  >
          <h1>{{stories.title}}</h1>
          <h4>{{stories.litletitle}}</h4>
          <img :src='images' ></img>
          </li>
          </div>
    </div>
  </div>
</div>

</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios';
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      videos:[],
    };
  },
  methods:{
    toNew:function(stories){
      this.$store.commit({
        type: 'changeState',
        stories: stories
      })
      this.$router.push('/video');
        } 
  },
  mounted() {
    this.axios.get('http://localhost:3000/videos')
                .then((response) => {  
                      this.videos.push(response.data);
                      console.log(this.videos)                 
                })
                .catch((error) => {
                  console.log(error);
                });
  },
};
</script>
<style>
#body{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

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
 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 480px;
    height:200px; 
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  

</style>
