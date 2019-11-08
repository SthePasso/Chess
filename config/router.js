const router = require('express').Router();

const MainController = require('../app/controllers/main')

router.get('/',                   MainController.index)
router.get('/sobre',              MainController.sobre)
//router.get('/singup',             MainController.singup)
router.get('/socket',             MainController.socket)
router.get('/:color',             MainController.index)


module.exports = router


