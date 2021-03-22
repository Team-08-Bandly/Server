"use strict";
const { Model } = require("sequelize");

const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction)
      User.hasMany(models.ChatRoom)
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Name cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "Name is a required field",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email is already exists",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Email cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "Email is a required field",
          },
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "Password is a required field",
          },
          len: {
            args: [6],
            msg: "Password min 6 character",
          },
        },
      },
      accountType: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["band", "client"],
        validate: {
          notNull: {
            args: true,
            msg: "Account cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "Account type is a required field",
          },
          isIn: {
            args: [["band", "client"]],
            msg: "Not have that account type",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, opt) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
