'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Conversations extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// this will need a user definition but user doesn't exist yet
			// define association here
		}
	}
	Conversations.init(
		{
			id: {
				defaultValue: DataTypes.UUID,
				primaryKey: true,
				allowNull: { args: false, msg: 'Conversation id is required' },
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
			username: {
				allowNull: { args: false, msg: 'Username is required' },
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [3, 500],
						msg:
							'Username must be at least 3 character, please try again',
					},
				},
			},
			convoMsg: {
				allowNull: { args: false, msg: 'Message is required' },
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [3, 500],
						msg:
							'Choice must be at least 3 character, please try again',
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'Conversations',
		}
	);
	return Conversations;
};
