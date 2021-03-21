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
      throw { name: "customError", status: 400, message: "Wrong Format File Type" }
    }
    let payload = { fileUrl: filename, portofolioType }
    Band.findOne({ where: { UserId: req.decoded.id } })
      .then((band) => {
        payload.BandId = band.id
        Portofolio.create(payload)
        res.status(201).json(payload)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findPortofolio(req, res, next) {
    Band.findOne({ where: { UserId: req.params.id } })
      .then((band) => {
        return Portofolio.findAll({
          where: {
            BandId: band.id
          }
        })
      })
      .then(portofolio => {
        res.status(200).json({ portofolio })
      })
      .catch(err => {
        next(err)
      })
  }

  static deletePortofolio(req, res, next) {
    const id = req.params.id
    Portofolio.destroy({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).json({ message: 'Success Deleting Portofolio' })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = PortofolioController