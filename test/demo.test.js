/*
 * @Description: 测试案例
 * @Author: OriX
 * @Date: 2021-05-21 17:05:11
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-21 17:28:57
 */
function sum(num1, num2) {
  return num1 + num2;
}
function returnObj() {
  return { name: 'zs' };
}
//  toBe 断言
test('10+20应该等于30 ', () => {
  const res = sum(10, 20);
  expect(res).toBe(30);
});
//  not.toBe 断言
test('10+20应该不等于25 ', () => {
  const res = sum(10, 20);
  expect(res).not.toBe(25);
});
// toEqual 断言判断对象
test('returnObj 函数返回的值应该是 name为zs的对象', () => {
  const res = returnObj();
  expect(res).toEqual({
    name: 'zs',
  });
});
