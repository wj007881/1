<template><div>
  <mt-header title="论坛"></mt-header>
 <!-- 轮播图 -->
 <swipeheader></swipeheader>
 

    <!-- /论坛板块 / -->
    <div class="accept-container">
          <div class="div1" v-for="items in box " :key="items.id">
            <div class="memo" v-for="item in items.images " :key="item.id" @click="toBoxs(items)">
              <div class="headPic"><img :src="item"></div>
              <div class="text">
                <p>{{items.title}}</p>
              </div>
            </div>
      </div>
    </div>
    <qbar></qbar>
          </div>
</template>
<script>

import { mapState } from "vuex";
import qbar from "./qbar.vue";
import swipeheader from "./swipeheader.vue";
import axios from 'axios';
import { Indicator } from "mint-ui";
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
      showt:false,
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
      box:[
        {
        "title":"攒机板块",
        "images":[
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521437872385&di=ab9f369ef5374358eea76e9161ee0c02&imgtype=0&src=http%3A%2F%2Farticle.fd.zol-img.com.cn%2Ft_s640x2000%2Fg5%2FM00%2F03%2F0D%2FChMkJlkMQK2IEjo_AAEv6ej_ZCoAAcLGAOeXucAATAB180.jpg"
        ]
      },
      {
        "title":"电竞板块",
        "images":[
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521437872385&di=ab9f369ef5374358eea76e9161ee0c02&imgtype=0&src=http%3A%2F%2Farticle.fd.zol-img.com.cn%2Ft_s640x2000%2Fg5%2FM00%2F03%2F0D%2FChMkJlkMQK2IEjo_AAEv6ej_ZCoAAcLGAOeXucAATAB180.jpg"
        ]
      },
      {
        "title":"活动板块",
        "images":[
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521437872385&di=ab9f369ef5374358eea76e9161ee0c02&imgtype=0&src=http%3A%2F%2Farticle.fd.zol-img.com.cn%2Ft_s640x2000%2Fg5%2FM00%2F03%2F0D%2FChMkJlkMQK2IEjo_AAEv6ej_ZCoAAcLGAOeXucAATAB180.jpg"
        ]
      },
      {
        "title":"显卡板块",
        "images":[
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521437872385&di=ab9f369ef5374358eea76e9161ee0c02&imgtype=0&src=http%3A%2F%2Farticle.fd.zol-img.com.cn%2Ft_s640x2000%2Fg5%2FM00%2F03%2F0D%2FChMkJlkMQK2IEjo_AAEv6ej_ZCoAAcLGAOeXucAATAB180.jpg"
        ]
      },
     
      ],
      mydata:[]
    }
  },
  components:{qbar,swipeheader},
  mounted() { 
      var mylogin=localStorage.getItem("mylogin");
      this.mydata.push(mylogin);
      this.axios.get('http://111.230.88.27:3000/api/v1/boxes')
                .then((response) => { 
                      if(this.box==""){
                        this.box=this.box.concat(response.data);
                        }//如果数组为空，则直接添加论坛版块数据
                      else{
                        this.box.length=0;
                        this.box=this.box.concat(response.data);
                      }//如果数组不为空，则先清空论坛版块数据，然后再添加论坛版块数据
                      console.log(this.box)  
                      if(response.data=="")  {
                        this.showt=true;   
                      }             
                })
                .catch((error) => {
                });
      
      
             
  },
  methods:{
   toBoxs:function(items){
     if(this.showt==true){
        MessageBox.alert('请检查网络', '提示');
     }
     else{
       this.$store.commit({
        type: "changeState",
        boxs:items,
      })
      Indicator.open("加载中...");
      setTimeout(() => {
        Indicator.close();
      }, 300);
      this.$router.push("/boxs");
     }
    }
   }
  }

</script>
<style scoped>
  
  .accept-container{
    width: 100%;
    height: auto;
  }
 
 
  .accept-container   .div1{
    width: 45%;
    height: 100%;
    border: 1px solid red;
    /* min-height: 150px; */
    /* border: 1px solid blue; */
    padding: 5px;
    float: left;
    margin-top: 30px;
    margin-left: 10px
  }
  .accept-container   .div1 .memo{
    width: 100%;
    height: 100%;
   
    /* border: 1px solid red; */
  }
  .accept-container   .div1 .memo .headPic{
    width: 130px;
    height:120px;
    background-color: yellow;
    display: inline-block;
    overflow: hidden;
    margin-top: 20px;
    /* float: left; */
  }
  .accept-container   .div1 .memo .headPic img{
    width: 100%;
    height:100%;
  
  }
  .accept-container  .div1 .memo .text{
    width: 60%;
    min-height: 100px;
    display: inline-block;
    
    /* float: left; */
  }
  .accept-container  .div1 .memo .text p{
    font-size: 40px; 
    margin-top: 20px;
    line-height: 45px;
    overflow: hidden;  /** 隐藏超出的内容 **/
  }

</style>