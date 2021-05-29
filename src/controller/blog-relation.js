/*
 * @Description: 用户关系 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 15:18:10
 */
const { SuccessModel } = require('../model/ResModel');
const { getFollowerByUserId } = require('../service/relation');

/**
 * 根据用户id 获取粉丝列表
 * @param {String} userId  用户ID
 *
 */
async function getFans(userId) {
  // 调用service层
  const result = await getFollowerByUserId(userId);
  return new SuccessModel({
    count: result.count,
    list: result.fansList,
  });
}

module.exports = {
  getFans,
};
