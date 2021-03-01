// eslint-disable-next-line
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Conversations', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			userId: {
				type: Sequelize.UUID,
				onDelete: 'CASCADE',
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			otherUserId: {
				type: Sequelize.UUID,
				onDelete: 'CASCADE',
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
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
	// eslint-disable-next-line no-unused-vars
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Conversations');
	},
};
