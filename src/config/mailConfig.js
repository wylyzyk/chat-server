const nodemailer = require("nodemailer");
const { callbackPromise } = require("nodemailer/lib/shared");
const { credentials } = require("./constant");

const transporter = nodemailer.createTransport({
  service: "qq",
  auth: {
    user: credentials.qq.user,
    pass: credentials.qq.pass
  }
})

// 邮件发送
const emailSignUp = (email, callback) => {
  const options = {
    from: "2256057228@qq.com",
    to: email,
    subject: "welcome signUp oneChat!",
    html: `<span>thank you for signUp oneChat!</span><a href="">cilck here active your account</a>`
  }

  // transporter.sendMail(options, (err, info) => {
  //   if(err) {
  //     res.status(400).json({msg: "email send fail\n" + err})
  //   }
  //   res.status(200).json({msg: "email send success"});
  // });

  transporter.sendMail(options, (err, info) => {
    if(err) {
      console.log(new Error(err));
      return;
    }
    callback(info);
  });
}

module.exports = emailSignUp;
