<template>
  <view class="home-container">
    <!-- 搜索条 -->
    <search-bar placeholder="请输入课程名称" @myevent="getValue" />
    <!-- 轮播图 -->
    <swiper autoplay :interval="3000" :duration="500" circular>
      <swiper-item v-for="item in swipers" :key="item.id">
        <image :src="item.img_url" />
      </swiper-item>
    </swiper>
    <!-- 推荐课程 -->
    <view>
      <view class="tips">
        <text>推荐课程</text>
        <image src="/static/images/arrow@2x.png" />
      </view>
      <scroll-view scroll-x class="course-container">
        <view v-for="item in courses" :key="item.id" class="course-item">
          <image :src="item.icon" mode="" />
        </view>
      </scroll-view>
    </view>
    <!-- 热门视频 -->
    <view>
      <view class="tips">
        <text>热门视频</text>
        <image src="/static/images/arrow@2x.png" />
      </view>
      <view class="hot-video">
        <view v-for="item in videos" :key="item.id" class="video-item">
          <image :src="item.cover_photo_url" mode="" />
          <view class="title">{{ item.name }}</view>
          <view class="subtitle">{{ item.view_count }}人已观看</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '@/utils/request'
import searchBar from '@/components/search-bar'
export default {
  components: {
    // searchBar
    'search-bar': searchBar
  },
  data () {
    return {
      swipers: [], // 轮播图
      courses: [], // 课程
      videos: [] // 视频
    }
  },
  onLoad () {
    this.getSwipersData()
    this.getCoursesData()
    this.getVideosData()
  },
  methods: {
    async getSwipersData () {
      const res = await request({
        url: 'home/swipers'
      })

      if (res.status === 0) {
        this.swipers = res.message
      }
    },
    async getCoursesData () {
      const res = await request({
        url: 'home/course'
      })

      if (res.status === 0) {
        this.courses = res.message
      }
    },
    async getVideosData () {
      const res = await request({
        url: 'home/video'
      })

      if (res.status === 0) {
        this.videos = res.message
      }
    },
    getValue (val) {
      uni.navigateTo({
        url: '/pages/search/index'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 20rpx;
  background-color: #fff;
}
swiper {
  width: 100%;
  height: 342rpx;
  swiper-item {
    width: 100%;
    height: 100%;
  }
  image {
    width: 100%;
    height: 100%;
  }
}
.tips {
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text {
    font-size: 36rpx;
    font-weight: 700;
    color: #212121;
  }
  image {
    width: 48rpx;
    height: 48rpx;
  }
}
.course-container {
  height: 170rpx;
  white-space: nowrap;
  .course-item {
    width: 296rpx;
    height: 168rpx;
    display: inline-block;
    margin-right: 32rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.hot-video {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .video-item {
    width: 340rpx;
    image {
      width: 340rpx;
      height: 210rpx;
      border-radius: 12rpx;
    }
    .title {
      margin-top: 15rpx;
      color: #262626;
      font-size: 26rpx;
    }
    .subtitle {
      margin-top: 15rpx;
      margin-bottom: 15rpx;
      color: #959595;
      font-size: 18rpx;
    }
  }
}
</style>
