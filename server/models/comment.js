"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: "user_id" });
      Comment.belongsTo(models.Post, { foreignKey: "post_id" });
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      timestamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
