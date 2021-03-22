const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const { authenticate } = require("../middlewares/authentication");

router.get("/:bandId", transactionController.getTransactionById)
router.use(authenticate);
router.get("/", transactionController.reqSnap);
router.patch("/:id", transactionController.reviewRating);

module.exports = router;
