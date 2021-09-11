const { User, Friend, Group, GroupUser } = require("../model");

/**
 * 搜索用户
 * @param {Object} data username | email
 * @param {Function} callback sucess
 */
function searchUser(data, callback) {
  const searchStr = { $or: [{ username: data }, { email: data }] };
  const select = { username: 1, email: 1, imgUrl: 1 };
  User.find(searchStr, select, null, (err, result) => {
    if (err) {
      console.log("---", new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

/**
 * 判断是否为好友
 * @param {String} uid userid
 * @param {String} fid friendid
 * @param {Function} callback
 */
function isFriend(uid, fid, callback) {
  const searchStr = { userId: uid, friendId: fid, state: 0 };

  Friend.findOne(searchStr, null, null, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

/**
 * 群组搜索
 * @param {Group} data  groupname
 * @param {Function} callback
 */
function searchGroup(data, callback) {
  const searchStr = { name: data };
  const select = { name: 1, imgUrl: 1 };

  User.find(searchStr, select, null, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

/**
 * 判断是否在群内
 * @param {String} uid userId
 * @param {String} gid groupId
 * @param {Function} callback
 */
function isInGroup(uid, gid, callback) {
  const searchStr = { userId: uid, groupId: gid };
  GroupUser.findOne(searchStr, null, null, (err, result) => {
    if (err) {
      console.log(new Error(String(err)));
    } else {
      callback && callback(result);
    }
  });
}

module.exports = {
  searchUser,
  searchGroup,
  isFriend,
  isInGroup
};
