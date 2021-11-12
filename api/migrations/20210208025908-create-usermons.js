// eslint-disable-next-line
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Usermons', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			userId: {
				type: Sequelize.UUID,
			},
			name: {
				type: Sequelize.STRING,
			},
			shiny: {
				allowNull: true,
				type: Sequelize.BOOLEAN,
			},
			dex: {
				type: Sequelize.STRING,
			},
			ball: {
				type: Sequelize.STRING,
			},
			level: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			types: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			gender: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			ability: {
				type: Sequelize.STRING,
			},
			hp: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			atk: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			def: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			spAtk: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			spDef: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			spd: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			eggMoves: {
				allowNull: true,
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	// eslint-disable-next-line no-unused-vars
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Usermons');
	},
};
