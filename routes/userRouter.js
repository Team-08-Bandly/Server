const router = require("express").Router();
const BandController = require("../controllers/bandController");

router.get("/", BandController.findAll);
router.get("/:id", BandController.find);
router.post("/:id", BandController.createProfile);
router.put("/:id", BandController.updateProfile);

module.exports = router;
