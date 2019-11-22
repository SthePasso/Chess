'use strict';
module.exports = (sequelize, DataTypes) => {
  const Partida = sequelize.define('Partida', {
    id_user_1: DataTypes.INTEGER,
    id_user_2: DataTypes.INTEGER,
    winner: DataTypes.INTEGER,
    fen: DataTypes.STRING
  }, {
    underscored: true,
  });
  Partida.associate = function(models) {
    // associations can be defined here
  };
  return Partida;
};