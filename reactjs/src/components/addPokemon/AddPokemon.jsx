import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import pokemonData from '../../assets/data/pokemon_info.json';
import FormControl from '../formControl';
import './AddPokemon.scss';

const AddPokemon = ({ pokemon }) => {
	// temp disable eslint to render w/out applying both values
	// eslint-disable-next-line
	const [autoValue, setAutoValue] = useState('');
	// temp disable eslint to render w/out applying both values
	// eslint-disable-next-line
	const [newPokemon, setNewPokemon] = useState({
		autoValue: '',
		name: '',
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
		Object.keys(pokemonData).forEach((poke) => {
			if (val.toLowerCase() === poke.toString().toLowerCase()) {
				setNewPokemon({ ...newPokemon, name: properNameCase(val) });
			} else if (newPokemon.name !== '') {
				setNewPokemon({ ...newPokemon, name: '' });
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
			<FormControl type="select" placeholder="" />
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
