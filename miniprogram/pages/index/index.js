// pages/index/index.js
const MENUS = [{
  name: '历史上的今天',
  url: '/pages/today-in-history/index',
  style: 'background-color: #E8D3A9;'
}
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: MENUS
  },

  /**
   * 监听用户分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '我发现一个好玩的小工具集',
      path: '/pages/index/index'
    }
  }
})