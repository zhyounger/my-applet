// miniprogram/pages/photopage/photopage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageUrl: '',
    pageDate: '',
    photoList: [],
    photoIndex: 0,
    indexArray: [],
    beforeXPos: 0,
    photoHeight: app.globalData.screenHeight-200,
    loadingHidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pageUrl = options.url
    var pageDate = pageUrl.substr(pageUrl.length-10)
    var that = this
    this.setData({
      pageUrl: options.url,
      pageDate: pageDate
    })
    that.requestData(pageUrl)
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

  requestData: function (url) {
    var that = this;
    wx.request({
      url: 'https://zhyoung.cn/api/get_photo.php',
      data: {
        type: 'photo',
        url: url
      },
      method: 'GET',
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          photoList: res.data.data,
          loadingHidden: true
        })
        for(var i=0; i<res.data.data.length; i++) {
          that.setData({
            indexArray: that.data.indexArray.concat(i + 1)
          })
        }
        // console.log('indexArray', that.data.indexArray)
      }
    })
  },

  show: function() {
    var that = this
    var url = 'https://gitee.com/zhyounger/photo/raw/master/' + that.data.pageDate + '/' + that.data.photoList[that.data.photoIndex]
    // console.log(url)
    wx.previewImage({
      urls: [url],
    })
  },

  previous: function() {
    var i = this.data.photoIndex
    if(i == 0) {
      wx.showToast({
        title: '已经是第一张！',
        icon: 'none',
        duration: 1500
      })
    } else {
      this.setData({
        photoIndex: i - 1
      })
    }
  },

  next: function() {
    var i = this.data.photoIndex
    if (i == this.data.photoList.length - 1) {
      wx.showToast({
        title: '已经是最后一张！',
        icon: 'none',
        duration: 1500
      })
    } else {
      this.setData({
        photoIndex: i + 1
      })
    }
    // console.log(typeof(this.data.photoIndex))
  },

  bindPickerChange:function(e) {
    var value = parseInt(e.detail.value)
    this.setData({
      photoIndex: value
    })
    // console.log(this.data.photoIndex)
  },

  touchStart: function(e) {
    // console.log(e.touches[0].pageX)
    this.setData({
      beforeXPos: e.touches[0].pageX
    })
  },

  touchEnd: function(e) {
    // console.log(e.changedTouches[0].clientX)
    var moveX = this.data.beforeXPos - e.changedTouches[0].clientX
    // console.log(moveX)
    // 滑动图片，显示下/上一张
    if(moveX > 50) this.next()
    if(moveX < -50) this.previous()
  }
})