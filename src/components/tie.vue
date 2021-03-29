<template>

<div >
  <mt-header title="详情">
  
    <mt-button  @click="back()" slot="left" >返回</mt-button>
 
    <mt-button  slot="right" @click="more()">更多</mt-button>
</mt-header>    
          <h1>{{tie.title}}</h1>
          <p>{{tie.body}}</p>
    <div>
        <div class='message_title'>
			<span>评论区</span>
		</div>
		<div class='comment' v-for="(plun,index) in items" :key="plun.id" v-if="index<3" ><!-- 此行v-if不bi生效 -->
          <div  class="text" v-for="(pluns,index) in plun" :key="pluns.id"  v-if="index<3" @click="toPls()"><!-- 此行v-if设置评论只显示前三条 -->
          <div  class='comment left'>{{pluns.plun+""}}</div> 
          <div  class='text-right'>by <a href="#non">{{pluns.auth+''}}</a>
           <a v-show="likeshow"><img src="../assets/like.png" @click.stop="like(pluns)" style="height:50px">{{pluns.like}}</a>
           <a v-show="unlikeshow">取消<img src="../assets/unlike.png" @click.stop="unlike(pluns)" style="height:50px">{{pluns.like}}</a>
          </div>
          </div>
          
         
          </div>

          <span v-show="this.showp">无人评论</span>
        <textarea type='text'  class='info_area' v-model="pl"></textarea>
		<button class='submit_btn' @click='written()'>评论</button>
		<button class='submit_btn' @click='save()'>添加到我的收藏</button>
		
</div>
		

  </div>
</template>
<script>

