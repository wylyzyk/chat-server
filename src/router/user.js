const express = require("express");
const { newUser, matchAccout } = require("../service");

const router = express.Router();

router.post("/match", (req, res) => {
  const { payload, type } = req.body;

  matchAccout(payload, type, (result) => {
    res.status(200).send({ status: 200, data: result });
  });
});

router.post("/", (req, res) => {
  const { username, email, password } = req.body;

  newUser({
    username,
    email,
    password,
    callback: (result) => {
      res.status(200).send({ msg: "success", data: result._id });
    }
  });
});

module.exports = router;
