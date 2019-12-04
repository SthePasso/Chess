'use strict';
module.exports = (sequelize, DataTypes) => {
  const mensagem = sequelize.define('mensagem', {
    id_partida: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    id_user: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    mensagem: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    tableName: "Mensagems"
  });
  mensagem.associate = function(models) {
    // associations can be defined here
  };
  return mensagem;
};