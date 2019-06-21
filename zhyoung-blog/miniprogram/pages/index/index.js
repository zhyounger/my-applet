//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: '../../images/user-unlogin.png',
    userInfo: {},
    requestResult: ''
  },

  onLoad: function() {
    var that = this
    if (!wx.cloud) {
      wx.showModal({
        title: '初始化失败',
        content: '请使用 2.2.3 或以上的基础库以使用云能力',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
          wx.showLoading({
            title: '正在登陆...',
          })
          wx.switchTab({
            url: '../home/home',
          })
          wx.hideLoading()
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    console.log('onGetUserInfo')
    if (e.detail.userInfo) {
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      app.globalData.userInfo = e.detail.userInfo
      this.onGetOpenid()
    }
  },

  onGetOpenid: function() {
    wx.showLoading({
      title: '正在登陆...',
    })
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.hideLoading()
        wx.showToast({
          title: '登陆成功！',
          icon: 'success',
          duration: 500,
          mask: true
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../home/home',
          })
        }, 500)
      },
      fail: err => {
        // console.error('[云函数] [login] 调用失败', err)
        wx.hideLoading()
        wx.showModal({
          title: '登录失败！',
          content: '请稍后再次尝试登陆',
          showCancel: false
        })
      }
    })
  }

})
