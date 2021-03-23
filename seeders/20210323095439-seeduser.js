'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Users', [
      {
        name: "band1",
        email: "band1@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band2",
        email: "band2@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band3",
        email: "band3@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band4",
        email: "band4@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band5",
        email: "band5@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band6",
        email: "band6@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band7",
        email: "band7@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band8",
        email: "band8@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band9",
        email: "band9@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band10",
        email: "band10@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band11",
        email: "band11@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "band12",
        email: "band12@mail.com",
        password: hashPassword("123456"),
        accountType: "band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};
