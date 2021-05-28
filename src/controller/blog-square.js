/*
 * @Description: 博客广场页的控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-28 20:37:12
 */

const { DEFAULT_PAGE_SIZE } = require('../conf/constant');
const { getSquareCacheList } = require('../cache/blog');
const { SuccessModel } = require('../model/ResModel');
/**
 * 获取广场也 博客数据
 * @param {*} pageIndex 页码索引
 * @param {*} pageSize  单页显示数量
 */
async function getSquareBolgList(pageIndex = 0, pageSize = DEFAULT_PAGE_SIZE) {
  const result = await getSquareCacheList(pageIndex, pageSize);
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

module.exports = { getSquareBolgList };
