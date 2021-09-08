// 数据库连接地址
const MONGODB_ONECHAT = "mongodb+srv://admin:qaq5421@chatcluster.2bau7.mongodb.net/chat?retryWrites=true&w=majority"

// 邮箱证书
const credentials = {
  qq: {
    user: "2256057228@qq.com",
    pass: "radrdvvihsbhebba"
  }
};

// jwt
const jwtSecret = "somesecretkeyofonechat";

module.exports = {
  MONGODB_ONECHAT,
  credentials,
  jwtSecret
}
