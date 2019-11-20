'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('curso', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sigla: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descricao: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      id_area: {
        allowNull: false,
        type: Sequelize.INTEGER
        //chave estrangeira
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('curso');
  }
};