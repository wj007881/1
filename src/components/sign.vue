<template>
<div>
   <mt-header >
  <router-link to="/" slot="left">
    <mt-button  @click="back()" >返回</mt-button>
  </router-link>
</mt-header>
<mt-field label="用户名" placeholder="请输入用户名"></mt-field>
<mt-field label="邮箱" placeholder="请输入邮箱" type="email"></mt-field>
<mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
<mt-field label="确认密码" placeholder="请再次输入密码" type="password"></mt-field>
<mt-button type="primary" @click="login_submit">注册</mt-button>
</div>
</template>
<script>
export default {
   methods: {
            submitForm:function() {
               axios.post("http://localhost:1993/register",{
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
                    } if(response.data.description == 1){
                        alert('请检查密码');
                        return;
                    } if(response.data.description == 2){
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

</style>
