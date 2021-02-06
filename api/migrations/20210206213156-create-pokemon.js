'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pokemons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      dex: {
        type: Sequelize.STRING
      },
      male: {
        type: Sequelize.FLOAT
      },
      female: {
        type: Sequelize.FLOAT
      },
      type: {
        type: Sequelize.ARRAY
      },
      hatch_steps: {
        type: Sequelize.INTEGER
      },
      egg_group: {
        type: Sequelize.ARRAY
      },
      ability: {
        type: Sequelize.ARRAY
      },
      hidden_ability: {
        type: Sequelize.STRING
      },
      base_egg_hatch: {
        type: Sequelize.STRING
      },
      egg_moves: {
        type: Sequelize.ARRAY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pokemons');
  }
};