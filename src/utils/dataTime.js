/*
 * @Description: 对时间进行格式化
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-30 19:10:41
 */
const { format } = require('date-fns');

/**
 * 格式化时间，如 09.05 23:02
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
  return format(new Date(str), 'MM.dd HH:mm');
}

module.exports = {
  timeFormat,
};
