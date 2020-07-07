// pages/detaill/detaill.js
import amapFile from "../../components/amap-wx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var position = JSON.parse(options.position);
    const _this = this;
    let mymapFun = new amapFile.AMapWX({
      //小程序key
      key: '00031265a9ad47e106612607c67a85b2'
    })
    console.log(position)
    //location为空，通过name再获取一下location，不为空直接用。
    if(position.location && position.location.length > 0){
      //经纬度不要弄反了,否则会 渲染层错误
      var longitude = position.location.split(",")[0];
      var latitude = position.location.split(",")[1];
      let address = position.address
      let name = position.name
      let long = position.longitude
      let lat = position.latitude
      let markersData = [{
        id: position.id,
        name: position.name,
        address: position.address,
        latitude: latitude,
        longitude: longitude,
        long:long,
        lat:lat
      }]
      _this.setData({
        markers: markersData,
        latitude: latitude,
        longitude: longitude,
        textData:{
          address:address,
          name:name
        }
      })
  }else{
    //location为空，需要重新获取经纬度
    var webKey = '844146147dd45a00209f87c48d7f8f21';  //webkey
    wx.request({
      //通过服务器端地理编码获取location
      url: 'https://restapi.amap.com/v3/geocode/geo',
      data: {
        key: webKey,
        address: position.address
      },
      success: function(data){
        console.log(data)
        var markersData = data.data.geocodes;
        markersData.forEach((element,index) => {
          //markers对象中必须包含三个属性
          element.id = index;
          element.longitude = element.location.split(",")[0];
          element.latitude = element.location.split(",")[1];
        });
        var longitude = markersData[0].location.split(",")[0];
        var latitude = markersData[0].location.split(",")[1];
        _this.setData({
          markers: markersData,
          longitude: longitude,
          latitude: latitude,
          
        })
      }
    })
  }
},
  bindInput:function(e){
    console.log("eee")
    const _this = this;
    let mymapFun = new amapFile.AMapWX({
      key: '00031265a9ad47e106612607c67a85b2'
    })
    console.log(e.detail.value)
    mymapFun.getInputtips({
      keywords:e.detail.value,
      success:function(data){
        console.log(data.tips)
        //0. 将搜索框调整至顶部。
        //1. 以下拉列表形式展示出来，绑定点击事件。
        //2. 点击事件：点击打开位置，并提供‘去这里’按钮。
        //3. 点击‘去这里’，跳转页面，顶部出发地输入框，目的地输入框，中间地图，底部4个tab页，
        //   分别展示驾车，公交地铁，骑行，步行的推荐路线。默认展示驾车路线。

      }
    })
  },
  handleroute(e){

    wx.navigateTo({
      url: '../info/index?position=' + JSON.stringify(e.currentTarget.dataset),
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