<template>
  <view>
    <course-list :courseList="courseList" />
  </view>
</template>

<script>
import { request } from '@/utils/request'
import CourseList from '@/components/course-list'
export default {
  components: {
    CourseList
  },
  onLoad () {
    this.getCourseListData()
  },
  data () {
    return {
      courseList: []
    }
  },
  methods: {
    async getCourseListData () {
      const res = await request({
        url: 'course/list'
      })

      this.courseList = res.message
    }
  }
}
</script>
