const router = require("express").Router();
const ChatController = require("../controllers/chatController");
const { authenticate } = require('../middlewares/authentication')

router.use(authenticate)
router.get('/', ChatController.find);
router.post('/', ChatController.create);
router.get('/:BandId', ChatController.findOne);


module.exports = router;
