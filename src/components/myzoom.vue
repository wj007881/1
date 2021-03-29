<template>
<div >
  <mt-header title="我的收藏" v-if="this.show4==false" style="border-radius:10px">
  <router-link to="/login" slot="left">
    <mt-button>登陆</mt-button>
  </router-link>
  <router-link to="/sign" slot="right">
  <mt-button>注册</mt-button>
  </router-link>
  </mt-header>
  <mt-header title="我的收藏" v-show="this.show4" style="border-radius:10px">
  </mt-header>
<mt-cell  v-if="this.show4==false">请登陆查看我的收藏</mt-cell>

<div class="switcher">
						<!-- switcher mask of the page -->
						<div class="switcher-mask" v-show="this.show4">
             <div class="slide" v-for="(neweos1) in save" :key="neweos1.id">
              
								<div class="slide-holder"  v-for="(newes) in neweos1" :key="newes.id" @click.stop="toSave(newes)">
                  
								<div class="img-holder" v-for="(stories1) in newes.stories" :key="stories1.id" >
							 	<div class='news-holder' v-for="(images) in stories1.images" :key="images.id">
										<img :src='images' alt="图片">  	
                <div class="a-holder">
									<h1>{{stories1.title}}</h1> 
                  
                  <h4>{{stories1.litletitle}}</h4>
                </div><mt-button type="danger" size="large"  @click.stop="deleteld(newes)">删除</mt-button>
                </div>
                </div>
								</div>
							  </div>
								</div>
							</div>
  <div><mt-button type="danger" size="large"  @click="layout()">退出</mt-button></div>

<qbar></qbar>
</div>

</template>
<script>
import qbar from "./qbar.vue"
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
     save:[],
     mydata:[],
     selected1: '' ,
     show4:false,
    }
  }, 
   components:{qbar},
  computed: mapState({
      index:state => state.index,
      users:state => state.users,
      
  }),
  beforeMount:function(){ 
    var mylogin=localStorage.getItem("mylogin");
    this.mydata.push(mylogin);
    if(this.mydata==""){
                  MessageBox.alert('请登录', '提示');
             }
             else {
             this.show4=true;
             }
  },
  methods:{
          
    
    toSave:function(newes,index){
           this.$store.commit({
           type: 'changeState',
           newes:newes,
           saveid:newes.saveid
           })
           this.$router.push('/saves');
    }, 
    neweos1:function(list){
                         this.$store.commit({
                         type: 'changeState',
                         saveid:newes.saveid
                    })
                    console.log(newes.saveid)
                        return this.list.filter(function(news){  
                        return news.userid=this.users 
                    })  
  }, 
    deleteld:function(newes){
      MessageBox.confirm('',{
                     title: '提示',
                     message: '确定删除?',
                     showCancelButton: true,
                     cancelButtonHighlight:true,
                     cancelButtonText: '取消'
            }).then(action => {
              
             if (action == 'confirm') {
                this.axios.delete('http://111.230.88.27:3000/api/v1/saves/'+newes.id)
                  .then((response) => { 
                     this.save.length=0;
                     this.axios.get(xbsave)
                      .then((response) => {
                         this.save.push(response.data);  
                         console.log(response.data)              
                         })
                      .catch((error) => {
                      console.log();
                     }); 
                      var data= response.data;
                      for(var index in data){
                         this.dlcount=data.count
                         if(this.dlcount==0){
                           MessageBox.alert('此收藏已被删除', '提示'); 
                         }
                      }

                      if(data=="")  {
                           MessageBox.alert('请检查网络', '提示');
                      }
                                 
                })
                .catch((error) => {
                });
             }
             }).catch(err => {
                if (err == 'cancel') {
                    console.log('cancel');
                }
              });
    },

    layout:function(){
               MessageBox.confirm('',{
                     title: '提示',
                     message: '确定退出?',
                     showCancelButton: true,
                     cancelButtonHighlight:true,
                     cancelButtonText: '取消'
              }).then(action => {
                if (action == 'confirm') {
                    localStorage.clear()
                    this.$store.commit({
                    type: 'changeState',
                    
                    })
                    this.show4=false,
                    console.log('confirm');
                }
              }).catch(err => {
                if (err == 'cancel') {
                    console.log('cancel');
                }
              });
               }
        },
  mounted(){ 
     var xbuser='http://111.230.88.27:3000/api/v1/xbuser/';
     var userid=localStorage.getItem("myuserid");
     var xbsave=xbuser+userid+"/save";
     
     this.axios.get(xbsave)
                .then((response) => {
                         this.save.push(response.data);  
                         console.log(response.data)              
                })
                .catch((error) => {
                  console.log();
                });
  },
  
}
</script>
<style scoped>
h1, h2{
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; 
  font-size: 40px;
  line-height: 1.1em;
  height:2em
}



.pfont2{
  font-size: 50px;
  color: #42b983;
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
  height: 12em;
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
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 0px;
  left: 0px;
  font-size: 2em;
  text-transform: uppercase;
	color: #999;
}

.switcher time a:hover,
.switcher time a:active,
.switcher time a:focus {
	color: #fff;
}


</style>

