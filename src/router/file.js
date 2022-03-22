const express = require("express");
const router = express.Router();
const multer = require("multer");
const { mkdirs } = require("../utils");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const url = req.body.url;
    mkdirs("../data" + url, (err) => {
      console.log(err);
    });

    cb(null, "./upload/test");
  },
  filename: function (req, file, cb) {
    const suf = file.originalname.replace(/.+\./, ".");
    cb(null, Date.now() + suf);
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.array("file", 10), (req, res, next) => {
  // 获取文件信息
  const data = req.files[0].filename;
  const url = req.body.url;
  const imgUrl = `/${url}/${data}`;
  console.log(data);
  // 返回给前端 send(data)
  res.send(imgUrl);
});

module.exports = router;
