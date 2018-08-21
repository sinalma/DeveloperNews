const util = require('../../utils/util.js');
Page({
  onLoad(){
    let timer = setTimeout(() => {
        clearTimeout(timer)
        this.direct()
    },2000)
  },
  direct(){
    let auth = util.isLogined
    let url = '/pages/feature/feature'
    if(auth){
      url = 'pages/feature/subscribe'
    }
    wx.switchTab({
      url,
    })
  }
})