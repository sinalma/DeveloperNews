let isLogined = () => {
  let auth = wx.getStorageSync('auth') || {}
  if(auth.token && auth.uid){
    return auth
  }
  return false
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


const formatTime = date => {
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
  formatTime: formatTime
}
