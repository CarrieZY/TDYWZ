Page({
  data: {
    mesgChilder:"开启小程序之旅",
    userInfo:"",
    isShow:false
  },
  handleParent(){
    console.log("父节点")
  },
  handleChilder(){
    console.log("子节点")
  },
  handleClick(){
    //点击跳转到指定页面(记得加根路径)
    wx.switchTab({
      url:"/pages/list/list"
    })
  },
  getUserInfo(){
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        //更新data中的userinfo
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log("获取用户失败")
      }
    }),
      //判断用户是否授权了
    wx.getSetting({
        success: (data) => {
          console.log(data)
          if (data.authSetting['scope.userInfo']) {
            //用户已经授权
            this.setData({
              isShow: false
            })
          } else {
            //用户没有授权
            this.setData({
              isShow: true
            })
          }
        }
      })
  },
  onLoad:function (options){
    console.log("onload 用户加载")
    console.log(this)
    //判断用户是否授权了
    //获取用户登录的信息
    this.getUserInfo();
  },
  handleUserInfo(data){
    console.log("用户点击了",data)
    //判断用户点击的是否是允许
   if(data.detail.rawData){
     //用户点击是允许
     this.getUserInfo()
   }
  }
})