/*
 * @Description: @ 关系的 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-06-02 14:03:32
 */
const { AtRelation, Blog, User } = require('../db/model/index');
const { formateUser, fromateBlog } = require('./_formate');
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
/**
 * 数据库 根据用户id 查询at该用户的 微博 及用户信息
 * @param {*} userId
 */
async function getAtCountBlogListByUser(userId, pageIndex = 0, pageSize = 5) {
  const result = await Blog.findAndCountAll({
    order: [['id', 'desc']],
    limit: pageSize,
    offset: pageIndex * pageSize,
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId,
        },
      },
      {
        model: User,
        attributes: ['nickName', 'userName', 'picture'],
      },
    ],
  });
  const count = result.count;
  let blogList = result.rows.map(row => row.dataValues);
  blogList = fromateBlog(blogList);
  blogList.map(item => {
    const user = item.user.dataValues;
    item.user = formateUser(user);
    return item;
  });
  return {
    count,
    blogList,
  };
}
module.exports = { createAtRelation, getAtCountByUser, getAtCountBlogListByUser };
