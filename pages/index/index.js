var utils = require("../../utils/util.js");
import {Garden} from "../../module/Garden.js"
const Dialog = require('../../zanui/dialog/dialog.js');

let isShow = false;

let gardenCavas;
let garden;
const app = getApp()
let innerAudioContext ;
let timerM = new Map();//所有定时器
Page({
    data: {
        code_comments: '',
        code: '',
        years: '',
        hours: '',
        minutes: '',
        seconds: '',
        animationData: '',
        words_top: '220px',
        words_opacity:'0',
       
         backGroudMusic:'http://p8v4wfp4g.bkt.clouddn.com/Everything%20I%20Do%20I%20Do%20It%20For%20You.mp3',
        
    
    },
    onLoad: function () {
        let sysInfo = wx.getSystemInfoSync();
        let widowWith = sysInfo.windowWidth;
        gardenCavas = wx.createCanvasContext("garden", this);
        garden = new Garden(gardenCavas, widowWith, 150);
        garden.setPage(this);

        //创建音乐播放器
        innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.src = this.data.backGroudMusic;
        innerAudioContext.loop = true;//设置循环播放
        innerAudioContext.play();
        wx.showLoading({
          title: '音乐加载中......',
        })

    },
    onShow(){
     
    },
    onReady() {
      let that = this;
      if (innerAudioContext.paused) {
        innerAudioContext.onPlay(() => {
          wx.hideLoading();
          that.doSometings();
        })
      } else {
        that.doSometings();
      }

    },
    doSometings() {
      let that = this;
      let promise = this.showCode();

      promise.then(() => {
        let renderFinished = garden.render(100);
        renderFinished.then(function () {
          isShow = true;
          setTimeout(that.showLetter, 1100)

        });

        var animation = wx.createAnimation({
          duration: 3000
        });
        animation.opacity(1);
        animation.step();
        that.setData({ animationData: animation.export() });
      });



      let elapseTimer = setInterval(() => {
        that.setData(utils.timeElapse(2016, 7, 21))
      }, 500);

      this.addTimer(elapseTimer);
    },
    showCode: function () {
        let that = this;
        let code_comments = "/** \n" +
            "  * 老婆，结婚两周年纪念日快乐。 \n" +
            " */ \n";
        let code = "老公 i = new 老公('李子'); \n" +
            "老婆 u = new 老婆('贺婷');\n" +
            " i.love(u);";
        let promise = utils.createShowCode(that, "code_comments", code_comments);
        return promise.then(() => utils.createShowCode(that, "code", code));
    },
    showLetter:function() {
      let that = this;
      garden.clear();
      Dialog({
        title: '您有一封来信！',
        selector: '#zan-dialog-test',
        imgSrc: 'http://p8v4f40ym.bkt.clouddn.com/laixin-ting.jpg',
        buttons: [{
          text: '翻看',
          color: '#3CC51F',
          type: 'ok'
        }]
      }).then(({ type }) => {
        if (type == "ok") {
          Dialog({
            selector: '#zan-dialog-test',
            imgSrc: 'http://p8v4f40ym.bkt.clouddn.com/xin.jpg',
            buttons: [{
              text: '收下',
              type: 'ok'
            }]
          }).then(function(){
            garden.reDraw();
          })
        }

      })
    },
    onHide:function() {
    },
    addTimer(timer) {
       let timerS = Symbol();
       timerM.set(timerS,timer);
       return timerS;
    },
    removeTimer(timers) {

      if (timerM.has(timers)) {
        let timer = timerM.get(timers);
        clearInterval(timer);
        timerM.delete(timer);
      }
    },
    clearTimerM(){
      timerM.forEach(function (timer, key, mapObj) {
         clearInterval(timer);
      });
      timerM.clear();

    }


})
