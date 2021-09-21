const express = require("express");
const router = express.Router();

const { applyFriend, updateFriendState, rejectFriends } = require("../service/friend");

// 好友申请
router.post("/", (req, res) => {
  const data = req.body;

  applyFriend(data, (product) => {
    if (!product) {
      res.status(500).send({ code: 500, error: "data is null" });
      return false;
    }
    res.status(200).send({ code: 200, data: product });
  });
});

// 更新好友状态
router.post("/updateState", (req, res) => {
  const data = req.body;

  updateFriendState(data, (result) => {
    res.status(200).send({ code: 200, data: result });
  });
});

// 拒绝 / 删除好友
router.post("/rejectFriend", (req, res) => {
  const data = req.body;

  rejectFriends(data, (result) => {
    res.status(200).send({ code: 200, data: result });
  });
});

module.exports = router;
