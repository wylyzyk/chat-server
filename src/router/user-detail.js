const express = require("express");
const { userDetail, userUpdate, friendMarkName, updateInfo, matchAccout } = require("../service");
const router = express.Router();
const { verification, encryption } = require("../dao/bcrypt");
const { getFriendMarkName } = require("../service/detail");

// 用户详情
router.post("/", (req, res) => {
  const { userId } = req.body;
  userDetail(userId, (result) => {
    res.status(200).send({ data: result });
  });
});

// 用户信息修改
router.post("/alterInfo", (req, res) => {
  const payload = req.body;
  userUpdate(
    payload,
    (result) => {
      console.log(result);
      result.map((item) => {
        const pwdMatch = verification(payload.password, item.password);
        if (!pwdMatch) {
          res.send({ code: 400, msg: "failed of password!" });
          return false;
        }
        // 密码验证成功
        // 先将密码加密， 再进行匹配
        const password = payload.type === "password" ? encryption(payload.password) : payload.newdata;
        updateInfo({ ...payload, password }, (doc, result) => {
          console.log("updateInfo", doc, result);
          res.status(200).send({ code: 200, data: doc.username, result, msg: "success" });
        });
      });
    },
    // 更新邮箱
    () => {
      if (payload.type !== "password") {
        // 邮箱匹配
        matchAccout(payload.newdata, "email", (result) => {
          if (result > 0) {
            res.status(500).send({ code: 500, msg: `email repeat${result}!` });
            return;
          }
          updateInfo(payload, (doc, result) => {
            res.status(200).send({ code: 200, data: doc.email, result, msg: "success" });
          });
        });
      }
    }
  );
});

// 修改好友昵称
router.post("/alterFriend", (req, res) => {
  const { userId, friendId } = req.body;

  friendMarkName({ userId, friendId }, (result) => {
    if (!result) {
      res.status(500).send({ code: 500, msg: "alter name is failed" });
      return false;
    }
    res.status(200).send({ code: 200, data: result, msg: "success" });
  });
});

router.get("/getMarkname", (req, res) => {
  const { userId, friendId } = req.body;

  getFriendMarkName({ userId, friendId }, (result) => {
    if (!result) {
      res.status(500).send({ code: 500, msg: "get name of friend is failed" });
      return false;
    }
    res.status(200).send({ code: 200, msg: "success", data: result });
  });
});

module.exports = router;
