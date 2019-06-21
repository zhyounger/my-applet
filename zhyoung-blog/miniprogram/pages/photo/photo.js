// miniprogram/pages/photo/photo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    archiveList: [],
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData()
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
      loadingHidden: false
    })
    this.requestData()
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

  requestData: function () {
    var that = this;
    wx.request({
      url: 'https://zhyoung.cn/api/get_photo.php',
      data: {
        type: 'list'
      },
      method: 'GET',
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          archiveList: res.data.data,
          loadingHidden: true
        })
      }
    })
  },

  gotoPhotoView: function (e) {
    var url = "https://gitee.com/zhyounger/photo/tree/master/" + e.currentTarget.id
    // console.log(url)
    wx.navigateTo({
      url: '/pages/photopage/photopage?url=' + url
    })
  }
})