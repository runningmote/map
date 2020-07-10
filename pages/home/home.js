import amapFile from "../../components/amap-wx"

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    city:'',
    tips:[],
    isInput: false
  },
  homeTab(e){
    const _this = this;
    let mymapFun = new amapFile.AMapWX({
      key: '00031265a9ad47e106612607c67a85b2'
    })
    _this.setData({
      isInput: e.detail.value.length > 0
    })
    mymapFun.getInputtips({
      keywords:e.detail.value,
      
      success:function(data){
        console.log(data.tips);
        _this.setData({
          tips:data.tips
        });
        
        //0. 将搜索框调整至顶部。
        //1. 以下拉列表形式展示出来，绑定点击事件。
        //2. 点击事件：点击打开位置，并提供‘去这里’按钮。
        //3. 点击‘去这里’，跳转页面，顶部出发地输入框，目的地输入框，中间地图，底部4个tab页，
        //   分别展示驾车，公交地铁，骑行，步行的推荐路线。默认展示驾车路线。
      }
    })
 
  },
  onLoad: function () {
    const _this = this
    let mymap = new amapFile.AMapWX({
      key: '00031265a9ad47e106612607c67a85b2'
    })
    mymap.getRegeo({
      iconPathSelected: '../images/BDPOS.png',
      iconPath: '',
      success: function (res) {
        console.log(res)
        _this.setData({
          city: res[0].regeocodeData.addressComponent.city,
          latitude: res[0].latitude,
          longitude: res[0].longitude
        })
        console.log(_this.data.city)
      },
      
      fail:function(info){
        console.log(info)
      }
    })
  },
  naviFound(e){
    
    wx.navigateTo({
      url:'../detaill/detaill?position=' + JSON.stringify(e.currentTarget.dataset)
    })
  }
})