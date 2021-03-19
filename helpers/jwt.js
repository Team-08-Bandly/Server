const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, "BandlySecret");
}

function verifyToken(token) {
  return jwt.verify(token, "BandlySecret");
}

module.exports = { generateToken, verifyToken };
