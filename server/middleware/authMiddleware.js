// middleware/authenticate.js (Example)
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
