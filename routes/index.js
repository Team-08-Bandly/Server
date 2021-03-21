const router = require("express").Router();
const bandRouter = require("./bandRouter");
const userRouter = require("./userRouter");
const transactionRouter = require("./transactionRouter");
const AuthController = require("../controllers/authController");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.use("/users", userRouter);
router.use("/bands", bandRouter);
router.use('/transactions',transactionRouter)

module.exports = router;
