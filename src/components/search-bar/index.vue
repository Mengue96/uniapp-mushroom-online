<template>
  <view class="weui-search-bar__box" @click="clickMe">
    <icon
      class="weui-icon-search_in-box"
      type="search"
      size="14"
      color="#ff9a2c"
    />
    <text class="weui-search-bar__input">{{ placeholder }}</text>
  </view>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入关键字'
    }
  },
  methods: {
    clickMe () {
      this.$emit('myevent', { name: '阿坤', age: 23 })
    }
  }
}
</script>

<style lang="less" scoped>
@weuiSearchBarHeight: 28px;
.weui-icon-search_in-box {
  position: absolute;
  left: 8px;
  top: 7px;
}
.weui-search-bar__box {
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  margin-bottom: 8px;
}
.weui-search-bar__input {
  height: @weuiSearchBarHeight;
  line-height: @weuiSearchBarHeight;
  font-size: 14px;
  color: #999;
}
</style>
