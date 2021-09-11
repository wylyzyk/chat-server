const express = require("express");
const { searchUser, isFriend, searchGroup, isInGroup } = require("../service");

const router = express.Router();

// 搜索用户
router.post("/searchUser", (req, res) => {
  const { payload } = req.body;

  searchUser(payload, (result) => {
    if (!result) {
      res.status(400).send({ code: 400, msg: "result is null" });
      return false;
    }
    res.status(200).send({ code: 200, data: result });
  });
});

// 判断是否为好友
router.post("/isFriend", (req, res) => {
  const { userId, friendId } = req.body;

  isFriend(userId, friendId, (result) => {
    if (!result) {
      res.status(400).send({ code: 400 });
      return false;
    } else {
      res.status(200).send({ code: 200 });
    }
  });
});

// 群组搜索
router.post("/searchGroup", (req, res) => {
  const { payload } = req.body;

  searchGroup(payload, (result) => {
    if (!result) {
      res.status(400).send({ code: 400, msg: "result is null!" });
      return false;
    }
    res.status(200).send({ code: 200, data: result });
  });
});

// 判断是否在群内
router.post("/isInGroup", (req, res) => {
  const { userId, groupId } = req.body;

  isInGroup(userId, groupId, (result) => {
    if (!result) {
      res.status(400).send({ code: 400 });
      return false;
    }
    res.status(200).send({ code: 200 });
  });
});

module.exports = router;
