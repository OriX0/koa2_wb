/*
 * @Description: @ 关系的 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-31 17:01:28
 */
const { AtRelation } = require('../db/model/index');
/**
 * 创建 博客和艾特的关系
 * @param {Number} userId
 * @param {Number} blogId
 * @returns
 */
async function createAtRelation(userId, blogId) {
  const result = await AtRelation.create({
    userId,
    blogId,
  });
  return result.dataValues;
}
/**
 * 根据用户id 去at关系表里查询 该用户未读的 at总数
 * @param {Number} userId 用户id
 * @returns
 */
async function getAtCountByUser(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false,
    },
  });
  return result.count;
}
module.exports = { createAtRelation, getAtCountByUser };
