/*
 * @Description:  seq 同步操作
 * @Author: OriX
 * @Date: 2021-05-21 19:26:41
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-22 19:24:17
 */
const seq = require('./seq');
// 引入模型
require('./model/index');
// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('auth ok');
  })
  .catch(() => {
    console.log('auth err');
  });

// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('sync ok');
  process.exit();
});
