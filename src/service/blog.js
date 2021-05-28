/*
 * @Description: blog 服务层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-27 17:44:50
 */
const { Blog, User } = require('../db/model/index');
const { formateUser } = require('./_formate');
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

module.exports = {
  createBlog,
  getBlogListByUser,
};
