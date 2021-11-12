module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Conversations',
			[
				{
					id: '790fe8b3-3ce3-444a-99c2-6eca0d28c65e',
					userId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
					otherUserId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65b',
					username: 'darthvader',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: '790fe8b3-3ce3-444a-99c2-6eca0d28c65f',
					userId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
					otherUserId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65c',
					username: 'quigon',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: '790fe8b3-3ce3-444a-99c2-6eca0d28c650',
					userId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
					otherUserId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65d',
					username: 'fredwillard',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
			],
			{}
		);
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 */
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Conversations', null, {});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 */
	},
};
