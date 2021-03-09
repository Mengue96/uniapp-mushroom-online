<template>
  <view class="login-container">
    <image class="logo" src="/static/images/logo@2x.png" mode="" />
    <text class="title">蘑菇在线</text>
    <image class="login-tips" src="/static/images/login_tips@2x.png" mode="" />
    <button
      open-type="getUserInfo"
      @getuserinfo="wxLogin"
      class="wx-login-button"
      plain
    >
      <image
        class="wx-login-img"
        src="/static/images/wx_login@2x.png"
        mode=""
      />
    </button>
    <text class="phone-login" @click="goToPhoneLogin">手机号登录</text>
    <text class="bottom-tip">Copyright © 2021 蘑菇在线</text>
  </view>
</template>

<script>
import { request } from '@/utils/request'
export default {
  methods: {
    wxLogin (e) {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') return

      // 解构
      const { avatarUrl: avatar, nickName: nickname } = e.detail.userInfo

      // 获取临时登录的code
      uni.login({
        success: async ({ code }) => {
          const res = await request({
            url: 'user/wxlogin',
            method: 'POST',
            data: {
              avatar,
              nickname,
              code
            }
          })

          if (res.status === 0) {
            // 保存token
            uni.setStorageSync('token', res.token)

            // 提示
            uni.showToast({
              title: '登录成功~',
              icon: 'none',
              duration: 1000,
              success: () => {
                setTimeout(() => {
                  // 跳转页面
                  uni.reLaunch({
                    url: '/pages/home/index'
                  })
                }, 1000)
              }
            })
          } else {
            uni.showToast({
              title: res.message,
              icon: 'error',
              duration: 1000
            })
          }
        }
      })
    },
    goToPhoneLogin () {
      uni.navigateTo({
        url: '/pages/phone-login/index'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    margin-top: 180rpx;
    width: 212rpx;
    height: 212rpx;
  }
  .title {
    color: #333333;
    font-size: 24px;
    margin-top: 20rpx;
  }
  .login-tips {
    margin-top: 30rpx;
    height: 34rpx;
    width: 292rpx;
    position: relative;
  }
  .wx-login-button {
    margin-top: 200rpx;
    width: 568rpx;
    height: 98rpx;
    padding: 0;
    border: none;
  }
  .wx-login-img {
    // margin-top:200rpx;
    width: 568rpx;
    height: 98rpx;
  }
  .phone-login {
    margin-top: 40rpx;
    color: #333333;
    font-size: 15px;
  }
  .bottom-tip {
    color: #a8a8a8;
    font-size: 10px;
    position: absolute;
    bottom: 40rpx;
  }
}
</style>
