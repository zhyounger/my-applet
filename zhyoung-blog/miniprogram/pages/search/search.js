// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    renderFlag: true,
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.s);
    this.requestData(options.s);
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

  requestData: function (s) {
    if (s === '') {
      this.setData({
        renderFlag: false,
        loadingHidden: true
      })
    }
    else {
      var that = this;
      wx.request({
        url: 'https://zhyoung.cn/api/get_post.php',
        data: {
          type: 'search',
          s: s
        },
        method: 'GET',
        success: function (res) {
          if (res.data.data.length > 0) {
            // console.log("recieve something");
            // console.log("this is response:",res.data.data.length);
            that.setData({
              list: res.data.data,
              renderFlag: true,
              loadingHidden: true
            })
          }
          else {
            that.setData({
              renderFlag: false,
              loadingHidden: true
            })
            // console.log("Nothing");
          }
        }
      })
    }
  },

  goToPostPage: function (event) {
    // console.log("--------",event.target.id);
    wx.navigateTo({
      url: '/pages/post/post?id=' + event.target.id,
    })
  }
})