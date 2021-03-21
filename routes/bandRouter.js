const router = require("express").Router();
const BandController = require("../controllers/bandController");
const { authenticate } = require("../middlewares/authentication");
const { authorizeBand } = require("../middlewares/authorize");
const unggah = require("../middlewares/unggah");
const portofolio = require("./portofolioRouter")

router.get("/", BandController.findAll);
router.get("/:id", BandController.find);
router.use(authenticate);
router.post("/", authorizeBand, BandController.createProfile);
router.put("/", authorizeBand, BandController.updateProfile);
router.use("/portofolio", portofolio)



module.exports = router;