import { mapState } from 'vuex'
export default {
    data () {
        return {
          items:[],
          comment:[],
          pl:[],
          showp:true
        }
    },
    
    computed: mapState({
      index: state => state.index,
      show:state => state.show,
      tie:state => state.tie
  }),
  
  methods:{
    back:function(){
      this.$store.commit({
        type: 'changeState',
        show:true
      })
      this.$router.go(-1)
    },
    more:function(){
      
    },
    toPls:function(){
      this.$router.push("./pls")
    },
    save:function(){
      if(this.mydata==""){
                  MessageBox.alert('请登录', '提示');
             }
             else{   
             this.axios.post('http://111.230.88.27:3000/api/v1/saves',{
                   "stories":this.newes.stories,
                   "saveid":this.newes.id,
                   "xbuserid":this.myuser,
                    
             })
               .then((response)=>  {
                     if (response.status==200){
                        MessageBox.alert('收藏成功', '提示');
                     }
                     else {
                       MessageBox.alert('收藏失败', '提示');
                     }
                    
            })
            .catch((error) => {
                 MessageBox.alert('请检查网络', '提示');
                });
           }
    },
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
                        this.unlikeshow=true,
                        this.likeshow=false,
                        MessageBox.alert('点赞成功', '提示');
                        
                this.axios.get('http://111.230.88.27:3000/api/v1/stories')
                .then((response) => {  
                    
                    this.items.length = 0;
                    this.items.push(response.data);
                      if(response.data=="")  {
                          this.show2=true;
                      }                
                })
                .catch((error) => {
                  this.show2=true;
                });
                     }
                     else {
                       MessageBox.alert('点赞失败，请检查网络', '提示');
                     }
                    
            })
            .catch((error) => {
                 console.log(error);
                 MessageBox.alert('请检查网络', '提示');
                });
           }
    },
    openreport:function(){
      this.popupVisible=true;
      
      },
    cancel:function(){
      this.popupVisible=false;
      this.value=""
      },
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
    unlike:function(pluns){
      if(this.mydata==""){
                  MessageBox.alert('请登录', '提示');
             }
             else{
                 var unlike=pluns.like-1
                 
             this.axios.patch('http://111.230.88.27:3000/api/v1/stories',{
                   "like":unlike,
                   "id":pluns.id 
             })
               .then((response)=>  {
                     if (response.status==200){
                        MessageBox.alert('取消点赞成功', '提示');
                        this.likeshow=true,
                        this.unlikeshow=false,
                        this.axios.get('http://111.230.88.27:3000/api/v1/stories')
                  .then((response) => {  
                     this.items.length = 0;
                     this.items.push(response.data);
                      if(response.data=="")  {
                          this.show2=true;
                      }                
                  })
                  .catch((error) => {
                    console.log(error);
                    this.show2=true;
                  });//刷新评论以及点赞数
                     }
                     else {
                       MessageBox.alert('取消点赞失败，请检查网络', '提示');
                     }
                    
            })
            .catch((error) => {
                 MessageBox.alert('网络未连接', '提示');
                });
           }
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
                   "like":0,
                   "newsId":this.newes.id,  
             })
               .then((response)=>  {
                     if (response.status==200){
                        MessageBox.alert('评论成功', '提示');
                        this.pl="";
                        this.axios.get('http://111.230.88.27:3000/api/v1/stories')
                  .then((response) => {  
                     this.items.length = 0;
                     this.items.push(response.data);
                      if(response.data=="")  {
                          this.show2=true;
                      }                
                  })
                  .catch((error) => {
                    console.log(error);
                    this.show2=true;
                  });//刷新评论以及点赞数
                     }
                     else {
                       MessageBox.alert('评论失败', '提示');
                     }
                    
            })
            .catch((error) => {
                 console.log(error);
                 MessageBox.alert('网络未连接', '提示');
                });
           }
    }
        /* this.$alert(stories.title, stories.title, {
          confirmButtonText: '确定',
          width:1500,
          height:300,
          callback: action => {
          }
        }); */
        /* this.$alert(stories.title, stories.title, {
          confirmButtonText: '确定',
          width:1500,
          height:300,
          callback: action => {
          }
        }); */
  },
  mounted() { 
      var baseurl="http://111.230.88.27:3000/api/v1/tie/"
      var piurl=baseurl+this.tie.id+"/stories"
      var plcount=baseurl+this.tie.id+"/stories/count"
      var mylogin=localStorage.getItem("mylogin");
      var myuserid=localStorage.getItem("myuserid");
      this.axios.get(piurl)
                .then((response) => {  
                      this.items.push(response.data);
                      console.log(this.items)
                        this.showp=true;                
                })
                .catch((error) => { 
                });
      this.axios.get(plcount)
                .then((response) => {  
                       var data= response.data;
                    for(var index in data){
                          this.plcount=data.count
                       }
                      
                      if(response.data=="")  {
                          
                      }             
                })
                .catch((error) => {
                  console.log(error);
                });
  }
}
</script>
<style scoped>
  .img-wrap {
    position: relative;
    overflow: hidden;
  }
  .stroies-title {
    margin: 20px 0;
    padding: 0px 40px;
    bottom: 10px;
    z-index: 1;
    position: absolute;
    color: white;
    font-size: 30px;
    text-shadow: 0px 1px 2px rgba(0,0,0,0.3);
  }
  @media (max-width: 800px) {
    .stroies-title {
      font-size: 18px;
      padding: 0 15px;
    }
  }
  .img-wrap .img-source {
    position: absolute;
    bottom: 10px;
    z-index: 1;
    font-size: 12px;
    color: rgba(255,255,255,.6);
    right: 40px;
    text-shadow: 0px 1px 2px rgba(0,0,0,.3);
  }
  .img-mask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: -moz-linear-gradient(top, rgba(0,0,0,0) 25%, rgba(0,0,0,0.6) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(25%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,0.6)));
    background: -webkit-linear-gradient(top, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
    background: -o-linear-gradient(top, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
    background: -ms-linear-gradient(top, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
    background: linear-gradient(to bottom, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#99000000',GradientType=0 );
  }
  .stroies-image {
    width: 100%;
  }
body {
    background-color: #e4e4e4;
}

.hide {
    display: none;
}

.message_title {
    background-color: #00BFFF;
    height: 60px;
    padding: 0 0.5rem;
    font-size: 35px;
    line-height: 3.5rem;
    border-radius: 10px;
}

.info_area {
    width: 100%;
    margin: 0 auto;
    display: block;
    height: 200px;
    padding: 0.3rem;
    font-size: 30px;
    margin-top:10px;
    border-radius: 10px;
    resize : none;
}
.report_area{
    width: 90%;
    margin: 0 auto;
    display: block;
    height: 40%;
    padding: 5px;
    font-size: 50px;
    border-radius: 10px;
    resize : none;
}
.submit_btn {
    width:250px;
    height: 70px;
    font-size: 30px;
    background-color: #00BFFF;
    border: 0;
    position: relative;
    border-radius: 10%;
    border-radius: 10px;
}


.main {
    height: 100%;
}

.text-right {
    text-align: right;
    font-size: 35px;
}

.comment .text {
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    background: #fff;
    font-size: 35px;
}
h1{
    font-size: 80px
}
p{
    font-size: 50px
}
</style>