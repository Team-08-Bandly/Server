"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Portofolios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      BandId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Bands",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      portofolioType: {
        type: Sequelize.ENUM(["audio", "video"]),
      },
      fileUrl: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Portofolios");
  },
};
