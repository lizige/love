//index.js
//获取应用实例
// var Garden = require("../../utils/garden_dev.js");
var utils = require("../../utils/util.js");
import {Garden} from "../../module/Garden.js"

let isShow = false;

let gardenCavas;
let garden;
const app = getApp()

Page({
    data: {
        code_comments: '',
        code: '',
        years: '',
        hours: '',
        minutes: '',
        seconds: '',
        animationData: '',
        words_top: '220px'
    },
    onLoad: function () {
        let sysInfo = wx.getSystemInfoSync();
        let widowWith = sysInfo.windowWidth;
        gardenCavas = wx.createCanvasContext("garden", this);
        garden = new Garden(gardenCavas, widowWith, 150);


    },
    onShow: function () {
        let that = this;
        gardenCavas = wx.createCanvasContext("garden", this);
        if (!isShow) {

            let promise = this.showCode();
            promise.then(() => {

                let renderFinished = garden.render(200);

                renderFinished.then(function () {
                    wx.showModal({
                        title: '你有一封来信',
                        content: "确认打开么？",
                        showCancel: true,
                        cancelText: "收起来",
                        confirmText: "打开",
                        success: (res) => {
                            if (res.confirm) {
                                wx.switchTab({
                                    url: '/pages/letter/letter',
                                });
                            }

                        }
                    })

                });

                var animation = wx.createAnimation({
                    duration: 3000
                });
                animation.opacity(1);
                animation.step();
                that.setData({animationData: animation.export()});
            });


            setInterval(() => {
                that.setData(utils.timeElapse(2016, 7, 21))
            }, 500);

            isShow = true;
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
    }


})
