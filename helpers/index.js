const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const hashPass = (pass) => bcrypt.hashSync(pass, 8);
const compareHash = (pass, hash) => bcrypt.compareSync(pass, hash);

const signToken = (payload) => jwt.sign(payload, SECRET_KEY);
const decode = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
  hashPass,
  compareHash,
  signToken,
  decode,
};
