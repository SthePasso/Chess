const router = require('express').Router();

const MainController = require('../app/controllers/main');
const cursoController = require('../app/controllers/curso');


router.get('/',                   estaLogado, MainController.index);
router.get('/sobre',              MainController.sobre);//sobre
router.get('/signup',             MainController.signup);//signup
router.post('/signup',            MainController.signup);
router.get('/login',              MainController.login);//login
router.post('/login',             MainController.login);
router.get('/socket',             MainController.socket);


router.get('/partida',            estaLogado, MainController.partida);//partida
router.get('/partida/:id',        estaLogado, MainController.partida);//partida
router.get('/ranking',            estaLogado, MainController.ranking);//ranking
router.get('/logout',             estaLogado, MainController.logout)//logout


// CursoController
router.get('/curso' ,               estaLogado, cursoController.index);//curso
router.get('/curso/read/:id' ,      estaLogado, cursoController.read);
router.get('/curso/create' ,        estaLogado, cursoController.create);
router.post('/curso/create' ,       estaLogado, cursoController.create);
router.get('/curso/update/:id' ,    estaLogado, cursoController.update);
router.post('/curso/update/:id' ,   estaLogado, cursoController.update);
router.post('/curso/remove/:id' ,   estaLogado, cursoController.remove);
router.get('/curso/remove/:id' ,    estaLogado, cursoController.remove);



function estaLogado(req, res, next) {
    if (req.session.logado) {
        next();
    } else res.redirect('/login');
}

module.exports = router


