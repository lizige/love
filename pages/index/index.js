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
    animationData:'',
    words_top:'220px'
  },
  onShow: function () {
    let that = this;
    gardenCavas = wx.createCanvasContext("garden", this);
    let promise = this.showCode();
    let sysInfo = wx.getSystemInfoSync();
    promise.then(()=>{
      

            let widowWith = sysInfo.windowWidth;
            let garden = new Garden(gardenCavas, widowWith, 150);
  
            setTimeout(function(){
              var gardenRender = setInterval(function () {
                let renderFinished = garden.render();
                if (renderFinished) {
                  clearInterval(gardenRender);
                  wx.redirectTo({
                    url: '/pages/letter/letter',
                  })
                }

              }, Garden.options.growSpeed);
            },1000);

            Garden.startHeartAnimation(garden);
          
            var animation = wx.createAnimation({
              duration: 3000
            });
            animation.opacity(1);
            animation.step();

            that.setData({ animationData: animation.export() });

     
         
        
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
  
   
  }


})
