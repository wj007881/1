<template>
<div class="page-navbar"> 
    <!-- navbar -->
   
    <mt-navbar class="page-part" v-model="selected">
      <div class="page1"><img src="../assets/seft.png" height="150px" @click.stop="openseft"></div>
      <div style="margin-left:20%" >
      <mt-button @click="pop">关注</mt-button>
      <mt-button @click="pop2">热门</mt-button>
      </div>
      
      <mt-popup
      v-model="popupVisible"
      position="top" style="width:100%">
      <mt-cell title="默认分组"><span style="color:orange">编辑</span></mt-cell>
      <mt-button style="color:orange">全部关注</mt-button>
      <mt-button >最新微博</mt-button>
      <mt-button >V+微博</mt-button>
      <mt-button >好友圈</mt-button>
      <mt-button >群微博</mt-button>
      <mt-cell title="我的分组"></mt-cell>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button icon="more" style="width:24%"></mt-button>
      <mt-button style="width:24%">新建分组</mt-button>
</mt-popup>


      <div class="page2"><img src="../assets/search.png" height="150px" @click.stop="opensea"></div>
    </mt-navbar>  
   
    <div >  
      <mt-cell v-show="this.show2" >请检查网络连接</mt-cell>
      <div class="poptitle" v-for="n in 4" key="" ><img src="../assets/search.png" height="150px" @click.stop="opensea"></div>  
    </div>
   
    <!-- 发送微博 -->
    <div class='divright' @click.stop="openpopup()">
     <img src="../assets/send.png">
     <mt-popup v-model="ftVisible" pop-transition="popup-fade" position="bottom" closeOnClickModal='false' class="mypop">
  
      <mt-field label="标题" placeholder="请输入标题"  state="error1" v-model="title"></mt-field>
      <mt-field label="正  文" placeholder="请输入正文" type="textarea"  state="error2"  v-model="tbody"></mt-field>
      <mt-button size=large type="primary" @click.stop='upTie()' fixed>发帖</mt-button>
      <mt-button size=large type="danger" @click.stop='closepopup()' fixed>取消</mt-button>
  </mt-popup>
     </div>
     
     <!-- 个人信息 -->
<mt-popup v-model="seftpop" position="left" style="height:100%;width:70%">
     <img src="../assets/seft.png" style="margin-top:10%" >
     <div style="margin-top:10%">
<mt-cell title="标题文字">
  <span>icon 是图片</span>
  <img slot="icon" src="../assets/seft.png" width="50" height="50">
</mt-cell>
  <mt-cell title="标题文字">
  <span>icon 是图片</span>
  <img slot="icon" src="../assets/seft.png" width="50" height="50">
</mt-cell><mt-cell title="标题文字">
  <span>icon 是图片</span>
  <img slot="icon" src="../assets/seft.png" width="50" height="50">
</mt-cell><mt-cell title="标题文字">
  <span>icon 是图片</span>
  <img slot="icon" src="../assets/seft.png" width="50" height="50">
</mt-cell>
     </div>
      </mt-popup>
      <mt-popup v-model="seapop" position="right" style="height:100%;width:70%">
   <mt-search v-model="value" > 
     <div class="vid"></div>
   <div v-for="newes in filterResult" @click="tofinds(newes)" :key="newes.id" >  
   
    <mt-cell :title="newes.title"></mt-cell>


    </div>
     </mt-search>
    </mt-popup>
    <!-- tabcontainer -->  
    <mt-tab-container v-model="selected">  
      <mt-tab-container-item id="最新">  
             
          <div class="switcher news">
						<!-- 新闻列表 -->
						<div class="switcher-mask">
             
            <mt-loadmore :top-method="loadTop" :bottom-method="newsloadmore" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill=false >   
						<div class="slide" v-for="(neweos) in news" :key="neweos.id">	
                <div  v-for="(newes,index) in neweos" :key="index" @click="toNews(newes)" v-if="index<=newslimit">
									<div class="slide-holder" v-for="(stories) in newes.stories" :key="stories.id">
										<div class="img-holder" v-for="(images) in stories.images" :key="images.id">
											<div class="news-holder"><img :src='images' alt="图片"></div>
										 <div class="a-holder">
									  <h1>{{stories.title}}</h1>
                    <h4>{{stories.litletitle}}</h4>
								  	<time>{{newes.date}}</time>
									</div>
                  </div>
                  </div>
							  	</div>         
							    </div>
							  	</mt-loadmore>
						     	</div>
                  </div>

      </mt-tab-container-item> 

     
    </mt-tab-container> 
