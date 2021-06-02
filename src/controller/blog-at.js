/*
 * @Description: 微博 艾特 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-06-02 15:09:49
 */
const { SuccessModel } = require('../model/ResModel');
const { getAtCountByUser, getAtCountBlogListByUser, upadateAtRealtion } = require('../service/atRelation');
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
async function getAtMeBlog(userId, pageIndex = 0, pageSize = DEFAULT_PAGE_SIZE) {
  // 调用服务层获取数据
  const result = await getAtCountBlogListByUser(userId, pageIndex, pageSize);
  const { blogList, count } = result;
  return new SuccessModel({
    isEmpty: count == 0,
    count,
    blogList,
    pageIndex,
    pageSize,
  });
}
/**
 * 根据用户id 标记所有未读的微博为已读
 * @param {Number} userId
 */
async function markAsRead(userId) {
  try {
    await upadateAtRealtion({ newIsRead: true }, { userId, isRead: false });
  } catch (error) {
    console.log(error.message, error.stack);
  }
}
module.exports = {
  getAtMeCount,
  getAtMeBlog,
  markAsRead,
};
