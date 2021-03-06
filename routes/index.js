const router = require("express").Router();
const bandRouter = require("./bandRouter");
const userRouter = require("./userRouter");
const transactionRouter = require("./transactionRouter");
const genreRouter = require("./genreRouter");
const chatRouter = require('./chatRouter')
const AuthController = require("../controllers/authController");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.use("/users", userRouter);
router.use("/bands", bandRouter);
router.use('/transactions', transactionRouter)
router.use('/genres', genreRouter)
router.use('/chatRoom', chatRouter)

module.exports = router;
