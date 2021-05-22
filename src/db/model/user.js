/*
 * @Description: user model
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-22 19:21:59
 */
const seq = require('../seq');
const { STIRNG, DECIMAL, BOOLEAN, TEXT } = require('../types');

const User = seq.define('user', {
  userName: {
    type: STIRNG,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STIRNG,
    allowNull: false,
  },
  nickName: {
    type: STIRNG,
    allowNull: false,
    comment: '昵称 可重复',
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    comment: '性别 1为男 2为女 3保密',
  },
  picture: {
    type: STIRNG,
    comment: '头像 图片链接',
  },
  city: {
    type: STIRNG,
    comment: '城市',
  },
});

module.exports = User;
