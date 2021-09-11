const { User, Friend } = require("../model");
const { verification } = require("../dao/bcrypt");

/**
 * 用户详情
 * @param {String} id userId
 * @param {Function} callback result
 */
function userDetail(id, callback) {
  const searchStr = { _id: id };
  // 反向输出， 除密码外全部输出
  const select = { password: 0 };

  User.findOne(searchStr, select, null, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

/**
 * 用户信息修改
 * @param {Object} payload  id, password, data, type
 * @param {Function} callback
 * @param {Function} updateCallback
 */
function userUpdate(payload, callback, updateCallback) {
  if (typeof payload.password !== "undefined") {
    // 密码不为空进行校验
    User.find({ "_id": payload.id }, { "password": 1 }, null, (err, result) => {
      if (err) {
        console.log(new Error(String(err)));
      } else {
        callback && callback(result);

        // result.map((item) => {
        //   const pwdMatch = verification(payload.password, item.password);
        //   if (!pwdMatch) {
        //     return { code: 400, msg: "failed of password!" };
        //   }
        //   // 密码验证成功
        //   const updateStr = {};
        //   updateStr[payload.type] = payload.data;
        //   User.findByIdAndUpdate(payload.id, updateStr, null, (err, result) => {
        //     if (err) {
        //       console.log(new Error(String(err)));
        //     } else {
        //       callback && callback(result);
        //     }
        //   });
        // });
      }
    });
  } else {
    updateCallback();
  }
}

/**
 *
 * @param {Object} payload type data id
 * @param {Function} callback doc result
 */
function updateInfo(payload, callback) {
  const updateStr = {};

  updateStr[payload.type] = payload.password || payload.data;
  User.findByIdAndUpdate(payload.id, updateStr, null, (err, doc, result) => {
    if (err) {
      console.log("---", new Error(String(err)));
    } else {
      callback && callback(doc, result);
    }
  });
}

/**
 * 修改好友昵称
 * @param {Object} payload userId, friendId
 * @param {function} callback
 */
function friendMarkName(payload, callback) {
  const searchStr = { userId: payload.userId, friendId: payload.friendId };
  const updateStr = { markname: payload.markname };
  Friend.updateOne(searchStr, updateStr, null, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

module.exports = {
  userDetail,
  userUpdate,
  friendMarkName,
  updateInfo
};
