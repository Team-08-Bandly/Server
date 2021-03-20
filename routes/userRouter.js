const router = require("express").Router();
const AuthController = require("../controllers/authController");
const { authenticate } = require("../middlewares/authentication");

router.use(authenticate);
router.get("/", AuthController.getUserById);
module.exports = router;
