import React from 'react';
import Header from './components/header';
import TypePills from './components/typePills';
import PokemonCard from './components/pokemonCard';
import Logo from './components/logo';
import './App.scss';

function App() {
	// this will ultimately be replaced with redux and database
	const pokemon = {
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
	};
	return (
		<div className="App">
			<Header />
			<TypePills type="electric" name="Electric" />
			<TypePills type="electric" variant="round" />
			<PokemonCard
				name={pokemon.name}
				shiny={pokemon.shiny}
				dex={pokemon.dex}
				ball={pokemon.ball}
				level={pokemon.level}
				types={pokemon.types}
				gender={pokemon.gender}
				ability={pokemon.ability}
				ivs={pokemon.ivs}
				moves={pokemon.eggMoves}
			/>
			<Logo />
		</div>
	);
}

export default App;
