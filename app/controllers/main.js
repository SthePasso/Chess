const index = (req, res) => {

  if (!req.params.color) {

    res.render('main/choosecolor', { layout: 'main' });

  } else {

    res.render('main/game', {
      layout: 'main',
      color: req.params.color,
      partida: 1
    });

  }
}

const bcrypt = require('bcryptjs');

const socket = (req, res) => {
  res.render('main/socket');
}

const sobre = (req, res) => {
  res.render('main/sobre');
}

const signup = (req, res) => {
  // Dentro da função siginup
  res.render('main/signup');
  // bcrypt.genSalt(rounds, function (err, salt) {
  //   bcrypt.hash(req.body.senha, salt, async (err, hash) => {
  //     await User.create({
  //       nome: req.body.nome,
  //       email: req.body.email,
  //       senha: hash,
  //       id_curso: req.body.curso
  //     });
  //   });
  // });
  //var user = await User.findOne({ where: { email: req.body.email } });
  // if (user) {
  //   bcrypt.compare(req.body.senha, user.senha, (err, ok) => {
  //     if (ok) {
  //       req.session.uid = user.id;
  //       res.redirect('/');
  //     } else {
  //       res.render('main/login', {
  //         csrf: req.csrfToken()
  //       });
  //     }
  //   });
  // }
}

const login = (req, res) => {
  res.render('main/login');
}

const logout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  });
}

module.exports = { index, socket, sobre, signup, login }

