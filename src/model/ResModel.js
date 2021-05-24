/*
 * @Description: 返回结果的格式统一化
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-24 15:08:04
 */
class BaseModel {
  constructor({ errNo, data, message }) {
    this.errNo = errNo;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errNo: 0,
      data,
    });
  }
}

class ErrorModel extends BaseModel {
  constructor({ errNo, message }) {
    super({
      errNo,
      message,
    });
  }
}
module.exports = {
  SuccessModel,
  ErrorModel,
};
