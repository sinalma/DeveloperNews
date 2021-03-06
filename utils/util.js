let isLogined = () => {
  let auth = wx.getStorageSync('auth') || {}
  if(auth.token && auth.uid){
    return auth
  }
  return false
}

let isEmptyObject = (obj) => {
  for (let i in obj){
    return false;
  }
  return true
}

let pageReload = (scopeAuth,dataList) => {
  let auth = isLogined
  let dataEmpty = (list) => {
    let empty = false 
    let item = null 
    for (let i = 0, len = list.length; i < len; i++){
      item = list[i]
      if (isEmptyObject(item)){
        empty  = true
        break
      }
    }
    return empty 
  }
  if ((auth.token !== scopeAuth.token || auth.uid !== scopeAuth.uid) || dataEmpty(dataList)){
    return true
  }
}

let toPostDetail = (e) => {
  let item = e.currentTarget.dataset.item
  
  // 从原文站点读取文章

  // 从开发者头条后台读取文章
  let url = `/pages/post/post?id=${item.id}`
  wx.navigateTo({
    url:url
  })
}

const formatTime = date => {
  return 1
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime,
  isLogined,
  pageReload, 
  toPostDetail,
}
