const express = require("express");
const debug = require("debug");

const email = require("./src/router/email");
const user = require("./src/router/user");
const auth = require("./src/router/auth");
const search = require("./src/router/search");
const detail = require("./src/router/user-detail");
const friend = require("./src/router/friend");
const file = require("./src/router/file");
const home = require("./src/router/home");

const { verifyToken } = require("./src/dao/jwt");

const app = express();
const port = 5000;

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("X-Powered-By", "3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

// 获取静态路径
/**
 * 获取静态路径
 * 前端通过访问upload目录下的资源，显示图片
 */
app.use(express.static(__dirname + "/upload"));

// token 验证
app.use((req, res, next) => {
  if (typeof req.body.token !== "undefined") {
    const token = req.body.token;
    const tokenCode = verifyToken(token);
    // 验证通过
    if (tokenCode === 1) {
      next();
      return false;
    }
    // 验证失败
    res.status(300).send({ code: 300 });
  }
  next();
});

app.use("/api/email", email);
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/search", search);
app.use("/api/info", detail);
app.use("/api/friend", friend);
app.use("/api/upload", file);
app.use("/api/home", home);

app.listen(port, function () {
  console.log("server runing...");
  debug(`server runing port ${port}`);
});