<mt-button  type="primary" size="large" @click.stop='newsloadmore(index)'>加载更多</mt-button>

 <qbar></qbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Indicator } from 'mint-ui';
import qbar from "./qbar.vue";
import swipeheader from "./swipeheader.vue";
import { MessageBox } from 'mint-ui';
import { Loadmore } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
      selected: '最新' ,
      newslimit:10,
      videoslimit:10,
      funslimit:10,
      news:[],
      videos:[],
      funs:[],
      show2:false,
      show3:false,
      allLoaded: false,
      topStatus: '',
      popupVisible:false,
      newscount:5,
      videoscount:5,
      funscount:5,
      seftpop:false,
      seapop:false,
      value:"",
      mysearchdata:[],
      idarr:[],
    }
  },
  computed: {  
    filterResult() {  
      return this.mysearchdata.filter(value => new RegExp(this.value, 'i').test(value.title));  
    }  
  },
  components:{qbar,swipeheader},
  methods:{
     filterResult:function() {  
      return this.mysearchdata.filter(value => new RegExp(this.value, 'i').test(value.title));  
    },
    pop(){
          this.popupVisible=true
        },
    toNews:function(newes,index){
      this.$store.commit({
        type: 'changeState',
        newes:newes,
      })

      Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
      }, 300);
      this.$router.push('/news');
    },
    tofinds:function(newes,index){
      this.$store.commit({
        type: 'changeState',
        show:false,
        newes:newes,
      })
      
      this.$router.push('/finds');
    },
    openseft:function(){
      this.seftpop=true;
    },
    closeseft:function(){
      this.seftpop=false;
    },
    opensea:function(){
      this.seapop=true;
    },
    closesea:function(){
      this.seapop=false;
    },
    loadTop:function(){
      Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
      }, 300);
      this.axios.get('http://111.230.88.27:3000/api/v1/news')
                .then((response) => { 
                    this.news.length=0;
                    this.news.push(response.data)
                    
                      if(response.data=="")  {
                      }                
                })
                .catch((error) => {
                  this.show2=true;
                });//更新新闻列表
      this.$refs.loadmore.onTopLoaded();
    },
    newsloadmore:function() {
    this.newslimit+=10;
    Indicator.open('加载中...');
    setTimeout(() => {
        Indicator.close();
      }, 300);
    
    if(this.newscount<this.newslimit){
       MessageBox.alert('新闻全部加载完毕', '提示');
       this.allLoaded = true;// 若数据已全部获取完毕
    }this.$refs.loadmore.onBottomLoaded();
    },
    videosloadmore:function() {
    this.videoslimit+=10;
    Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
      }, 300);
    this.$refs.loadmore.onBottomLoaded();
    if(this.videoscount<this.videoslimit){
      MessageBox.alert('视频全部加载完毕', '提示');
      this.allLoaded = true;// 若数据已全部获取完毕
    }
    },
    funsloadmore:function() {
    this.videoslimit+=10;
    Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
      }, 300);
    this.$refs.loadmore.onBottomLoaded();
    if(this.videoscount<this.videoslimit){
      MessageBox.alert('活动全部加载完毕', '提示');
      this.allLoaded = true;// 若数据已全部获取完毕
    }
    },
    toVideos:function(newes,index){
      this.$store.commit({
        type: 'changeState',
        videos:newes,
      })
      Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
      }, 300);
      this.$router.push('/video');
      
    },
    toFuns:function(newes,index){
      this.$store.commit({
        type: 'changeState',
        funs:newes,
      })
      Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
      }, 300);
      this.$router.push('/funs');
      
    }
        /* this.$alert(stories.title, stories.title, {
          confirmButtonText: '确定',
          width:1500,
          height:300,
          callback: action => {
          }
        }); */
  },
  
  computed: mapState({
      index: state => state.index,
      stories: state => state.stories,
      show:state => state.show,
      newes:state => state.newes,

  }),
  mounted() {
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
    this.axios.get('http://111.230.88.27:3000/api/v1/news')
                .then((response) => {  
                    this.news.push(response.data)
                      if(response.data=="")  {
                      }                
                })
                .catch((error) => {
                  this.show2=true;
                });//新闻
    this.axios.get('http://111.230.88.27:3000/api/v1/news/count')
                .then((response) => {
                   var data= response.data;
                    for(var index in data){
                          this.newscount=data.count
                       }
                      if(response.data=="")  {
                          
                      }                
                })
                .catch((error) => {
                  this.show2=true;
                });//新闻数量           
    this.axios.get('http://111.230.88.27:3000/api/v1/videos')
                .then((response) => {  
                      this.videos.push(response.data);
                     
                      if(response.data=="")  {
                         
                      }                
                })
                .catch((error) => {
                  this.show2=true;
                });//视频
    this.axios.get('http://111.230.88.27:3000/api/v1/videos/count')
                .then((response) => {
                  var data= response.data;  
                   for(var index in data){
                          this.videoscount=data.count
                       }
                      if(response.data=="")  {
                          
                      }                
                })
                .catch((error) => {
                  this.show2=true;
                });//视频数量          
    this.axios.get('http://111.230.88.27:3000/api/v1/funs')
                .then((response) => {  
                      this.funs.push(response.data);
                      
                      if(response.data=="")  {
                         
                      }                 
                })
                .catch((error) => {
                  this.show2=true;
                });//活动
    this.axios.get('http://111.230.88.27:3000/api/v1/funs/count')
                .then((response) => {  
                    var data= response.data;
                     for(var index in data){
                          this.funscount=data.count
                       }
                      if(response.data=="")  {
                          
                      }                
                })
                .catch((error) => {
                  this.show2=true;
                });//活动数量
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2{
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; 
  font-size: 50px;
  line-height: 1em;
  height:1.95em
}
.page-part{
  display:inline-block;
  width:850px;
}
.page-part .page1{
  float:left;
}
.page-part .page2{
  float:right;
  
}
.poptitle{
  float:left;
  display:inline;
}
.pfont2{
  font-size: 50px;
  
}

.switcher {
	position: relative;
  background: #ffffff;
  
}

.switcher .switcher-mask {
	width: 100%;
	margin: 0 auto;
	position: relative;
}


.switcher .switcher-slide {

	vertical-align:middle;
	position: relative;
  
  
}
.switcher .slide-holder {
	background: #c7dffa;
	overflow: hidden;
	padding: 15px 0px 0px;
	vertical-align:middle;
	-webkit-transition: background .25s linear;
  transition: background .25s linear;
  
}

.switcher .img-holder {
	overflow: hidden;
	background: #fff;
	padding: 10px;
  margin: 0 0 5px;
  max-width:85%;
  display: inline-block;
  /* width: 75%; */
  margin-top:-12px;
}
/* 最新以及活动样式 */
.switcher .news-holder,.event-holder{
  width:97%;
  padding-left: 10%
}
/* 视频卡片样式 */
.switcher .video-slide{
  width: 50%;
  display: inline-block;
  height: 70%;
  float: left;
  /* margin-left: 3.33% */
}
.switcher .video-slide .img-holder{
  width: 100%;
  
}
.switcher .video-slide .img-holder .video-holder img{
  width: 100%
}

.switcher .img-holder .news-holder img{
  width: 80%;
}
.switcher .img-holder .event-holder img{
  width: 80%;
}
.switcher .img-holder .a-holder{
  height: 12em;
  width: 100%;
  display: inline-block;
  position: relative;
}
.video-slide .img-holder .a-holder{
  width: 100%;
  height: 1.2em;
  display: inline-block;
  position: relative;
}
.video-slide .img-holder .a-holder time{
  word-break: break-all;
  overflow: hidden;
  height: 1em;
}
.switcher .img-holder,.video-holder h1{
  text-align: left;
}
.switcher .img-holder time{
  display: inline-block;
  width: 100%;
  bottom: 10px;
  text-align: center;
  font-size: 1.3em;
  text-transform: uppercase;
	color: #999;
  line-height: 2em
}

.switcher time a:hover,
.switcher time a:active,
.switcher time a:focus {
	color: #fff;
}

.divright{
    font-size: 100px;
    color: #62c5ff;
    cursor: pointer;
    margin-right: 10px;
    position: fixed;
    z-index: 2; 
    right:0;
    top:83%;
    right:5%;
}
.divright img{
    width: 70%;
}
</style>
