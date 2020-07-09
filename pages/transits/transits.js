// pages/transit/transit.js
const app = getApp()
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
    transits: [],
    polyline: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    const _this = this
    let position = app.globalData.markers
    console.log(position[0])
    let key = config.Config.key
    const mymap = new amapFile.AMapWX({key: key});
    mymap.getTransitRoute({
      origin: position[0].longitude + ',' + position[0].latitude,
      destination: position[1].longitude + ',' + position[1].latitude,
      city: '杭州',
      success: function (data) {
        console.log(data)
        //获取距离
        let distance = parseFloat(data.distance / (500 * 2)).toFixed(2) + '公里'
        if (data && data.transits) {
          var transits = data.transits;
          for (var i = 0; i < transits.length; i++) {
            var segments = transits[i].segments;
            transits[i].transport = [];
            for (var j = 0; j < segments.length; j++) {
              if (segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name) {
                var name = segments[j].bus.buslines[0].name
                if (j !== 0) {
                  name = '--' + name;
                }
                transits[i].transport.push(name);
              }
            }
          }
        }
        console.log(transits)
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
          transits: [{
            transits: transits,
            color: "#0091ff",
            width: 6
          }],
          distance:distance
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