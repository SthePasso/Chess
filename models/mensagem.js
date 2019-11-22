'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define('Mensagem', {
    id_partida: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    mensagem: DataTypes.STRING
  }, {
    underscored: true,
  });
  Mensagem.associate = function(models) {
    // associations can be defined here
  };
  return Mensagem;
};