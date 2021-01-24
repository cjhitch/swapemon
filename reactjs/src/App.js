import React from 'react';
import Header from './components/header';
import TypePills from './components/typePills';
import PokemonCard from './components/pokemonCard';
import './App.scss';

function App() {
	return (
		<div className="App">
			<Header />
			<TypePills type="electric" name="Electric" />
			<TypePills type="electric" variant="round" />
			<PokemonCard name="Bulbasaur" shiny dex="001" ball="dream" />
		</div>
	);
}

export default App;
