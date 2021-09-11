const { matchUser } = require("./login");
const { matchAccout, newUser } = require("./register");
const { searchUser, searchGroup, isFriend, isInGroup } = require("./search");
const { userDetail, userUpdate, friendMarkName, updateInfo } = require("./detail");

module.exports = {
  newUser,
  matchAccout,
  matchUser,
  searchUser,
  searchGroup,
  isFriend,
  isInGroup,
  userDetail,
  userUpdate,
  friendMarkName,
  updateInfo
};
