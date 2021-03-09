<template>
  <view class="search-container">
    <view class="search-head">
      <van-search
        style="width:100%"
        shape="round"
        placeholder="请输入搜索关键词"
        :show-action="isShow"
        @focus="onFocus"
        @cancel="onCancel"
        @search="onSearch"
      />
    </view>
    <view class="search-body">
      <view v-if="courseList.length === 0" class="empty">
        <text class="title">暂无数据~</text>
      </view>
      <view v-else>
        <course-list :courseList="courseList" />
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '@/utils/request'
import CourseList from '@/components/course-list'
export default {
  components: {
    CourseList
  },
  data () {
    return {
      isShow: false,
      courseList: []
    }
  },
  onLoad () {
    this.search('')
  },
  methods: {
    onFocus () {
      this.isShow = true
    },
    onCancel () {
      this.isShow = false

      this.search('')
    },
    onSearch (e) {
      this.search(e.detail)
    },
    async search (name) {
      const res = await request({
        url: 'course/search',
        data: {
          name
        }
      })

      this.courseList = res.message
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-head {
  padding: 30rpx 0;
  background-color: #fff;
  display: flex;
}

.search-input {
  margin-left: 30rpx;
  margin-right: 30rpx;
  padding-left: 55rpx;
  width: 100%;
  height: 74rpx;
  background: rgba(243, 243, 243, 1);
  opacity: 1;
  border-radius: 8px;
  font-size: 14px;
  flex: 1;
}

.icon-search {
  position: absolute;
  left: 40rpx;
  top: 48rpx;
  width: 56rpx;
  height: 56rpx;
  color: #a8a8a8;
}

.search-button {
  margin-right: 30rpx;
  width: 100rpx;
  height: 74rpx;
  line-height: 74rpx;
  text-align: center;
  color: #ff951c;
}

.search-body {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 32rpx;
  width: 100%;
  height: 100%;
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600rpx;
}

.empty .title {
  font-size: 14px;
  color: gray;
}
</style>
