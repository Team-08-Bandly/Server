const router = require("express").Router();
const { authorizeBand } = require("../middlewares/authorize");
const unggah = require("../middlewares/unggah");
const PortofolioController = require("../controllers/portofolioController")
const { authenticate } = require("../middlewares/authentication");

router.use(authenticate)
// router.post(
//   "/",
//   authorizeBand,
//   unggah.single(`file`),
//   PortofolioController.createPorto
// );
router.get('/:id', PortofolioController.findPortofolio)
router.delete('/:id', PortofolioController.deletePortofolio)
router.post(
  "/",
  authorizeBand,
  PortofolioController.createPorto
);



module.exports = router