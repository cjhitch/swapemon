'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Usermons',
			[
				{
					id: 'ed35a614-bb4f-4295-bee9-3a4c0c2a6328',
					name: 'Charizard',
					shiny: true,
					dex: '006',
					ball: 'dream',
					level: 100,
					types: ['fire', 'flying'],
					gender: ['male', '87.5%'],
					ability: 'Solar Power (hidden)',
					hp: 31,
					atk: null,
					def: 31,
					spAtk: null,
					spDef: 30,
					spd: 30,
					eggMoves: [
						'Belly Drum',
						'Bite',
						'Dragon Tail',
						'Wing Attack',
					],
				},
				{
					id: 'bbd2a3a9-6251-4349-8c44-45111c91943a',
					name: 'Venusaur',
					shiny: false,
					dex: '003',
					ball: 'beast',
					level: 85,
					types: ['grass', 'poison'],
					gender: ['female', '12.5%'],
					ability: 'Chlorophyll (hidden)',
					hp: 31,
					atk: null,
					def: 31,
					spAtk: null,
					spDef: 30,
					spd: 30,
					eggMoves: ['Skull Bash', 'Petal Dance', 'Curse', 'Ingrain'],
				},
				{
					id: 'b24e25b2-31b7-4b18-8022-cb4564fb06be',
					name: 'Arcanine',
					shiny: true,
					dex: '059',
					ball: 'love',
					level: 45,
					types: ['fire'],
					gender: ['male', '75%'],
					ability: 'Intimidate',
					hp: 31,
					atk: null,
					def: 31,
					spAtk: null,
					spDef: 30,
					spd: 30,
					eggMoves: ['Thrash', 'Double-Edge', 'Morning Sun', 'Covet'],
				},
				{
					id: '29a28fd5-7d2a-4798-9268-734915b8110e',
					name: 'Beedrill',
					shiny: false,
					dex: '015',
					ball: 'pokeball',
					level: 15,
					types: ['bug', 'poison'],
					gender: ['female', '50%'],
					ability: 'Sniper (hidden)',
					hp: 31,
					atk: null,
					def: 31,
					spAtk: null,
					spDef: 30,
					spd: 30,
					eggMoves: [],
				},
				{
					id: '45b381c0-2b9f-4459-8806-a0c8f52b82d3',
					name: 'Pidgeotto',
					shiny: false,
					dex: '017',
					ball: 'moon',
					level: 66,
					types: ['flying'],
					gender: ['female', '87.5%'],
					ability: 'Big Pecks (hidden)',
					hp: 31,
					atk: null,
					def: 31,
					spAtk: null,
					spDef: 30,
					spd: 30,
					eggMoves: [
						'Air Cutter',
						'Brave Bird',
						'Feint Attack',
						'Foresight',
					],
				},
				{
					id: 'd5ec9ee1-59a7-45eb-98fd-91db594af3b6',
					name: 'Vulpix-Alola',
					shiny: true,
					dex: '037',
					ball: 'friend',
					level: 22,
					types: ['ice'],
					gender: ['female', '75%'],
					ability: 'Snow Warning (hidden)',
					hp: 31,
					atk: null,
					def: 31,
					spAtk: null,
					spDef: 30,
					spd: 30,
					eggMoves: ['Agility', 'Charm', 'Disable', 'Encore'],
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
		await queryInterface.bulkDelete('Usermons', null, {});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 */
	},
};
