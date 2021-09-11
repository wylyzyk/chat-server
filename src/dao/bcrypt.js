const bcrypt = require("bcryptjs");

// 加密
 function encryption (pwd) {
  try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pwd, salt);

    return hash;
  }catch(e) {
    console.log(e);
  }

}

// 解密
function verification (pwd, serverHash) {
  // 返回值boolean
  const veri = bcrypt.compareSync(pwd, serverHash);

  return veri;
}

module.exports = {
  encryption,
  verification
}
