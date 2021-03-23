const { Band, BandGenre, Genre, Portofolio, Transaction } = require("../models");

module.exports = class BandController {
  static findAll(req, res, next) {
    Band.findAll({ include: Genre })
      .then((bands) => {
        res.status(200).json({ bands });
      })
      .catch((err) => {
        next(err);
      });
  }

  static find(req, res, next) {
    const { id } = req.params;
    Band.findOne({ where: { id }, include: [ Genre, Portofolio, Transaction ] })
      .then((band) => {
        if (!band)
          throw {
            name: "customError",
            status: 404,
            message: "Error not Found",
          };
        res.status(200).json(band);
      })
      .catch((err) => {
        next(err);
      });
  }

  static createProfile(req, res, next) {
    const { id } = req.decoded;
    const {
      name,
      location,
      description,
      genre,
      rate,
      imageUrl,
      coverUrl,
    } = req.body;
    let payload = {};
    Band.create({
      name,
      location,
      description,
      rate,
      UserId: id,
      imageUrl: imageUrl[0],
      coverUrl: coverUrl[0],
    })
      .then((band) => {
        payload = band.dataValues;
        const bandGenres = genre.map((e) => {
          return { BandId: band.id, GenreId: e };
        });
        return BandGenre.bulkCreate(bandGenres);
      })
      .then((result) => {
        const newResult = { ...payload, genre: result };
        res.status(201).json({ band: newResult });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateProfile(req, res, next) {
    const {
      name,
      location,
      description,
      genre,
      rate,
      imageUrl,
      coverUrl,
    } = req.body;
    const { id } = req.decoded;
    let bandId;

    let updatedData = {
      name,
      location,
      description,
      rate
    }
    if (imageUrl != 'null')
      updatedData.imageUrl = imageUrl[0];

    if (coverUrl != 'null')
      updatedData.coverUrl = coverUrl[0];

    Band.update(
      updatedData,
      { where: { UserId: id }, returning: true }
    )
      .then((band) => {
        bandId = band[1][0].id;
        return BandGenre.destroy({ where: { BandId: bandId } });
      })
      .then((_) => {
        const newBandGenre = genre.map((e) => {
          return { BandId: bandId, GenreId: Number(e) };
        });
        return BandGenre.bulkCreate(newBandGenre);
      })
      .then((_) => {
        res.status(200).json({ message: "Profile update success" });
      })
      .catch((err) => {
        next(err);
      });
  }
  static getMyBandProfile(req, res, next) {
    const { id } = req.decoded;
    Band.findOne({ where: { UserId: id }, include: Genre })
      .then((band) => {
        res.status(200).json({ band: band });
      })
  }
};
