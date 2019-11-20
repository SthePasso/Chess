const express = require('express')
const app = express()
const http = require('http').createServer(app);

const handlebars = require('express-handlebars');
const router = require('./config/router')
const io = require('socket.io')(http)
const sass = require('node-sass-middleware');

const port = process.env.PORTCHESS || 7777
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

var session = require('express-session');
app.use(session({
  genid: (req) => {
    //return uuid() // usamos UUIDs para gerar os SESSID
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

app.use('/css', [
  express.static(__dirname + '/public/css'),
]);

app.use('/img', [
  express.static(__dirname + '/public/img'),
]);

app.engine('handlebars', handlebars({
  helpers: require(__dirname + '/app/views/helpers/helpers.js')
}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views');

io.on('connect', (client) => {

  console.log("usuario conectado");
  const uid = client.id.substr(0, 4);
  var sala = 1;
  client.join(sala);

  client.on('oi', (oi) => {
    console.log(oi);
    client.emit('oi', 'Você disse: ' + oi);
    client.to(sala).broadcast.emit('oi', 'O usuário ' + uid + ' disse: ' + oi);
  });

  client.on('mudarSala', (s) => {
    sala = s;
    client.leaveAll();
    client.join(sala);
  });

  client.on('move', (move) => {
    client.broadcast.emit('move', move);
  });
});

app.use(router);

http.listen(port, () => {
  console.log('App ouvindo a porta ' + port)
});
