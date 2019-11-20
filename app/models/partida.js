'use strict';
module.exports = (sequelize, DataTypes) => {
  const partida = sequelize.define('partida', {
    id_user_1: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    id_user_2: {
      type: DataTypes.INTEGER
    },
    winner: {
      type: DataTypes.INTEGER
    },
    fen: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    tableName: "partida"
  });
  partida.associate = function(models) {
    partida.hasMany(models.user);
    partida.hasMany(models.user);
    partida.hasMany(models.user);
    partida.belongsTo(models.mensagem);
    // associations can be defined here
  };
  return partida;
};