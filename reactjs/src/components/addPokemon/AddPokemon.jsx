import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import Button from 'react-bootstrap/Button';
import pokemonData from '../../assets/data/pokemon_info.json';
import FormControl from '../formControl';
import TypePills from '../typePills';
import './AddPokemon.scss';

const AddPokemon = ({ id, setMyPokemon, pokemon }) => {
	// state for the autocomplete, disabled entries, a new pokemon, and pickeddata once a pokemon is selected
	const [autoValue, setAutoValue] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	const [resetSelect, setResetSelect] = useState(false);
	const [newPokemon, setNewPokemon] = useState({
		name: '',
		ball: '',
		gender: '',
		ability: '',
		shiny: '',
		moves: '',
		hp: '',
		atk: '',
		def: '',
		spAtk: '',
		spDef: '',
		spd: '',
		level: 1,
	});
	const [pickedData, setPickedData] = useState({
		gender: '',
		ability: '',
		hiddenAbility: '',
		moves: [],
	});
	// useEffect(() => {
	// 	console.log(newPokemon);
	// }, [newPokemon]);
	// if the object has been passed in that means this is being edited - set the state to existing
	useEffect(() => {
		if (pokemon !== null) {
			setNewPokemon({
				name: pokemon.name,
				ball: pokemon.ball,
				gender: pokemon.gender[1],
				ability: pokemon.ability,
				shiny: pokemon.shiny,
				moves: pokemon.eggMoves,
				hp: pokemon.ivs.HP,
				atk: pokemon.ivs.Atk,
				def: pokemon.ivs.Def,
				spAtk: pokemon.ivs.SpAtk,
				spDef: pokemon.ivs.SpDef,
				spd: pokemon.ivs.Spd,
				level: pokemon.level,
			});
		}
	}, [pokemon]);

	// run through the data and get types based on the move name - this will be fixed in the database
	const getType = (move) => {
		let type;
		// eslint-disable-next-line
		for (const [key, value] of Object.entries(pokemonData.moves)) {
			if (key === move) {
				type = value.type;
				break;
			}
		}
		return type;
	};

	// check when the pokemon name is set in state
	// once that is done get an array of abilities - this should be fixed in the database
	// set the picked data to set for the dropdowns
	useEffect(() => {
		if (newPokemon.name !== '') {
			setResetSelect(false);
			const abilArr = pokemonData.pokemon[newPokemon.name].ability.filter(
				(abil) => abil !== '----'
			);
			if (
				pokemonData.pokemon[newPokemon.name].hidden_ability !== '----'
			) {
				abilArr.push(
					pokemonData.pokemon[newPokemon.name].hidden_ability
				);
			}
			// this is not efficient currently but should be better when pulling from the database
			const moveArr = [];
			pokemonData.pokemon[newPokemon.name].egg_moves.forEach((move) => {
				const newMove = { [getType(move)]: move };
				moveArr.push(newMove);
			});
			const newData = {
				gender: pokemonData.pokemon[newPokemon.name].gender,
				abilities: abilArr,
				moves: moveArr,
			};
			setPickedData(newData);
		} else {
			setResetSelect(true);
			setPickedData({
				gender: '',
				ability: '',
				hiddenAbility: '',
				moves: [],
			});
		}
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
		Object.keys(pokemonData.pokemon).forEach((poke) => {
			if (val.toLowerCase() === poke.toString().toLowerCase()) {
				setNewPokemon({ ...newPokemon, name: properNameCase(val) });
				setIsDisabled(false);
			} else if (newPokemon.name !== '') {
				setNewPokemon({ ...newPokemon, name: '' });
				setIsDisabled(true);
			}
		});
	};

	return (
		<div className={`AddPokemon ${id}`}>
			<div className="Autocomplete">
				<Autocomplete
					className="Autocomplete"
					value={autoValue}
					inputProps={{
						placeholder: 'Select Pokemon',
					}}
					items={Object.keys(pokemonData.pokemon)}
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
					`♂ ${pickedData.gender.male}%`,
					`♀ ${pickedData.gender.female}%`,
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
					onClick={setMyPokemon}
					variant="secondary"
					size="lg"
					disabled
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

AddPokemon.propTypes = {
	id: PropTypes.string,
	pokemon: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.bool,
			PropTypes.array,
		])
	),
	setMyPokemon: PropTypes.func.isRequired,
};

AddPokemon.defaultProps = {
	id: '',
	pokemon: null,
};

export default AddPokemon;
