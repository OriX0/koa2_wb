/*
 * @Description:用户关系 service层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 17:14:08
 */
const { User, UserRelation } = require('../db/model/index');
const { formateUser } = require('./_formate');
/**
 * 数据库 - 根据用户id获取粉丝列表
 * @param {Number} followerId 被关注的用户ID
 */
async function getFollowerByUserId(followerId) {
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
  getFollowerByUserId,
  addFollower,
  deleteFollower,
};
