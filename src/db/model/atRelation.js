/*
 * @Description: @关系表
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-31 15:23:43
 */
const seq = require('../seq');
const { INTEGER, BOOLEAN } = require('../types');

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '博客id',
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = AtRelation;
