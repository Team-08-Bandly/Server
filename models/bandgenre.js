'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BandGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BandGenre.init({
    BandId: {
      type: DataTypes.INTEGER
    },
    GenreId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'BandGenre',
  });
  return BandGenre;
};