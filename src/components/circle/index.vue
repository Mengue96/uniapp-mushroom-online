<template>
  <view class="mp-circle-container">
    <canvas
      class="mp-circle"
      :canvas-id="sid"
      :style="{ width: size + 'px', height: size + 'px' }"
    />
  </view>
</template>

<script>
export default {
  props: {
    color: {
      // 进度的颜色
      type: String,
      default: 'black'
    },
    size: {
      // 圆的半径
      type: Number,
      default: 55
    },
    layColor: {
      // 轨道颜色
      type: String,
      default: '#f3f3f3'
    },
    lineWidth: {
      // 线宽
      type: Number,
      default: 5
    },
    sid: {
      // sid，用于给每个canvas设置id
      type: Number,
      required: true
    },
    progress: {
      // 进度
      type: Number,
      required: true
    }
  },
  mounted () {
    // 获取绘图上下文
    const ctx = uni.createCanvasContext(this.sid, this)

    // 绘制背景圆
    // 开启一笔
    ctx.beginPath()
    // 设置颜色和线宽
    ctx.strokeStyle = this.layColor
    ctx.lineWidth = this.lineWidth
    // 绘制圆
    /**
     * 参数1：圆心x的值
     * 参数2：圆心y的值
     * 参数3：半径
     * 参数4：起始角度
     * 参数5：结束角度
     * 参数6：是否逆时针画
     */
    ctx.arc(
      this.size / 2,
      this.size / 2,
      this.size / 2 - this.lineWidth,
      0,
      2 * Math.PI
    )
    ctx.stroke()

    // 绘制进度
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.lineCap = 'round'
    // 绘制圆
    /**
     * 参数1：圆心x的值
     * 参数2：圆心y的值
     * 参数3：半径
     * 参数4：起始角度
     * 参数5：结束角度
     * 参数6：是否逆时针画
     */
    ctx.arc(
      this.size / 2,
      this.size / 2,
      this.size / 2 - this.lineWidth,
      -0.5 * Math.PI,
      (this.progress / 100) * 2 * Math.PI - 0.5 * Math.PI
    )
    ctx.stroke()

    // 绘制文字
    ctx.beginPath()
    ctx.font = '13px Arial'
    ctx.fillStyle = this.color
    if (this.progress === 100) {
      ctx.fillText(this.progress + '%', this.size / 2 - 14, this.size / 2 + 6)
    } else {
      ctx.fillText(this.progress + '%', this.size / 2 - 11, this.size / 2 + 6)
    }

    // 小程序最后要进行调用draw
    ctx.draw()
  }
}
</script>

<style scoped>
.mp-circle-container {
  position: relative;
}
.mp-circle {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
