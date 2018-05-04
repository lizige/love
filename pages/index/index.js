//index.js
//获取应用实例
var Garden = require("../../utils/garden_dev.js");
var utils = require("../../utils/util.js");
let gardenCavas;
const app = getApp()

Page({
  data: {
    code_comments: '',
    code: '',
    years:'',
    hours:'',
    minutes:'',
    seconds:'',
    animationData:''
  },
  onShow: function () {
    let that = this;
    gardenCavas = wx.createCanvasContext("garden", this);
    let promise = this.showCode();

    promise.then(()=>{
        let garden = new Garden(gardenCavas, 375, 325);

        setInterval(function () {
          garden.render();
        }, Garden.options.growSpeed);

       setTimeout(function () {
        that.startHeartAnimation(garden);
       }, 1000);

       var animation = wx.createAnimation({
         duration: 3000
       });
       animation.opacity(1);
       animation.step();

       that.setData({animationData: animation.export() });
    });

    
    setInterval(() => {
      that.setData(utils.timeElapse(2016, 7, 21))}, 500);


  },
  showCode: function () {
    let that = this;
    let code_comments = "/** \n" +
      "  * 老婆，结婚两周年纪念日快乐。 \n" +
      "  * 谢谢您两年来的付出。\n" +
      " */ \n";
    let code = "老公 i = new 老公('李子'); \n" +
      "老婆 u = new 老婆('贺婷');\n" +
      " i.love(u);";
    let promise = utils.createShowCode(that, "code_comments", code_comments);
    return promise.then(() => utils.createShowCode(that, "code", code));
  
   
  },
  startHeartAnimation: function (garden) {
    var interval = 50;
    var angle = 10;
    var heart = new Array();
    var animationTimer = setInterval(function () {
      var bloom = utils.getHeartPoint(angle);
      var draw = true;
      for (var i = 0; i < heart.length; i++) {
        var p = heart[i];
        var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
        if (distance < Garden.options.bloomRadius.max * 1.3) {
          draw = false;
          break;
        }
      }
      if (draw) {
        heart.push(bloom);
        garden.createRandomBloom(bloom[0], bloom[1]);
      }
      if (angle >= 30) {
        clearInterval(animationTimer);
      } else {
        angle += 0.2;
      }
    }, interval);
  }


})
