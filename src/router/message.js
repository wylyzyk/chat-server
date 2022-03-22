const express = require("express");
const { msg } = require("../service/message");

const router = express.Router();

router.post("/getMessage", (req, res) => {
  const data = req.body;
  msg(data, (result) => {
    res.send({ code: 200, data: { ...result }, msg: "success" });
  });
});
