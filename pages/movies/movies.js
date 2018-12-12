// pages/movies/movies.js
const MOVIES_URL ="http://t.yushu.im/v2/movie/top250";
let appDatas=getApp();
console.log(appDatas, typeof appDatas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movesArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options);
    wx.request({
      url: MOVIES_URL,
      success: (datas) =>{
        console.log(datas)
        //更新状态值
        this.setData({
          movesArr: datas.data.subjects
        })
        appDatas.data.movesArr = datas.data.subjects
      }
    })
  }
  // handleMdetail(){
  //   //第一种方式跳转
  //   // wx.navigateTo({
  //   //   url: '',
  //   // })
  // }
})