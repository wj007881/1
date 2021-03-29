<template>
<div>
    <mt-header >
 
    <mt-button  @click="back()" slot="left" >返回</mt-button>
  
  <router-link to="/sign" slot="right">
  <mt-button  >注册</mt-button>
  </router-link>
</mt-header>
     <div class="login-wrap" >
      <h1>登录页</h1>

     <mt-field label="用户名" placeholder="请输入用户名" state="error1" v-model="username"></mt-field>
     <mt-field label="密  码" placeholder="请输入密码" type="password"  state="error3" v-model="password"></mt-field>
      <mt-button type="primary" size="large" @click='submitForm'>登陆</mt-button>


      <mt-button type="primary" size="large"  @click='toSign'>去注册</mt-button>
    </div>

</div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex'
import { Indicator } from 'mint-ui';
import VueRouter from 'vue-router';
import { MessageBox } from 'mint-ui';
const router = new VueRouter();
export default {
  data () {
    return {
            username: '',
            password: '',
            mydata:[],
            users:[]          
             }},
   computed: mapState({
      index: state => state.index,
      stories: state => state.stories,
      loginID:state => state.loginID

    }),

         methods: {
           back:function(){
              this.$store.commit({
              type: 'changeState',
              show:true
              })
              Indicator.open('加载中...');
              setTimeout(() => {
                Indicator.close();
              }, 300);
              this.$router.go(-1)
            },
            toSign:function(){
              this.$router.push("./sign")
            },
            submitForm:function() {
                  //登录
                  this.axios.get("/weibo-api/oauth2/authorize",{
                   'client_id':1056921024,
                   "redirect_uri":"https://open.weibo.cn/oauth2/authorize/default.html",
                   
               })
                .then((response)=>  {
                     console.log(response)
            }).catch((response)=>  {
                     if (response.status!=200)   {
                        
                     }
                          })
}}
    }
</script>
<style scoped>
#body{
  font-family: 'Avenir', Hmtvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
  font-size: 80px
}
.input{
  height: 150px;
  width: 500px;
  font-size:50px
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .login-wrap{text-align:center;}
  h3{margin: 10px auto 20px}
  span{cursor:pointer;}
  span:hover{color:#41b883;}
  .link{text-decoration: underline}

</style>
