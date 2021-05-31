/*
 * @Description: 微博 艾特 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-31 17:10:57
 */
const { SuccessModel } = require('../model/ResModel');
const { getAtCountByUser } = require('../service/atRelation');
/**
 * 根据用户id 获取 at 该用户且未读的微博 数量
 * @param {Number} userId 用户id
 * @returns
 */
async function getAtMeCount(userId) {
  const result = await getAtCountByUser(userId);
  return new SuccessModel({ count: result });
}
module.exports = {
  getAtMeCount,
};
