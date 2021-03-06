const express = require('express');
const app = express();
const http = require('http').createServer(app);
const {Chess} = require('chess.js');
const handlebars = require('express-handlebars');
const router = require('./config/router');
const io = require('socket.io')(http);
const sass = require('node-sass-middleware');

const port = process.env.PORTCHESS || 7777
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const uuid = require('uuid/v4');
const models = require('./app/models/index');

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// A variável expreq será passada para o helper isLogged, que é usada no layout
// app.locals é uma forma de passar variáveis para as views e para os helpers
app.use(function(req, res, next) {  
  app.locals.expreq = req;
  next();
});

var session = require('express-session');
app.use(session({
  genid: (req) => {
    return uuid() // usamos UUIDs para gerar os SESSID
  },
  secret: 'Hi9Cf#mK98',
  resave: false,
  saveUninitialized: true
}));

app.use(sass({
  src: __dirname + '/public/scss',
  dest: __dirname + '/public/css',
  debug: true,
  outputStyle: 'compressed',
  prefix: '/css'
}));

app.use('/js', [
  express.static(__dirname + '/node_modules/jquery/dist/'),
  express.static(__dirname + '/node_modules/popper.js/dist/umd/'),
  express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
  express.static(__dirname + '/node_modules/@chrisoakman/chessboardjs/dist/'),
  express.static(__dirname + '/node_modules/chess.js/'),
  express.static(__dirname + '/public/js')
]);

app.use('/webfonts', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/webfonts'),)

app.use('/css', [
  express.static(__dirname + '/public/css'),
  express.static(__dirname + '/node_modules/@chrisoakman/chessboardjs/dist/'),
]);

app.use('/img', [
  express.static(__dirname + '/public/img'),
]);

app.engine('handlebars', handlebars({
  helpers: require(__dirname + '/app/views/helpers/helpers.js')
}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views');

app.use('/',(req, res, next) => {
  res.locals.session = req.session;
  next();
});

io.on('connect', (client) => {
  console.log("usuario conectado");
  const sala = client.handshake.query.id_partida;
  client.join(sala);

  client.on('salvar-msg', (message) => {
    // client.emit('oi', 'Você disse: ' + oi);
    models.mensagem.create({
      id_partida: sala,
      id_user: message.id_user,
      mensagem: message.mensagem,
      created_at: new Date(message.now)
    });
    client.broadcast.emit('nova-msg', message);
  });

  client.on('mudarSala', (s) => {
    sala = s;
    client.leaveAll();
    client.join(sala);
  });

  client.on('move', (move) => {
    const novosValores = {fen: move.position};
    const game = new Chess(move.position);
    if(game.game_over()){
      novosValores.winner = game.turn() == 'w'? move.id_user_1 : move.id_user_2 ;
    }
    models.partida.update(novosValores,{where: {id:move.partida}});
    
    client.broadcast.emit('move', move);
  });
});

app.use(router);

http.listen(port, () => {
  console.log('App ouvindo a porta ' + port)
});
