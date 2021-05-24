/*
 * @Description: 失败信息的集合 包括 errNo 和message
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-24 20:18:10
 */
module.exports = {
  // 用户名已存在
  registerUserNameIsExistInfo: {
    errNo: 10001,
    message: '用户名已存在 请检查',
  },
  // 注册失败
  registerFailInfo: {
    errNo: 10002,
    message: '注册失败 请重试',
  },
  registerUserNameNotExistInfo: {
    errNo: 10003,
    message: '用户名不存在，可以注册',
  },
  loginFailInfo: {
    errNo: 10004,
    message: '登录失败 请检查您的用户名和密码',
  },
  jsonSchemaFailInfo: {
    errNo: 10009,
    message: '数据格式校验不通过 请检查',
  },
};
