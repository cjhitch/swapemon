'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Pokemon extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Pokemon.init(
		{
			name: {
				defaultValue: DataTypes.STRING,
				primaryKey: true,
				allowNull: { args: false, msg: 'Name is required' },
				type: DataTypes.STRING,
				validate: {
					len: { args: [3, 120], msg: 'Pokemon name is required' },
				},
			},
			dex: {
				defaultValue: DataTypes.INTEGER,
				allowNull: { args: false, msg: 'Dex is required' },
				type: DataTypes.STRING,
				validate: {
					is: /^\d{3}/,
					msg:
						'Dex is required and must be in 001 format with at least 3 digits',
				},
			},
			male: {
				defaultValue: DataTypes.FLOAT,
				allowNull: { args: false, msg: 'Male value is required' },
				type: DataTypes.FLOAT,
				validate: {
					is: /^(\d{1,3})[.]{0,1}(\d{0,2})/,
					min: 0,
					max: 100,
					msg: 'Value must be between 0 and 100',
				},
			},
			female: {
				defaultValue: DataTypes.FLOAT,
				allowNull: { args: false, msg: 'Female value is required' },
				type: DataTypes.FLOAT,
				validate: {
					is: /^(\d{1,3})[.]{0,1}(\d{0,2})/,
					min: 0,
					max: 100,
					msg: 'Value must be between 0 and 100',
				},
			},
			type: {
				defaultValue: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: { args: false, msg: 'Type is required' },
				type: DataTypes.ARRAY(DataTypes.STRING),
				validate: {
					isIn: [
						[
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
						],
					],
					mgs: 'You need to select a valid type',
				},
			},
			hatch_steps: {
				defaultValue: DataTypes.INTEGER,
				allowNull: { args: false, msg: 'Hatch steps is required' },
				type: DataTypes.INTEGER,
				validate: {
					isInt: true,
					min: 300,
					max: 12000,
					msg: 'This must be an Integer between 300 and 12,000',
				},
			},
			egg_group: {
				defaultValue: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: { args: false, msg: 'Egg group is required' },
				type: DataTypes.ARRAY(DataTypes.STRING),
				validate: {
					isIn: [
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
					],
					msg: 'The selection must be from one of the egg groups.',
				},
			},
			ability_1: {
				defaultValue: DataTypes.STRING,
				allowNull: { args: false, msg: 'Ability is required' },
				type: DataTypes.STRING,
				validate: {
					len: { args: [3, 120], msg: 'Ability is required!' },
				},
			},
			ability_2: {
				defaultValue: DataTypes.STRING,
				allowNull: true,
				type: DataTypes.STRING,
			},
			hidden_ability: {
				defaultValue: DataTypes.STRING,
				allowNull: true,
				type: DataTypes.STRING,
			},
			base_egg_hatch: {
				defaultValue: DataTypes.STRING,
				allowNull: { args: false, msg: 'Base egg hatch is required' },
				type: DataTypes.STRING,
				validate: {
					len: { args: [3, 120], msg: 'Base hatch may not be left empty' },
				},
			},
			egg_moves: {
				defaultValue: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
				type: DataTypes.ARRAY(DataTypes.STRING),
			},
		},
		{
			sequelize,
			modelName: 'Pokemon',
		},
	);
	return Pokemon;
};
