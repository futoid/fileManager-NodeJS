"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Folder.init(
    {
      userId: DataTypes.INTEGER,
      folderName: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      parentFolder: {
        type: DataTypes.STRING,
        defaultValue: "root",
      },
    },
    {
      sequelize,
      modelName: "Folder",
    }
  );
  return Folder;
};
