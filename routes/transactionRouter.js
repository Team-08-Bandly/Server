const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const { authenticate } = require("../middlewares/authentication");

router.use(authenticate);
router.get("/", transactionController.reqSnap);
router.get("/:bandId", transactionController.reviewRating);

module.exports = router;
