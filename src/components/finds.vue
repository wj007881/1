<template>

<div >
  <mt-header title="活动详情">
  
    <mt-button  slot="left" @click="back()" >返回</mt-button>
  
  <mt-button  slot="right" @click="more()"></mt-button>
</mt-header>

      
          <h1>{{newes.title}}</h1>
          <h4>{{newes.litletitle}}</h4>
          <div v-html="newes.body">
          </div>

       <div >
        <div class='message_title'>
			<span>评论区</span>
		</div>
		 
		
          <div class='comment' v-for="(plun,index) in items" :key="plun.id" v-if="index<3" ><!-- 此行v-if不bi生效 -->
          <div  class="text" v-for="(pluns,index) in plun" :key="pluns.id"  v-if="index<3" @click="toPls()"><!-- 此行v-if设置评论只显示前三条 -->
          <div  class='text-right' @click.stop="openreport"><a>report</a>
          <mt-popup style="border-radius:20px;" v-model="popupVisible" pop-transition="popup-fade" closeOnClickModal='false'>
          <mt-radio style="height:320px;width:300px;text-align:center;"  v-model="value" align="center" :options="['涉及政治', '辱骂信息', '其他举报']"> 
          </mt-radio>
          <textarea type='text'  class='report_area' v-model="report"></textarea>
          <mt-button style="float:left" type="primary" size="normal" @click.stop="reported(pluns)">提交</mt-button>
          <mt-button style="float:right" type="danger" size="normal" @click.stop="cancel">取消</mt-button>
          </mt-popup>
          </div>
          <div  class='comment left'>{{pluns.plun+""}} </div> 
          <div  class='text-right'>by <a href="#non">{{pluns.auth+''}}</a>
           <a v-show="likeshow"><img src="../assets/like.png" @click.stop="like(pluns)" style="height:50px">{{pluns.like}}</a>
           <a v-show="unlikeshow">取消<img src="../assets/unlike.png" @click.stop="unlike(pluns)" style="height:50px">{{pluns.like}}</a>
          </div>
          </div>
          
         
          </div>

          <span style="font-size: 30px;" v-show="this.showp">无人评论</span>
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
        }
    },
    
    computed: mapState({
      index: state => state.index,
      show:state => state.show,
      newes:state => state.newes
  }),
  
  methods:{
    back:function(){
      this.$store.commit({
        type: 'changeState',
        show:true
      })
      this.$router.push('./find')
    },
    more:function(){
      alert("1")
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
      var baseurl="http://111.230.88.27:3000/api/v1/news/"
      var piurl=baseurl+this.newes.id+"/stories"
      this.axios.get(piurl)
                .then((response) => {  
                      this.items.push(response.data);
                      console.log(this.items)                 
                })
                .catch((error) => {
                  this.show2=true;
                  
                });
  },
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
    line-height: 2rem;
}

.info_area {
    width: 80%;
    margin: 0 auto;
    display: block;
    height: 5rem;
    padding: 0.3rem;
    font-size: 0.7rem;
    margin-top: 5rem;
}

.submit_btn {
    width: 4rem;
    height: 1.5rem;
    font-size: 0.7rem;
    background-color: #00BFFF;
    border: 0;
    border-radius: 3%;
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
</style>