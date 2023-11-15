//for verifying token
const { decode } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error("Unauthorized");
    }

    const access_token = authorization.split(" ")[1];

    const payload = decode(access_token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw new Error("NotFound");
    }

    const { id } = payload;

    req.loginInfo = {
      userId: id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
