// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [0, 1, 2, 3],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var url = 'https://gitee.com/zhyounger/photo/raw/master/2019-02-14/IMG_5987.jpg'
    var url = 'https://zhyoung.cn/test/IMG_5987.jpg'
    var that = this
    // this.drawCanvas(url)
    wx.getImageInfo({
      src: url,
      success: function(res) {
        console.log('succ!', res)
        that.drawCanvas(res.path)
      },
      fail: function(res) {
        console.log('fail', res)
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

  drawCanvas: function (url) {
    var that = this;
    var ctx = wx.createCanvasContext('attendCanvasId');
    ctx.drawImage(url, 0, 0, 375, 300);
    ctx.draw(true, function () {
      // that.prodImageOpt(url);
    }) 
  },

  prodImageOpt: function (url) { 
    // console.log(url); 
    var that = this; 
    wx.canvasToTempFilePath({ 
      canvasId: 'attendCanvasId', 
      success: function success(res) { 
        var path = res.tempFilePath; 
        console.log(path); 
        that.setData({ 
          canvasImgUrl: path 
        }); 
        wx.setStorageSync("path", path); 
        } 
    }); 
  }
})