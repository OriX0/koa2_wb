/*
 * @Description: 用户关系 控制层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 17:12:10
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo');
const { getFollowerByUserId, addFollower, deleteFollower } = require('../service/relation');

/**
 * 根据用户id 获取粉丝列表
 * @param {String} userId  用户ID
 *
 */
async function getFans(userId) {
  // 调用service层
  const result = await getFollowerByUserId(userId);
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
module.exports = {
  getFans,
  follow,
  cancelFollow,
};
