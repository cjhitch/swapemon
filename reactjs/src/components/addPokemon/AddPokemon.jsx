import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import Button from 'react-bootstrap/Button';
import pokemonData from '../../assets/data/pokemon_info.json';
import FormControl from '../formControl';
import TypePills from '../typePills';
import {
	updateUsermon,
	createUsermon,
	fetchUsermon,
} from '../../store/usermons/actions';
import { fetchPokemons } from '../../store/pokemon/actions';
import { fetchMoves } from '../../store/moves/actions';
import './AddPokemon.scss';

const AddPokemon = ({ size, pokeId }) => {
	const pokeData = useSelector((state) => state.usermons.byId[pokeId]);
	const id = useSelector((state) => state.auth.id);
	const pokemon = useSelector((state) => state.pokemon.byId);
	const moves = useSelector((state) => state.moves);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchPokemons());
		dispatch(fetchMoves());
		// this should only run once to run similar to componentDidMount()
		// eslint-disable-next-line
	}, []);
	// state for the autocomplete, disabled entries, a new pokemon, and pickeddata once a pokemon is selected
	const [autoValue, setAutoValue] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [resetSelect, setResetSelect] = useState(false);
	// variable to hold our new pokemon or editable pokemon as it is selected and built
	const [newPokemon, setNewPokemon] = useState({
		name: '',
		dex: '',
		ball: '',
		gender: '',
		ability: '',
		shiny: '',
		types: '',
		moves: [],
		hp: '',
		atk: '',
		def: '',
		spAtk: '',
		spDef: '',
		spd: '',
		level: 1,
	});
	// data when a pokemon is selected from the autcomplete - this sets the available gender, ability, and moves for that pokemon from the corresponding moves and gender tress
	const [pickedData, setPickedData] = useState({
		gender: '',
		ability: '',
		hiddenAbility: '',
		moves: [],
	});

	// if the object has been passed in that means this is being edited - set the state to existing
	useEffect(() => {
		if (pokeId) {
			dispatch(fetchUsermon(pokeId));
			if (!pokeData.isLoading) {
				const poke = pokeData.data;
				setIsDisabled(false);
				setNewPokemon({
					name: poke.name,
					dex: poke.dex,
					ball: poke.ball,
					gender: poke.gender[1],
					ability: poke.ability,
					shiny: poke.shiny,
					types: poke.types,
					moves: !poke.eggMoves ? [] : poke.eggMoves,
					hp: !poke.ivs[0].HP ? '' : poke.ivs[0].HP,
					atk: !poke.ivs[1].Atk ? '' : poke.ivs[1].Atk,
					def: !poke.ivs[2].Def ? '' : poke.ivs[2].Def,
					spAtk: !poke.ivs[3].SpAtk ? '' : poke.ivs[3].SpAtk,
					spDef: !poke.ivs[4].SpDef ? '' : poke.ivs[4].SpDef,
					spd: !poke.ivs[5].Spd ? '' : poke.ivs[5].Spd,
					level: poke.level,
				});
				setAutoValue(poke.name);
			}
		}
		// this should only ever run if pokeId is supplied never anytime else
		// eslint-disable-next-line
	}, [pokeId]);

	// check if the correct items are selected in state - disable/enable button depending
	useEffect(() => {
		if (newPokemon.name !== '') {
			if (
				newPokemon.gender !== '' &&
				newPokemon.ability !== '' &&
				newPokemon.ball !== ''
			) {
				setBtnDisabled(false);
			} else {
				setBtnDisabled(true);
			}
		} else {
			setBtnDisabled(true);
		}
	}, [newPokemon]);

	// run through the data and get types based on the move name - this will be fixed in the database
	const getType = (move) => {
		return moves.byId[move].data.type;
	};

	// set the picked data to set for the dropdowns
	useEffect(() => {
		if (pokemon[newPokemon.name]) {
			const poke = pokemon[newPokemon.name].data;
			setResetSelect(false);
			const abilArr = poke.ability.filter((abil) => abil.length !== 0);
			if (poke.hidden_ability.length !== 0) {
				abilArr.push(poke.hidden_ability);
			}
			// pull the move by key to push to the array and pass into the pickeddata
			const moveArr = [];
			poke.egg_moves.forEach((move) => {
				const newMove = { [getType(move)]: move };
				moveArr.push(newMove);
			});
			// set a data block to be passed into the pickeddata
			const newData = {
				gender: poke.gender,
				abilities: abilArr,
				moves: moveArr,
			};
			setPickedData(newData);
		} else {
			// if it fails the check - reset the picked data
			setResetSelect(true);
			setPickedData({
				gender: '',
				ability: '',
				hiddenAbility: '',
				moves: [],
			});
		}
		// this should only ever run if name is changed never anytime else
		// eslint-disable-next-line
	}, [newPokemon.name]);

	// update function this checks if it is a checkbox and updates that accordingly
	// otherwise it uses the key to update the correct part of the state
	const update = (inputId, value) => {
		if (inputId === 'shiny') {
			if (value === '0') {
				setNewPokemon({ ...newPokemon, [inputId]: 1 });
			} else {
				setNewPokemon({ ...newPokemon, [inputId]: 0 });
			}
		} else {
			setNewPokemon({ ...newPokemon, [inputId]: value });
		}
	};

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

	// handler for the autocomplete - this goes through each pokemon when a value is typed in
	// if the pokemon is a complete match it sets the state value for name otherwise it clears the value
	const changeHandler = (e, val) => {
		setAutoValue(val);
		Object.keys(pokemon).forEach((poke) => {
			if (val.toLowerCase() === poke.toString().toLowerCase()) {
				setNewPokemon({ ...newPokemon, name: properNameCase(val) });
				setIsDisabled(false);
			} else if (newPokemon.name !== '') {
				setNewPokemon({ ...newPokemon, name: '' });
				setIsDisabled(true);
			}
		});
	};

	// assign values and submit
	const submitHandler = (e) => {
		e.preventDefault();
		const gender = newPokemon.gender.split(' ');
		// check the gender character - return the key and the value corresponding with each
		// if (newPokemon.gender !== pokeData.data.gender) {
		// 	console.log(newPokemon.gender);
		// 	console.log(pokeData.data.gender);
		// 	if (newPokemon.gender.slice(0, 1) === '♂') {
		// 		gender = [
		// 			'male',
		// 			`${pokemon[newPokemon.name].data.gender.male.toString()}%`,
		// 		];
		// 	} else if (newPokemon.gender.slice(0, 1) === '♀') {
		// 		gender = [
		// 			'female',
		// 			`${pokemon[
		// 				newPokemon.name
		// 			].data.gender.female.toString()}%`,
		// 		];
		// 	} else {
		// 		gender = ['none', 100];
		// 	}
		// } else {
		// 	gender = pokeData.data.gender;
		// }
		// set each string to lowercase in the array for types before passing to DB
		const types = pokemon[newPokemon.name].data.type.map((type) => {
			return type.toLowerCase();
		});
		// get just first part of the ball - only uses first abbreviation
		const ball = newPokemon.ball
			.substr(0, newPokemon.ball.indexOf(' '))
			.toLowerCase();
		const poke = {
			userId: id,
			name: newPokemon.name,
			shiny: newPokemon.shiny === '' ? 0 : newPokemon.shiny,
			dex: pokemon[newPokemon.name].data.dex,
			ball: pokeId ? newPokemon.ball : ball,
			level: newPokemon.level,
			types,
			gender,
			ability: newPokemon.ability,
			hp: newPokemon.hp === '' ? null : newPokemon.hp,
			atk: newPokemon.atk === '' ? null : newPokemon.atk,
			def: newPokemon.def === '' ? null : newPokemon.def,
			spAtk: newPokemon.spAtk === '' ? null : newPokemon.spAtk,
			spDef: newPokemon.spDef === '' ? null : newPokemon.spDef,
			spd: newPokemon.spd === '' ? null : newPokemon.spd,
			eggMoves: newPokemon.moves.length < 1 ? null : newPokemon.moves,
		};
		console.log(poke);
		// check if updating the pokemon or creating a new one
		if (pokeId) {
			const editPoke = { id: pokeId, ...poke };
			dispatch(updateUsermon(editPoke));
		} else {
			dispatch(createUsermon(poke));
		}
		window.location.reload(false);
	};

	return (
		<div className={`AddPokemon ${size}`}>
			<div className="Autocomplete">
				<Autocomplete
					className="Autocomplete"
					value={autoValue}
					inputProps={{
						placeholder: 'Select Pokemon',
					}}
					items={Object.keys(pokemon)}
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
				options={[
					`${Object.keys(pickedData.gender)[0]} ${
						pickedData.gender.male
					}%`,
					`${Object.keys(pickedData.gender)[1]} ${
						pickedData.gender.female
					}%`,
				]}
				value={newPokemon.gender}
				update={update}
				id="gender"
				resetSelect={resetSelect}
			/>
			<FormControl
				type="select"
				placeholder="Select Ability"
				disabled={isDisabled}
				options={pickedData.abilities}
				value={newPokemon.ability}
				update={update}
				id="ability"
				resetSelect={resetSelect}
			/>
			<FormControl
				type="select"
				placeholder="Select Pokeball"
				options={pokemonData.balls}
				value={newPokemon.ball}
				update={update}
				id="ball"
			/>
			<div className="level-iv-shiny">
				<FormControl
					type="text"
					label="Level"
					id="level"
					value={newPokemon.level}
					update={update}
					num
					max={3}
					disabled={isDisabled}
				/>
				<FormControl
					value={newPokemon.shiny}
					update={update}
					type="checkbox"
					id="shiny"
					label="Shiny"
					disabled={isDisabled}
				/>
				<FormControl
					type="text"
					label="HP"
					id="hp"
					value={newPokemon.hp}
					update={update}
					num
					max={2}
					disabled={isDisabled}
				/>
				<FormControl
					type="text"
					label="Atk"
					id="atk"
					value={newPokemon.atk}
					update={update}
					num
					max={2}
					disabled={isDisabled}
				/>
				<FormControl
					type="text"
					label="Def"
					id="def"
					value={newPokemon.def}
					update={update}
					num
					max={2}
					disabled={isDisabled}
				/>
				<FormControl
					type="text"
					label="Sp Atk"
					id="spAtk"
					value={newPokemon.spAtk}
					update={update}
					num
					max={2}
					disabled={isDisabled}
				/>
				<FormControl
					type="text"
					label="Sp Def"
					id="spDef"
					value={newPokemon.spDef}
					update={update}
					num
					max={2}
					disabled={isDisabled}
				/>
				<FormControl
					type="text"
					label="Speed"
					id="spd"
					value={newPokemon.spd}
					update={update}
					num
					max={2}
					disabled={isDisabled}
				/>
			</div>
			<section className="moves">
				<h2>Select Moves: </h2>
				{pickedData.moves.map((move) => (
					<TypePills
						key={Object.values(move)[0]}
						type={Object.keys(move)[0].toLowerCase()}
						name={Object.values(move)[0]}
						clickable
						newPokemon={newPokemon}
						setNewPokemon={setNewPokemon}
						// initial={checkEdit(Object.values(move)[0])}
					/>
				))}
				<FormControl
					type="select"
					placeholder="Select Up to 4 Egg Moves"
					disabled={isDisabled}
					options={pickedData.moves.map((move) =>
						Object.values(move)
					)}
					value={newPokemon.moves}
					update={update}
					id="ems"
					resetSelect={resetSelect}
					multiple
				/>
			</section>
			<div className="buttons">
				<Button
					onClick={submitHandler}
					variant="secondary"
					size="lg"
					disabled={btnDisabled}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

AddPokemon.propTypes = {
	size: PropTypes.string,
	pokeId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	// pokemon: PropTypes.objectOf(
	// 	PropTypes.oneOfType([
	// 		PropTypes.string,
	// 		PropTypes.number,
	// 		PropTypes.bool,
	// 		PropTypes.array,
	// 	])
	// ),
	// setMyPokemon: PropTypes.func.isRequired,
};

AddPokemon.defaultProps = {
	size: '',
	pokeId: false,
	// pokemon: null,
};

export default AddPokemon;
