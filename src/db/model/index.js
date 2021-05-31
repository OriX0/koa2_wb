/*
 * @Description: 汇总输出model
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-31 15:23:06
 */
const User = require('./user');
const Blog = require('./blog');
const UserRelation = require('./userRelation');
const AtRelation = require('./atRelation');
// 一个用户有很多博客  User.id 关联 = Blog.userId（外键）
Blog.belongsTo(User, {
  foreignKey: 'userId',
});
// 用户有很多的粉丝 UserRelation.followerId（外键） 关联 = user.id
UserRelation.belongsTo(User, {
  foreignKey: 'followerId',
});
// 用户有很多的 用户关系 如我关注了x  y关注了我 userRelation.userId（外键） 关联= user.id
User.hasMany(UserRelation, {
  foreignKey: 'userId',
});
// 完成博客与用户关系的连接   blog.userId 关联= userRelation.followerId
Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId',
});
/*
 * blog 建立一个外键 userId 去和 userRelation关联 但是关联的不是id  而是 followerId 所以用targetKey进行设置
 * blog.userId= userRelation.followerId
 */
// 一条博客可能有很多at关系  Blog.id 关联 = AtRelation.blogId（外键）
Blog.hasMany(AtRelation, {
  foreignKey: 'blogId',
});

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation,
};
