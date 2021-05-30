/*
 * @Description: blog 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-30 19:28:09
 */
const xss = require('xss');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlog, getFollowersBlogListByUser } = require('../service/blog');
const { createBlogFailInfo } = require('../model/ErrorInfo');

/**
 * 创建微博
 * @param {object} param0 所需要的数据 userId, content, image
 * @returns
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image,
    });
    return new SuccessModel(blog);
  } catch (error) {
    console.log(error.messgae, error.stack);
    return new ErrorModel(createBlogFailInfo);
  }
}
/**
 * 根据用户的id  查询
 * @param {Number} userId 用户的id
 */
async function getHomeBlog(userId, pageIndex = 0, pageSize = 5) {
  // 调用service层
  const result = await getFollowersBlogListByUser(userId, pageIndex, pageSize);
  const { count, blogList } = result;
  return new SuccessModel({
    isEmpty: count === 0,
    blogList,
    count,
    pageIndex,
    pageSize,
  });
}
module.exports = {
  create,
  getHomeBlog,
};
