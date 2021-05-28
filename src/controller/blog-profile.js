/*
 * @Description: blog-profile controller
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-27 17:32:40
 */

const { DEFAULT_PAGE_SIZE } = require('../conf/constant');
const { SuccessModel } = require('../model/ResModel');
const { getBlogListByUser } = require('../service/blog');

/**
 * 根据当前的用户 查询该用户的微博 以显示在个人主页上
 * @param {String} userName 当前查询的用户名为
 * @param {Number} pageIndex 当前页数
 */
async function getProfileBlogList(userName, pageIndex = 0, pageSize = DEFAULT_PAGE_SIZE) {
  // 调用service层
  const result = await getBlogListByUser({ userName, pageIndex, pageSize });
  const blogList = result.blogList;
  const count = result.count;
  return new SuccessModel({
    isEmpty: count === 0,
    blogList,
    count,
    pageIndex,
    pageSize,
  });
}

module.exports = {
  getProfileBlogList,
};
