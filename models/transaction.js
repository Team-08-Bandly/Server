"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Band);
      Transaction.belongsTo(models.User);
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      UserId: DataTypes.INTEGER,
      BandId: DataTypes.INTEGER,
      date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: "Date cannot be empty",
          },
          isDate: {
            msg: "Date type must be date",
          },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Duration cannot be empty",
          },
          isInt: {
            msg: "Duration type must be integer",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Address cannot be empty",
          },
        },
      },
      rating: {
        type: DataTypes.DECIMAL(2, 1),
      },
      review: DataTypes.TEXT,
      snapToken: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
