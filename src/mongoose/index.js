const config = require("../config");
const mongoose = require("mongoose");

const client = mongoose.createConnection(config.MONGODB_ONECHAT);

// client.on("error", console.error.bind(console, "connect error:"));
// client.once("open", function () {
//   // we're connected!
//   console.log("connect database...");
// });

mongoose
  .connect(config.MONGODB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = client;
