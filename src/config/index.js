/*
 * @Author    : wangyelei
 * @Date      : 2021-08-04 08:59:38
 * @LastEditors: wangyelei
 * @LastEditTime: 2021-08-06 16:29:18
 * @FilePath  : \server\config\index.ts
 * @Description:
 */
const { MONGODB_ONECHAT, jwtSecret } = require("./constant");
const emailSignUp = require("./mailConfig");

module.exports = {
  MONGODB_ONECHAT,
  jwtSecret,
  emailSignUp
}
