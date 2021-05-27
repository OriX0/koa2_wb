/*
 * @Description: blog 服务层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-27 15:13:15
 */
const { Blog } = require('../db/model/index');
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

module.exports = {
  createBlog,
};
