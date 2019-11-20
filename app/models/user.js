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
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    tableName: "user"
  });
  user.associate = function(models) {
    user.belongsTo(models.partida);
    user.hasMany(models.partida);
    user.hasMany(models.partida);
    user.hasMany(models.partida);
    user.hasMany(models.mensagem);
    // associations can be defined here
  };
  return user;
};