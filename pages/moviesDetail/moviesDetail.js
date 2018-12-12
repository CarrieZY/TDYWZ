// pages/moviesDetail/moviesDetail.js
let appDatas = getApp();
console.log(appDatas,typeof appDatas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesDetail:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(appDatas.data.movesArr)
    this.setData({
      moviesDetail:appDatas.data.movesArr[options.index]
    })
  }
})