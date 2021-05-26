/*
 * @Description: 汇总输出model
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-26 20:37:18
 */
const User = require('./user');
const Blog = require('./blog');
Blog.belongsTo(User, {
  foreignKey: 'userId',
});
module.exports = {
  User,
  Blog,
};
