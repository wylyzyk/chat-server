// 分页获取数据一对一聊天数据

const { Message } = require("../model");

function msg (data, cb) {
  const skipNum = data.nowPage * data.pageSize;   // 跳过的条数

  const query = Message.find({});
  query.where({$or:[{"userId": data.uid, "friendId": data.fid}, { "userId": data.fid, "friendId": data.uid}]});

  query.sort({"time": -1});
  query.populate("userId");
  query.skip(skipNum);    // 跳过的条数
  query.limit(data.pageSize);

  query.exec().then((values) => {
    const result = values.map((value) => {
      return {
        id: value._id,
        message: value.message,
        types: value.types,
        time: value.time,
        fromId: value.userId._id,
        imgUrl: value.userId.imgUrl
      }
    })
    cb && cb(result);
  }).catch((err) => {
    console.log(err);
  })
}


module.exports = {
  msg
}
