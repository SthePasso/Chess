const router = require('express').Router();

const MainController = require('../app/controllers/main')
const cursoController = require('../app/controllers/curso');


router.get('/',                   MainController.index)
router.get('/sobre',              MainController.sobre)
router.get('/signup',             MainController.signup)
router.post('/signup',            MainController.signup)
router.get('/login',              MainController.login)
router.post('/login',             MainController.login)
router.get('/socket',             MainController.socket)
router.get('/:color',             MainController.index)

// CursoController
router.get('/curso' ,               cursoController.index);
router.get('/curso/read/:id' ,      cursoController.read);
router.get('/curso/create' ,        cursoController.create);
router.post('/curso/create' ,       cursoController.create);
router.get('/curso/update/:id' ,    cursoController.update);
router.post('/curso/update/:id' ,   cursoController.update);
router.post('/curso/remove/:id' ,   cursoController.remove);

module.exports = router


