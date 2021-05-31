/*
 * @Description: blog 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-31 16:23:02
 */
const xss = require('xss');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlog, getFollowersBlogListByUser } = require('../service/blog');
const { createBlogFailInfo } = require('../model/ErrorInfo');
const { REF_FOR_AT_WHO } = require('../conf/constant');
const { getUserInfo } = require('../service/user');
const { createAtRelation } = require('../service/atRelation');

/**
 * 创建微博
 * @param {object} param0 所需要的数据 userId, content, image
 * @returns
 */
async function create({ userId, content, image }) {
  const cloneConten = content;
  const atUserNameList = [];
  // 正则匹配 获取所有艾特的 username
  cloneConten.replace(REF_FOR_AT_WHO, (machStr, nickName, userName) => {
    atUserNameList.push(userName);
  });
  // 根据userName 去获取用户的信息
  const atUserList = await Promise.all(atUserNameList.map(userName => getUserInfo(userName)));
  // 从返回的用户信息中提取 userId
  const atUserIdList = atUserList.map(user => user.id);

  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image,
    });
    await Promise.all(atUserIdList.map(userId => createAtRelation(userId, blog.id)));
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
