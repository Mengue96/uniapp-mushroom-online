<script>
export default {
  onLaunch: function () {
    const token = uni.getStorageSync('token')
    if (token) {
      // uni.reLaunch({
      //   url: '/pages/home/index'
      // })
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
@import '/wxcomponents/vant/common/index.wxss';
/*每个页面公共css */
page {
  background-color: #f8f8f8;
}
</style>
