'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('BandGenres', [
      //sheila
      {
        BandId: 1,
        GenreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 1,
        GenreId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //ran
      {
        BandId: 2,
        GenreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 2,
        GenreId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //naif
      {
        BandId: 3,
        GenreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //sore
      {
        BandId: 4,
        GenreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 4,
        GenreId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 4,
        GenreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //the rain
      {
        BandId: 5,
        GenreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 5,
        GenreId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //nasida ria
      {
        BandId: 6,
        GenreId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //edane
      {
        BandId: 7,
        GenreId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 7,
        GenreId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //OM pmr
      {
        BandId: 8,
        GenreId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //white shoes
      {
        BandId: 9,
        GenreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 9,
        GenreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //steven
      {
        BandId: 10,
        GenreId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //burgerkill
      {
        BandId: 11,
        GenreId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //shaggydog
      {
        BandId: 12,
        GenreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 12,
        GenreId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 12,
        GenreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 12,
        GenreId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('BandGenres', null, {});
    
  }
};
