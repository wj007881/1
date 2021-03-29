<template>
<div>
<mt-header title="资讯详情" style="border-radius:10px">
  
    <mt-button icon="back" @click="back()"  slot="left">返回</mt-button>
  
  <mt-button icon="more" slot="right" @click="more()"></mt-button>
</mt-header>

       <mt-loadmore :top-method="loadTop" :bottom-method="loadmore" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill=false>
       <div class='comment' v-for="(plun,index) in items" :key="index"  ><!-- 此行v-if不bi生效 -->
        <div  class="text" v-for="(pluns,index) in plun" :key="index"  v-if="index<limit"><!-- 此行v-if设置评论只显示limit条 -->
          <div  class='comment left'>{{pluns.plun+""}}</div> <div  class='text-right'>by <a href="#non">{{pluns.auth+''}}</a> 
          <a v-show="likeshow"><img src="../assets/like.png" @click.stop="like(pluns)" style="height:50px">{{pluns.like}}</a>
          <a v-show="unlikeshow">取消<img src="../assets/unlike.png" @click.stop="unlike(pluns)" style="height:50px">{{pluns.like}}</a>
         </div>
          </div>
          </div>
       </mt-loadmore>
        <mt-button  type="primary" @click.stop='loadmore()'>加载更多</mt-button>
<mt-cell class='bottom' fixed>
  <img src="../assets/bq.jpg" style="height:50px" @click="bq()">
  <input type='text'  class='info_area2' v-model="pl"  id="show-pl">
  <img src="../assets/fs.jpg" style="height:50px" @click="written()">
  <button  slot="right" @click="written()"></button>
</mt-cell>
</div>
</template>
<script>

import { Indicator } from 'mint-ui';
import { mapState } from 'vuex';
import { MessageBox } from 'mint-ui';
export default {
  data () {
        return {
          items:[],
          comment:[],
          showp:false,
          pl:[],
          limit:10,
          count:1,
          allLoaded:false,
          plv:[],
          mydata:[],
          saves:[]

        }
},
computed: mapState({
      index: state => state.index,
      show:state => state.show,
      newes:state => state.newes,
      user1:state => state.user1,
  }),
  methods:{
     back:function(){
      Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
      }, 300);
      this.$router.go(-1)
    },//返回按钮
    loadmore:function() {
    this.limit+=10;
    Indicator.open('加载中...');
    setTimeout(() => {
        Indicator.close();
      }, 300);
    if(this.count<this.limit){
       MessageBox.alert('评论全部加载完毕', '提示');
       this.allLoaded = true;// 若数据已全部获取完毕
    }this.$refs.loadmore.onBottomLoaded();
    },//加载更多
    loadTop:function(){
      Indicator.open('加载中...');
    },//刷新（未实现）
    like:function(pluns){
      if(this.mydata==""){
                  MessageBox.alert('请登录', '提示');
             }
             else{
                 var like=pluns.like+1
             this.axios.patch('http://111.230.88.27:3000/api/v1/stories',{
                   "like":like,
                   "id":pluns.id 
             })
               .then((response)=>  {
                     if (response.status==200){
                                MessageBox.alert('点赞成功', '提示');
                this.axios.get('http://111.230.88.27:3000/api/v1/stories')
                .then((response) => {  
                    this.items.push(response.data);
                    this.items.splice(0,this.count)
                    
                      if(response.data=="")  {
                          this.show2=true;
                      }                
                })
                .catch((error) => {
                  this.show2=true;
                });//刷新评论以及点赞数
                     }
                     else {
                       MessageBox.alert('点赞失败，请检查网络', '提示');
                     }
                    
            })
            .catch((error) => {
                 MessageBox.alert('请检查网络', '提示');
                });
           }
    },//点赞
    unlike:function(pluns){
      if(this.mydata==""){
                  MessageBox.alert('请登录', '提示');
             }
             else{
                 var unlike=pluns.like+1
                 
             this.axios.patch('http://111.230.88.27:3000/api/v1/stories',{
                   "like":unlike,
                   "id":pluns.id 
             })
               .then((response)=>  {
                     if (response.status==200){
                                MessageBox.alert('点赞成功', '提示');
                this.axios.get('http://111.230.88.27:3000/api/v1/stories')
                .then((response) => {  
                    this.items.push(response.data);
                    this.items.splice(0,this.count)
                    
                      if(response.data=="")  {
                          this.show2=true;
                      }                
                })
                .catch((error) => {
                  this.show2=true;
                });//刷新评论以及点赞数
                     }
                     else {
                       MessageBox.alert('取消点赞失败，请检查网络', '提示');
                     }  
            })
            .catch((error) => {
                 MessageBox.alert('请检查网络', '提示');
                });
           }
    },//取消点赞
    more:function(){
       MessageBox.alert('更多功能敬请期待', '提示');
    },
    bq:function(){
       MessageBox.alert('更多功能敬请期待', '提示');
    },
    written:function(){
             if(this.mydata==""){
                  MessageBox.alert('请登录', '提示');
             }
              else if(this.pl==""){
                  MessageBox.alert('请输入', '提示');
               }
               else{
             this.plv.push(this.pl);
             this.axios.post('http://111.230.88.27:3000/api/v1/stories',{
                   "auth":this.mydata,
                   "plun":this.plv,
                   "newsId":this.newes.id,  
             })
               .then((response)=>  {
                     if (response.status==200){
                        MessageBox.alert('评论成功', '提示');
                     }
                     else {
                       MessageBox.alert('评论失败', '提示');
                     }
                    
            })
            .catch((error) => {
                 MessageBox.alert('请检查网络', '提示');
                });
           }
    }
  },
