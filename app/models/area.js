'use strict';
module.exports = (sequelize, DataTypes) => {
  const area = sequelize.define('area', {
    nome: {
      allNull: false,
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    tableName: 'area'
  });
  area.associate = function(models) {
    area.hasMany(models.curso);
    // associations can be defined here
    //chave estrangeira
  };
  return area;
};