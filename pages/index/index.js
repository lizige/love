//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    code_comments: '',
    code : ''
  },
  onShow:function() {
     this.showCode();
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
  }
})
