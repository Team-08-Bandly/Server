const { ChatRoom, Band } = require('../models/')

class ChatController {
  static find(req, res, next) {
    const { id } = req.decoded

    ChatRoom.findAll({
      where: {
        UserId: id
      }
    })
      .then(roomChat => {
        res.status(200).json({ roomChat })
      })
      .catch(err => {
        next(err)
      })
  }

  static create(req, res, next) {
    const { BandId, RoomId } = req.body
    const { id } = req.decoded

    Band.findByPk(BandId)
      .then(band => {
        if (!band) throw { name: "customError", status: 404, message: "Error not Found" }
        else return ChatRoom.findOne({ where: { RoomId } })
      })
      .then(roomChat => {
        if (!roomChat) return ChatRoom.create({ UserId: id, BandId, RoomId })
        else return res.status(200).json({ roomChat })
      })
      .then(newRoomChat => {
        res.status(201).json({ newRoomChat })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ChatController