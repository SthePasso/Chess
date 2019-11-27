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
    partida.belongsTo(models.user,  {foreignKey: 'id_user_1', as: 'user1'});
    partida.belongsTo(models.user,  {foreignKey: 'id_user_2', as: 'user2'});
    partida.belongsTo(models.user,  {foreignKey: 'winner', as: 'campeao'});
    partida.hasMany(models.mensagem,{foreignKey: 'id_partida', as: 'id_fk'});
    // associations can be defined here
  };
  return partida;
};