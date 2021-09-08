const { encryption } = require("../dao/bcrypt");
const { User } = require("../model");

async function newUser({ username, password, email, callback }) {
  // 密码加密
  const pwd = await encryption(password);

  const data = {
    username: username,
    password: pwd,
    email: email,
    time: new Date()
  };

  const user = new User(data);
  user.save((err, product) => {
    if (err) {
      console.log(new Error(err));
    } else {
      callback && callback(product);
    }
  });
}

// 匹配用户名/邮箱
function matchAccout(data, type, callback) {
  const searchStr = {};
  searchStr[type] = data;

  User.countDocuments(searchStr, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

// 用户验证
function matchUser(data, callback) {
  const filterStr = { $or: [{ username: data }, { email: data }] };
  const select = { username: 1, imgUrl: 1, password: 1 };

  User.find(filterStr, select, null, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

module.exports = {
  newUser,
  matchAccout,
  matchUser
};
