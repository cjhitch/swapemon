const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Messages extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Messages.belongsTo(models.Conversations, {
				foreignKey: 'conversationId',
			});
			// define association here
		}
	}
	Messages.init(
		{
			id: {
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				type: DataTypes.UUID,
				validate: {
					isUUID: { args: 4, msg: 'Id not valid, please try again' },
				},
			},
			from: {
				type: DataTypes.UUID,
				validate: {
					isUUID: { args: 4, msg: 'Id not valid, please try again' },
				},
			},
			message: DataTypes.STRING(512),
		},
		{
			sequelize,
			modelName: 'Messages',
		}
	);
	return Messages;
};
