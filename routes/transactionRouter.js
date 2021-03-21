const router = require("express").Router();
const transactionController = require("../controllers/transactionController");

router.get('/reqSnapToken',transactionController.reqSnap);

module.exports = router;
