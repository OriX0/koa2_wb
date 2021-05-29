/*
 * @Description:用户关系 service层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 15:18:48
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

module.exports = {
  getFollowerByUserId,
};
