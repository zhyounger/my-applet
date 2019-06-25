//app.js
App({

  globalData: {
    userInfo: {},
    openid: '',
    screenHeight: '',
    isMe: false
  },

  onLaunch: function () {


    var that = this

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "zhyoung-release",
        traceUser: true,
      })
    }

    wx.getSystemInfo({
      success: function(res) {
        that.globalData.screenHeight = res.windowHeight * 750 / res.windowWidth
      },
    })
  }

})
