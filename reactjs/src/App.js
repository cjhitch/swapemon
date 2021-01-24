import React from 'react';
import TypePills from './components/typePills';
import Header from './components/header';
import './App.scss';

function App() {
	return (
		<div className="App">
			<Header />
			<TypePills type="grass" name="Grass" />
		</div>
	);
}

export default App;
