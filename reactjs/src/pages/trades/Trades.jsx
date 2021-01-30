import React from 'react';
import Trade from '../../components/trade';
import './Trades.scss';

const Trades = () => {
	const pokemon = [
		{
			name: 'Charizard',
			shiny: true,
			dex: '006',
			ball: 'dream',
			level: '100',
			types: [
				{ type: 'fire', name: 'Fire' },
				{ type: 'flying', name: 'Flying' },
			],
			gender: ['female', '87.5%'],
			ability: 'Solar Power (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ normal: 'Belly Drum' },
				{ dark: 'Bite' },
				{ dragon: 'Dragon Tail' },
				{ flying: 'Wing Attack' },
			],
		},
	];
	return (
		<section className="Trades">
			<div>
				<h1>Trade Pokemon</h1>
				<Trade myTrades={pokemon} />
			</div>
		</section>
	);
};

export default Trades;
