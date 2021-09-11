const express = require("express");
const { verification } = require("../dao/bcrypt");
const { matchUser } = require("../service");
const jwt = require("../dao/jwt");

const router = express.Router();

router.post("/", (req, res) => {
  const { payload, password } = req.body;
  matchUser(payload, (result) => {
    if (!result) {
      res.status(400).send({ code: 400, msg: "result is null" });
    }

    const data = result.map((item) => {
      const pwdMatch = verification(password, item.password);

      if (pwdMatch) {
        const token = jwt.token(item._id);
        return {
          id: item._id,
          username: item.username,
          imgUrl: item.imgUrl,
          token: token
        };
      } else {
        return { err: "password not match!" };
      }
    });

    res.status(200).send({
      code: 200,
      data: data,
      msg: "success"
    });
  });
});

module.exports = router;
