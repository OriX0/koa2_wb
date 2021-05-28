/*
 * @Description: 失败信息的集合 包括 errNo 和message
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-28 15:15:50
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
  loginCheckFailInfo: {
    errNo: 10005,
    message: '当前未登录',
  },
  changePasswordFailInfo: {
    errNo: 10007,
    messgae: '修改密码失败',
  },
  changeInfoFailInfo: {
    errNo: 10008,
    message: '修改基本信息失败',
  },
  jsonSchemaFailInfo: {
    errNo: 10009,
    message: '数据格式校验不通过 请检查',
  },
  // 删除用户失败
  deleteUserFailInfo: {
    errNo: 10010,
    message: '删除用户失败',
  },
  // 创建微博失败
  createBlogFailInfo: {
    errNo: 11001,
    message: '创建微博失败，请重试',
  },
  // 删除微博失败
  deleteBlogFailInfo: {
    errNo: 11002,
    message: '删除微博失败，请重试',
  },
};
