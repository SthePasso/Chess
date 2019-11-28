const bcrypt = require('bcryptjs');
const  models = require('../models/index');
const config = require('../../config/config.json');
const Sequelize = require('sequelize');
const User = models.user;
const Partida = models.partida;
const Mensagem = models.mensagem;
const Curso = models.curso;
const Area = models.area;
const Op = models.Sequelize.Op;

const index = async (req, res) => {
  if (req.session.logado) {//ffaça um select válido
    const minhasPartidas = await Partida.findAll({ 
      where: { [Op.or]: [{ id_user_1: req.session.logado }, { id_user_2: req.session.logado }] }, 
      include: [{ model: User, as: 'user2' }, { model: User, as: 'user1' }] 
    });
    const usuarioAguarda = await Partida.findAll({ 
      where: { id_user_2: null, id_user_1: { [Op.ne]: req.session.logado } }, 
      include: [{ model: User, as: 'user1' }] 
    });

    res.render('main/index', { minhasPartidas, usuarioAguarda, uid: req.session.uid });
  } else res.redirect('/login')
}

const socket = async (req, res) => {
  res.render('main/socket');
}

const sobre = async (req, res) => {
  res.render('main/sobre'); 
}

const partida = async (req, res) => {
  if (req.session.logado) {
    // if (!req.params.color) {
    //   res.render('main/choosecolor', { layout: 'main' });
    // } else {
      res.render('main/game', {
        layout: 'main',
        color: 'w',
        partida: 1
      });
    // }
  } else res.redirect('/login');
}

const ranking = async (req, res) => {
  if (req.session.logado) {
    const consulta = await Partida.findAll({ 
      where: { winner:{[Op.gt]: 0} }, 
      include: [{ model: User, as: 'campeao' }] 
    });
    // console.log('ola') verificar
    res.render('main/ranking', { consulta });
  } else res.redirect('/login');
}

const signup = async (req, res) => {
  //console.log(req.csrfToken())
  // Dentro da função siginup
  if (req.route.methods.get) {
    res.render('main/signup', {
      csrf: req.csrfToken()
    });
  } else {
    try {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.senha, salt, async (err, hash) => {
          await User.create({
            nome: req.body.nome,
            email: req.body.email,
            id_curso: req.body.id_curso,
            senha: hash
          });
          res.redirect('/login');
        });
      });

    } catch (error) {
      console.log(error);
      res.render('main/signup', {
        csrf: req.csrfToken()
      });
    }
  }
}

const login = async (req, res) => {
  if (req.route.methods.get) {
    if (req.session.logado) {
      res.redirect('/');
    } else {
      res.render('main/login', { csrfToken: req.csrfToken() });
    }
  } else {
    var user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      bcrypt.compare(req.body.senha, user.senha, function (err, senhaok) {
        console.log(senhaok);
        if (senhaok) {
          req.session.logado = user.id;
          req.session.nome = user.nome;
          res.redirect('/');//logado
        } else {
          console.log(incorreto);
          // Caso o usuário digite uma senha inválida
          res.render('main/login', {
            csrfToken: req.csrfToken(),
            erro: true,
            email: req.body.email
          });
        }
      });
    } else {
      // Caso o usuário digite um email inválido
      res.render('main/login', {
        csrfToken: req.csrfToken(),
        erro: true,
        email: req.body.email
      });
    }
  }
}

const logout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  });
}

module.exports = { index, socket, sobre, partida, ranking, signup, login, logout }

