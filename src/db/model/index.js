/*
 * @Description: 汇总输出model
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 14:03:15
 */
const User = require('./user');
const Blog = require('./blog');
const UserRelation = require('./userRelation');
Blog.belongsTo(User, {
  foreignKey: 'userId',
});
// 用户有很多的粉丝
UserRelation.belongsTo(User, {
  foreignKey: 'followerId',
});
// 用户有很多的 用户关系 如我关注了x  y关注了我
User.hasMany(UserRelation, {
  foreignKey: 'userId',
});
module.exports = {
  User,
  Blog,
  UserRelation,
};
