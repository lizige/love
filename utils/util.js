const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function createShowCode(page, dataKey, codeText, speed = 100) {
  return new Promise(function (resolve, reject) {
    let progress = 0;
    let that = this;
    let timer = setInterval(function () {
      let current = codeText.substr(progress, 1);
      progress++;
      let showText = "";
      if (progress < codeText.length - 1)
        showText = codeText.substring(0, progress) + (progress & 1 ? '_' : '');
      else
        showText = codeText.substring(0, progress);
      page.data[dataKey] = showText;
      page.setData(page.data);
      if (progress >= codeText.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

let timeElapse = function (y, m, d) {
  var date = new Date();
  date.setFullYear(y, m, d);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  var current = Date();
  var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
  var days = Math.floor(seconds / (3600 * 24));
  seconds = seconds % (3600 * 24);
  var hours = Math.floor(seconds / 3600);
  if (hours < 10) {
    hours = "0" + hours;
  }
  seconds = seconds % 3600;
  var minutes = Math.floor(seconds / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  seconds = seconds % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return { "days": days, "hours": hours, "minutes": minutes, "seconds": seconds };
}




module.exports = {
  formatTime: formatTime,
  createShowCode: createShowCode,
  timeElapse: timeElapse
}
