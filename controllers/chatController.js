const { ChatRoom, Band, User } = require('../models/')

class ChatController {
   static find = async(req, res, next) => {
    const { id } = req.decoded

    try {
      const user = await User.findByPk(+id);
      let roomChat = [];
      if(user.accountType === 'band'){
        const band = await Band.findOne({ where : { UserId: id } });
        console.log(band);
        roomChat = await ChatRoom.findAll({
          where: {
            BandId: band.id
          },
          include: User
        });
      }else{
        roomChat = await ChatRoom.findAll({
          where: {
            UserId: id
          },
          include: Band
        });
      }
      res.status(200).json({ roomChat })
    } catch (error) {
      next(error);
    }
      
  }

  static findOne(req, res, next) {
    const { BandId } = req.params
    const { id } = req.decoded
    ChatRoom.findOne({ where: { UserId: id, BandId } })
      .then(room => {
        if (!room) {
          res.status(200).json({ status: false, UserId: id })
        } else {
          res.status(200).json({ BandId, RoomId: room.RoomId, UserId: id, status: true })
        }
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
        else return ChatRoom.findOne({ where: { UserId: id, BandId } })
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