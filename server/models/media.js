"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Media.belongsTo(models.Post, { foreignKey: "post_id" });
    }
  }
  Media.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: DataTypes.INTEGER,
      file_path: {
        type: DataTypes.STRING,
        unique: true,
      },
      media_type: {
        type: DataTypes.ENUM("image", "video"),
        defaultValue: "image",
      },
    },
    {
      sequelize,
      modelName: "Media",
    }
  );
  return Media;
};
