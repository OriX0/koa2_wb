/*
 * @Description: blog的输入验证
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-26 21:44:32
 */
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
    content: {
      type: 'string',
    },
    image: {
      type: 'string',
      maxLength: 255,
    },
  },
};

function validateBlog(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = validateBlog;
