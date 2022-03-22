const { Friend, Message, GroupUser, GroupMsg } = require("../model");

/**
 * 获取好友列表
 * @param {String} userId 用户id
 * @param {Number} state 用户状态
 * @param {Function} callback
 */
function getUser(userId, state, callback) {
  const query = Friend.find({});
  // 查询条件
  query.where({ userId: userId, state: state });
  // 查找friendId关联德user对象
  query.populate("friendId");
  // 排序方式， 按照最后通讯时间
  query.sort({ lastTime: -1 });
  // 查询结果
  query
    .exec()
    .then((values) => {
      const result = values.map((value) => {
        return {
          id: value.friendId._id,
          username: value.friendId.username,
          markname: value.markname,
          imgUrl: value.friendId.imgUrl
          // lastTime: value.lastTime
        };
      });
      callback && callback(result);
    })
    .catch((err) => {
      console.log(new Error(err));
    });
}

/**
 * 获取最后一次通信
 * @param {Object} data userId, friendId
 * @param {(result) => void} callback
 */
function getOneMsg(data, callback) {
  const query = Message.findOne({});
  query.where({
    $or: [
      { userId: data.userId, friendId: data.friendId },
      { userId: data.friendId, friendId: data.userId }
    ]
  });
  query.sort({ time: -1 });
  query
    .exec()
    .then((value) => {
      const result = {
        message: value.message,
        time: value.time,
        types: value.types
      };
      callback && callback(result);
    })
    .catch((err) => {
      console.log(new Error(err));
    });
}

/**
 * 汇总未读消息数
 * @param {object} data userId, friendId
 * @param {(result) => void} callback
 */
function unreadMsg(data, callback) {
  const queryStr = { userId: data.userId, friendId: data.friendId, state: 1 };

  Message.countDocuments(queryStr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback && callback(result);
    }
  });
}

/**
 * 一对一消息状态修改
 * @param {Object} data userId, friendId
 * @param {(result) => void} callback
 */
function updateMsg(data, callback) {
  const queryStr = { userId: data.userId, friendId: data.friendId, state: 1 };

  const updateStr = { state: 0 };

  Message.updateMany(queryStr, updateStr, null, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback && callback(result);
    }
  });
}

/**
 * 获取群组
 * @param {String} userId 用户id
 * @param {(result) => void} callback
 */
function getGroup(userId, callback) {
  const query = GroupUser.find({});
  query.where({ userId: userId });
  query.populate("groupId");
  query.sort({ lastTime: -1 });
  query
    .exec()
    .then((values) => {
      const result = values.map((value) => {
        return {
          groupId: value.groupId._id,
          groupname: value.groupId.groupname,
          markname: value.name,
          imgUrl: value.groupId.imgUrl,
          lasTime: value.lastTime,
          tip: value.tip
        };
      });
      callback && callback(result);
    })
    .catch((err) => {
      console.log(new Error(err));
    });
}

/**
 * 按要求获取群消息
 * @param {String} groupId 群组id
 * @param {(result) => void} callback
 */
function getOneGroupMsg(groupId, callback) {
  const query = GroupMsg.findOne({});
  query.where({ groupId: groupId });
  query.populate("userId");
  query.sort({ time: -1 });
  query
    .exec()
    .then((value) => {
      const result = {
        message: value.message,
        time: value.time,
        types: value.types,
        username: value.userId.username
      };
      callback && callback(result);
    })
    .catch((err) => {
      console.log(new Error(err));
    });
}

/**
 * 群消息状态修改
 * @param {Object} data userId、groupId
 * @param {(result) => void} callback
 */
function updateGroupMsg(data, callback) {
  const queryStr = { userId: data.userId, groupId: data.friendId };
  const updateStr = { tip: 0 };

  Message.updateOne(queryStr, updateStr, null, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback && callback(result);
    }
  });
}

module.exports = {
  getUser,
  getOneMsg,
  updateMsg,
  unreadMsg,
  updateGroupMsg,
  getGroup,
  getOneGroupMsg
};
