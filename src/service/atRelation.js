/*
 * @Description: @ 关系的 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-31 15:56:41
 */
const { AtRelation } = require('../db/model/index');

async function createAtRelation(userId, blogId) {
  const result = AtRelation.create({
    userId,
    blogId,
  });
  return result.dataValues;
}

module.exports = { createAtRelation };
