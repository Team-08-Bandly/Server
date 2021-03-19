'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Band.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {
    sequelize,
    modelName: 'Band',
  });
  return Band;
};