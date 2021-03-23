'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Portofolios', [
      //sheila
      {
        BandId: 1,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Sheila+on+7+pemuja+rahasia.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 1,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Sheila+on+7+dan.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 1,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Sheila+on+7+dan+audio.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //ran
      {
        BandId: 2,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Ran+selamat+pagi.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 2,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Ran+pandangan+pertama.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 2,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Ran+selamat+pagi+audio.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //naif
      {
        BandId: 3,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Naif++piknik+72.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 3,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Naif++benci+untuk+mencinta.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 3,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/naif++air++api+audio.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      //sore
      {
        BandId: 4,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Sore+ssst.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 4,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Sore++SSST+audio.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //the rain
      {
        BandId: 5,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/The+Rain++Sepanjang+Jalan+Kenangan.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 5,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/The+Rain++Penawar+Letih+audio.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //nasida ria
      {
        BandId: 6,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Nasida+Ria+Wajah+Ayu+Untuk+Siapa.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 6,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Nasida+Ria+Perdamaian.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 6,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Nasida+Ria++Keadilan+audio.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //edane
      {
        BandId: 7,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/EDANE++Living+Dead.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 7,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/EDANE++Kau+Pikir+Kaulah+Segalanya+audio.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //om pmr
      {
        BandId: 8,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/OM+PMR++Yang+Hujan+Turun+Lagi.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 8,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/OM+PMR++Malam+Jumat+Kliwon.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //white shoes
      {
        BandId: 9,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/White+Shoes+and+the+Couples+Company++Kisah+dari+Selatan+Jakarta.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 9,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/White+Shoes++The+Couples+Company++Senandung+Maaf+audio.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //steven
      {
        BandId: 10,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/STEVEN+JAM++LAGU+SANTAI.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 10,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Steven++Coconuttreez++Lagu+Santai.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //burgerkil
      {
        BandId: 11,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Burgerkill++Under+The+Scars.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 11,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Burgerkill++Tiga+Titik+Hitam+audio.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //shaggydog
      {
        BandId: 12,
        portofolioType: 'video',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Shaggydog++Sayidan.mp4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BandId: 12,
        portofolioType: 'audio',
        fileUrl: 'https://bootcamp-hacktiv8.s3-ap-southeast-1.amazonaws.com/bandly/Shaggydog++Jalan+Jalan+audio.mp3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Portofolios', null, {});
    
  }
};
