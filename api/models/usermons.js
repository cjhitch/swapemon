const { Model } = require('sequelize');
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class Usermons extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		// eslint-disable-next-line no-unused-vars
		static associate(models) {
			// This will need an association with
			// define association here
		}
	}
	Usermons.init(
		{
			id: {
				defaultValue: DataTypes.UUIDV4,
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
					is: {
						args: /^\d{3}/,
						msg:
							'Dex is required and must be in 001 format with at least 3 digits',
					},
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
					max: {
						args: [100],
						msg: 'Level must not be higher than 100',
					},
					min: { args: [1], msg: 'Level must be greater than 1' },
				},
			},
			types: {
				type: DataTypes.ARRAY(DataTypes.STRING),
			},
			gender: {
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
					max: {
						args: [31],
						msg: 'Hp must not be higher than 31',
					},
					min: { args: [1], msg: 'Hp must be greater than 1' },
				},
			},
			atk: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: {
						args: [31],
						msg: 'Attack must not be higher than 31',
					},
					min: { args: [1], msg: 'Attack must be greater than 1' },
				},
			},
			def: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: {
						args: [31],
						msg: 'Defense must not be higher than 31',
					},
					min: { args: [1], msg: 'Defense must be greater than 1' },
				},
			},
			spAtk: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: {
						args: [31],
						msg: 'Level must not be higher than 31',
					},
					min: { args: [1], msg: 'Level must be greater than 1' },
				},
			},
			spDef: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: {
						args: [31],
						msg: 'Special Defense must not be higher than 31',
					},
					min: {
						args: [1],
						msg: 'Special Defense must be greater than 1',
					},
				},
			},
			spd: {
				allowNull: true,
				type: DataTypes.INTEGER,
				validate: {
					max: {
						args: [31],
						msg: 'Speed must not be higher than 31',
					},
					min: { args: [1], msg: 'Speed must be greater than 1' },
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
	// eslint-disable-next-line
	Usermons.beforeValidate((mon) => (mon.id = v4));
	return Usermons;
};
