const bcrypt = require('bcryptjs');
var models = require('../models/index');
const config = require('../../config/config.json');
const Sequelize = require('sequelize');
User = models.user;
Partida = models.partida;
Mensagem = models.mensagem;
Curso = models.curso;
Area = models.area;

const index = (req, res) => {
  if (req.session.logado) {//ffaça um select válido
    var minhasPartidas = sequelize.query(
      'select Partidas.id from Users inner join Partidas on Users.id=Partidas.winner group by Users.id order by vitorias desc;' 
    );
    var usuarioAguarda = sequelize.query(
      'select nome, count(winner) as vitorias from Users inner join Partidas on Users.id=Partidas.winner group by Users.id order by vitorias desc;' 
    );
    res.render('main/index', {minhasPartidas:minhasPartidas, usuarioAguarda:usuarioAguarda})
  } else res.redirect('/login')
}

const socket = (req, res) => {
  res.render('main/socket');
}

const sobre = (req, res) => {
  res.render('main/sobre');
}

const partida = (req, res) => {
  if (req.session.logado) {
    if (!req.params.color) {
      res.render('main/choosecolor', { layout: 'main' });
    } else {
      res.render('main/game', {
        layout: 'main',
        color: req.params.color,
        partida: 1
      });
    }
  } else res.redirect('/login');
}

const ranking = (req, res) => {
  if (req.session.logado) {
    // console.log('ola') verificar
    var consulta = sequelize.query(
      'select nome, count(winner) as vitorias from Users inner join Partidas on Users.id=Partidas.winner group by Users.id order by vitorias desc;' 
    );
    res.render('main/ranking', {consulta});
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

