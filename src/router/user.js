const express = require("express");
const { newUser, matchUser } = require("../utils");

const router = express.Router();

router.post("/match", (req, res) => {
  const { data, type } = req.body;

  matchUser(data, type, (result) => {
    console.log(result);
    res.status(200).send({ status: 200, result });
  });
});

router.post("/", (req, res) => {
  const { name, mail, password } = req.body;

  newUser({
    username: name,
    email: mail,
    password,
    callback: (result) => {
      console.log(result);
      res.status(200).send({ msg: "success", result });
    }
  });
});

module.exports = router;
