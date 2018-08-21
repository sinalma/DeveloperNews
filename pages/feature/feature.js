const config = getApp().globalData.config
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImgList:[],
    swiperHeight:'auto',
    list:[],
    COUNT:20,
    auth:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    if(util.pageReload){
      this.init()
    }
  },
  init(){
    wx.showLoading({
      title: '正在刷新数据...',
    })
    this.setData({
      aauth:{},
    })
    let auth = util.isLogined
    this.setData({
      auth,
    })
    this.initSwiper()
    this.getBannerImgList()
    this.getEntryByList(true)
  },
  initSwiper(){
    wx.getSystemInfo({
      success:(res) => {
        this.setData({
          swiperHeight:`${(res.windowWidth || res.screenWidth) / 108 * 36}px`
        })
      },
    })
  },
  getBannerImgList (){
    wx.getStorage({
      key: 'bannerImgList',
      success: (res) => {
        this.setData({
          bannerImgList:res.data || []
        })
      },
      fail: (res) => {
        this.setData({
          bannerImgList:[],
        })
      },
    })
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
  
  }
})