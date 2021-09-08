const express = require("express");
const { emailSignUp } = require("../config");

const router = express.Router();

router.get("/", (req, res) => {
  const email = req.query.email;
  emailSignUp(email, info => {
    if(info) {
      console.log(info.accepted);
      res.status(200).send({msg: "success", data: info });
    } else {
      res.status(200).send({});
    }
  });
})

module.exports = router;
