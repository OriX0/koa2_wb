/*
 * @description: 测试user model
 * @Author: OriX
 * @Date: 2021-05-25 16:44:27
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-25 16:55:43
 */
const { User } = require('../../src/db/model/index');
// 新建
test('验证User模型的各个属性 ', () => {
  // 创建
  const createUser = User.build({
    userName: 'niannian',
    password: '12345wszcx',
    nickName: userName,
    gender: 1,
    picture: 'xx.png',
    city: 'hangzhou'
  })
  // 验证各个属性
  expect(createUser.userName).toBe('niannian');
  expect(createUser.password).toBe('12345wszcx');
  expect(createUser.nickName).toBe('niannian');
  expect(createUser.gender).toBe(1);
  expect(createUser.picture).toBe('xx.png');
  expect(createUser.city).toBe('hangzhou');
})
