import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import {
	BiFemaleSign,
	BiMaleSign,
	BiCircle,
	BiChevronDown,
} from 'react-icons/bi';
import TypePills from '../typePills';
import Shiny from '../../assets/images/icons/shiny.svg';
import './PokemonCard.scss';

const PokemonCard = ({
	name,
	shiny,
	dex,
	ball,
	level,
	types,
	gender,
	ability,
	ivs,
	moves,
}) => {
	// disabling eslint on next line - using .default to ensure it's not bringing in a module and using a dynamic import from the prop
	// also to allow require not at the top of the file. This image is dependent on the prop and cannot be at the top of the file
	// eslint-disable-next-line
	const pokePath = require(`../../assets/images/icons/pokemon/${shiny ? 'shiny/': 'regular/'}${name}.svg`);
	// eslint-disable-next-line
	const ballPath = require(`../../assets/images/icons/balls/${ball}.svg`);

	return (
		<article className="PokemonCard">
			<Image className="pokemon" src={pokePath.default} />
			<h2>
				{name}
				{shiny && (
					<span>
						{' '}
						<Image src={Shiny} />
					</span>
				)}
			</h2>
			<p className="dex">
				Dex:
				<span> {dex}</span>
			</p>
			<Image className="ball" src={ballPath.default} />
			<p className="level">
				<b>Lv. </b>
				{level}
			</p>
			<div className="type">
				{types.map((type) => (
					<TypePills
						key={type.name}
						type={type.type}
						name={type.name}
					/>
				))}
			</div>
			<p className="gender">
				{gender[0] === 'female' ? (
					<BiFemaleSign />
				) : gender[0] === 'male' ? (
					<BiMaleSign />
				) : (
					<BiCircle />
				)}
				<span> {gender[1]}</span>
			</p>
			<p className="ability">{ability}</p>
			<div className="iv-em">
				<div className="ivs">
					{ivs.map((iv) => (
						<p key={Object.keys(iv)}>
							<b>{Object.keys(iv)}</b>
							<span>{iv[Object.keys(iv)]}</span>
						</p>
					))}
				</div>
				<div className="em">
					<h3>Egg Moves:</h3>
					{moves.map((move) => (
						<>
							{console.log(move)}
							<TypePills
								variant="round"
								type={Object.keys(move)}
							/>
							<p>{move[Object.keys(move)]}</p>
						</>
					))}
				</div>
			</div>
			<p>
				View More <BiChevronDown />
			</p>
		</article>
	);
};

PokemonCard.propTypes = {
	name: PropTypes.string.isRequired,
	shiny: PropTypes.bool,
	dex: PropTypes.string.isRequired,
	ball: PropTypes.string.isRequired,
	level: PropTypes.number.isRequired,
	types: PropTypes.arrayOf(PropTypes.object).isRequired,
	gender: PropTypes.arrayOf(PropTypes.string).isRequired,
	ability: PropTypes.string.isRequired,
	ivs: PropTypes.arrayOf(PropTypes.object),
	moves: PropTypes.arrayOf(PropTypes.object),
};

PokemonCard.defaultProps = {
	shiny: false,
	ivs: [
		{ HP: 'N/A' },
		{ Atk: 'N/A' },
		{ Def: 'N/A' },
		{ SpAtk: 'N/A' },
		{ SpDef: 'N/A' },
		{ Spd: 'N/A' },
	],
	moves: ['N/A'],
};

export default PokemonCard;
