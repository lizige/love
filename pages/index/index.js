//index.js
//获取应用实例
var Garden =require("../../utils/garden_dev.js");
var utils = require("../../utils/util.js");

const app = getApp()

Page({
  data: {
    code_comments: '',
    code : ''
  },
  onShow:function() {
     let that = this;
     
     this.showCode();
     let gardenCavas = wx.createCanvasContext("garden", this);
     let garden = new Garden(gardenCavas, 375, 325);

     setInterval(function () {
       garden.render();
     }, Garden.options.growSpeed);

     setTimeout(function () {
       that.startHeartAnimation(garden);
     }, 1000);

  

  },
  showCode:function(){
    let that = this;
    let code_comments="/** \n"+
                     "  * 老婆，结婚两周年纪念日快乐。 \n" +
                     "  * 谢谢您两年来的付出。\n" +
                     " */ \n";
    let code = "老公 i = new 老公('李子'); \n"+
               "老婆 u = new 老婆('贺婷');\n" +
               " i.love(u);";
    let code_comments_promise = new Promise(function(resolve, reject){
      that.showCodeSpeed("code_comments", code_comments,function(){resolve()});
    });

    code_comments_promise.then(() => that.showCodeSpeed("code", code));
  },
  showCodeSpeed:function(dataPro, codeText,successCallback) {
    let progress = 0;
    let that = this;
    let timer = setInterval(function () {
      var current = codeText.substr(progress, 1);
      progress++;
      let showText = "";
      if (progress < codeText.length-1)
        showText =  codeText.substring(0, progress) + (progress & 1 ? '_' : '');
      else
        showText = codeText.substring(0, progress);
      that.data[dataPro] = showText;
      that.setData(that.data);
      if (progress >= codeText.length) {
        clearInterval(timer);
        if (successCallback && typeof successCallback == 'function')
          successCallback();
      }
    }, 200);
  },
  startHeartAnimation:function (garden) {
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
