"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Portofolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portofolio.belongsTo(models.Band);
    }
  }
  Portofolio.init(
    {
      BandId: DataTypes.INTEGER,
      portofolioType: {
        type: DataTypes.ENUM,
        values: ["audio", "video"],
        validate: {
          notEmpty: {
            args: true,
            msg: "Format type is a required field",
          },
          isIn: {
            args: [["audio", "video"]],
            msg: "Wrong Format File Type",
          },
        },
      },
      fileUrl: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            args: true,
            msg: "File url cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Portofolio",
    }
  );
  return Portofolio;
};
