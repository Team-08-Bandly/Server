const { Band, BandGenre, Genre } = require("../models");

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
    Band.findOne({ where: { id }, include: Genre })
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
    const { name, location, description, genre, rate } = req.body;
    let payload = {};
    Band.create({ name, location, description, rate, UserId: id })
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
    const { name, location, description, genre, rate } = req.body;
    const { id } = req.decoded;
    let bandId;
    Band.update(
      { name, location, description, rate },
      { where: { UserId: id }, returning: true }
    )
      .then((band) => {
        // console.log(band[1][0].id, "hasil band update");
        bandId = band[1][0].id;
        return BandGenre.destroy({ where: { BandId: bandId } });
      })
      .then((_) => {
        const newBandGenre = genre.map((e) => {
          return { BandId: bandId, GenreId: e };
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

  static createPorto(req, res, next) {
    let filename = req.body;
    let extension = filename.split(".").pop();

    let audio_ext = ["mp3", "wav"];
    let video_ext = ["mp4"];
    let type = "";

    if (audio_ext.includes(extension)) {
      type = "audio";
    } else if (video_ext.includes(extension)) {
      type = "video";
    } else {
      next({ name: "customError", status: 400, message: "Wrong Format" });
    }
    res.send(req.body);
  }
};
