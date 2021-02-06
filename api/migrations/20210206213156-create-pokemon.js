'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Pokemons', {
			name: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			dex: {
				type: Sequelize.STRING,
			},
			male: {
				type: Sequelize.FLOAT,
			},
			female: {
				type: Sequelize.FLOAT,
			},
			type: {
				type: Sequelize.ENUM(
					'bug',
					'dark',
					'dragon',
					'electric',
					'fairy',
					'fight',
					'fire',
					'flying',
					'ghost',
					'grass',
					'ground',
					'ice',
					'normal',
					'poison',
					'psychic',
					'rock',
					'steel',
					'water',
				),
			},
			hatch_steps: {
				type: Sequelize.INTEGER,
			},
			egg_group: {
				type: Sequelize.ENUM(
					'monster',
					'water 1',
					'bug',
					'flying',
					'field',
					'fairy',
					'grass',
					'human-like',
					'water 3',
					'mineral',
					'amorphous',
					'water 2',
					'ditto',
					'dragon',
					'undiscovered',
				),
			},
			ability_1: {
				type: Sequelize.STRING,
			},
			ability_2: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			hidden_ability: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			base_egg_hatch: {
				type: Sequelize.STRING,
			},
			egg_moves: {
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
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Pokemons');
	},
};
