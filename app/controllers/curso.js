// Arquivo app/controllers/curso.js
var models = require('../models/index');
var Curso = models.curso;

const index = async (req, res) => {
    const cursos = await Curso.findAll();
    res.render('main/curso', { cursos });
};
const read = async (req, res) => { };

// Curso Controller
const create = async function (req, res) {
    if (req.route.methods.get) {
        res.render('curso/create', {
            csrf: req.csrfToken()
        });
    } else {
        try {
            await Curso.create(req.body);
            res.redirect('/curso');
        } catch (e) {
            console.log(e);
            res.render('curso/create', {
                curso: req.body,
                errors: e.errors,
                csrf: req.csrfToken()
            });
        }
    }
};

    // try {
    //   bcrypt.genSalt(10, function (err, salt) {
    //     bcrypt.hash(req.body.senha, salt, async (err, hash) => {
    //       await User.create({
    //         nome: req.body.nome,
    //         email: req.body.email,
    //         id_curso: req.body.id_curso,
    //         senha: hash
    //       });
    //       res.redirect('/login');
    //     });
    //   });

    // } 



// Arquivo app/controlers/curso.js - Será preciso
// enviar o csrf para a view de todos os formulários
// res.render('curso/create', {
//     csrf: req.csrfToken()
// });

const update = (req, res) => { };
const remove = (req, res) => { };
module.exports = { index, read, create, update, remove }

