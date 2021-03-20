const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

module.exports = class AuthController {
  static register(req, res, next) {
    const { name, email, password, accountType } = req.body;
    User.create({ name, email, password, accountType })
      .then((newUser) => {
        res.status(201).json({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          accountType: newUser.accountType,
        });
      })
      .catch((err) => {
        next(err)
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: { email },
    })
      .then((user) => {
        if (user && comparePassword(password, user.password)) {
          let payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            accountType: user.accountType,
          };
          const access_token = generateToken(payload);
          res.status(200).json({ access_token });
        } else {
          throw { name: "customError", status: 401, message: "Invalid Email/Password" }
        }
      })
      .catch((err) => {
        next(err)
      });
  }
};
