/*
 * @Description: user controller 层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-22 21:54:28
 */
const { getUserInfo } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo');
/**
 * 用户是否存在 不存在可以注册
 * @param {string} userName  用户名
 */
async function isExist(userName) {
  // 调用service 层的方法进行数据处理
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 存在
    return new SuccessModel(userInfo);
  } else {
    // 不存在 可以注册
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

module.exports = {
  isExist,
};
