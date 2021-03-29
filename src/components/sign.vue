<template>
<div>
   <mt-header >
  
    <mt-button  @click="back()"  slot="left">返回</mt-button>
  
</mt-header>
<div class="signfrom"> 
<mt-field label="用户名" placeholder="请输入用户名" state="error1" v-model="username"></mt-field>
<mt-field label="邮  箱" placeholder="请输入邮箱" type="email" state="error2" v-model="email"></mt-field>
<mt-field label="密  码" placeholder="请输入密码" type="password"  state="error3" v-model="password"></mt-field>
<mt-field label="密  码" placeholder="请再次输入密码" type="password"  state="error3" v-model="password2"></mt-field>
</div>
<div class="signbotton">
<mt-button type="primary" @click="sign" size="large">注册</mt-button>
<mt-button type="primary" style="margin-top:10px" @click="toLogin" size="large">去登录</mt-button>
</div>
</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      username:"",
      email:"",
      password:"",
      phone:"",
      password2:""
    }
    },
    watch:{
  "username": function(newVal, oldVal){
    
     },
  "email": function(newVal, oldVal){
    
     }
     },
   methods: {
    back:function(){
      Indicator.open('加载中...');
      setTimeout(() => {
        Indicator.close();
      }, 300);
      this.$router.go(-1)
    },
    toLogin:function(){
              this.$router.push("./login")
            },
    sign:function() {
      if(this.password!=this.password2){
          Toast('两次输入的密码不一致');
      }
               this.axios.post("http://111.230.88.27:3000/api/v1/xbuser",{
                   "username":this.username,
                   "email":this.email,
                   "password":this.password,
               })
                .then((response)=>  {
                     if (response.status==200){
                        MessageBox.alert('注册成功', '提示');
                     }
                     else{ 
                        MessageBox.alert('注册失败,请更换用户名或邮箱', '提示');
                     }      
            }).then(data=>{
                console.log(data);     
                          }) 
              .catch(error=>{
                console.log(error);
                 MessageBox.alert('注册失败,请检查网络', '提示');
                          })
                        },
}
}
</script>
<style scoped>
#body{
  font-family: "Avenir", Hmtvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
signfrom {
 position: absolute;
 min-height: 1000px;
 min-height:100%
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 480px;
    height:200px; 
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
signbotton{
  position:absolute;
  bottom:50;
}
</style>
