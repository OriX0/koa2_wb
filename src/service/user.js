/*
 * @Description: user service层 处理数据 格式化数据
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-24 14:40:39
 */
const { User } = require('../db/model/index');
const { formateUser } = require('./_formate');
/**
 * 获取用户信息
 * @param {Stirng} userName 用户名
 * @param {String} password 密码
 */
async function getUserInfo(userName, password) {
  let whereOpt = {
    userName,
  };
  if (password) {
    whereOpt = { ...whereOpt, password };
  }
  let queryResult = await User.findOne({
    where: whereOpt,
    attributes: ['id', 'userName', 'nickName', 'picture', 'gender', 'city'],
  });
  // 如果没找到 返回
  if (queryResult === null) {
    return null;
  }
  // 找到了返回dataValues
  return formateUser(queryResult.dataValues);
}
/**
 * 创建用户
 * @param {String} userName
 * @param {String} password
 * @param {number} gender
 * @param {String} nickName
 * @returns
 */
async function createUser({ userName, password, gender, nickName }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName,
  });
  return result.dataValues;
}

module.exports = {
  getUserInfo,
  createUser,
};
