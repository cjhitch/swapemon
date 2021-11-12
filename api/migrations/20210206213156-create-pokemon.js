// eslint-disable-next-line
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
			type_1: {
				type: Sequelize.ENUM(
					'Bug',
					'Dark',
					'Dragon',
					'Electric',
					'Fairy',
					'Fighting',
					'Fire',
					'Flying',
					'Ghost',
					'Grass',
					'Ground',
					'Ice',
					'Normal',
					'Poison',
					'Psychic',
					'Rock',
					'Steel',
					'Water'
				),
			},
			type_2: {
				type: Sequelize.ENUM(
					'Bug',
					'Dark',
					'Dragon',
					'Electric',
					'Fairy',
					'Fighting',
					'Fire',
					'Flying',
					'Ghost',
					'Grass',
					'Ground',
					'Ice',
					'Normal',
					'Poison',
					'Psychic',
					'Rock',
					'Steel',
					'Water'
				),
				allowNull: true,
			},
			hatch_steps: {
				type: Sequelize.INTEGER,
			},
			egg_group_1: {
				type: Sequelize.ENUM(
					'Monster',
					'Water 1',
					'Bug',
					'Flying',
					'Field',
					'Fairy',
					'Grass',
					'Human-Like',
					'Water 3',
					'Mineral',
					'Amorphous',
					'Water 2',
					'Ditto',
					'Dragon',
					'Undiscovered'
				),
			},
			egg_group_2: {
				type: Sequelize.ENUM(
					'Monster',
					'Water 1',
					'Bug',
					'Flying',
					'Field',
					'Fairy',
					'Grass',
					'Human-Like',
					'Water 3',
					'Mineral',
					'Amorphous',
					'Water 2',
					'Ditto',
					'Dragon',
					'Undiscovered'
				),
				allowNull: true,
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
	// eslint-disable-next-line no-unused-vars
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Pokemons');
	},
};
