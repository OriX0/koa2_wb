/*
 * @Description: 格式化处理数据
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-31 14:29:01
 */
const { DEFAULT_PICTURE_URL, REF_FOR_AT_WHO } = require('../conf/constant');
const { timeFormat } = require('../utils/dataTime');
/**
 * 当pic url为空的时候自动赋能
 * @param {object} userObj 用户对象
 * @returns
 */
function _formatePicUrl(userObj) {
  if (userObj.picture === null) {
    userObj.picture = DEFAULT_PICTURE_URL;
  }
  return userObj;
}
/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt);
  obj.updatedAtFormat = timeFormat(obj.updatedAt);
  return obj;
}
/**
 * 格式化微博内容
 * 检测@ 将@ 后面变成链接的形式
 * @param {Object} obj
 */
function _formateContent(obj) {
  obj.contentFormate = obj.content;
  obj.contentFormate = obj.contentFormate.replace(REF_FOR_AT_WHO, (matchStr, nickName, userName) => {
    return `<a href="/profile/${userName}">@${nickName}</a>`;
  });
  return obj;
}
/**
 * 批量或者单个更新user的信息
 * @param {Object|Array} list
 */
function formateUser(list) {
  if (list === null) {
    return list;
  }
  // 如果传入的是用户列表 则map批量更新
  if (list instanceof Array) {
    return list.map(_formatePicUrl);
  }
  // 是单个obj的情况
  return _formatePicUrl(list);
}
/**
 * 批量或者单个更新blog的信息
 * @param {Object|Array} list
 */
function fromateBlog(list) {
  if (list === null) {
    return list;
  }
  // 如果传入的是用户列表 则map批量更新
  if (list instanceof Array) {
    return list.map(_formatDBTime).map(_formateContent);
  }
  // 是单个obj的情况
  let res = _formatDBTime(list);
  res = _formateContent(res);
  return res;
}
module.exports = {
  formateUser,
  fromateBlog,
};
