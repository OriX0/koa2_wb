/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-27 21:50:09
 */
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// 读取模板的字符串形式
const source_path = path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs');
const BLOG_LIST_TEMPLATE = fs.readFileSync(source_path).toString();
/**
 * 根据blogList 渲染出模板字符串
 * @param {Array} blogList  微博列表
 * @param {Boolean} canReply 是否能被回复
 * @returns
 */
function getBlogListStr(blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TEMPLATE, { blogList, canReply });
}
module.exports = { getBlogListStr };
