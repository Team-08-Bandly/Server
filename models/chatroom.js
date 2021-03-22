'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatRoom.belongsTo(models.User)
      ChatRoom.belongsTo(models.Band)
    }
  };
  ChatRoom.init({
    UserId: DataTypes.INTEGER,
    BandId: DataTypes.INTEGER,
    RoomId: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "RoomId is already exists",
      }
    }
  }, {
    sequelize,
    modelName: 'ChatRoom',
  });
  return ChatRoom;
};