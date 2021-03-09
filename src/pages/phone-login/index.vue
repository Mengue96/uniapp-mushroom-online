<template>
  <view class="phone-login-container">
    <text class="phone-validate">手机号验证</text>
    <view class="subtitle">用于及时获取课程最新信息</view>
    <view class="content">
      <input
        v-model="phone"
        placeholder="请输入手机号"
        type="text"
        class="phone"
      />
      <view
        class="get_vcode"
        @click="getVcode"
        :style="{ color: isCountDown ? '#c4baba' : 'black' }"
        >{{ tipName }}</view
      >
      <input
        v-model="vcode"
        placeholder="请输入验证码"
        type="text"
        class="vcode"
      />
    </view>
    <view class="phone-login" @click="phoneLogin">
      <image src="/static/images/phone_login@2x.png" mode="" />
    </view>
  </view>
</template>

<script>
import { request } from '@/utils/request'
export default {
  data () {
    return {
      phone: '17704051019',
      vcode: '',
      tipName: '获取验证码', // 提示文字
      isCountDown: false, // 是否正在倒计时
      count: 10, // 倒计时总秒数
      timerId: null // 计时器id
    }
  },
  methods: {
    async getVcode () {
      // 1、正则校验
      const reg = /^1[3-9][0-9]{9}$/
      if (!reg.test(this.phone)) {
        uni.showToast({
          title: '手机号不合法',
          icon: 'error',
          duration: 2000
        })

        return
      }

      // 2、倒计时
      // 判断是否正在倒计时，如果是，则return
      if (this.isCountDown) return

      // 把tipName设置为总秒数，并且把正在倒计时设置为true
      this.tipName = `${this.count}`
      this.isCountDown = true

      this.timerId = setInterval(() => {
        // 处理边界条件，如果已经倒计时结束，清除定时器、并且重置所有的内容
        if (this.count <= 1) {
          clearInterval(this.timerId)

          this.tipName = '获取验证码'
          this.timerId = null
          this.count = 10
          this.isCountDown = false

          return
        }

        // 开启定时器，每个一秒减减，并且显示
        this.count--
        this.tipName = `${this.count}`
      }, 1000)

      // 3、发请求，获取验证码
      const res = await request({
        url: 'user/vcode',
        data: {
          phone: this.phone
        }
      })

      this.vcode = `${res.vcode}`
    },
    async phoneLogin () {
      if (this.phone.trim().length === 0) {
        uni.showToast({
          title: '手机号不能为空',
          icon: 'error',
          duration: 1000
        })
        return
      }

      if (this.vcode.trim().length === 0) {
        uni.showToast({
          title: '验证码不能为空',
          icon: 'error',
          duration: 1000
        })

        return
      }

      const res = await request({
        url: 'user/login',
        method: 'POST',
        data: {
          phone: this.phone,
          vcode: this.vcode
        }
      })

      if (res.status === 0) {
        // 保存token
        uni.setStorageSync('token', res.token)

        // 提示，并且一秒钟之后，跳转到首页
        uni.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 1000,
          success: () => {
            setTimeout(() => {
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
  }
}
</script>

<style lang="less" scoped>
.phone-login-container {
  padding: 0rpx 68rpx;
  .phone-validate {
    margin-top: 100rpx;
    color: #393939;
    font-size: 43px;
  }
  .subtitle {
    margin-top: 20rpx;
    color: #a8a8a8;
    font-size: 30rpx;
  }
  .content {
    margin-top: 150rpx;
    height: 250rpx;
    position: relative;
    .phone {
      height: 100rpx;
      font-size: 15px;
      // background-color: green;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        background-color: #e9e9e9;
        left: 0;
        right: 0;
        height: 1px;
        bottom: 1px;
      }
    }
    .get_vcode {
      position: absolute;
      right: 0;
      top: 20rpx;
      width: 164rpx;
      height: 56rpx;
      text-align: center;
      line-height: 56rpx;
      font-size: 24rpx;
      color: #a8a8a8;
      border: 1px solid rgba(168, 168, 168, 1);
      border-radius: 20px;
      z-index: 2;
    }
    .vcode {
      margin-top: 30px;
      height: 100rpx;
      font-size: 15px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        background-color: #e9e9e9;
        left: 0;
        right: 0;
        height: 1px;
        bottom: 1px;
      }
    }
  }
  .phone-login {
    margin-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      width: 568rpx;
      height: 98rpx;
    }
  }
}
</style>
