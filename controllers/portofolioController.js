const { Band, BandGenre, Genre, Portofolio } = require("../models");


class PortofolioController {

  static createPorto(req, res, next) {
    let { file } = req.body;
    let filename = file
    let extension = filename.split(".").pop();

    let audio_ext = ["mp3", "wav"];
    let video_ext = ["mp4"];
    let portofolioType = "";

    if (audio_ext.includes(extension)) {
      portofolioType = "audio";
    } else if (video_ext.includes(extension)) {
      portofolioType = "video";
    } else {
      next({ name: "customError", status: 400, message: "Wrong Format" });

    }
    let payload = { fileUrl: filename, portofolioType }
    Band.findOne({ where: { UserId: req.decoded.id }})
      .then((band) => {
        payload.BandId = band.id
        Portofolio.create(payload)
        res.status(201).json(payload)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findPortofolio (req, res, next) {
    console.log("<<<<<<<<<<<<<< req decoded find all");
    // Band.findOne({ where: { UserId: req.decoded.id }})
    //   .then((data) => {
    //     res.status(200).json(data)
    //   })
    //   .catch(err => {
    //     next(err)
    //   })
  }
}

module.exports = PortofolioController