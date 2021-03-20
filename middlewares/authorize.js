const { User } = require('../models/') 

const authorizeBand = function (req, res, next ) {
  User.findByPk(req.decoded.id)
    .then(user => {
      if (!user) {
        throw { name: "customError", status: 404, message: "data not found" }
      } else {
        if (req.decoded.accountType === 'band') next()
        else {
          throw { name: "customError", status: 401, message: "not authorized"}
        }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { authorizeBand }