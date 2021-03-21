const router = require("express").Router();
const { authorizeBand } = require("../middlewares/authorize");
const unggah = require("../middlewares/unggah");
const PortofolioController = require("../controllers/portofolioController");
const { authenticate } = require("../middlewares/authentication");

router.get("/:bandId", PortofolioController.findPortofolio);
router.use(authenticate);
router.post(
  "/",
  authorizeBand,
  unggah.single(`file`),
  PortofolioController.createPorto
);
// router.post("/", authorizeBand, PortofolioController.createPorto);
router.delete("/:id", authorizeBand, PortofolioController.deletePortofolio);

module.exports = router;
