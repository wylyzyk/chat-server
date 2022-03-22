const { Friend, Message } = require("../model");

/**
 * 添加好友表
 * @param {String} userId 用户id
 * @param {String} friendId 好友id
 * @param {Number} state 当前状态
 */
function newFriend(userId, friendId, state) {
  const payload = {
    userId,
    friendId,
    state,
    time: new Date()
  };

  const friend = new Friend(payload);
  friend.save(function (err, product) {
    if (err) {
      console.log(new Error(err));
    }
  });
}

/**
 * 添加一对一消息表
 * @param {Object} data
 * @param {Function} callback
 */
function insertMsg(data, callback) {
  const payload = {
    userId: data.userId,
    friendId: data.friendId,
    message: data.message,
    types: data.types,
    time: new Date(),
    state: 1
  };

  const message = new Message(payload);

  message.save((err, product) => {
    if (err) {
      console.log(new Error(err));
    } else {
      callback && callback(product);
    }
  });
}

/**
 * 添加消息
 * @param {Object} data userid, friendid, message, types, time, state: 0
 * @param {Function} callback
 */
function applyFriend(data, callback) {
  const searchStr = { userId: data.userId, friendId: data.friendId };

  Friend.countDocuments(searchStr, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      if (result == 0) {
        // 初次申请
        newFriend(data.userId, data.friendId, 2);
        newFriend(data.friendId, data.userId, 1);
      } else {
        // 已经申请过
        // TODO: 未向数据库中添加 lastTime 字段
        // updateLastTime(data.userId, data.friendId);
      }

      // 添加消息
      insertMsg({ ...data, state: 0 }, (product) => {
        callback(product);
      });
    }
  });
}

/**
 * 最后通讯时间
 * @param {String} userId 用户id
 * @param {String} friendId 好友id
 */
function updateLastTime(userId, friendId) {
  const searchStr = {
    $or: [
      { userId: userId, friendId: friendId },
      { userId: friendId, friendId: userId }
    ]
  };
  const updateStr = { lastTime: new Date() };

  Friend.updateMany(searchStr, updateStr, null, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    }
  });
}

/**
 * 更新好友状态， 0 已为好友
 * @param {Object} data userId, friendId
 * @param {Function} callback
 */
function updateFriendState(data, callback) {
  const updateStr = {
    $or: [
      { userId: data.userId, friendId: data.friendId },
      { userId: data.friendId, friendId: data.userId }
    ]
  };

  Friend.updateMany(updateStr, { state: 0 }, null, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

/**
 * 拒绝 / 删除好友
 * @param {Object} data userId, friendId
 * @param {Function} callback
 */
function rejectFriends(data, callback) {
  const updateStr = {
    $or: [
      { userId: data.userId, friendId: data.friendId },
      { userId: data.friendId, friendId: data.userId }
    ]
  };

  Friend.deleteMany(updateStr, null, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

module.exports = {
  newFriend,
  insertMsg,
  applyFriend,
  updateLastTime,
  updateFriendState,
  rejectFriends
};
