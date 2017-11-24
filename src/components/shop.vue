<template>
<div>
 <div class="single-member effect-3">
  <div class="member-image">
    <img src="../assets/logo.png" alt="">
  </div>
  <div class="member-info">
    <h3>标题</h3>
    <p>描述信息...</p>
    
  </div>
</div>
<div class="single-member effect-3">
  <div class="member-image">
    <img src="../assets/logo.png" alt="">
  </div>
  <div class="member-info">
    <h3>标题</h3>
    <p>描述信息...</p>
    
  </div>
</div>
<div class="single-member effect-3">
  <div class="member-image">
    <img src="../assets/logo.png" alt="">
  </div>
  <div class="member-info">
    <h3>标题</h3>
    <p>描述信息...</p>
    
  </div>
</div>
<div class="single-member effect-3">
  <div class="member-image">
    <img src="../assets/logo.png" alt="">
  </div>
  <div class="member-info">
    <h3>标题</h3>
    <p>描述信息...</p>
    
  </div>
</div><div class="single-member effect-3">
  <div class="member-image">
    <img src="../assets/logo.png" alt="">
  </div>
  <div class="member-info">
    <h3>标题</h3>
    <p>描述信息...</p>
    
  </div>
</div>

</div>
</template>
<script>


export default {
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
  float: left;
}
 .single-member{
  width: 280px; 
  float: left; 
  font-family: sans-sarif; 
  margin: 30px 2.5%; 
  background-color: #fff; 
  text-align: center; 
  position: relative;
}
.member-image img{
  max-width: 100%; 
  vertical-align: middle;
}
h3 {
  font-size: 24px; 
  font-weight: normal; 
  margin: 10px 0 0; 
  text-transform: uppercase;
}
h5 {
  font-size: 16px; 
  font-weight: 300; 
  margin: 0 0 15px; 
  line-height: 22px;
}
p {font-size: 14px; 
  font-weight: 300; 
  line-height: 22px; 
  padding: 0 30px; 
  margin-bottom: 10px;
}
.social-touch a{
  display: inline-block; 
  width: 27px; 
  height: 26px; 
  vertical-align: middle; 
  margin: 0 2px; 
  background-repeat: no-repeat; 
  opacity: 0.7; 
  transition: 0.3s;
}
.social-touch a:hover{
  opacity: 1; 
  transition: 0.3s;
}
.fb-touch{
  background-position: 0 0;
}
.tweet-touch{
  background-position: -35px 0;
}
.linkedin-touch{
  background-position: -71px 0;
}
.icon-colored .fb-touch{
  background-position: 0 -27px;
}
.icon-colored .tweet-touch{
  background-position: -35px -27px;
}
.icon-colored .linkedin-touch{
  background-position: -71px -27px;
}

</style>
