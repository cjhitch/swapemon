module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Messages',
			[
				{
					id: '4e2806fa-995f-43a0-b2e6-0e39a8b75127',
					message: 'Hey do you have any dream balls to trade for?',
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65e',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: 'a2fb5342-a46c-4e91-9981-eb490846224c',
					message: 'No sorry is there anything else you want?',
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65b',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65e',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: '130961a2-3af9-42d8-a317-0c58dc118bbb',
					message: "I am at work I'll check when I get home",
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65e',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: 'acb1ff52-cd2c-4022-a272-bb3b388aff4e',
					message: "Sorry I couldn't find any",
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65b',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65e',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},

				{
					id: '127ae5d1-73e7-48d6-8b6e-4117fc05e3c9',
					message: 'Hey do you have any safari balls to trade for?',
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65c',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65f',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: '0c75cef8-4e84-4e81-a9b1-eafd82a4dfd7',
					message: 'Yes does tonight work?',
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65f',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: '181b370b-7e1c-4603-b62c-14ba5733aa4f',
					message: "Yes! Let's trade when I get home tonight",
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65c',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65f',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: '18f102d4-e0a0-40ab-af4d-05b5f6cdf8ee',
					message: 'Did you still have time to trade tonight?',
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65c',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c65f',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},

				{
					id: '30e71d66-6b2e-4dd1-a290-060c3f53d9b5',
					message: 'Hey do you have any moon balls to trade for?',
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c650',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: '0fecaa01-f7f5-43d2-94c0-3aa3f9951155',
					message: "Here's my list let me know what you want",
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65d',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c650',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: '122b4787-da81-4470-a701-3798ff9aeb39',
					message: "Cool I'd like your charmander in the moon ball",
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c650',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					id: '05f93564-9a91-40c5-a182-44bd3c29ee7b',
					message:
						'Would you be willing to trade one of your Moon Bulbasaur?',
					from: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
					conversationId: '790fe8b3-3ce3-444a-99c2-6eca0d28c650',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Messages', null, {});
	},
};
