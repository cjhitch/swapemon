const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Conversations extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		// eslint-disable-next-line no-unused-vars
		static associate(models) {
			Conversations.hasMany(models.Messages, {
				foreignKey: 'conversation_id',
			});
			Conversations.belongsTo(models.Users, {
				foreignKey: 'userId',
			});
			Conversations.belongsTo(models.Users, {
				foreignKey: 'otherUserId',
			});
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
		},
		{
			sequelize,
			modelName: 'Conversations',
		}
	);
	return Conversations;
};
