const mongoose = require("mongoose");
const client = require("../mongoose");

// 用户表
const UserSchema = new mongoose.Schema({
  username: { type: String }, // 用户名
  password: { type: String }, // 密码
  email: { type: String }, // 邮箱
  sex: { type: String, default: "asexual" }, // 性别
  birth: { type: Date }, // 生日
  phone: { type: Number }, // 电话
  explain: { type: String }, // 个人介绍
  imgUrl: { type: String, default: "/user/user.png" }, // 用户头像
  time: { type: Date } // 注册时间
});

// 好友表
const FriendSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 用户id
  friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 好友ID
  state: { type: Number }, // 0: 已是好友, 1: 正在申请 2: 申请已发送
  time: { type: Date }, // 注册时间
  markname: { type: String },   // 好友昵称
  lastTime: { type: Date }  // 最后通讯时间
});

// 一对一消息表
const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 用户id
  friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 好友id
  message: { type: String }, // 消息内容
  types: { type: String }, // 消息类型 0, 文字 1 图片 2 音频
  time: { type: Date }, // 发送时间
  state: { type: Number } // 消息转态 0, 已读 1, 未读
});

// 群表
const GroupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 用户id
  groupname: { type: String }, // 群名称
  imgUrl: { type: String, default: "group.png" }, // 群头像
  time: { type: Date }, // 创建时间
  notice: { type: String } // 公告
});

// 群成员表
const GroupUserSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, // 群id
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 用户id
  username: { type: String }, // 群内名称
  tip: { type: Number, default: 0 }, // 未读消息数
  time: { type: Date }, // 加入时间
  shield: { type: Number } // 屏蔽群消息（0：不屏蔽、1：屏蔽）
});

// 群消息表
const GroupMsgSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, // 群id
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 用户id
  message: { type: String }, // 内容
  types: { type: String }, // 内容内型（0：文字、1：图片链接、2：音频链接）
  time: { type: Date } // 消息发送时间
});

const User = client.model("User", UserSchema);
const Friend = client.model("Friend", FriendSchema);
const Message = client.model("Message", MessageSchema);
const Group = client.model("Group", GroupSchema);
const GroupUser = client.model("GroupUser", GroupUserSchema);
const GroupMsg = client.model("GroupMsg", GroupMsgSchema);

module.exports = {
  User,
  Friend,
  Message,
  Group,
  GroupUser,
  GroupMsg
};
