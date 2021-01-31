import React, { useEffect, useState, useContext } from 'react';
import Autocomplete from 'react-autocomplete';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { store } from '../../providers/store';
import PokemonCard from '../../components/pokemonCard';
import AddPokemon from '../../components/addPokemon';
import FormControl from '../../components/formControl';
import './Dashboard.scss';

const Dashboard = () => {
	// state for the autocomplete, disabled entries, a new pokemon, and pickeddata once a pokemon is selected
	const [autoValue, setAutoValue] = useState('');
	const [show, setShow] = useState(false);
	const [filterShow, setFilterShow] = useState(true);
	const [isDisabled, setIsDisabled] = useState(true);
	const [filterDisabled, setFilterDisabled] = useState(true);
	const [filters, setFilters] = useState({
		name: '',
		gender: '',
		ability: '',
		ball: '',
		// going to filter off this later
		// level: '',
		// maxhp: '',
		// maxatk: '',
		// maxdef: '',
		// maxspatk: '',
		// maxspdef: '',
		// maxspd: '',
		// minhp: '',
		// minatk: '',
		// mindef: '',
		// minspatk: '',
		// minspdef: '',
		// minspd: '',
	});
	// seed data - to later be replaced with store
	const [myPokemon, setMyPokemon] = useState([
		{
			id: 'ed35a614-bb4f-4295-bee9-3a4c0c2a6328',
			name: 'Charizard',
			shiny: true,
			dex: '006',
			ball: 'dream',
			level: '100',
			types: [
				{ type: 'fire', name: 'Fire' },
				{ type: 'flying', name: 'Flying' },
			],
			gender: ['male', '87.5%'],
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
		{
			id: 'bbd2a3a9-6251-4349-8c44-45111c91943a',
			name: 'Venusaur',
			shiny: false,
			dex: '003',
			ball: 'beast',
			level: '85',
			types: [
				{ type: 'grass', name: 'Grass' },
				{ type: 'poison', name: 'Poison' },
			],
			gender: ['female', '12.5%'],
			ability: 'Chlorophyll (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ normal: 'Skull Bash' },
				{ grass: 'Petal Dance' },
				{ ghost: 'Curse' },
				{ grass: 'Ingrain' },
			],
		},
		{
			id: 'b24e25b2-31b7-4b18-8022-cb4564fb06be',
			name: 'Arcanine',
			shiny: true,
			dex: '059',
			ball: 'love',
			level: '45',
			types: [{ type: 'fire', name: 'Fire' }],
			gender: ['male', '75%'],
			ability: 'Intimidate',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ normal: 'Thrash' },
				{ normal: 'Double-Edge' },
				{ normal: 'Morning Sun' },
				{ normal: 'Covet' },
			],
		},
		{
			id: '29a28fd5-7d2a-4798-9268-734915b8110e',
			name: 'Beedrill',
			shiny: false,
			dex: '015',
			ball: 'pokeball',
			level: '15',
			types: [
				{ type: 'bug', name: 'Bug' },
				{ type: 'poison', name: 'Poison' },
			],
			gender: ['female', '50%'],
			ability: 'Sniper (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [],
		},
		{
			id: '45b381c0-2b9f-4459-8806-a0c8f52b82d3',
			name: 'Pidgeotto',
			shiny: false,
			dex: '017',
			ball: 'moon',
			level: '66',
			types: [{ type: 'flying', name: 'Flying' }],
			gender: ['female', '87.5%'],
			ability: 'Big Pecks (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ flying: 'Air Cutter' },
				{ flying: 'Brave Bird' },
				{ dark: 'Feint Attack' },
				{ psychic: 'Foresight' },
			],
		},
		{
			id: 'd5ec9ee1-59a7-45eb-98fd-91db594af3b6',
			name: 'Vulpix-Alola',
			shiny: true,
			dex: '037',
			ball: 'friend',
			level: '22',
			types: [{ type: 'ice', name: 'Ice' }],
			gender: ['female', '75%'],
			ability: 'Snow Warning (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ psychic: 'Agility' },
				{ fairy: 'Charm' },
				{ normal: 'Disable' },
				{ normal: 'Encore' },
			],
		},
	]);
	const globalState = useContext(store);
	console.log(globalState);
	// eslint-disable-next-line
	const [filteredPokemon, setFilteredPokemon] = useState(myPokemon);
	const filterPokemon = () => {
		const newPokeArr = [];
		Object.keys(filters).forEach((filter) => {
			if (filters[filter] !== '') {
				newPokeArr.push(
					filteredPokemon.filter(
						(pokemon) => pokemon[filter] === filters[filter]
					)
				);
			}
		});
		// TODO: this needs to become a spread operator, it also needs to use && for the array instead of just adding everything
		// eslint-disable-next-line
		const merged = [].concat.apply([], newPokeArr);
		console.log(merged);
		setFilteredPokemon(merged);
	};
	useEffect(() => {
		console.log(filteredPokemon);
	}, [filteredPokemon]);
	useEffect(() => {
		if (myPokemon.length > 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [myPokemon]);
	useEffect(() => {
		// eslint-disable-next-line
		for (const [key, value] of Object.entries(filters)) {
			if (value !== '') {
				setFilterDisabled(false);
				break;
			} else {
				setFilterDisabled(true);
			}
		}
	}, [filters]);

	// from autocomplete - this is how they show to write for the shouldItemRender
	const renderPokemonName = (state, val) =>
		state.toLowerCase().indexOf(val.toLowerCase()) !== -1;

	// function to correct casing and allow user to type in lower or uppercase and still use autocomplete
	const properNameCase = (val) => {
		const newVal = val.replace(/(^|[\s-])\S/g, (match) => {
			return match.toUpperCase();
		});
		return newVal;
	};

	const update = (id, val) => {
		setFilters({ ...filters, [id]: val });
	};

	// handler for the autocomplete - this goes through each pokemon when a value is typed in
	// if the pokemon is a complete match it sets the state value for name otherwise it clears the value
	const changeHandler = (e, val) => {
		setAutoValue(val);
		filteredPokemon.forEach((poke) => {
			if (val.toLowerCase() === poke.name.toLowerCase()) {
				setFilters({ ...filters, name: properNameCase(val) });
				setIsDisabled(false);
			} else if (filters.name !== '') {
				setFilters({ ...filters, name: '' });
			}
		});
	};
	return (
		<section className="Dashboard">
			<div>
				<h1>Add Pokemon</h1>
				<AddPokemon
					id="lg"
					setMyPokemon={setMyPokemon}
					myPokemon={myPokemon}
				/>
				<div className="buttons filter-modal">
					<Button
						className="add"
						variant="secondary"
						size="lg"
						onClick={() => setShow(true)}
					>
						Add Pokemon
					</Button>
					<Button
						variant="tertiary"
						size="lg"
						disabled={isDisabled}
						onClick={() => setFilterShow(true)}
					>
						Filter
					</Button>
				</div>
				<hr />
				<div className="pokemon-list">
					{filteredPokemon.map((pokemon) => (
						<PokemonCard
							key={pokemon.id}
							pokemon={pokemon}
							filteredPokemon={filteredPokemon}
						/>
					))}
				</div>
			</div>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				dialogClassName="modal-90w"
				aria-labelledby="example-custom-modal-styling-title"
			>
				<Modal.Header closeButton>
					<h1>Add Pokemon</h1>
				</Modal.Header>
				<AddPokemon setMyPokemon={setMyPokemon} />
			</Modal>
			<Modal
				show={filterShow}
				onHide={() => setFilterShow(true)}
				dialogClassName="modal-90w filter"
				aria-labelledby="example-custom-modal-styling-title"
			>
				<Modal.Header closeButton>
					<h1>Filter</h1>
				</Modal.Header>
				<div className="Autocomplete">
					<Autocomplete
						className="Autocomplete"
						value={autoValue}
						inputProps={{
							placeholder: 'Select Pokemon',
						}}
						items={filteredPokemon.map((el) => el.name)}
						getItemValue={(item) => item}
						shouldItemRender={renderPokemonName}
						renderMenu={(item) => (
							<div key={`pokemon-${item}`} className="dropdown">
								{item}
							</div>
						)}
						renderItem={(item, isHighlighted) => (
							<div
								key={`${item}-div`}
								className={`item ${
									isHighlighted ? 'selected-item' : ''
								}`}
							>
								{item}
							</div>
						)}
						onChange={changeHandler}
						onSelect={changeHandler}
					/>
				</div>
				<FormControl
					type="select"
					placeholder="Select Gender"
					disabled={isDisabled}
					options={[`male`, `female`]}
					value={filters.gender}
					update={update}
					id="gender"
					// resetSelect={resetSelect}
				/>
				<FormControl
					type="select"
					placeholder="Select Ability"
					disabled={isDisabled}
					options={filteredPokemon.map((el) => el.ability)}
					value={filters.ability}
					update={update}
					id="ability"
					// resetSelect={resetSelect}
				/>
				<FormControl
					type="select"
					placeholder="Select Pokeball"
					options={filteredPokemon.map((el) => el.ball)}
					value={filters.ball}
					update={update}
					id="ball"
				/>
				<Button
					variant="tertiary"
					size="lg"
					disabled={filterDisabled}
					onClick={filterPokemon}
				>
					Filter
				</Button>
				<Button
					variant="secondary"
					size="lg"
					// disabled={filterDisabled}
					onClick={() => setFilteredPokemon(myPokemon)}
				>
					Reset
				</Button>
			</Modal>
		</section>
	);
};

export default Dashboard;
