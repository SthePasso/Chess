const index = (req, res) => {

  if (!req.params.color) {

    res.render('main/choosecolor');

  } else {

    res.render('main/game', {
      color: req.params.color,      
      partida: 1
    });
    
  }  
}

const socket = (req, res) => {
  res.render('main/socket');
}

module.exports = { index, socket }

