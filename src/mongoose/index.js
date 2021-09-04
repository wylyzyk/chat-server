const config = require("../config");
const mongoose = require("mongoose");

const client = mongoose.createConnection(config.MONGODB_ONECHAT);

client.on("error", console.error.bind(console, "connect error:"));
client.once("open", function () {
  // we're connected!
  console.log("connect database...");
});

module.exports = client;
