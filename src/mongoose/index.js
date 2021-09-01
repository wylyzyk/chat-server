const config = require("../config");
const mongoose = require("mongoose");

const client = mongoose.createConnection(
  config.MONGODB_ONECHAT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);

client.on('error', console.error.bind(console, 'connection error:'));
client.once('open', function() {
  // we're connected!
  console.log("connect database")
});
