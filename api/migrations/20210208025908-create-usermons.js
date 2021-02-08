'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usermons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      shiny: {
        type: Sequelize.BOOLEAN
      },
      dex: {
        type: Sequelize.INTEGER
      },
      ball: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      types: {
        type: Sequelize.ARRAY
      },
      gender: {
        type: Sequelize.ARRAY
      },
      ability: {
        type: Sequelize.STRING
      },
      hp: {
        type: Sequelize.INTEGER
      },
      atk: {
        type: Sequelize.INTEGER
      },
      def: {
        type: Sequelize.INTEGER
      },
      spAtk: {
        type: Sequelize.INTEGER
      },
      spDef: {
        type: Sequelize.INTEGER
      },
      spd: {
        type: Sequelize.INTEGER
      },
      eggMoves: {
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
    await queryInterface.dropTable('Usermons');
  }
};