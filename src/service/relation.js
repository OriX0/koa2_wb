/*
 * @Description:用户关系 service层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 19:58:25
 */
const { User, UserRelation } = require('../db/model/index');
const { formateUser } = require('./_formate');
/**
 * 数据库 - 根据被关注人的 id获取粉丝列表
 * @param {Number} followerId 被关注的用户ID
 * @ 要获取粉丝的用户详情 以粉丝的userId作为外键 去user表中查询他们的具体信息
 */
async function getUserByFollower(followerId) {
  const result = await User.findAndCountAll({
    order: [['id', 'desc']],
    attributers: ['nickName', 'userName', 'gender', 'picture'],
    include: {
      model: UserRelation,
      where: {
        followerId,
      },
    },
  });
  const count = result.count;
  let fansList = result.rows.map(row => row.dataValues);
  fansList = formateUser(fansList);
  return {
    count,
    fansList,
  };
}
/**
 * 数据库  根据userId 获取该用户关注的人的信息
 * @param {Number} userId  用户的id
 * @ 要获取关注人的详情 以关注的人的followerId为外键 去user中查询他们的具体信息
 */
async function getFollowerByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [['id', 'desc']],
    include: {
      model: User,
      attributes: ['nickName', 'userName', 'picture', 'gender'],
    },
    where: {
      userId,
    },
  });
  const count = result.count;
  // console.log('get follower list', result);
  let followerList = result.rows.map(row => row.dataValues);
  followerList = followerList.map(item => {
    let user = item.user.dataValues;
    user = formateUser(user);
    return user;
  });
  return {
    count,
    followerList,
  };
}
/**
 * 数据库 添加关注
 * @param {Number} myUserId  进行这个操作的用户的id
 * @param {Number} wantFollowId  用户想关注的用户的id
 */
async function addFollower(userId, wantFollowId) {
  const result = await UserRelation.create({
    userId,
    followerId: wantFollowId,
  });
  return result.dataValues;
}
/**
 * 数据库 删除关注
 * @param {Number} myUserId  进行这个操作的用户的id
 * @param {Number} wantFollowId  取消关注的用户的id
 */
async function deleteFollower(userId, wantFollowId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId: wantFollowId,
    },
  });
  return result > 0;
}

module.exports = {
  getUserByFollower,
  addFollower,
  deleteFollower,
  getFollowerByUser,
};
