<template>
<div >
  <mt-header title="视频详情">
  
    <mt-button  @click="back()" slot="left">返回</mt-button>
  
  <mt-button  slot="right" @click="more()">更多</mt-button>
</mt-header>

         <div v-for="(stories) in videos.stories" :key="stories.id" >
          <div  v-for="(images) in stories.images" :key="images.id"  >
          <h1>{{stories.title}}</h1>
          </div>
          <div v-html="stories.body">
          </div>
          </div>


          
          <div class="player">
          <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
           >
          </video-player>
          </div>
       
        <div class='message_title'>
			  <span>评论区</span>
		    </div>
		 
		
          <div class='comment' v-for="(plun,index) in items" :key="plun.id" v-if="index<3" ><!-- 此行v-if不bi生效 -->
          <div  class="text" v-for="(pluns,index) in plun" :key="pluns.id"  v-if="index<3" @click="toPls()"><!-- 此行v-if设置评论只显示前三条 -->
          <div  class='text-right' @click.stop="openreport"><a>report</a>
          <mt-popup style="border-radius:15px;" v-model="popupVisible" pop-transition="popup-fade" closeOnClickModal='false'>
          <mt-radio style="height:150px;width:300px;text-align:center" title="举报这条评论" v-model="value" align="center" :options="['涉及政治', '辱骂信息', '其他举报']"> 
          </mt-radio>
          <textarea type='text'  class='report_area' v-model="report"></textarea>
          <mt-button style="float:left" type="primary" size="normal" @click.stop="reported(pluns)">提交</mt-button>
          <mt-button style="float:right" type="danger" size="normal" @click.stop="cancel()">取消</mt-button>
          </mt-popup>
          </div>
          <div  class='comment left'>{{pluns.plun+""}} </div> 
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
</template>
<script scoped>
import { mapState } from 'vuex'
import { videoPlayer } from 'vue-video-player';
import { MessageBox } from 'mint-ui';
export default {
    data () {
        return {
          items:[],
          comment:[],
          showp:true,
          saves:[],
          pl:""
         }
     },
    components: {
      videoPlayer
    },
    computed: 
    mapState({
      index: state => state.index,
      show:state => state.show,
      videos:state => state.videos,
      playerOptions: function(state){
          return {
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
          type: 'video/mp4',
          src: state.videos.path //你的m3u8地址（必填）
          }],
          poster: state.videos.image, //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
//        controlBar: {
//          timeDivider: true,
//          durationDisplay: true,
//          remainingTimeDisplay: false,
//          fullscreenToggle: true  //全屏按钮
//        }
         }
          }
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
         
  }),
  player() {
      return this.$refs.videoPlayer.player
    },
  
    
  
  methods:{
    back:function(){
      this.$store.commit({
        type: 'changeState',
        show:true
      })
     this.$router.go(-1)
    },
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player){
      console.log('player pause!', player)
    },
    more:function(){
      alert(this.videos.path)
    },
    save:function(){
      if(this.mydata==""){
                  MessageBox.alert('请登录', '提示');
             }
             else{
                   this.saves.push(this.videos);
                    this.$store.commit({
                         type: 'changeState',
                         saveid:this.videos.id,
                         })
             this.axios.post('http://111.230.88.27:3000/api/v1/saves',{
                   "stories":this.saves,
                   "userid":this.user1,
                   "saveid":this.videos.id,  
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
                   "videosId":this.videos.id,  
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
  },
  mounted() { 
      var baseurl="http://111.230.88.27:3000/api/v1/videos/"
      var piurl=baseurl+this.videos.id+"/pl1"
      this.axios.get(piurl)
                .then((response) => {  
                      this.items.push(response.data);
                      console.log(this.items)  
                      if(response.data=="")  {
                          this.showp=true;
                      }             
                })
                .catch((error) => {
                  this.showp=true;
                });
  },
}
</script>
<style>
  .container {
    background-color: #efefef;
    min-height: 100%;
  }
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
.btn{
  float:left
}
.hide {
    display: none;
}

.bg {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 1;
    -moz-opacity: 0.7;
    opacity: .70;
    filter: alpha(opacity=70);
}

.message_title {
    background-color: #00BFFF;
    height: 2rem;
    padding: 0 0.5rem;
    font-size: 0.8rem;
    line-height: 3.5rem;
    border-radius: 5px;
}

.info_area {
    width: 80%;
    margin: 0 auto;
    display: block;
    height: 130px;
    padding: 0.3rem;
    font-size: 0.7rem;
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
    font-size: 15px;
    
    border-radius: 10px;
    resize : none;
}
.submit_btn {
    width:140px;
    height: 40px;
    font-size: 1rem;
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

</style>