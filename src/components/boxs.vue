<template>
<div>
<mt-header :title='headertitle' style="border-radius:10px" v-model="headertitle">
  
    <mt-button icon="back" @click="back()"  slot="left">返回</mt-button>
  
  <mt-button icon="more" slot="right" @click="more()"></mt-button>
</mt-header>
       <mt-loadmore :top-method="loadTop" :bottom-method="loadmore" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill=false>
        <div class='comment' v-for="(plun,index) in items" :key="index"  v-if="index<limit" @click="toTie(plun)"><!-- 此行v-if不bi生效 -->
          <div style="height:1px;background-color:#00008b"></div>
          <div  class='text-right' @click.stop="openreport"><a>report</a>
          <mt-popup style="border-radius:20px;" v-model="popupVisible2" pop-transition="popup-fade" closeOnClickModal='false'>
          <mt-radio style="height:320px;width:300px;text-align:center;"  v-model="value" align="center" :options="['涉及政治', '辱骂信息', '其他举报']"> 
          </mt-radio>
          <textarea type='text'  class='report_area' v-model="report"></textarea>
          <mt-button style="float:left" type="primary" size="large" @click.stop="reported(pluns)">提交</mt-button>
          <mt-button style="float:right" type="danger" size="large" @click.stop="cancel2">取消</mt-button>
          </mt-popup>
          </div>
        <!-- 此行v-if设置帖子只显示limit条 -->
          <div  class='commentleft' >
              
              <h1>{{plun.title}}</h1>
              </div> 
          <div  class='commentleft' >
             
              <h2>{{plun.body}}</h2>
              </div> 
          <div  class='text-right'>by <a href="#non">{{plun.auth+''}}</a> 
          <a ><img src="../assets/like.png" @click.stop="like(plun)" style="height:50px">
          {{plun.like}}
          </a>
          
          </div>
          </div>
       </mt-loadmore>
        <mt-button  type="primary" @click.stop='loadmore()'>加载更多</mt-button>
  
  <div class='divright' @click.stop="openpopup()">
  
  <img src="../assets/send.png">
  <mt-popup v-model="ftVisible" pop-transition="popup-fade" position="bottom" closeOnClickModal='false' class="mypop">
  
      <mt-field label="标题" placeholder="请输入标题"  state="error1" v-model="title"></mt-field>
      <mt-field label="正  文" placeholder="请输入正文" type="textarea"  state="error2"  v-model="tbody"></mt-field>
      <mt-button size=large type="primary" @click.stop='upTie()' fixed>发帖</mt-button>
      <mt-button size=large type="danger" @click.stop='closepopup()' fixed>取消</mt-button>
  
  
  </mt-popup>
  </div>

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
          plcount:0, 
          ftVisible:false,
          popupVisible2:false,
          headertitle:"",
          title:'',
          tbody:'',
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
      boxs:state => state.boxs,
      user1:state => state.user1,
  }),
  methods:{
      openreport:function(){
      this.popupVisible2=true;
      
      },
    cancel2:function(){
      this.popupVisible2=false;
      this.value2=""
      },
    back:function(){
      Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
        this.$router.push('/box')
      }, 300);
    },//返回按钮
    reported:function(pluns){
      if(this.mydata==""){
                  MessageBox.alert('请登录', '提示');
             }
             else{
               if(this.value==""){
                 MessageBox.alert('请选择举报内容', '提示'); 
                }
               else{
                 if(this.value=="其他举报"&&this.report==""){
                    MessageBox.alert('请输入举报内容', '提示');
                 }
                 else{
                   this.axios.post('http://111.230.88.27:3000/api/v1/reports',{
                   "reporttype":this.value,
                   "report":this.report,
                   "reportid":pluns.id,  
             })
               .then((response)=>  {
                     if (response.status==200){
                        MessageBox.alert('举报成功', '提示');
                        this.pl="";
                     }
                     else {
                       MessageBox.alert('举报失败', '提示');
                     }
            })
            .catch((error) => {
                 console.log(error);
                 MessageBox.alert('网络未连接', '提示');
                });
                 }
               }
                }      
    },
    toTie:function(plun){
        this.$store.commit({
        type: 'changeState',
        tie:plun,
      })
       this.$router.push('./tie');
    },//点击进入帖子详情
    upTie:function(){
     if(this.mydata==""){
            MessageBox.alert('请登录', '提示');
            this.ftVisible=false;
     }
      else{
               if(this.title==""){
                 MessageBox.alert('请选择标题', '提示');
                 
                }
               else{
                 if(this.body==""){
                    MessageBox.alert('请输入内容', '提示');
                 }
       let baseurl="http://111.230.88.27:3000/api/v1/boxes/";
       let tieurl=baseurl+this.boxs.id+"/tie";
       let qid=this.boxs.id
       this.axios.post(tieurl,{
        "title":this.title,
        "boxId":qid,
        "like":0,
        "body":this.tbody,
        "auth":this.mydata
       })
       .then((response) => {
                      if (response.status==200){
                        MessageBox.alert('发送成功', '提示');
                        }
                    else{
                         MessageBox.alert('发送失败', '提示');
                    }              
                })
                .catch((error) => {
                  this.show2=true;
                });
        this.ftVisible=false;
      //发帖
    }
    }
    },
    openpopup:function(){
       this.ftVisible=true;
    },
    closepopup:function(){
       this.ftVisible=false;
    },
    loadmore:function() {
    this.limit+=10;
    Indicator.open('加载中...');
    setTimeout(() => {
        Indicator.close();
      }, 300);
    if(this.count<this.limit){
       MessageBox.alert('帖子全部加载完毕', '提示');
       this.allLoaded = true;// 若数据已全部获取完毕
    }
    this.$refs.loadmore.onBottomLoaded();
    },//加载更多
    loadTop:function(){
      Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
      }, 300);
      this.axios.get(this.tieurl)
                .then((response) => { 
                    this.news.length=0;
                    this.news.push(response.data)
                    
                      if(response.data=="")  {
                      }                
                })
                .catch((error) => {
                  this.show2=true;
                });
      this.$refs.loadmore.onTopLoaded();
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
updated(){
    this.headertitle=this.boxs.title;
},
mounted() { 
      let baseurl="http://111.230.88.27:3000/api/v1/boxes/";
      var tieurl=baseurl+this.boxs.id+"/tie";
      
      var plcount=baseurl+this.boxs.id+"/tie/count";
      let mylogin=localStorage.getItem("mylogin");
      this.headertitle=this.boxs.title;
      this.mydata.push(mylogin);
      this.axios.get(tieurl)
                .then((response) => {  
                    this.items= this.items.concat(response.data);
                      console.log(this.items)  
                      if(response.data=="")  {
                          this.showp=true;
                      }             
                })
                .catch((error) => {
                  
                });
      this.axios.get(plcount)
                .then((response) => {  
                       let data= response.data;
                    for(let index in data){
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

.commentleft p{
    float: left;
    font-size: 40px
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
.comment {
    margin-top: 30px;
    color: rgb(0, 0, 0)
}
.comment .text {
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    background: #fff;
}
.comment .text a{
    font-size: 60px;
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
.comment h2{
    font-size: 40px;
    text-align: center;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 1; /** 显示的行数 **/
    overflow: hidden;
}
.comment h1{
    text-align: center;
    font-size: 50px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 1; /** 显示的行数 **/
    overflow: hidden;
}
.divright{
    font-size: 100px;
    color: #62c5ff;
    cursor: pointer;
    margin-right: 10px;
    position: fixed;
    z-index: 2; 
    right:0;
    top:80%;
    right:5%;
}
.divright img{
    width: 70%;
}
.mypop{
    height: 28%;
    width: 100%;
}
.mypop input{
    height: 100px;
    width: 300px;
}
</style>