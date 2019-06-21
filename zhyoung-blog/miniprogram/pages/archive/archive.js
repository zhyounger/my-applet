// pages/archives/archives.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
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
    this.setData({
      list: [],
      loadingHidden: false
    });
    this.requestData();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.requestData('list');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  requestData: function () {
    var that = this;
    wx.request({
      url: 'https://zhyoung.cn/api/get_post.php',
      data: {
        type: 'list'
      },
      method: 'GET',
      success: function (res) {
        // console.log("this is response:",res.data.data);
        that.setData({
          list: res.data.data,
          loadingHidden: true
        })
      }
    })
  },

  goToPostPage: function (e) {
    // console.log(e);
    // console.log("--------",e.target.id);
    wx.navigateTo({
      url: '/pages/post/post?id=' + e.target.id
    })
  }

})