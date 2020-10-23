<template>
  <div class="div-base-container">
    <el-container>
      <el-header>
        <div id="div-header-box" class="div-header-box">
          <div class="div-header-website-name">博客门户</div>
          <div class="div-header-login-register">
            <nuxt-link class="jump-link" to="/">登录 </nuxt-link>
            <nuxt-link class="jump-link" to="/">注册 </nuxt-link>
          </div>
          <div class="div-header-jump">
            <nuxt-link class="jump-link" to="/"> <i class="el-icon-s-home" />首页 </nuxt-link>
            <nuxt-link class="jump-link" to="/info"> <i class="el-icon-info" />关于 </nuxt-link>
            <nuxt-link class="jump-link" to="/link"> <i class="el-icon-link" />友链 </nuxt-link>
          </div>
        </div>
      </el-header>
      <el-main> <Nuxt /></el-main>
    </el-container>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
body {
  background-color: #ebeef5;
}
.el-header {
  background-color: #ffffff;
  color: #303133;
  line-height: 60px;
}
.el-main {
  color: #333;
  margin: 0 auto;
  width: 1140px;
  padding: 0;
}
.div-header-box {
  background-color: #ffffff;
  width: 1140px;
  height: 60px;
  margin: 0 auto;
}
.div-header-website-name {
  padding-left: 20px;
  font-size: 30px;
  font-weight: 600;
  float: left;
}
.div-header-jump {
  float: right;
  margin-right: 20px;
}
.div-header-jump .jump-link {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 20px;
  text-decoration: none;
  color: #303133;
}
.div-header-jump .jump-link:hover {
  color: #409eff;
}
.div-header-login-register {
  float: right;
}
.div-header-login-register .jump-link {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  text-decoration: none;
  color: #303133;
}
.div-header-login-register .jump-link:hover {
  color: #409eff;
}
</style>
