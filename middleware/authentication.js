const { decode } = require("../helpers");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { authorization, accept } = req.headers;

    console.log(accept);
    if (!authorization) {
      throw new Error("Unauthorized");
    }

    const access_token = authorization.split(" ")[1];

    const { id, email, CategoryId } = decode(access_token);

    req.loginInfo = {
      id,
      email,
      CategoryId,
    };

    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Error Not Found");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
