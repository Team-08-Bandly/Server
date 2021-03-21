module.exports = (err, req, res, next) => {
  console.log(err);
  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError"
  ) {
    const errors = err.errors.map((el) => el.message);
    res.status(400).json({
      message: errors,
    });
  } else if (err.name === "customError") {
    res.status(err.status).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
