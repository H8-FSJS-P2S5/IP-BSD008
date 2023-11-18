//createToken by Jwt
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ user }, "secret", { expiresIn: "7d" });
};

//verifyToken by Jwt
const verifyToken = (token) => {
  return jwt.verify(token, "secret");
};

module.exports = { createToken, verifyToken };
