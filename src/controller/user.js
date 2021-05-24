/*
 * @Description: user controller 层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-24 20:31:36
 */
const { getUserInfo, createUser } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerUserNameIsExistInfo,
  registerFailInfo,
  loginFailInfo,
} = require('../model/ErrorInfo');
const doCrypto = require('../utils/crypto');
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
/**
 * 用户注册
 * @param {String} userName
 * @param {String} password
 * @param {number} gender
 * @returns
 */
async function register({ userName, password, gender = 3 }) {
  // 先进行用户名是否存在的验证
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel(registerUserNameIsExistInfo);
  }
  // 调用服务层进行注册
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender,
    });
    return new SuccessModel();
  } catch (error) {
    console.log(error.message, error.stack);
    return new ErrorModel(registerFailInfo);
  }
}
/**
 * 用户注册
 * @param {Object} ctx 当前上下文
 * @param {String} userName
 * @param {String} password
 * @returns
 */
async function login({ ctx, userName, password }) {
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo);
  }
  if (ctx.session == null) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
}

module.exports = {
  isExist,
  register,
  login,
};
