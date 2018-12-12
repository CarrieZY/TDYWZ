// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
let appDatas=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollections:false,
    ismusicPlay:false
  },
  //处理音乐播放
  handleMusicplay() {
    let ismusicPlay = !this.data.ismusicPlay
    this.setData({
      ismusicPlay
    })
    //控制音乐播放 更具状态显示是否播放音乐控件
    if(ismusicPlay){
      //播放音乐
      let { dataUrl, title } = this.data.detailObj.music
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }
    wx.pauseBackgroundAudio()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let index = options.index
    //更新data中的状态值
    this.setData({
      detailObj:datas.list_data[index],
      index
    })
    //更具本地缓存的数据判断用户是否收藏当前的文章
    let detailStorage=wx.getStorageSync('isCollections')
    //判断用户是否收藏了
    if (detailStorage[index]){
      this.setData({
        isCollections:true
      })
    }
    //监听音乐播放
    wx.onBackgroundAudioPlay(() =>{
      //console.log('音乐播放')
      //修改isMusicplay的状态值
      this.setData({
        ismusicPlay:true
      })
      appDatas.data.isPlay=true
      appDatas.data.pageIndex=index
    })
    //判断音乐是否在播放
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index){
      //修改isMusicplay的状态值
      this.setData({
        ismusicPlay: true
      })
    }
    //监听音乐暂停
    wx.onBackgroundAudioPause(() =>{
      //console.log('音乐暂停')
      this.setData({
        ismusicPlay: false
      })
    })
  },
  handleCollection(){
    let isCollections= !this.data.isCollections
    //更新状态
    this.setData({
      isCollections
    })
    let title = isCollections?'收藏成功':'取消收藏'
    wx.showToast({
      title:title,
      icon:"success"
    })
    //缓存数据到本地{} 对象里的key是下标
    let {index} = this.data
    wx.getStorage({
      key:'isCollections',
      success:(datas) =>{
        console.log(datas,typeof datas)
        let obj = datas.data
        obj[index] = isCollections
        wx.setStorage({
          key: 'isCollections',
          data: obj,
          success: () => {
            console.log('缓存成功')
          }
        })
      }
    })
  },
  //点击分享图片
  handleShare(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈','分享到微博','分享给好友']
    })
  }
})