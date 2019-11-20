'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    sigla: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING
    },
    descricao: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    id_area: {
      allowNull: false,
      type: DataTypes.INTEGER
      //chave estrangeira
    }
  }, {
    underscored: true,
    tableName: "curso"
  });
  curso.associate = function(models) {
    curso.belongsTo(models.area);
    // associations can be defined here
  };
  return curso;
};