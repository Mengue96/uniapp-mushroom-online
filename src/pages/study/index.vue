<template>
  <view class="study-container">
    <view class="study-item" v-for="item in progressList" :key="item.sid">
      <image :src="item.icon" alt="" />
      <view class="meta">
        <text class="title">{{ item.title }}</text>
        <text class="progress"
          >已学习{{ item.study_hour }}课时/{{ item.total_hour }}课时</text
        >
      </view>
      <view class="circle">
        <!-- 使用 van-circle 来实现进度的展示 -->
        <!-- <van-circle
          :value="item.study_progress"
          layer-color="#f3f3f3"
          :color="item.color"
          :size="55"
          :stroke-width="5"
        >
          <text :style="{ color: item.color, fontSize: '14px' }"
            >{{ item.study_progress }}%</text
          >
        </van-circle> -->
        <circle
          :color="item.color"
          :progress="item.study_progress"
          :sid="item.sid"
        ></circle>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '@/utils/request'
import Circle from '@/components/circle'
export default {
  components: {
    Circle
  },
  data () {
    return {
      progressList: []
    }
  },
  onLoad () {
    this.getProgressListData()
  },
  methods: {
    async getProgressListData () {
      const res = await request({
        url: 'study/progress'
      })

      res.message.forEach(item => {
        if (item.study_progress <= 30) {
          item.color = '#ff0000'
        } else if (item.study_progress <= 80) {
          item.color = '#ff9d33'
        } else {
          item.color = '#b4d66e'
        }
      })

      this.progressList = res.message
    }
  }
}
</script>

<style lang="less" scoped>
.study-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 32rpx;
  align-items: center;
  position: relative;
}
.study-item {
  margin-top: 32rpx;
  background-color: #fff;
  border-radius: 12rpx;
  width: 686rpx;
  height: 220rpx;
  display: flex;
  align-items: center;
  image {
    width: 108rpx;
    height: 108rpx;
    margin-left: 50rpx;
  }
  .meta {
    flex: 1;
    margin-left: 50rpx;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 30rpx;
      color: #333333;
    }
    .progress {
      margin-top: 10rpx;
      font-size: 22rpx;
      color: #a8a8a8;
    }
  }
  .circle {
    width: 109rpx;
    height: 109rpx;
    margin-right: 56rpx;
  }
}
.no-study-tip {
  margin-top: 500rpx;
  font-size: 15px;
}
</style>
