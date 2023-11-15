"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  File.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      fileName: {
        type: DataTypes.STRING,
        unique: true,
      },
      parentFolder: {
        type: DataTypes.STRING,
        defaultValue: "root",
      },
      fileLink: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "File",
    }
  );
  return File;
};
