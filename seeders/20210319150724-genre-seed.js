'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Genres', [{
      name: 'pop',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'rock',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'r&b',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'jazz',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'dangdut',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'metal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'reggae',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Genres', null, {});
     
  }
};
