//index.js
//获取应用实例
const app = getApp()

// pages/info/info.js
import amapFile from "../../components/amap-wx"
import config from "../../components/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "../images/icon.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: '',
      height: ''
    }, {
      iconPath: "../images/BDPOS.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: '',
      height: '',
    }],
    distance: '',
    cost: '',
    transits: []
  },
  /**
   * 生命周期函数--监听页面加载
   */

  gongjiaotap(e) {
    wx.navigateTo({
      url: '../transit/transit?position=' + JSON.stringify(e.currentTarget.dataset),
    })
    
  },
  qixingtap(e){
    wx.navigateTo({
      url: '../qixing/qixing?position=' + JSON.stringify(e.currentTarget.dataset),
    })
  },
  buxingtap(e){
    wx.navigateTo({
      url: '../buxing/buxing?position=' + JSON.stringify(e.currentTarget.dataset),
    })
  },

  onLoad: function (options) {
    console.log(options)
    let position = JSON.parse(options.position)
    console.log(position)
    const _this = this;
    let key = config.Config.key
    const mymap = new amapFile.AMapWX({
      key: key
    });
    mymap.getDrivingRoute({
      origin: position.markers[0].long + ',' + position.markers[0].lat,
      destination: position.markers[0].longitude + ',' + position.markers[0].latitude,
      success: function (data) {
        console.log(data)
        let points = []
        var steps = data.paths[0].steps;
        for (var i = 0; i < steps.length; i++) {
          var poLen = steps[i].polyline.split(';')
          for (var j = 0; j < poLen.length; j++) {
            points.push({
              latitude: parseFloat(poLen[j].split(',')[1]),
              longitude: parseFloat(poLen[j].split(',')[0])
            })
          }
        }
        console.log(poLen)
        _this.setData({
          markers: [{
            iconPath: "../../images/icon.png",
            latitude: this.origin.split(',')[1],
            longitude: this.origin.split(',')[0],
            width: 23,
            height: 33

          }, {
            iconPath: "../../images/BDPOS.png",
            latitude: this.destination.split(',')[1],
            longitude: this.destination.split(',')[0],
            width: 24,
            height: 34
          }],
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }],
          distance:data.paths[0].distance,
          cost:data.taxi_cost
        });
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
