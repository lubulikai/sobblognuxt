<template>
  <div>
    <div class="login-center-box">
      <h2>登录</h2>
      <el-row class="login-box">
        <el-col :span="10">
          <el-form label-width="100px">
            <el-form-item label="帐号" required>
              <el-input v-model="user.userName" clearable placeholder="请输入帐号"></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input
                v-model="user.password"
                show-password
                clearable
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="人类验证码" required>
              <el-input
                v-model="loginInfo.verifyCode"
                placeholder="请输入人类验证码"
                clearable
                @keyup.enter.native="submitLogin"
              />
              <img class="captcha-code" :src="captchPath" @click="updateVerifyCode" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userName: '路不离开',
        password: '123456'
      },
      loginInfo: {
        verifyCode: '',
        captcha_key: '',
        from: 'p_'
      },
      captchPath: ''
    }
  },
  mounted() {
    this.loginInfo.captcha_key = Date.parse(new Date())
    this.updateVerifyCode()
  },
  methods: {
    toastError(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error'
      })
    },
    submitLogin() {
      if (this.userName === '') {
        this.toastError('帐号不能为空')
        return false
      }
      if (this.password === '') {
        this.toastError('密码不能为空')
        return false
      }
      if (this.loginInfo.verifyCode === '') {
        this.toastError('人类验证码不能为空')
        return false
      }
    },
    updateVerifyCode() {
      this.captchPath =
        this.$constant.baseUrl +
        '/user/captcha?captcha_key=' +
        this.loginInfo.captcha_key +
        '&random=' +
        Date.parse(new Date())
    }
  }
}
</script>
<style>
.captcha-code {
  cursor: pointer;
  width: 120px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  border-radius: 4px;
  border: solid 1px #e6e6e6;
  vertical-align: middle;
}
.admin-login-header-center {
  line-height: 46px;
}

.login-center-box .el-input {
  width: 200px;
}

.login-center-box {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
}

.admin-login-logo {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}
.login-box {
  border-top: 1px solid #f3f3f3;
  margin-top: 20px;
  padding-top: 20px;
}
</style>
