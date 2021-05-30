/*
 * @Description: blog 服务层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-30 19:26:48
 */
const { Blog, User, UserRelation } = require('../db/model/index');
const { formateUser, fromateBlog } = require('./_formate');
/**
 * 数据库创建微博
 * @param {Object} param0  所需要的的数据  userId, content, image
 * @returns
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image,
  });
  return result.dataValues;
}
/**
 * 数据库 根据用户获取她的微博
 * @param {Object} param0  userName, pageIndex = 0, pageSize = 5
 * @returns
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 5 }) {
  const userWhereOpt = {};
  if (userName) {
    userWhereOpt.userName = userName;
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [['id', 'desc']],
    include: {
      model: User,
      attributes: ['userName', 'nickName', 'picture'],
      where: userWhereOpt,
    },
  });
  const count = result.count;
  let blogList = result.rows.map(blog => blog.dataValues);
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues;
    blogItem.user = formateUser(user);
    return blogItem;
  });

  return {
    count,
    blogList,
  };
}
/**
 * 数据库 根据用户 获取该用户关注的所有人的微博
 * @param {Number} userId 用户ID
 */
async function getFollowersBlogListByUser(userId, pageIndex = 0, pageSize = 5) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [['id', 'desc']],
    include: [
      {
        // 获取用户信息
        model: User,
        attributes: ['userName', 'picture', 'nickName'],
      },
      {
        // 根据userId 去 userRelation表中查出该用户的所有关注人
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: {
          userId,
        },
      },
    ],
  });
  const count = result.count;
  let blogList = result.rows.map(row => row.dataValues);
  blogList = fromateBlog(blogList);
  blogList.map(item => {
    let user = item.user.dataValues;
    item.user = formateUser(user);
    return item;
  });
  return {
    count,
    blogList,
  };
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogListByUser,
};
