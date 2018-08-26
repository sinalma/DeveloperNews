const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 点赞和收藏按钮要验证是否登录状态，跳转评论页面输入不用验证
    auth:'',
    /**
    data": {
		"liked": false,
		"like_count": 9,
		"favorited": false,
		"favorite_count": 104,
		"tags": [{
			"word": "MySQL"
		}, {
			"word": "数据库"
		}]
	  }
     */
    postInfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    let auth = util.isLogined()
    this.setData({
      auth,
    })
    let aid = query.id 
    this.getArticleInfo(aid)
    this.getArticleContent(aid) 
  },
  // 获取文章信息（用户是否赞过，是否收藏），详情
  getArticleInfo(aid){
    const auth = this.data.auth
    let timestamp = Date.parse(new Date()) / 1000
    wx.request({
      url: `https://api.toutiao.io/v2/articles/${aid}/info`,
      data: {
        app_key: 'nid5puvc9t0v7hltuy1u',
        signature: 'f1bb7809675243fd9b37150b7ee0f2c503182a0c',
        timestamp: '1535121671'
      },
      success:(res) => {
        console.log(res)
        let data = res.data
        if(data.errcode === 0){
          this.setData({
            postInfo:data.data
          })
        }else{
            wx.showToast({
              title: res.data.msg,
            })
        }
      },
      fail:() => {
        wx.showToast({
          title:'页面被外星人劫持，为保护您的隐私，手机即将自曝，请自重',
          icon:'none'
        })
      }
    })
  },
  getArticleContent(aid){
    wx.navigateTo({
      url: 'https://toutiao.io/k/lf0798',
    })
    return;
    let timestamp = Date.parse(new Date()) / 1000
    wx.request({
      url: `https://toutiao.io/k/lf0798`,
      data:({
        // app_key:'nid5puvc9t0v7hltuy1u',
        // signature:'3ab98551301580baa667aba0661fd4fe396a0a40',
        // timestamp:'1535118981',
      }),
      success:(res) => {
        console.log(res)
        let data = res.data
        if(data.errcode === 0){

        }else{
          wx.showToast({
            title: data.errmsg,
            icon:'none'
          })
        }
      },
      fail:() => {
        wx.showToast({
          title: '页面被外星人劫持，为保护您的隐私，手机即将自曝，请自重',
          icon: 'none'
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
  
  }
})