"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Profile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      bio: DataTypes.TEXT,
      profile_picture: {
        type: DataTypes.STRING,
        defaultValue: "https://i.imgur.com/9WZQLwY.png",
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
