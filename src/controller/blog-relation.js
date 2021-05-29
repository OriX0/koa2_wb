/*
 * @Description: 用户关系 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 19:45:29
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo');
const { getUserByFollower, addFollower, deleteFollower, getFollowerByUser } = require('../service/relation');

/**
 * 根据被关注的用户id 获取粉丝列表
 * @param {String} userId  用户ID
 *
 */
async function getFans(followerId) {
  // 调用service层
  const result = await getUserByFollower(followerId);
  return new SuccessModel({
    count: result.count,
    list: result.fansList,
  });
}
/**
 * 关注
 * @param {Number} myUserId  进行这个操作的用户的id
 * @param {Number} wantFollowId  用户想关注的用户的id
 * @returns
 */
async function follow(userId, wantFollowId) {
  // 调用service层
  try {
    const result = await addFollower(userId, wantFollowId);
    return new SuccessModel(result);
  } catch (error) {
    console.log(error.message, error.stack);
    return new ErrorModel(addFollowerFailInfo);
  }
}
/**
 * 取消关注
 * @param {Number} myUserId  进行这个操作的用户的id
 * @param {Number} wantFollowId  用户想关注的用户的id
 * @returns
 */
async function cancelFollow(userId, wantFollowId) {
  // 调用service层
  try {
    const result = await deleteFollower(userId, wantFollowId);
    return new SuccessModel(result);
  } catch (error) {
    console.log(error.message, error.stack);
    return new ErrorModel(deleteFollowerFailInfo);
  }
}
/**
 * 根据用户ID 获取该用户所有关注的人
 * @param {Number} userId  用户ID
 */
async function getFollowers(userId) {
  const result = await getFollowerByUser(userId);
  return new SuccessModel({
    count: result.count,
    list: result.followerList,
  });
}
module.exports = {
  getFans,
  follow,
  cancelFollow,
  getFollowers,
};
