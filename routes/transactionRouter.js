const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const { authenticate } = require('../middlewares/authentication')

router.use(authenticate)
router.get('/reqSnapToken', transactionController.reqSnap)

module.exports = router
