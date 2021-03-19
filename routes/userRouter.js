const router = require("express").Router();

router.get("/");
router.get("/:id");
router.post("/:id");
router.put("/:id");

module.exports = router;
