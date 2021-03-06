const { verifyToken } = require('../helpers/jwt')

const authenticate = function (req, res, next) {
  try {
    const decoded = verifyToken(req.headers.access_token)
    req.decoded = decoded
    next()
  } catch (err) {
    const errors = { name: "customError", status: 401, message: "Invalid token" }
    next(errors)
  }
}

module.exports = { authenticate }