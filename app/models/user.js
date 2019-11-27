'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    nome: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          Args: [3, 100],
          msg: "Precisa conter entre 3 e 100 caracters"
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    senha: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          Args: [6, 100],
          msg: "A senha digitada tem menos de 6 caracteres, por favor digite uma senha maior"
        }
      }
    },
    id_curso: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    tableName: "Users"
  });
  user.associate = function(models) {
    user.belongsTo(models.curso,  {foreignKey: 'id_curso', as: 'id_curso_fk'});
    user.hasMany(models.partida,  {foreignKey: 'id_user_1', as: 'user1'});
    user.hasMany(models.partida,  {foreignKey: 'id_user_2', as: 'user2'});
    user.hasMany(models.partida,  {foreignKey: 'winner', as: 'campeao'});
    user.hasMany(models.mensagem, {foreignKey: 'id_user', as: 'msg_user'});
    // associations can be defined here
  };
  return user;
};