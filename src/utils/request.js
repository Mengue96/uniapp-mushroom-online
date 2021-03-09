const BASEURL = 'http://localhost:3000/api/'

const request = ({ url, data = {}, header = {}, method = 'GET' }) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token')
    if (token) {
      header.Authorization = token
    }

    uni.showLoading({
      title: '拼命加载中...'
    })

    // 异步操作
    uni.request({
      url: `${BASEURL}${url}`, //仅为示例，并非真实接口地址。
      method,
      data: data,
      header: header,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        uni.hideLoading()
      }
    })
  })
}

export { request }
