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
    inputValue:'',
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
    transits: [],
    polyline:[],
    duration:'',
    cost:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  backtap(){
    wx.navigateBack({
      delta:1
    })
  },
  jiachetap(){
    let position = app.globalData.userInfo
    app.globalData.posi = position
    console.log(app)
    const _this = this
    let name = app.globalData.posi[0].name
    _this.setData({
      inputValue:name
    })
    let key = config.Config.key
    const mymap = new amapFile.AMapWX({
      key: key
    });
    mymap.getDrivingRoute({
      origin: position[0].long + ',' + position[0].lat,
      destination: position[0].longitude + ',' + position[0].latitude,
      success: function (data) {
        console.log(data)
        //获取距离
        let distance = parseFloat(data.paths[0].distance / (500 * 2)).toFixed(2) + '公里'
        let durationDate = parseFloat(data.paths[0].duration / (60 * 60)).toFixed(2).split('.')
        console.log(durationDate)
        if(durationDate[1] > 60){
          durationDate[0] = parseFloat(durationDate[0]) + 1
          durationDate[1] = durationDate[1] - 60
        }
        let duration = durationDate[0] + '小时' + durationDate[1] + '分'
        //获取路线
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
          distance:distance,
          duration:duration
        });
        app.globalData.markers = _this.data.markers
        
      }
      
    })
  },
  gongjiaotap(){
    console.log(app)
    const _this = this
    let position = app.globalData.markers
    let city = app.globalData.userInfo[0].city
    console.log(position)
    console.log(city)
    let key = config.Config.key
    const mymap = new amapFile.AMapWX({key: key});
    mymap.getTransitRoute({
      origin: position[0].longitude + ',' + position[0].latitude,
      destination: position[1].longitude + ',' + position[1].latitude,
      city: city,
      success: function (data) {
        console.log(data)
        //获取距离
        let distance = parseFloat(data.distance / (500 * 2)).toFixed(2) + '公里'
        let cost = Math.round(parseFloat(data.taxi_cost)) + '元'
        if (data && data.transits) {
          var transits = data.transits;
          for (var i = 0; i < transits.length; i++) {
            var segments = transits[i].segments;
            transits[i].transport = [];
            for (var j = 0; j < segments.length; j++) {
              if (segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name) {
                var name = segments[j].bus.buslines[0].name
                console.log(name)
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
            color: "#FF9999",
            width: 6
          }],
          distance:distance,
          cost:cost
        })
        
      }
    })
  },
  qixingtap(){
    let position = app.globalData.markers
    const _this = this;
    let key = config.Config.key
    const mymap = new amapFile.AMapWX({
      key: key
    });
    mymap.getRidingRoute({
      origin: position[0].longitude + ',' + position[0].latitude,
      destination: position[1].longitude + ',' + position[1].latitude,
      success: function (data) {
        console.log(data)
        //获取距离
        let distance = parseFloat(data.paths[0].distance / (500 * 2)).toFixed(2) + '公里'
        //获取时长
        let durationDate = parseFloat(data.paths[0].duration / (60 * 60)).toFixed(2).split('.')
        console.log(durationDate)
        if(durationDate[1] > 60){
          durationDate[0] = Number(durationDate[0]) + 1
          durationDate[1] = durationDate[1] - 60
        }
        let duration = durationDate[0] + '小时' + durationDate[1] + '分'
        //获取路线
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
            color: "#CC99CC",
            width: 6
          }],
          distance: distance,
          duration: duration
        });
        app.globalData.markers = _this.data.markers
        
      }

    })
  },
  buxingtap(){
    let position = app.globalData.markers
    console.log(position)
    const _this = this;
    let key = config.Config.key
    const mymap = new amapFile.AMapWX({
      key: key
    });
    mymap.getWalkingRoute({
      origin: position[0].longitude + ',' + position[0].latitude,
      destination: position[1].longitude + ',' + position[1].latitude,
      success: function (data) {
        console.log(data)
        //获取距离
        let distance = parseFloat(data.paths[0].distance / (500 * 2)).toFixed(2) + '公里'
        //获取时长
        let durationDate = parseFloat(data.paths[0].duration / (60 * 60)).toFixed(2).split('.')
        console.log(durationDate)
        if(durationDate[1] > 60){
          durationDate[0] = Number(durationDate[0]) + 1
          durationDate[1] = durationDate[1] - 60
        }
        let duration = durationDate[0] + '小时' + durationDate[1] + '分'
        //获取路线
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
            color: "#9999FF",
            width: 6
          }],
          distance:distance,
          duration:duration
        });
        app.globalData.markers = _this.data.markers
        
      }
    })
  },
  onLoad: function (options) {
    this.jiachetap()
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
