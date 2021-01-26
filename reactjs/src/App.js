import React from 'react';
import Header from './components/header';
import TypePills from './components/typePills';
import PokemonCard from './components/pokemonCard';
import Logo from './components/logo';
import FormControl from './components/formControl';
import Footer from './components/footer';
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
	const update = (id, val) => {
		console.log(id, val);
	};
	return (
		<div className="App">
			<Header />
			<TypePills type="electric" name="Electric" />
			<TypePills type="electric" variant="round" />
			<PokemonCard pokemon={pokemon} />
			<Logo />
			<FormControl
				value="john"
				update={update}
				type="input"
				id="newinput"
				options={['1', '2', '3', '4', '5']}
			/>
			<Footer />
		</div>
	);
}

export default App;
