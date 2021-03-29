<template>
<div class="swipe-item" >
 <!-- 轮播图 -->
  <mt-swipe :auto="4000">
  <mt-swipe-item v-for="images in web" :key="images.id">
    <img :src="images.images" alt="轮播图片">
    
    </mt-swipe-item>
  </mt-swipe>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "mint-ui";

export default {
  data () {
    return {
      web: [
        {
        "images":[
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521437872385&di=ab9f369ef5374358eea76e9161ee0c02&imgtype=0&src=http%3A%2F%2Farticle.fd.zol-img.com.cn%2Ft_s640x2000%2Fg5%2FM00%2F03%2F0D%2FChMkJlkMQK2IEjo_AAEv6ej_ZCoAAcLGAOeXucAATAB180.jpg"
        ],
        "title":"AMD"
        },
        {
        "images":[
          "http://img.fuwo.com/attachment/1512/08/ff6ab4e49d5911e5a37100163e00254c.jpg"
        ],
        "title":"英特尔"
        },
        {
        "images":[
          "http://img5.imgtn.bdimg.com/it/u=3985933739,184511232&fm=27&gp=0.jpg"
        ],
        "title":"英伟达"
        },
      
      ],
      }
    },
mountes(){
    this.axios.get('http://111.230.88.27:3000/api/v1/boxes')
                .then((response) => { 
                      if(this.box==""){
                        this.box=this.box.concat(response.data);
                        }
                      else{
                        this.box.length=0;
                        this.box=this.box.concat(response.data);
                      }
                      
                      console.log(this.box)  
                      if(response.data=="")  {
                          
                      }             
                })
                .catch((error) => {
                  
                });
}
}
</script>
<style scoped>
.swipe-item{
    height:350px; 
  } 
  .swipe-item img{
    height:350px;
    width:600px
  } 
</style>
