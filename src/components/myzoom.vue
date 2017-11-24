<template>
<div >
  <mt-header title="我的收藏">
  <router-link to="/login" slot="left">
    <mt-button  @click="back()" >登陆</mt-button>
  </router-link>
  <router-link to="/sign" slot="right">
  <mt-button  @click="more()">注册</mt-button>
  </router-link>
</mt-header><mt-cell class="page-part" v-show="this.show2">请登陆查看我的收藏</mt-cell>
<div v-for="(saves,index) in save" :key="saves.id" >
    <div   v-for="(stories,index) in saves.stories" :key="stories.id">
          <div id="oDiv" @click="toNew(stories)">
          <mt-cell-swipe
   v-for="(images,index) in stories.images" :key="images.id" title="标题文字" value="说明文字"
  :right="[
    {
      content: '删除',
      style: { background: 'red', color: '#fff' },
      handler: () => this.$messagebox('删除')
    }
  ]"
 >        <h1>{{stories.title}}</h1>
          <h4>{{stories.litletitle}}</h4>
          <img :src='images' ></img></mt-cell-swipe>
          </div>
    </div>
  </div>
</div >

</template>
<script>


export default {
  data () {
    return {
     save:[],
     show2:false
    }
  },
  mounted() { 
    this.axios.get('http://localhost:3000/news')
                .then((response) => {  
                      this.save.push(response.data);  
                         console.log(this.save)              
                })
                .catch((error) => {
                  this.show2=true;
                  console.log();
                });
  },
}
</script>
<style>

</style>
