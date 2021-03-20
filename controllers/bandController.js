const { Band, BandGenre, Genre } = require("../models");


module.exports = class BandController {
  static findAll(req, res) {
    Band.findAll({ include: Genre })
      .then(bands => {
        console.log(bands);
        res.status(200).json(bands)
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

  static createProfile(req, res, next) {
    const { id } = req.decoded
    const { name, location, description, genre, rate } = req.body
    let payload = {}
    Band.create({ name, location, description, rate, UserId: id })
      .then(band => {
        console.log(band, "ini band create")
        payload = band
        const bandGenres = genre.map(e => {
          return { BandId: id, GenreId: e }
        })
        console.log(bandGenres, "ini bandGenres hasil map");
        return BandGenre.bulkCreate(bandGenres)
      })
      .then(result => {
        const newResult = { ...payload, genre: result }
        res.status(201).json(newResult)
      })
      .catch(err => {
        next(err)
      })

  }

  static updateProfile(req, res, next) {
    const { name, location, description, genre, rate } = req.body
    const { id } = req.decoded
    Band.update({ name, location, description, rate }, { where: { UserId: id }})
      .then(band => {
        console.log(band, 'hasil band update')
        return BandGenre.destroy({ where: { BandId: id }})
      })
      .then(result => {
        console.log(result, 'ini hasil delete bandgenre')
        const newBandGenre = genre.map(e => {
          return { BandId: id, GenreId: e }
        })
        return BandGenre.bulkCreate(newBandGenre)
      })
      .then(result => {
        console.log(result, 'ini hasil bikin baru bulkcreate bandgenre')
        res.status(200).json({ message: "berhasil"})
      })
      .catch(err => {
        next(err)
      })
  }
};
