const { User } = require("../model");

// 用户验证
function matchUser(data, callback) {
  const filterStr = { $or: [{ "username": data }, { "email": data }] };
  const select = { "username": 1, "imgUrl": 1, "password": 1 };

  User.find(filterStr, select, null, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

module.exports = {
  matchUser
}
