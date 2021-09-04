const bcrypt = require("bcryptjs");

// 加密
async function encryption (pwd) {
  try{
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(pwd, salt);

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
