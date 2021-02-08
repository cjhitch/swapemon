'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Pokeballs extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Pokeballs.init(
		{
			name: {
				defaultValue: DataTypes.STRING,
				primaryKey: true,
				allowNull: { args: false, msg: 'Pokeball name is required' },
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [3, 70],
						msg: 'Pokeball name must be at least 3 characters.',
					},
				},
			},
			sprite: {
				allowNull: {
					args: false,
					msg: 'Pokeball sprite must be at least 3 characters',
				},
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: 'Pokeballs',
		},
	);
	return Pokeballs;
};
