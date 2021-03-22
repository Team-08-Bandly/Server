"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Band.belongsToMany(models.Genre, { through: models.BandGenre });
      Band.hasMany(models.Portofolio);
      Band.hasMany(models.Transaction);
      Band.hasMany(models.ChatRoom);
    }
  }
  Band.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Band name cannot be empty",
          },
        },
      },

      UserId: DataTypes.INTEGER,
      location: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Location cannot be empty",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      coverUrl: {
        type: DataTypes.STRING,
      },
      description: DataTypes.TEXT,
      rate: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 100000,
            msg: "Rate cannot be less than 100000",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Band",
    }
  );

  return Band;
};
