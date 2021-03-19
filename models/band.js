'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Band.init(
    {
      name: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      location: DataTypes.STRING,
      description: DataTypes.STRING,
      rate: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Band'
    }
  )

  return Band
}
