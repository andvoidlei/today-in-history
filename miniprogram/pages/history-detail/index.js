// pages/history-detail/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    this.doGetDetail();
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  /**
   * 监听图片点击
   */
  onPicTap: function () {
    const pics = this.data.detail.picUrl;
    const urls = pics.map(item => item.url);
    wx.previewImage({
      urls
    })
  },

  /**
   * 执行获取详情
   */
  doGetDetail: function () {
    Toast.loading({
      mask: true,
      message: '加载中...'
    });



    wx.cloud.callFunction({
      // 云函数名称
      name: 'add',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success: function (res) {
        console.log(res.result.sum) // 3
      },
      fail: console.error
    })
    

    // var that = this; //this不可以直接在wxAPI函数内部使用
    // wx.request({
    //   url: 'https://v.juhe.cn/todayOnhistory/queryEvent.php',
    //   data: {
    //     key: '498d8bc24b677985ba34151d8fa7fd4c',
    //     e_id: that.id
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


    wx.cloud.callFunction({
      name: 'historyDetail',
      data: {
        id: this.id
      }
    }).then(res => {
      let detail = {
        title: '抱歉，未找到相关信息'
      };
      const result = res.result;
      if (result) {
        detail = res.result[0]
      }
      console.log(detail);
      this.setData({
        detail
      });

      Toast.clear();
    });

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>'+this.id)


  },

  /**
   * 监听用户分享
   */
  onShareAppMessage: function (res) {
    const detail = this.data.detail;
    return {
      title: `${detail.title}`,
      path: `/pages/history-detail/index?id=${this.id}`
    }
  }
})