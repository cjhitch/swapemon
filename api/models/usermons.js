'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Usermons extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// This will need an association with
			// define association here
		}
	}
	Usermons.init(
		{
			id: {
				defaultValue: DataTypes.UUID,
				primaryKey: true,
				allowNull: { args: false, msg: 'Id is required' },
				type: DataTypes.UUID,
				validate: {
					isUUID: { args: 4, msg: 'Id not valid, please try again' },
				},
			},
			userId: {
				allowNull: { args: false, msg: 'User id is required' },
				type: DataTypes.UUID,
				validate: {
					isUUID: { args: 4, msg: 'Id not valid, please try again' },
				},
			},
			name: {
				allowNull: { args: false, msg: 'Name is required' },
				type: DataTypes.STRING,
				validate: {
					len: { args: [3, 120], msg: 'Pokemon name is required' },
				},
			},
			shiny: {
				allowNull: true,
				defaultValue: false,
				type: DataTypes.BOOLEAN,
			},
			dex: {
				allowNull: { args: false, msg: 'Dex is required' },
				type: DataTypes.STRING,
				validate: {
					is: /^\d{3}/,
					msg:
						'Dex is required and must be in 001 format with at least 3 digits',
				},
			},
			ball: {
				allowNull: { args: false, msg: 'Pokeball is required' },
				type: DataTypes.STRING,
				validate: {
					len: { args: [3, 120], msg: 'Pokeball is required' },
				},
			},
			level: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: 100,
					min: 1,
					msg: 'Level must be between 1-100',
				},
			},
			types: {
				allowNull: false,
				type: DataTypes.ARRAY(DataTypes.STRING),
			},
			gender: {
				allowNull: false,
				type: DataTypes.ARRAY(DataTypes.STRING),
			},
			ability: {
				allowNull: { args: false, msg: 'Ability is required' },
				type: DataTypes.STRING,
				validate: {
					len: { args: [3, 120], msg: 'Ability is required' },
				},
			},
			hp: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: 100,
					min: 1,
					msg: 'HP must be between 0-31',
				},
			},
			atk: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: 100,
					min: 1,
					msg: 'Attack must be between 0-31',
				},
			},
			def: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: 100,
					min: 1,
					msg: 'Defense must be between 0-31',
				},
			},
			spAtk: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: 100,
					min: 1,
					msg: 'Special attack must be between 0-31',
				},
			},
			spDef: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: 100,
					min: 1,
					msg: 'Special defense must be between 0-31',
				},
			},
			spd: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: 100,
					min: 1,
					msg: 'Speed must be between 0-31',
				},
			},
			eggMoves: {
				allowNull: true,
				type: DataTypes.ARRAY(DataTypes.STRING),
			},
		},
		{
			sequelize,
			modelName: 'Usermons',
		}
	);
	return Usermons;
};
