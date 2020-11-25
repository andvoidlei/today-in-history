// pages/today-in-history/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 1990,
    month: 1,
    day: 1,
    list: [],
    show: false,
    currentDate: Date.now()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    this.setData({
      year,
      month,
      day
    });
    this.doGetList();
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  /**
   * 监听日期选择
   */
  onChangeDate: function () {
    this.setData({
      show: true
    });
  },

  /**
   * 监听取消
   */
  onCancel: function () {
    this.setData({
      show: false
    });
  },

  /**
   * 监听确定
   */
  onConfirm: function (event) {
    const date = new Date(event.detail);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      year,
      month,
      day,
      show: false
    });
    this.doGetList();
  },

  /**
   * 监听用户分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '快来看看历史上的今天发生的事件',
      path: '/pages/today-in-history/index'
    }
  },

  /**
   * 执行数据获取
   */
  doGetList: function () {
    const {
      month,
      day
    } = this.data;
    Toast.loading({
      mask: true,
      message: '加载中...'
    });

    // var that = this; //this不可以直接在wxAPI函数内部使用
    // wx.request({
    //   url: 'https://v.juhe.cn/todayOnhistory/queryEvent.php',
    //   data: {
    //     key: '498d8bc24b677985ba34151d8fa7fd4c',
    //     date: `${month}/${day}`
    //   },
    //   success: function (res) {
    //     // console.log(this.data.region[1])
    //     console.log(res.data.result)
    //     let list = res.data.result;
    //     that.setData({
    //       list
    //     });
    //     Toast.clear();
    //   }
    // })


    // wx.cloud.callFunction({
    //   name: 'getInfo',
    //   complete: res => {
    //     console.log('callFunction test result: ', res.result)
    //   }
    // })


    wx.cloud.callFunction({
      name: 'todayInHistory',
      data: {
        month,
        day
      }
    }).then(res => {
      wx.hideLoading();
      console.log('+>>>>>>>>');
      console.log(res);
      let list = res.result.reverse();
      this.setData({
        list
      });
      Toast.clear();
    })
      .catch(console.error)
  }
})