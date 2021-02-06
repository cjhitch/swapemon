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
				allowNull: false,
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
				allowNull: true,
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
				allowNull: true,
				type: DataTypes.FLOAT,
				validate: {
					is: /^(\d{1,3})[.]{0,1}(\d{0,2})/,
					min: 0,
					max: 100,
					msg: 'Value must be between 0 and 100',
				},
			},
			type: {
				defaultValue: DataTypes.ARRAY,
				type: DataTypes.ARRAY,
				validate: {
					isIn: [],
				},
			},
			hatch_steps: DataTypes.INTEGER,
			egg_group: DataTypes.ARRAY,
			ability: DataTypes.ARRAY,
			hidden_ability: DataTypes.STRING,
			base_egg_hatch: DataTypes.STRING,
			egg_moves: DataTypes.ARRAY,
		},
		{
			sequelize,
			modelName: 'Pokemon',
		},
	);
	return Pokemon;
};
