const express = require("express");
const { newUser, matchAccout } = require("../service");

const router = express.Router();

// 用户名邮箱是否占用
router.post("/match", (req, res) => {
  const { payload, type } = req.body;

  matchAccout(payload, type, (result) => {
    res.status(200).send({ code: 200, data: result });
  });
});

// 用户注册
router.post("/new", (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  // TODO: 对前端传来的字段做检验, 后续进行规则校验
  if (!username || !password) {
    res.send({ code: 401, msg: "input have null", data: null });
  }

  // 创建用户
  newUser({
    username,
    email,
    password,
    callback: (result) => {
      res.status(200).send({
        code: 200,
        msg: "success",
        data: {
          username: result.username,
          email: result.email,
          sex: result.sex,
          imgUrl: result.imgUrl,
          time: result.time,
          _id: result._id
        }
      });
    }
  });
});

module.exports = router;
