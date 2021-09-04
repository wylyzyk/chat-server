const { encryption } = require("../dao/bcrypt");
const { User } = require("../model");

async function newUser({username, password, email, callback}) {
  // 密码加密
  const pwd = await encryption(password);

  const data = {
    name: username,
    password: pwd,
    email: email,
    time: new Date()
  }

  const user = new User(data);
  user.save((err, product) => {
    if(err) {
      console.log(new Error(err));
    } else {
      callback && callback(product);
    }
  })
}

// 匹配用户名/邮箱
function matchUser(data, type, callback) {
  const searchStr = {};
  searchStr[type] = data;

  User.countDocuments(searchStr, (err, result) => {
    if(err) {
      console.log(new Error(String(err)));
    }else {
      callback && callback(result);
    }
  })
}

module.exports = {
  newUser,
  matchUser
}
