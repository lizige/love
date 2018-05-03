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

function getHeartPoint(angle) {
  var t = angle / Math.PI;
  var x = 11 * (16 * Math.pow(Math.sin(t), 3));
  var y = -10 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return new Array(15 + x, 10 + y);
}



module.exports = {
  formatTime: formatTime,
  getHeartPoint: getHeartPoint
}
