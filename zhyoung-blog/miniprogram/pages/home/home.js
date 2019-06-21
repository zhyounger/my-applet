// miniprogram/pages/home/home.js
const app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../images/user-unlogin.png',
    QRCodeUrl: 'https://gitee.com/zhyounger/photo/raw/master/Young.jpg',
    nickName: 'null',
    time: '',
    scrollViewHeight: app.globalData.screenHeight - 350,
    searchText: '',
    loadingHidden: false,
    timestart: 0,
    timeend: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          time: util.formatTime(new Date()),
          loadingHidden: true
        })
      }
    })

    var that = this

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result)
        // console.log(this.data.avatarUrl)
        // console.log(this.data.nickName)
        app.globalData.openid = res.result.openid
        
        if (res.result.openid =='oURIp43QVQTpQE36zBTm4YrS3BQQ') {
          app.globalData.isMe = true
        }

        wx.showToast({
          title: '登陆成功！',
          icon: 'success',
          duration: 500,
          mask: true
        })
      },
      fail: err => {
        // console.error('[云函数] [login] 调用失败', err)
        wx.showModal({
          title: '登录失败！',
          content: '请稍后再次尝试登陆',
          showCancel: false
        })
        wx.redirectTo({
          url: '../index/index',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  searchText: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  },

  search: function (e) {
    wx.navigateTo({
      url: '../search/search?s=' + this.data.searchText,
    })
    this.setData({
      searchText: ''
    })
  },

  timestart: function (e) {
    var that = this;
    that.setData({ timestart: e.timeStamp });
  },
  //点击结束的时间
  timeend: function (e) {
    var that = this;
    that.setData({ timeend: e.timeStamp });
  },

  //保存图片
  saveImg: function (e) {
    var that = this;
    var times = that.data.timeend - that.data.timestart;
    if (times > 200) {
      console.log("长按");
      wx.getSetting({
        success: function (res) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
              // console.log("授权成功");
              var imgUrl = that.data.QRCodeUrl;
              wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
                url: imgUrl,
                success: function (res) {
                  // 下载成功后再保存到本地
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                    success: function (res) {
                      wx.showToast({
                        title: '成功保存到相册',
                        icon: 'success'
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },
})