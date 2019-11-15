const index = (req, res) => {

  if (!req.params.color) {

    res.render('main/choosecolor', {layout: 'main'});

  } else {

    res.render('main/game', {
      layout: 'main',
      color: req.params.color,      
      partida: 1
    });
    
  }  
}

const socket = (req, res) => {
  res.render('main/socket');
}

const sobre = (req, res) =>{
  res.render('main/sobre');
}

module.exports = { index, socket, sobre }

