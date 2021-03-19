'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClientId: {
        type: Sequelize.INTEGER
      },
      BandId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      duration: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.DECIMAL(2, 1)
      },
      review: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};