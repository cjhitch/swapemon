'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Moves extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Moves.init(
		{
			name: {
				defaultValue: DataTypes.STRING,
				primaryKey: true,
				allowNull: { args: false, msg: 'Move name is required' },
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [3, 70],
						msg: 'Move name must be at least 3 characters.',
					},
				},
			},
			type: {
				allowNull: {
					args: false,
					msg: 'Type must be at least 3 characters',
				},
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: 'Moves',
		},
	);
	return Moves;
};
