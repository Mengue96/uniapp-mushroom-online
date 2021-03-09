<template>
  <view class="course-container">
    <!-- 声明式导航 -->
    <!-- <navigator
      :url="'/pages/course-detail/index?id=' + item.id"
      v-for="item in courseList"
      :key="item.id"
      class="course-item"
    >
      <image :src="item.icon" />
      <text class="title">{{ item.title }}</text>
      <text class="subtitle">{{ item.subtitle }}</text>
      <text class="level">{{ levelObj[item.level] }}</text>
    </navigator> -->

    <view
      v-for="item in courseList"
      @click="goToDetail(item.id)"
      :key="item.id"
      class="course-item"
    >
      <image :src="item.icon" />
      <text class="title">{{ item.title }}</text>
      <text class="subtitle">{{ item.subtitle }}</text>
      <text class="level">{{ levelObj[item.level] }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    courseList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      levelObj: {
        1: '初级',
        2: '中级',
        3: '高级'
      }
    }
  },
  methods: {
    goToDetail (id) {
      uni.navigateTo({
        url: '/pages/course-detail/index?id=' + id
      })
    }
  }
  //   mounted () {
  //     console.log('----', this.courseList)
  //   },
  //   watch: {
  //     courseList (newValue) {
  //       console.log('---watch---', newValue)
  //     }
  //   },
  //   computed: {
  //     getCourseList () {
  //       console.log('---getCourseList---', this.courseList)
  //       return this.courseList
  //     }
  //   }
}
</script>

<style lang="less" scoped>
.course-container {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 32rpx;
}
.course-item {
  margin-left: 32rpx;
  margin-top: 32rpx;
  border-radius: 12rpx;
  background-color: white;
  width: 333rpx;
  height: 368rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  image {
    margin-top: 58rpx;
    width: 124rpx;
    height: 124rpx;
  }
  .title {
    margin-top: 28rpx;
    color: #333333;
    font-weight: bold;
    font-size: 32rpx;
  }
  .subtitle {
    color: #a8a8a8;
    font-size: 22rpx;
    margin-top: 12rpx;
  }
  .level {
    margin-top: 20rpx;
    color: #ffb37a;
    text-align: center;
    font-size: 24rpx;
    line-height: 32rpx;
    width: 92rpx;
    height: 32rpx;
    border: 2rpx solid rgba(255, 179, 122, 1);
    opacity: 1;
    border-radius: 16rpx;
  }
}
</style>
