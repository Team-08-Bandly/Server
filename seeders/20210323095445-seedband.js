'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Bands', [
      {
        name: "Sheila on 7",
        UserId: 1,
        location: "Yogyakarta",
        imageUrl: "https://pbs.twimg.com/profile_images/887961128554217472/aExj9NAK.jpg",
        coverUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Sheila_on_7.jpg",
        description: "Sheila on 7 adalah band bergenre pop dan rock asal Yogyakarta. Kami beranggotakan 5 orang, Duta vocal, Erros gitar, Adam bass, Brian drum dan Ferry keyboard. Kami berpengalaman mengisi beberapa acara event di berbagai kota.",
        rate: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ran",
        UserId: 2,
        location: "Jakarta",
        imageUrl: "https://cdn1-production-images-kly.akamaized.net/iNWTRFgtgJccA7xRW8jTmIOLJWk=/0x0/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2187883/original/081412700_1525765631-152576563156564ran.jpg",
        coverUrl: "https://cdn2.uzone.id//assets/uploads/Uzone/Entertainment/Kahitran14.jpg",
        description: "Ran adalah band pop R&B asal Jakarta. Ran membawa konsep vocal 3 orang yaitu Rayi, Asta dan Nino. kami bermain bersama dua gitaris dua keyboardis dan satu drumemer",
        rate: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Naif",
        UserId: 3,
        location: "Jakarta",
        imageUrl: "https://www.whiteboardjournal.com/wp-content/uploads/2018/08/ca218cc8a28b282eed19d92503f3c004.jpg",
        coverUrl: "https://thedisplay.net/wp-content/uploads/2018/08/naif-1280x720.jpg",
        description: "Naif adalah band pop asal Jakarta. Naif memiliki anggota 4 orang, David vocal, Emil bass, Jarwo gitar, Pepeng drum. Naif membawakan lagu pop bergaya classic.",
        rate: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sore",
        UserId: 4,
        location: "Jakarta",
        imageUrl: "http://infopensi.com/wp-content/uploads/2015/sore-rilis-single-ke-3-dari-ep-mevrouw-berjudul-avenue.jpg",
        coverUrl: "https://hanifmadud.files.wordpress.com/2014/03/sore.jpg",
        description: "Sore adalah band pop rock jazz asal Jakarta. Sore memiliki anggota 4 orang, Ade gitar vocal, Awan bass, Reza gitar, Bemby drum.",
        rate: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "The Rain",
        UserId: 5,
        location: "Yogyakarta",
        imageUrl: "https://64.media.tumblr.com/ead49f11915bdf3292e591ae35a063a7/d49ccb6d491c2b28-eb/s1280x1920/c106681e7c8e89daf3dd4e501c805697d68511e0.jpg",
        coverUrl: "http://therain-band.com/wp-content/uploads/2020/05/profile-1.jpg",
        description: "The Rain adalah band pop rock asal Yogyakarta. The Rain beranggotakan 4 orang, Indra vocal, Aang drum, Ipul bass. Iwan gitar.",
        rate: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Nasida Ria",
        UserId: 6,
        location: "Semarang",
        imageUrl: "https://pbs.twimg.com/profile_images/644081854266523648/sLvF2LGE.jpg",
        coverUrl: "https://cdn.sada.id/ruangobrol/files/2020/02/10033255/nasidaria-nasida-ria-ruangobrol.jpg",
        description: "Nasida ria grup musik asal Semarang. Nasida ria adalah grup kasidah modern. Nasida Ria mencampurkan gaya Arab klasik dengan instrumen Barat modern",
        rate: 100000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Edane",
        UserId: 7,
        location: "Jakarta",
        imageUrl: "https://gp1.wac.edgecastcdn.net/802892/http_public_production/albums/images/190968/original/resize:1000x1000/crop:x0y0w1000h1000/hash:1518323662/Art_Work_single_HAIL_EDAN_Alt_LOGO_.jpg?1518323662",
        coverUrl: "https://shopee.co.id/inspirasi-shopee/wp-content/uploads/2019/02/Edane_2017-edit.png",
        description: "Edane adalah band rock heavy metal asal Jakarta. Edane beranggotakan 5 orang, Eet gitar vocal, Fajar drum, Hendra gitar, Daeng bass vocal, Ervin vocal.",
        rate: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "OM Pengantar Minum Racun",
        UserId: 8,
        location: "Jakarta",
        imageUrl: "https://disk.mediaindonesia.com/thumbs/1800x1200/news/2015/06/1e879d6d2f431b674cceebb6e9c9ca8c.jpg",
        coverUrl: "https://i.ytimg.com/vi/LJRSbCLWVt0/maxresdefault.jpg",
        description: "Orkes Moral Pengantar Minum Racun adalah grup musik asal Jakarta. OM PMR adalah grup musik dangdut yang berpenampilan nyentrik.",
        rate: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "White Shoes & The Couples Company",
        UserId: 9,
        location: "Jakarta",
        imageUrl: "https://static.indiemarket.news/static-content/uploads/2019/11/White-Shoes-The-Couples-Company.jpg",
        coverUrl: "https://i.ytimg.com/vi/Hi00dxPZLfQ/maxresdefault.jpg",
        description: "White Shoes & The Couples Company adalah sebuah band pop jazz dari Jakarta. Band ini beranggotakan Aprilia Apsari, Yusmario Farabi, Saleh Husein, Ricky Surya Virgana, Aprimela Prawidyanti, John Navid",
        rate: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Steven & Coconut Treez",
        UserId: 10,
        location: "Jakarta",
        imageUrl: "https://cdn.idntimes.com/content-images/post/20190727/coconuttreez1-59530b8657d9db8f86d8eadcbeaefc3d_600x400.jpeg",
        coverUrl: "https://djarumcoklat.com/images/posts/steven-musikkita-1587102961.jpg?v=2016",
        description: "Steven & Coconut Treez adalah band bergenre reggae yg berdomisili di Jakarta. Beranggotakan 7 orang, yaitu Steven vocal, A Ray gitar, Teguh gitar, Rival bass, Iwan keyboard dan Aci drum.",
        rate: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Burgerkill",
        UserId: 11,
        location: "Bandung",
        imageUrl: "https://yt3.ggpht.com/ytc/AAUvwngILgPZX0ogNo_3RQfjHUxbCDAyRvKBzGa6OpsnFQ=s900-c-k-c0x00ffffff-no-rj",
        coverUrl: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/filters:watermark(file/2017/cms/img/watermark.png,-0,0,0)/photo/2020/03/22/3713900931.jpg",
        description: "Burgerkill adalah band bergenre metalcore asal Bandung. Burgerkill beranggotakan 5 orang, Vicky vocal, Ebens gitar, Putra drum, Agung gitar, Ramdan bass.",
        rate: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Shaggydog",
        UserId: 12,
        location: "Yogyakarta",
        imageUrl: "https://lh3.googleusercontent.com/proxy/8rX75Ov7CANPMgFaxstW-_eSeMirB59K14oFI_v4QbUjNVzavxxb5D2ke0iTJCrySpb2yHVjqR49ZfveWLARCA1n-5BsKqWPoduQ1PBXbIL3H2Kjp3bt4sc",
        coverUrl: "https://siasatpartikelir.com/wp-content/uploads/2021/02/Shaggydog-dan-Wok-The-Rock-2-scaled.jpg",
        description: "Shaggydog adalah band bergenre reggae pop jazz rock asal Yogyakarta. Shaggy dog beranggotakan Heru vocal, Richard gitar, Raymond gitar, Bandizt bass, Lilik keyboard, Yoyo drum",
        rate: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Bands', null, {});
    
  }
};