mounted() { 
      var baseurl="http://111.230.88.27:3000/api/v1/news/";
      var piurl=baseurl+this.newes.id+"/stories";
      var plcount=baseurl+this.newes.id+"/stories/count"
      var mylogin=localStorage.getItem("mylogin");
      const opl = document.getElementById('show-pl');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      opl.style.width = deviceWidth-140 + 'px';
      opl.style.height = deviceHeight-550 + 'px';

      this.mydata.push(mylogin);
      this.axios.get(piurl)
                .then((response) => {  
                      this.items.push(response.data);
                      console.log(this.items)  
                      if(response.data=="")  {
                          this.showp=true;
                      }             
                })
                .catch((error) => {
                  
                });
      this.axios.get(plcount)
                .then((response) => {  
                       var data= response.data;
                    for(var index in data){
                          this.plcount=data.count
                       }
                      console.log(this.items)  
                      if(response.data=="")  {
                          this.showp=true;
                      }             
                })
                .catch((error) => {
                });
      
             
  },
}
</script>
<style scoped>
  .img-wrap {
    position: relative;
    overflow: hidden;
  }
  .bottom{
   position:fixed;
   bottom:0;
   
  }
  

.info_area2 {
    width:80%;
    border-radius: 5px;
    max-height:50px;
    resize : none;
}



.btn_style {
    text-align: center;
    display: block;
    margin-top: 3rem;
}

.main {
    height: 100%;
}

.user_pic {
    width: 13%;
    border-radius: 50%;
    display: inline-block;
    overflow: hidden;
    margin-right: 3%;
}

.bg_brown {
    background-color: #e4e4e4;
    padding-top: 1rem;
}

.message_author {
    font-size: 1rem;
}

.message_date {
    font-size: 0.6rem;
}

.message_info {
    display: block;
    font-size: 0.7rem;
    padding: 0.5rem;
}

.floor {
    font-size: 0.8rem;
    padding-right: 4%;
    color: blueviolet;
}

.bg_brown li {
    border-bottom: 1px solid #9DC45F;
    margin-top: 0.5rem;
}

.user_info_show {
    padding: 0 0.5rem;
}

ul {
    margin-bottom: 0;
    font-size: 0.5rem;
}

.loading_pic {
    position: fixed;
    bottom: 1%;
    width: 6%;
    margin: 0 auto;
    left: 0;
    right: 0;
}

.endInfo {
    width: 100%;
    display: block;
    text-align: center;
    font-size: 0.8rem;
    padding: 0.5rem 0;
}

.main {
    background-color: #e4e4e4;
}

select {
    width: 4rem;
    height: 1.2rem;
    font-size: 0.7rem;
}

option {
    font-size: 0.35rem;
}

.message_icon {
    width: 11%;
    display: inline-block;
    padding-right: 5%;
    padding-bottom: 2%;
}

.text-right {
    text-align: right;
    font-size: 25px;
}

.reward_input {
    margin: 0 auto;
    display: block;
    width: 80%;
    padding: 1% 1%;
}

.two_btn {
    text-align: center;
    margin-top: 1rem;
}

.two_btn span {
    width: 3.5rem;
    height: 1.3rem;
    font-size: 0.6rem;
    background-color: #9DC45F;
    border: 0;
    border-radius: 3%;
    display: inline-block;
    line-height: 1.3rem;
}

.reward_area {
    padding: 1rem 0;
}

.up_pic {
    width: 10%;
    position: fixed;
    bottom: 2rem;
    right: 0.5rem;
}

.beRelative {
    position: relative;
}

.beFix {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
.comment .text {
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    background: #fff;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>