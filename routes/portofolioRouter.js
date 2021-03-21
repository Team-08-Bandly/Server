const router = require("express").Router();
const { authorizeBand } = require("../middlewares/authorize");
const unggah = require("../middlewares/unggah");
const PortofolioController = require("../controllers/portofolioController")

router.post(
  "/",
  authorizeBand,
  unggah.single(`file`),
  PortofolioController.createPorto
);
// router.post(
//   "/",
//   authorizeBand,
//   PortofolioController.createPorto
// );


router.get('/', PortofolioController.findPortofolio)

module.exports = router