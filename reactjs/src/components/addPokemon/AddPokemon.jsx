import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import pokemonData from '../../assets/data/pokemon_info.json';
import FormControl from '../formControl';
import './AddPokemon.scss';

const AddPokemon = ({ pokemon }) => {
	const [autoValue, setAutoValue] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
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
		moves: '',
	});
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

	useEffect(() => {
		if (newPokemon.name !== '') {
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
			const newData = {
				gender: pokemonData.pokemon[newPokemon.name].gender,
				abilities: abilArr,
				moves: pokemonData.pokemon[newPokemon.name].egg_moves,
			};
			setPickedData(newData);
		}
	}, [newPokemon.name]);

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

	const renderPokemonName = (state, val) =>
		state.toLowerCase().indexOf(val.toLowerCase()) !== -1;

	const properNameCase = (val) => {
		const newVal = val.replace(/(^|[\s-])\S/g, (match) => {
			return match.toUpperCase();
		});
		return newVal;
	};

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
		<div className="AddPokemon">
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
			/>
			<FormControl
				type="select"
				placeholder="Select Ability"
				disabled={isDisabled}
				options={pickedData.abilities}
				value={newPokemon.ability}
				update={update}
				id="ability"
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
				/>
				<FormControl
					value={newPokemon.shiny}
					update={update}
					type="checkbox"
					id="shiny"
					label="Shiny"
				/>
				<FormControl
					type="text"
					label="HP"
					id="hp"
					value={newPokemon.hp}
					update={update}
					num
					max={2}
				/>
				<FormControl
					type="text"
					label="Atk"
					id="atk"
					value={newPokemon.atk}
					update={update}
					num
					max={2}
				/>
				<FormControl
					type="text"
					label="Def"
					id="def"
					value={newPokemon.def}
					update={update}
					num
					max={2}
				/>
				<FormControl
					type="text"
					label="Sp Atk"
					id="spAtk"
					value={newPokemon.spAtk}
					update={update}
					num
					max={2}
				/>
				<FormControl
					type="text"
					label="Sp Def"
					id="spDef"
					value={newPokemon.spDef}
					update={update}
					num
					max={2}
				/>
				<FormControl
					type="text"
					label="Speed"
					id="spd"
					value={newPokemon.spd}
					update={update}
					num
					max={2}
				/>
			</div>
		</div>
	);
};

AddPokemon.propTypes = {
	pokemon: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.bool,
			PropTypes.array,
		])
	),
};

AddPokemon.defaultProps = {
	pokemon: null,
};

export default AddPokemon;
