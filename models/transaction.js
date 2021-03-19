'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    ClientId: DataTypes.INTEGER,
    BandId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    address: DataTypes.STRING,
    rating: {
      type: DataTypes.DECIMAL(2, 1)
    },
    review: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};