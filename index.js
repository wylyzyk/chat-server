const express = require("express");
const debug = require("debug");

const email = require("./src/router/email");
const user = require("./src/router/user");

const app = express();
const port = 5000;

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("X-Powered-By", "3.2.1")
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method === "OPTIONS") {
    res.sendStatus(200);
  }else {
    next();
  }
});

app.use(express.json());

app.use("/api/email", email);
app.use("/api/user", user);


app.listen(port, function(){
  console.log("server runing...");
  debug(`server runing port ${port}`);
})
