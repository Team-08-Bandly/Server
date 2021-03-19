'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {

      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {

      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {

      }
    },
    account_type: {
      type: DataTypes.ENUM,
      values: ['band', 'client'],
      validate: {

      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};