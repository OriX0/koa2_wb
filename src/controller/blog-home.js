/*
 * @Description: blog 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-27 14:17:19
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlog } = require('../service/blog');
const { createBlogFailInfo } = require('../model/ErrorInfo');
/**
 * 创建微博
 * @param {object} param0 所需要的数据 userId, content, image
 * @returns
 */
async function create({ userId, content, image }) {
  console.log(userId, content, image);
  try {
    await createBlog({
      userId,
      content,
      image,
    });
    return new SuccessModel();
  } catch (error) {
    console.log(error.messgae, error.stack);
    return new ErrorModel(createBlogFailInfo);
  }
}

module.exports = {
  create,
};
