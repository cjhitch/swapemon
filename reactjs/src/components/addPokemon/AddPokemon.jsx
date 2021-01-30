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
		autoValue: '',
		name: '',
		ball: '',
		gender: '',
		ability: '',
		shiny: '',
		moves: '',
		iv: [
			{ hp: -1 },
			{ atk: -1 },
			{ def: -1 },
			{ spAtk: -1 },
			{ spDef: -1 },
			{ spd: -1 },
		],
		level: 1,
	});
	const [pickedData, setPickedData] = useState({
		gender: '',
		ability: '',
		hiddenAbility: '',
		moves: '',
	});

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
		console.log(inputId, value);
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

	useEffect(() => {
		console.log(pickedData);
	}, [pickedData]);

	const renderPokemonName = (state, val) =>
		state.toLowerCase().indexOf(val.toLowerCase()) !== -1;

	const properNameCase = (val) => {
		const newVal = val.replace(/(^|[\s-])\S/g, (match) => {
			return match.toUpperCase();
		});
		return newVal;
	};

	const changeHandler = (e, val) => {
		console.log(val);
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

	console.log(pokemon);
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
				placeholder="Select Pokeball"
				options={pokemonData.balls}
				value={newPokemon.ball}
				update={update}
				id="ball"
			/>
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
				id="gender"
			/>
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
