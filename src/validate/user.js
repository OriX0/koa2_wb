/*
 * @Description: user 的schema 验证规则
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-24 17:18:42
 */
const validate = require('./_validate');
// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    nickName: {
      type: 'string',
      maxLength: 255,
    },
    picture: {
      type: 'string',
      maxLength: 255,
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3,
    },
  },
};

function validateUser(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = validateUser;