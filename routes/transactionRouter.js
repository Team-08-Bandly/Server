const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const { authenticate } = require("../middlewares/authentication");

router.get("/:bandId", transactionController.getTransactionById);
router.use(authenticate);
router.get("/user", transactionController.getTransactionByUserId);
router.get("/", transactionController.reqSnap);
router.patch("/:id", transactionController.reviewRating);
router.put("/", transactionController.updateStatus);

module.exports = router;
