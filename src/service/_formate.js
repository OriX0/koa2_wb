/*
 * @Description: 格式化处理数据
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-25 21:55:46
 */
const { DEFAULT_PICTURE_URL } = require('../conf/constant');
/**
 * 当pic url为空的时候自动赋能
 * @param {object} userObj 用户对象
 * @returns
 */
function _formatePicUrl (userObj) {
  if (userObj.picture === null) {
    userObj.picture = DEFAULT_PICTURE_URL;
  }
  return userObj;
}
/**
 * 批量或者单个更新user的信息
 * @param {Object|Array} list
 */
function formateUser (list) {
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
module.exports = {
  formateUser,
};
