// pages/word/word.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData('newlist');
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
    this.requestData('newList');
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

  requestData: function (a) {
    var that = this;
    //console.log(that.data.maxtime)
    wx.request({
      url: 'https://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        maxtime: that.data.maxtime,
        type: '29'
      },
      method: 'GET',
      success: function (res) {
        // console.log(res)
        //console.log('上一页', that.data.list)
        that.setData({
          list: that.data.list.concat(res.data.list),
          loadingHidden: true,
          maxtime: res.data.info.maxtime
        })
      }
    })
  }

})