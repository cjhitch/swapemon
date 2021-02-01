import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import PokemonCard from '../../components/pokemonCard';
import AddPokemon from '../../components/addPokemon';
import FormControl from '../../components/formControl';
import { fetchUsermons } from '../../store/usermons/actions';
import './Dashboard.scss';

const Dashboard = () => {
	// state for the autocomplete, disabled entries, a new pokemon, and pickeddata once a pokemon is selected
	const [autoValue, setAutoValue] = useState('');
	const [show, setShow] = useState(false);
	const [filterShow, setFilterShow] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [filterDisabled, setFilterDisabled] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [pokeId, setPokeId] = useState(false);
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
	const [myPokemon, setMyPokemon] = useState([]);
	const pokeData = useSelector((state) => state.usermons);
	const dispatch = useDispatch();
	useEffect(() => {
		// TODO: this needs a better way to find user
		dispatch(fetchUsermons('JamesEarlJones'));
		// this is intentionally left as empty array to run once on load like a componentDidMount()
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		const pokeArr = [];
		if (pokeData.allIds.length > 0) {
			Object.values(pokeData.byId).forEach((obj) => {
				if (obj.data !== undefined) {
					console.log(obj.data);
					pokeArr.push(obj.data);
				}
			});
			setMyPokemon(pokeArr);
		}
	}, [pokeData]);
	const [filteredPokemon, setFilteredPokemon] = useState(null);
	useEffect(() => {
		setFilteredPokemon(myPokemon);
		console.log(myPokemon);
	}, [myPokemon]);
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
		setFilteredPokemon(merged);
	};
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
				<AddPokemon id="lg" pokeId={pokeId} />
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
				{filteredPokemon === null ? (
					<h1>...Loading</h1>
				) : (
					<div className="pokemon-list">
						{filteredPokemon !== null &&
							filteredPokemon.map((pokemon) => (
								<PokemonCard
									key={pokemon.id}
									pokemon={pokemon}
									filteredPokemon={filteredPokemon}
									setPokeId={setPokeId}
								/>
							))}
					</div>
				)}
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
				<AddPokemon pokeId={pokeId} />
			</Modal>
			<Modal
				show={filterShow}
				onHide={() => setFilterShow(false)}
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
						items={
							filteredPokemon === null
								? []
								: filteredPokemon.map((el) => el.name)
						}
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
					options={
						filteredPokemon === null
							? []
							: filteredPokemon.map((el) => el.ability)
					}
					value={filters.ability}
					update={update}
					id="ability"
					// resetSelect={resetSelect}
				/>
				<FormControl
					type="select"
					placeholder="Select Pokeball"
					options={
						filteredPokemon === null
							? []
							: filteredPokemon.map((el) => el.ball)
					}
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
					disabled={filterDisabled}
					onClick={() => setFilteredPokemon(myPokemon)}
				>
					Reset
				</Button>
			</Modal>
		</section>
	);
};

export default Dashboard;
