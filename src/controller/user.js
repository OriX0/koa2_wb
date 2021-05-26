/*
 * @Description: user controller 层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-26 16:45:29
 */
const { getUserInfo, createUser, deleteUser, updateUserInfo } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerUserNameIsExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
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
 * 用户登录
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
  if (ctx.session == null || ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
}
/**
 * 删除用户
 * @param {String} userName 要删除的用户名
 */
async function deleteCurrentUser(userName) {
  // 调用服务层的方法
  const result = await deleteUser(userName);
  if (result) {
    return new SuccessModel();
  }
  return new ErrorModel(deleteUserFailInfo);
}
/**
 * 更新用户信息
 * @param {Object} ctx
 * @param {string} nickName
 * @param {string} city
 * @param {string} picture
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo;
  if (!nickName) {
    nickName = userName;
  }
  // service层
  const result = await updateUserInfo({ newNickName: nickName, newCity: city, newPicture: picture }, { userName });
  if (result) {
    ctx.session.userInfo = { ...ctx.session.userInfo, nickName, city, picture };
    return new SuccessModel();
  }
  return new ErrorModel(changeInfoFailInfo);
}
module.exports = {
  isExist,
  register,
  login,
  deleteCurrentUser,
  changeInfo,
};
