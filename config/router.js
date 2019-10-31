const router = require('express').Router();

const MainController = require('../app/controllers/main')

router.get('/',                   MainController.index)
router.get('/socket',             MainController.socket)
router.get('/:color',             MainController.index)

module.exports = router


