import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Forgot from './pages/forgot';
import Create from './pages/create';
// import Header from './components/header';
// import TypePills from './components/typePills';
// import PokemonCard from './components/pokemonCard';
// import Logo from './components/logo';
// import FormControl from './components/formControl';
// import Profile from './components/profile';
// import Messages from './components/messages';
// import Trade from './components/trade';
// import Footer from './components/footer';
import './App.scss';

function App() {
	// const initialFormState = {
	// 	name: '',
	// 	shiny: false,
	// 	dex: '',
	// 	ball: '',
	// 	level: '',
	// 	types: [],
	// 	gender: '',
	// 	ivs: [],
	// 	eggMoves: [],
	// };
	// const [formState, setFormState] = useState(initialFormState);
	// this will ultimately be replaced with redux and database
	// const pokemon = [
	// 	{
	// 		name: 'Charizard',
	// 		shiny: true,
	// 		dex: '006',
	// 		ball: 'dream',
	// 		level: '100',
	// 		types: [
	// 			{ type: 'fire', name: 'Fire' },
	// 			{ type: 'flying', name: 'Flying' },
	// 		],
	// 		gender: ['female', '87.5%'],
	// 		ability: 'Solar Power (Hidden)',
	// 		ivs: [
	// 			{ HP: 31 },
	// 			{ Atk: 'N/A' },
	// 			{ Def: 31 },
	// 			{ SpAtk: 'N/A' },
	// 			{ SpDef: 30 },
	// 			{ Spd: 30 },
	// 		],
	// 		eggMoves: [
	// 			{ normal: 'Belly Drum' },
	// 			{ dark: 'Bite' },
	// 			{ dragon: 'Dragon Tail' },
	// 			{ flying: 'Wing Attack' },
	// 		],
	// 	},
	// ];
	// const update = (inputId, value) => {
	// 	console.log(inputId, value);
	// 	if (inputId === 'published' || inputId === 'archived') {
	// 		if (value === '0') {
	// 			setFormState({ ...formState, [inputId]: 1 });
	// 		} else {
	// 			setFormState({ ...formState, [inputId]: 0 });
	// 		}
	// 	} else {
	// 		setFormState({ ...formState, [inputId]: value });
	// 	}
	// };
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/forgot">
						<Forgot />
					</Route>
					<Route path="/create">
						<Create />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
			{/* <Header />
			<Trade myTrades={pokemon} /> */}
			{/* <TypePills type="electric" name="Electric" />
			<TypePills type="electric" variant="round" />}
			{<PokemonCard pokemon={pokemon} />
			<Logo />
			<FormControl
				value={formState.eggMoves}
				update={update}
				id="eggMoves"
				options={['1', '2', '3', '4', '5']}
				label="Select Moves"
			/>
			<FormControl
				value={formState.shiny}
				update={update}
				type="checkbox"
				id="shiny"
				label="Shiny"
			/>
			<FormControl
				value={formState.name}
				update={update}
				type="input"
				id="name"
				label="Pokemon Name"
			/>
			<Profile />
			<Messages /> */}
			{/* <Footer /> */}
		</div>
	);
}

export default App;
