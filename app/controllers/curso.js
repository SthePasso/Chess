// Arquivo app/controllers/curso.js
var models = require('../models/index');
var Curso = models.curso;

const index = (req, res) => {
    res.render('curso');
};
const read = (req, res) => { };

// Curso Controller
const create = async function (req, res) {
    if (req.route.methods.get) {
        res.render('curso/create', {
            csrf: req.csrfToken()
        });
    } else {
        try {
            await Curso.create(req.body);
        } catch (e) {
            res.render('curso/create', {
                curso: req.body,
                errors: error.errors
            });
        }
    }
};
// Arquivo app/controlers/curso.js - Será preciso
// enviar o csrf para a view de todos os formulários
// res.render('curso/create', {
//     csrf: req.csrfToken()
// });

const update = (req, res) => { };
const remove = (req, res) => { };
module.exports = { index, read, create, update, remove }

