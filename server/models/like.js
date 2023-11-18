"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, { foreignKey: "user_id" });
      Like.belongsTo(models.Post, { foreignKey: "post_id" });
    }
  }
  Like.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
