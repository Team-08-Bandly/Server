"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BandGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BandGenre.belongsTo(models.Band);
      BandGenre.belongsTo(models.Genre);
    }
  }
  BandGenre.init(
    {
      BandId: DataTypes.INTEGER,
      GenreId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "Genre cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "BandGenre",
    }
  );
  return BandGenre;
};
