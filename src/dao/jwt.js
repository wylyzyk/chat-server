const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

// 生成token
function token(id) {
  const payload = {
    id: id,
    time: new Date()
  };
  return jwt.sign(payload, jwtSecret, {
    expiresIn: 60 * 60 * 24 * 120
  });
}

// 解码token
function verifyToken(token) {
  let tokenCode = 0;
  jwt.verify(token, jwtSecret, (err, decode) => {
    if (err) {
      tokenCode = 0;
    }
    tokenCode = 1;
  });
  return tokenCode;
}

module.exports = {
  token,
  verifyToken
};
