const { Band, BandGenre, Genre } = require("../models");

module.exports = class BandController {
  static findAll(req, res) {
    Band.findAll({ include: BandGenre })
      .then(bands => {
        console.log(bands);
        res.status(200).json({ band: bands })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }

  static find(req, res) {
    const { id } = req.params
    Band.find({ where: { UserId: id }, include: BandGenre })
      .then(band => {
        console.log(band)
        res.status(200).json(band)
      })
      .catch(err => {
        console.log(err);
      })
  }

  static createProfile(req, res) {
    const { id } = req.params
    const { location, description, genre, rate } = req.body
    let payload = {}
    Band.create({ location, description, rate, UserId: id })
      .then(band => {
        console.log(band)
        payload = band
        const bandGenres = genre.map(e => {
          return { BandId: band.id,GenreId: e.id }
        })
        return BandGenre.bulkCreate(bandGenres)
      })
      .then(result => {
        const newResult = { ...payload, genre: result }
        res.status(201).json(newResult)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })

  }

  static updateProfile(req, res) {}
};
