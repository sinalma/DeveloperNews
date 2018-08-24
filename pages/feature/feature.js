const config = getApp().globalData.config
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImgList:[],
    choiceArticlesList:[],
    swiperHeight:'auto',
    swiperTitleHeight:'auto',
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
   onShow () {
     if(util.pageReload(this.data.auth,[this.data.list]) || !this.data.scrollTop){
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
    let auth = util.isLogined()
    this.setData({
      auth,
    })
    this.initSwiper()
    this.getBannerImgList()
    this.getChoiceArticlesList()
  },
  initSwiper() {
    wx.getSystemInfo({
      success:(res) => {
        this.setData({
          swiperHeight: `${(res.windowWidth || res.screenWidth) * 0.5625 + 5}px`,
          swiperTitleHeight: `${(res.windowWidth || res.screenWidth) * 0.5625 * 0.8}px`
        })
      },
    })
  },
  getBannerImgList (){
    const auth = this.data.auth
    wx.request({
      url: 'https://api.toutiao.io/v2/banner',
      data : {
        app_key:'nid5puvc9t0v7hltuy1u',
        signature:'27a1fbc066c049039c3f9c2ba1ac83e449afe007',
        timestamp:'1534942678',

      },
      success: (res) => {
        let data = res.data
        if(data.errcode === 0){
          this.setData({
          bannerImgList: data.data
          })
        }else{
          wx.showToast({
            title: data.msg,
            icon: 'none'
          })
        }
      },
      fail :() => {
        wx.showToast({
          title:'页面被外星人调包了，请刷新重试',
          icon:'none'
        })
      }
    })
  },
  getChoiceArticlesList(){
    let timestamp = Date.parse(new Date()) / 1000 + 500
    wx.request({
      url: 'https://api.toutiao.io/v2/dailies/latest',
      data: {
        app_key: 'nid5puvc9t0v7hltuy1u',
        signature: '27a1fbc066c049039c3f9c2ba1ac83e449afe007',
        timestamp: '1534942678'
      },
      success: (res) => {
        let data = res.data
        console.log(data.data.article)
        if (data.errcode === 0) {
          wx.hideLoading()
          this.setData({
            choiceArticlesList:data.data.article
          })
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '页面被外星人调包了，请刷新重试',
          icon: 'none'
        })
      }
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