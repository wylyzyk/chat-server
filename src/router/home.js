const express = require("express");
const { getUser, getOneMsg, unreadMsg, updateMsg, getGroup, updateGroupMsg } = require("../service/home");
const router = express.Router();

// 获取好友列表
router.post("/getUser", (req, res) => {
  const { userId, state } = req.body;

  getUser(userId, state, (result) => {
    res.status(200).send({ code: 200, data: result });
  });
});

router.post("/getOneMsg", (req, res) => {
  const data = req.body;

  getOneMsg(data, (result) => {
    res.status(200).send({ code: 200, data: result });
  });
});

// 未读消息数
router.post("/unread", (req, res) => {
  const data = req.body;

  unreadMsg(data, (result) => {
    res.status(200).send({ code: 200, data: result });
  });
});

// 修改消息状态
router.post("/updateMsg", (req, res) => {
  const data = req.body;

  updateMsg(data, (result) => {
    res.status(200).send({ code: 200, data: result });
  });
});

// 获取群组
router.post("/getGroup", (req, res) => {
  const { userId } = req.body;

  getGroup(userId, (result) => {
    res.status(200).send({ code: 200, data: result });
  });
});

// 获取群消息
router.post("/getGroupMsg", (req, res) => {
  const data = req.body;

  getOneMsg(data, (result) => {
    res.status(200).send({ code: 200, data: result });
  });
});

// 修改群消息状态
router.post("/updateGroupMsg", (req, res) => {
  const data = req.body;

  updateGroupMsg(data, (result) => {
    res.status(200).send({ code: 200, data: result });
  });
});

module.exports = router;
