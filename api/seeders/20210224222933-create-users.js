const brcypt = require('bcrypt');

const pw = brcypt.hashSync('@Pass123', 7);
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					id: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
					username: 'fredflintstone',
					first_name: 'Fred',
					last_name: 'Flintstone',
					email: 'swapemon@gmail.com',
					password: pw,
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
		await queryInterface.bulkDelete('Users', null, {});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 */
	},
};
