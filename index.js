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
const msg = require("./src/router/message");

const { verifyToken } = require("./src/dao/jwt");

const app = express();
const port = 5000;

// 引入socket.io
const { Server } = require("socket.io");
const io = new Server(8082);

// 注册事件
io.on("connection", (socket) => {
  // 向客户端发送消息
  socket.emit("serverEvent", 1, { msg: Buffer.from([2]) }),
    // 接收来自客户端的消息
    socket.on("fromClient", (...args) => {
      console.log(...args);
    });
  console.log("success connect...");
});

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
      console.log("token verify success");
      next();
    } else {
      console.log("token verify failed");
      // 验证失败
      res.status(300).send({ code: 300 });
    }
  }
  console.log("token is not found");
  // TODO: 后续去掉next， token验证失败
  next();
});

app.use("/api/email", email);
// 注册
app.use("/api/register", user);
// 登录
app.use("/api/login", auth);
app.use("/api/search", search);
app.use("/api/info", detail);
app.use("/api/friend", friend);
app.use("/api/upload", file);
app.use("/api/home", home);
app.use("./api/chat", msg);

app.listen(port, function () {
  console.log("server runing...");
  debug(`server runing port ${port}`);
});
