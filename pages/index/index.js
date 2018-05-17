//index.js
//获取应用实例
// var Garden = require("../../utils/garden_dev.js");
var utils = require("../../utils/util.js");
import {Garden} from "../../module/Garden.js"

let isShow = false;

let gardenCavas;
let garden;

const app = getApp()

let timeInter;
let open_letter = false;

const Dialog = require('../../zanui/dialog/dialog');





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
         backGroudMusic:'http://p8v4wfp4g.bkt.clouddn.com/Everything%20I%20Do%20I%20Do%20It%20For%20You.mp3',
        
    $zanui: {
      toptips: {
        show: false
      }
    }
    },
    onLoad: function () {
        let sysInfo = wx.getSystemInfoSync();
        let widowWith = sysInfo.windowWidth;
        gardenCavas = wx.createCanvasContext("garden", this);
        garden = new Garden(gardenCavas, widowWith, 150);

      

    },
    onShow: function () {
      const innerAudioContext = wx.createInnerAudioContext();             
      innerAudioContext.src = this.data.backGroudMusic;
      innerAudioContext.autoplay = true


        let that = this;
        gardenCavas = wx.createCanvasContext("garden", this);
        if (!isShow) {

            let promise = this.showCode();
            promise.then(() => {

                let renderFinished = garden.render(200);

                renderFinished.then(function () {
                   isShow = true;
                   if(open_letter) return;
                 
                   Dialog({
                     message: '您有一封来信，请查收！',
                     selector: '#zan-dialog'
                   }).then(() => {
                     wx.switchTab({ url: '/pages/letter/letter' });
                   });
                    // wx.showModal({
                    //     title: '你有一封来信',
                    //     content: "确认打开么？",
                    //     showCancel: true,
                    //     cancelText: "收起来",
                    //     confirmText: "打开",
                    //     success: (res) => {
                    //         if (res.confirm) {
                    //             wx.switchTab({
                    //                 url: '/pages/letter/letter',
                    //             });
                    //         }

                    //     }
                    // })

                });

                var animation = wx.createAnimation({
                    duration: 3000
                });
                animation.opacity(1);
                animation.step();
                that.setData({animationData: animation.export()});
            });


            timeInter = setInterval(() => {
                that.setData(utils.timeElapse(2016, 7, 21))
            }, 500);
        }


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
    onHide:function() {
      open_letter = true;
    }


})
