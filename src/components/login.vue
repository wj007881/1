<template>
<div>
    <mt-header >
  <router-link to="/" slot="left">
    <mt-button  @click="back()" >返回</mt-button>
  </router-link>
  <router-link to="/sign" slot="right">
  <mt-button  @click="more()"></mt-button>
  </router-link>
</mt-header>
     <div class="login-wrap" >
      <h1>登录</h1>
      <p v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <mt-button type="primary" @click='submitForm'>登陆</mt-button>
    </div>

</div>
</template>
<script>
import axios from 'axios';
import VueRouter from 'vue-router';
const router = new VueRouter();
export default {
  data () {
    return {
                 ruleForm: {
                    username: '',
                    password: ''
                }
             }
  },
         methods: {
            submitForm:function() {
               axios.post("http://localhost:3000/tea_login",{
                   'code':this.ruleForm.username,
                   'password':this.ruleForm.password,
               })
                .then((response)=>  {
                    if(response.data.success == true){
                        this.$store.commit("changeState",{
                          loginID:this.ruleForm.username  
                        })
                        alert("登陆成功");
                        return;
                    } if(response.data.description == 3){
                        alert('请检查密码');
                        return;
                    } if(response.data.description == 4){
                        alert(code)
                        alert('请检查用户名');
                        return;
                    }
                          }) 
                        },
}
    }
</script>
<style>
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
  .login-wrap{text-align:center;}
  h3{margin: 10px auto 20px}
  input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
  p{color:red;}
  button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
  span{cursor:pointer;}
  span:hover{color:#41b883;}
  .link{text-decoration: underline}

</style>
