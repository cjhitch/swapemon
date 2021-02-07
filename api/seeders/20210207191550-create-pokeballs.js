'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Pokeballs',
			[
				{
					name: 'Poké Ball',
					sprite: 'pokeball.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Premier Ball',
					sprite: 'premier.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Great Ball',
					sprite: 'great.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Ultra Ball',
					sprite: 'ultra.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Master Ball',
					sprite: 'master.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Safari Ball',
					sprite: 'safari.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Dive Ball',
					sprite: 'dive.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Dusk Ball',
					sprite: 'dusk.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Heal Ball',
					sprite: 'heal.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Luxury Ball',
					sprite: 'luxury.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Nest Ball',
					sprite: 'next.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Net Ball',
					sprite: 'net.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Quick Ball',
					sprite: 'quick.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Repeat Ball',
					sprite: 'repeat.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Timer Ball',
					sprite: 'timer.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Fast Ball',
					sprite: 'fast.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Friend Ball',
					sprite: 'friend.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Heavy Ball',
					sprite: 'heavy.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Level Ball',
					sprite: 'level.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Love Ball',
					sprite: 'love.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Lure Ball',
					sprite: 'lure.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Moon Ball',
					sprite: 'moon.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Sport Ball',
					sprite: 'sport.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Cherish Ball',
					sprite: 'cherish.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Dream Ball',
					sprite: 'dream.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
				{
					name: 'Beast Ball',
					sprite: 'beast.svg',
					createdAt: Sequelize.literal('NOW()'),
					updatedAt: Sequelize.literal('NOW()'),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Pokeballs', null, {});
	},
};
