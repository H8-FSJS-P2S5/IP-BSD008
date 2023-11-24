const { Category } = require("../models");

const authorization = async (req, res, next) => {
  try {
    // console.log(req.loginInfo, "<<<");
    const { CategoryId } = req.loginInfo;
    const { id } = req.params;

    let data = await Category.findByPk(id);
    if (CategoryId !== data.CategoryId) {
      throw new Error("Unauthorized");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
