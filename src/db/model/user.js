/*
 * @Description: user model
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-25 16:47:43
 */
const seq = require('../seq');
const { STRING, DECIMAL, BOOLEAN, TEXT } = require('../types');

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称 可重复',
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    comment: '性别 1为男 2为女 3保密',
  },
  picture: {
    type: STRING,
    comment: '头像 图片链接',
  },
  city: {
    type: STRING,
    comment: '城市',
  },
});

module.exports = User;
