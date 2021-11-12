module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Messages', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			from: {
				type: Sequelize.UUID,
			},
			message: {
				type: Sequelize.STRING(512),
			},
			conversationId: {
				type: Sequelize.UUID,
				onDelete: 'CASCADE',
				references: {
					model: 'Conversations',
					key: 'id',
				},
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
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Messages');
	},
};
