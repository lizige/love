const Dialog = require('../../zanui/dialog/dialog.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    
     if(this.data.flag) return;
         Dialog({
           title: '老婆大人，请笑纳！',
           selector: '#zan-dialog-test',
           imgSrc:'http://p8v4f40ym.bkt.clouddn.com/%E9%92%BB%E6%88%92%E5%A4%A7ps.jpg',
           buttons: [{
             // 按钮文案
             text: '思考下',
             // 按钮文字颜色
             color: 'red',
             type: 'cancel'
           }, {
             text: '笑纳',
             color: '#3CC51F',
             type: 'ok'
           }]
         }).then(({type}) => {
           if (type=="ok") {
            
             this.setData({flag:true})
           }
              
         })
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