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
			<PokemonCard
				name="Charizard"
				shiny
				dex="006"
				ball="dream"
				types={[
					{ type: 'fire', name: 'Fire' },
					{ type: 'flying', name: 'Flying' },
				]}
			/>
		</div>
	);
}

export default App;
