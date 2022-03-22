const express = require("express");
const { verification } = require("../dao/bcrypt");
const { matchUser } = require("../service");
const jwt = require("../dao/jwt");

const router = express.Router();

router.post("/", (req, res) => {
  const { payload, password } = req.body;

  // 进行用户密码匹配
  matchUser(payload, (result) => {
    if (!result) {
      res.status(400).send({ code: 400, msg: "result is null" });
    }

    // FIXME: 此处可能获取不到密码
    const pwdMatch = verification(password, result.password);

    if (pwdMatch) {
      const token = jwt.token(result._id);
      res.status(200).send({
        code: 200,
        data: {
          id: result._id,
          username: result.username,
          imgUrl: result.imgUrl,
          token: token
        },
        msg: "success"
      });
    } else {
      res.send({ code: 401, data: { err: "password is not match" }, msg: "faild" });
    }
  });
});

module.exports = router;
