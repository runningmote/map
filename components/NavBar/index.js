//index.js
//获取应用实例
const app = getApp()

Page({
  data:{},
  jiachetap(){
    wx.navigateTo({
      url: '../../pages/index/index',
    })
  },
  gongjiaotap(){
    wx.navigateTo({
      url: '../../pages/transits/transits',
    })
  },
  qixingtap(){
    wx.navigateTo({
      url: '../../pages/qixing/qixing',
    })
  },
  buxingtap(){
    wx.navigateTo({
      url: '../../pages/buxing/buxing',
    })
  },
  backtap(){
    wx.navigateBack({
      delta: 1
    })
  },
  onload:function(){}
})
