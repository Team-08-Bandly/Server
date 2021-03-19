const router = require("express").Router();
const userRouter = require("./userRouter");

router.post("/login");
router.post("/register");
router.use("/users", userRouter);

module.exports = router;
