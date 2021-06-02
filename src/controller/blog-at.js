/*
 * @Description: 微博 艾特 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-31 21:34:56
 */
const { SuccessModel } = require('../model/ResModel');
const { getAtCountByUser, getAtCountBlogListByUser } = require('../service/atRelation');
const { DEFAULT_PAGE_SIZE } = require('../conf/constant');
/**
 * 根据用户id 获取 at 该用户且未读的微博 数量
 * @param {Number} userId 用户id
 * @returns
 */
async function getAtMeCount(userId) {
  const result = await getAtCountByUser(userId);
  return new SuccessModel({ count: result });
}
/**
 * 根据用户id获取at 但是未读取的博客列表
 * @param {Number} userId 用户ID
 */
async function getAtMeBlog(userId, pageIndex, pageSize = DEFAULT_PAGE_SIZE) {
  // 调用服务层获取数据
  const result = await getAtCountBlogListByUser(userId, pageIndex, pageSize);
  const { blogList, count } = result;
  return new SuccessModel({
    count,
    blogList,
    pageIndex,
    pageSize,
  });
}
module.exports = {
  getAtMeCount,
  getAtMeBlog,
};
