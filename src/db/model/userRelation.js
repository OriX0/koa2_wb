/*
 * @Description: 用户 关系数据模型
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 13:57:36
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
    comment: '被关注的 用户的id',
  },
});

module.exports = UserRelation;
