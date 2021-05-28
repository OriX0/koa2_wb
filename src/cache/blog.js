/*
 * @Description: 广场页博客的缓存
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-28 20:58:10
 */

const { get, set } = require('./_redis');
const { getBlogListByUser } = require('../service/blog');
const BLOG_CACHE_PREFIX = 'weibo_square';
/**
 * 获取广场页缓存数据列表
 * @param {Number} pageIndex 当前页面索引
 * @param {Number} pageSize 每页显示数量
 * @returns
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const Key = `${BLOG_CACHE_PREFIX}-${pageIndex}-${pageSize}`;
  const cacheValue = await get(Key);
  // 如果处于缓存阶段 直接返回缓存的值
  if (cacheValue !== null) {
    return cacheValue;
  }
  // 如果当前未处于缓存阶段 去数据库重新读取
  const result = await getBlogListByUser({ pageIndex, pageSize });
  // 设置缓存  key 为上面的key  value为获取回来的值 缓存时间为120秒
  set(Key, result, 60 * 2);
  return result;
}

module.exports = {
  getSquareCacheList,
};
