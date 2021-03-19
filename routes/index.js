const router = require("express").Router();
const userRouter = require("./userRouter");
const AuthController = require("../controllers/authController");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.use("/users", userRouter);

module.exports = router;
