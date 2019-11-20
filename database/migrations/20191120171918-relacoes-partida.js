'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('partida', ['id_user_1'], {
      type: 'foreign key',
      name: 'curso_id_user_1_fk',
      references: {
      table: 'user',
      field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'partida',
      'partida_id_user_1_fk'
    );
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('partida', ['id_user_2'], {
      type: 'foreign key',
      name: 'curso_id_user_2_fk',
      references: {
      table: 'user',
      field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'partida',
      'partida_id_user_1_fk'
    );
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('partida', ['winner'], {
      type: 'foreign key',
      name: 'curso_winner_fk',
      references: {
      table: 'user',
      field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'partida',
      'partida_winner_fk'
    );
  }
};