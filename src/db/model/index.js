/*
 * @Description: 汇总输出model
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-30 16:13:31
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
// 完成博客与用户关系的连接
Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId',
});
/*
 * blog 建立一个外键 userId 去和 userRelation关联 但是关联的不是id  而是 followerId 所以用targetKey进行设置
 * blog.userId= userRelation.followerId
 */

module.exports = {
  User,
  Blog,
  UserRelation,
};
