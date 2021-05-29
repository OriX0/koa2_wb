/*
 * @Description: 用户 关系数据模型
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 16:01:48
 */

const seq = require('../seq');
const { INTEGER } = require('../types');
const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '这个用户关注的人的ID',
  },
});

module.exports = UserRelation;
