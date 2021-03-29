<template>
<div>
  

   <mt-search v-model="value" > <div class="vid"></div>
   <div v-for="newes in filterResult" @click="toNews(newes)" :key="newes.id" >  
   
    <mt-cell :title="newes.title"></mt-cell>


    </div>
     </mt-search> 
 <qbar></qbar>

</div>

</template>
<script>
import qbar from "./qbar.vue"
export default {
  data () {
    return {
            value: '',
            mysearchdata:[],
            idarr:[],
             }
             },
  computed: {  
    filterResult() {  
      return this.mysearchdata.filter(value => new RegExp(this.value, 'i').test(value.title));  
    }  
  },
  components:{qbar},
  methods: {
     toNews:function(newes,index){
      this.$store.commit({
        type: 'changeState',
        show:false,
        newes:newes,
      })
      
      this.$router.push('/finds');
    },
},
 mounted(){ 
     this.axios.get('http://111.230.88.27:3000/api/v1/videos')
                .then((response) => {  
                      var data = response.data;
                      for(var index in data){
                          this.mysearchdata=this.mysearchdata.concat(data[index].stories)
                      }                 
                })
                .catch((error) => { 
                });
     this.axios.get('http://111.230.88.27:3000/api/v1/funs')
                .then((response) => {  
                      var data = response.data;
                      for(var index in data){
                          this.mysearchdata=this.mysearchdata.concat(data[index].stories)
                      }                
                })
                .catch((error) => { 
                });
      this.axios.get('http://111.230.88.27:3000/api/v1/news')
                .then((response) => {  
                      var data = response.data;
                      for(var index in data){
                          this.mysearchdata=this.mysearchdata.concat(data[index].stories)
                      }                
                })
                .catch((error) => { 
                });
      this.axios.get('http://111.230.88.27:3000/api/v1/shops')
                .then((response) => {  
                      var data = response.data;
                      for(var index in data){
                          this.mysearchdata=this.mysearchdata.concat(data[index].stories) 
                          
                      } 
                });
    // this.axios.get('http://localhost:3000/api/v1/top_stories')
    //             .then((response) => {  
    //                    this.mydata=this.mydata.concat(response.data);
    //                    console.log(this.mydata)                
    //              })
    //             .catch((error) => {
                
                  
    //             });
  }, 
}
</script>
<style scoped>
#body{
  font-family: 'Avenir', Hmtvetica, Arial, sans-serif;
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
 .vid{
   height: 100px
 }
</style>
