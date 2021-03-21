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
        console.log("masuk------------------");
        payload = band.dataValues;
        const bandGenres = genre.map((e) => {
          return { BandId: band.id, GenreId: e };
        });
        return BandGenre.bulkCreate(bandGenres);
      })
      .then((result) => {
        console.log("masuk2------------------");
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
    Band.update(
      {
        name,
        location,
        description,
        rate,
        imageUrl: imageUrl[0],
        coverUrl: coverUrl[0],
      },
      { where: { UserId: id }, returning: true }
    )
      .then((band) => {
        console.log("masuk update1--------------------");
        bandId = band[1][0].id;
        return BandGenre.destroy({ where: { BandId: bandId } });
      })
      .then((_) => {
        console.log("masuk update2--------------------");
        console.log(genre);
        const newBandGenre = genre.map((e) => {
          return { BandId: bandId, GenreId: Number(e) };
        });
        return BandGenre.bulkCreate(newBandGenre);
      })
      .then((_) => {
        console.log("masuk update3--------------------");
        res.status(200).json({ message: "Profile update success" });
      })
      .catch((err) => {
        console.log(err, "err --------------------");
        next(err);
      });
  }

  // static createPorto(req, res, next) {
  //   let { file } = req.body;
  //   let filename = file
  //   let extension = filename.split(".").pop();

  //   let audio_ext = ["mp3", "wav"];
  //   let video_ext = ["mp4"];
  //   let portofolioType = "";

  //   if (audio_ext.includes(extension)) {
  //     portofolioType = "audio";
  //   } else if (video_ext.includes(extension)) {
  //     portofolioType = "video";
  //   } else {
  //     next({ name: "customError", status: 400, message: "Wrong Format" });

  //   }
  //   let payload = { fileUrl: filename, portofolioType }
  //   Band.findOne({ where: { UserId: req.decoded.id }})
  //     .then((band) => {
  //       payload.BandId = band.id
  //       res.status(201).json(payload)
  //     })
  //     .catch((err) => {
  //       next(err)
  //     })
  // }
};
