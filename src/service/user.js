/*
 * @Description: user service层 处理数据 格式化数据
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-30 16:43:59
 */
const { User } = require('../db/model/index');
const { formateUser } = require('./_formate');
const { addFollower } = require('./relation');
/**
 * 获取用户信息
 * @param {String} userName 用户名
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
  const data = result.dataValues;
  // 创建用户后 自己关注自己
  addFollower(data.id, data.id);
  return data;
}
/**
 * 数据库 删除某个用户
 * @param {String} userName
 * @returns
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName,
    },
  });
  return result > 0;
}
/**
 * 数据库 更新某用户
 * @param {object} param0  要修改的内容
 * @param {object} param1 原来的内容
 */
async function updateUserInfo({ newPassword, newCity, newNickName, newPicture }, { userName, password }) {
  const updateObj = {};

  if (newPassword) {
    updateObj.password = newPassword;
  }
  if (newCity) {
    updateObj.city = newCity;
  }
  if (newNickName) {
    updateObj.nickName = newNickName;
  }
  if (newPicture) {
    updateObj.picture = newPicture;
  }
  const whereObj = {
    userName,
  };
  if (password) {
    whereObj.password = password;
  }
  const result = await User.update(updateObj, {
    where: whereObj,
  });
  return result[0] > 0;
}
module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUserInfo,
};
