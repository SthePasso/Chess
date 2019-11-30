// Arquivo app/controllers/curso.js
var models = require('../models/index');
var Curso = models.curso;

const index = async (req, res) => {
    const cursos = await Curso.findAll();
    res.render('main/curso', { cursos });
};

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

const read = async (req, res) => { 
    const id = req.session.logado;
    if (req.route.methods.get) {
        const curso = await Curso.findByPk(req.params.id);
        res.render('curso/read', {curso: curso});
    } else {
        res.redirect("/curso");
    }
}

const update = async (req, res) => {
    const id = req.session.logado;
    const curso = await Curso.findByPk(req.params.id);
    if (req.route.methods.get) {
        res.render('curso/update', {
            curso: curso,
            csrf: req.csrfToken()
        });
    } else {
        console.log(">>>>>>>>>>>>>>>>>>");

        curso.sigla = req.body.sigla;
        curso.nome = req.body.nome;
        curso.descricao = req.body.descricao;
        curso.id_area = req.body.id_area;
        try {
            await curso.save();
        } catch (e) {
            console.log(e);
            res.redirect('curso/update', {
                curso: req.body,
                errors: e.errors,
                csrf: req.csrfToken()
            });
        }
        res.redirect('/curso');
    }
};

const remove = async (req, res) => {
    const id = req.session.logado;
    if (req.route.methods.get) {
        const curso = await Curso.findByPk(req.params.id);
        await Curso.destroy({where: {id:curso.id}});
        res.redirect("/curso");
    } else {
        res.redirect("/curso");
    }
 };
module.exports = { index, read, create, update, remove }

